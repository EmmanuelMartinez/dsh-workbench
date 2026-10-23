import { basename, dirname, join, resolve } from "node:path";
import { assertNever } from "@deepseek-ai/dsh-util-values";
import { Remote, RemoteError, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import { homedir } from "node:os";
import { SubprocessExecutableNotFoundError } from "@deepseek-ai/dsh-subprocess";
import { FsError, FsVersion } from "@deepseek-ai/dsh-fs";
import { cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import "@deepseek-ai/cordis";
//#region ../../../vendor/cosmokit/src/misc.ts
/** Return true when a value is `null` or `undefined`. */
function isNullable(value) {
	return value === null || value === void 0;
}
/** Return true for non-array object values. */
function isPlainObject(data) {
	return data && typeof data === "object" && !Array.isArray(data);
}
/** Filter object entries and return a new object. */
function filterKeys(object, filter) {
	return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
}
/** Map object values while preserving the original key set. */
function mapValues(object, transform) {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
}
/** Pick selected keys from an object, optionally including `undefined` values. */
function pick(source, keys, forced) {
	if (!keys) return { ...source };
	const result = {};
	for (const key of keys) if (forced || source[key] !== void 0) result[key] = source[key];
	return result;
}
//#endregion
//#region ../../../vendor/cosmokit/src/volatile.ts
/** Shared config references used by schema validators and plugin runtimes. */
const write = Symbol.for("cosmokit.volatile.write");
function snapshot(value, ancestors = /* @__PURE__ */ new Set()) {
	if (typeof value === "function") throw new TypeError("volatile config cannot contain functions");
	if (value === null || typeof value !== "object") return value;
	if (ancestors.has(value)) throw new TypeError("volatile config cannot contain cycles");
	ancestors.add(value);
	try {
		if (Array.isArray(value)) return Object.freeze(value.map((item) => snapshot(item, ancestors)));
		if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) throw new TypeError("volatile config objects must be plain objects or arrays");
		return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, item]) => [key, snapshot(item, ancestors)])));
	} finally {
		ancestors.delete(value);
	}
}
/**
* Create a detached reference containing an immutable copy of the supplied data.
* @param value - validated config data; class instances and functions are unsupported.
* @returns a reference whose value is updated only by its owning runtime.
*/
function createVolatile(value) {
	let current = snapshot(value);
	return Object.freeze({
		get: () => current,
		[write]: (value) => {
			current = value;
		}
	});
}
/**
* Identify references across ESM/CJS copies of the shared library.
* @param value - a parsed config value.
* @returns whether the value implements the shared reference protocol.
*/
function isVolatile(value) {
	return typeof value === "object" && value !== null && write in value;
}
//#endregion
//#region ../../../vendor/cosmokit/src/types.ts
/** Test values using `instanceof` with a `toStringTag` fallback. */
function is(type, value) {
	if (arguments.length === 1) return (value) => is(type, value);
	return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
}
function isArrayBufferLike(value) {
	return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
}
function isArrayBufferSource(value) {
	return isArrayBufferLike(value) || ArrayBuffer.isView(value);
}
let Binary;
(function(_Binary) {
	_Binary.is = isArrayBufferLike;
	_Binary.isSource = isArrayBufferSource;
	function fromSource(source) {
		if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
		else return source;
	}
	_Binary.fromSource = fromSource;
	function toBase64(source) {
		source = fromSource(source);
		if (typeof Buffer !== "undefined") return Buffer.from(source).toString("base64");
		let binary = "";
		const bytes = new Uint8Array(source);
		for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
		return btoa(binary);
	}
	_Binary.toBase64 = toBase64;
	function fromBase64(source) {
		if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
		return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
	}
	_Binary.fromBase64 = fromBase64;
	function toHex(source) {
		source = fromSource(source);
		if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
		return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
	}
	_Binary.toHex = toHex;
	function fromHex(source) {
		if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
		const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
		const buffer = [];
		for (let i = 0; i < hex.length; i += 2) buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
		return Uint8Array.from(buffer).buffer;
	}
	_Binary.fromHex = fromHex;
})(Binary || (Binary = {}));
Binary.fromBase64;
Binary.toBase64;
Binary.fromHex;
Binary.toHex;
/** Deep-clone common JavaScript values while preserving prototypes and cycles. */
function clone(source, refs = /* @__PURE__ */ new Map()) {
	if (!source || typeof source !== "object") return source;
	if (is("Date", source)) return new Date(source.valueOf());
	if (is("RegExp", source)) return new RegExp(source.source, source.flags);
	if (isArrayBufferLike(source)) return source.slice(0);
	if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
	const cached = refs.get(source);
	if (cached) return cached;
	if (Array.isArray(source)) {
		const result = [];
		refs.set(source, result);
		source.forEach((value, index) => {
			result[index] = Reflect.apply(clone, null, [value, refs]);
		});
		return result;
	}
	const result = Object.create(Object.getPrototypeOf(source));
	refs.set(source, result);
	for (const key of Reflect.ownKeys(source)) {
		const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
		if ("value" in descriptor) descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
		Reflect.defineProperty(result, key, descriptor);
	}
	return result;
}
/**
* Compare values recursively, treating two volatile references as equal regardless of value.
* Strict comparison distinguishes null/undefined, treats opaque objects by identity,
* compares URLs by normalized href, treats array holes as undefined, and considers distinct cyclic structures unequal.
* @param a - first value.
* @param b - second value.
* @param strict - whether to require strict data equality outside volatile references.
* @returns whether the values compare equal.
*/
function deepEqual(a, b, strict) {
	const ancestors = /* @__PURE__ */ new Set();
	function compare(a, b) {
		if (a === b) return true;
		if (isVolatile(a) || isVolatile(b)) return isVolatile(a) && isVolatile(b);
		if (!strict && isNullable(a) && isNullable(b)) return true;
		if (typeof a !== typeof b || typeof a !== "object" || !a || !b) return false;
		if (ancestors.has(a)) return false;
		function check(test, then) {
			return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
		}
		ancestors.add(a);
		try {
			return check(Array.isArray, (a, b) => {
				if (a.length !== b.length) return false;
				for (let index = 0; index < a.length; index++) if (!compare(a[index], b[index])) return false;
				return true;
			}) ?? check(is("Date"), (a, b) => a.valueOf() === b.valueOf()) ?? check(is("URL"), (a, b) => a.href === b.href) ?? check(is("RegExp"), (a, b) => a.source === b.source && a.flags === b.flags) ?? check(isArrayBufferLike, (a, b) => {
				if (a.byteLength !== b.byteLength) return false;
				const viewA = new Uint8Array(a);
				const viewB = new Uint8Array(b);
				for (let i = 0; i < viewA.length; i++) if (viewA[i] !== viewB[i]) return false;
				return true;
			}) ?? ((!strict || [a, b].every((value) => Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)) && Object.keys({
				...a,
				...b
			}).every((key) => compare(a[key], b[key])));
		} finally {
			ancestors.delete(a);
		}
	}
	return compare(a, b);
}
//#endregion
//#region ../../../vendor/cosmokit/src/time.ts
let Time;
(function(_Time) {
	_Time.millisecond = 1;
	const second = _Time.second = 1e3;
	const minute = _Time.minute = second * 60;
	const hour = _Time.hour = minute * 60;
	const day = _Time.day = hour * 24;
	const week = _Time.week = day * 7;
	let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
	function setTimezoneOffset(offset) {
		timezoneOffset = offset;
	}
	_Time.setTimezoneOffset = setTimezoneOffset;
	function getTimezoneOffset() {
		return timezoneOffset;
	}
	_Time.getTimezoneOffset = getTimezoneOffset;
	function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
		if (typeof date === "number") date = new Date(date);
		if (offset === void 0) offset = timezoneOffset;
		return Math.floor((date.valueOf() / minute - offset) / 1440);
	}
	_Time.getDateNumber = getDateNumber;
	function fromDateNumber(value, offset) {
		const date = new Date(value * day);
		if (offset === void 0) offset = timezoneOffset;
		return new Date(+date + offset * minute);
	}
	_Time.fromDateNumber = fromDateNumber;
	const numeric = /\d+(?:\.\d+)?/.source;
	const timeRegExp = new RegExp(`^${[
		"w(?:eek(?:s)?)?",
		"d(?:ay(?:s)?)?",
		"h(?:our(?:s)?)?",
		"m(?:in(?:ute)?(?:s)?)?",
		"s(?:ec(?:ond)?(?:s)?)?"
	].map((unit) => `(${numeric}${unit})?`).join("")}$`);
	function parseTime(source) {
		const capture = timeRegExp.exec(source);
		if (!capture) return 0;
		return (parseFloat(capture[1]) * week || 0) + (parseFloat(capture[2]) * day || 0) + (parseFloat(capture[3]) * hour || 0) + (parseFloat(capture[4]) * minute || 0) + (parseFloat(capture[5]) * second || 0);
	}
	_Time.parseTime = parseTime;
	function parseDate(date) {
		const parsed = parseTime(date);
		if (parsed) date = Date.now() + parsed;
		else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
		else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
		return date ? new Date(date) : /* @__PURE__ */ new Date();
	}
	_Time.parseDate = parseDate;
	function format(ms) {
		const abs = Math.abs(ms);
		if (abs >= day - hour / 2) return Math.round(ms / day) + "d";
		else if (abs >= hour - minute / 2) return Math.round(ms / hour) + "h";
		else if (abs >= minute - second / 2) return Math.round(ms / minute) + "m";
		else if (abs >= second) return Math.round(ms / second) + "s";
		return ms + "ms";
	}
	_Time.format = format;
	function toDigits(source, length = 2) {
		return source.toString().padStart(length, "0");
	}
	_Time.toDigits = toDigits;
	function template(template, time = /* @__PURE__ */ new Date()) {
		return template.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
	}
	_Time.template = template;
})(Time || (Time = {}));
//#endregion
//#region ../../../vendor/schemastery/src/index.ts
const kSchema = Symbol.for("schemastery");
const kValidationError = Symbol.for("ValidationError");
globalThis.__schemastery_index__ ??= 0;
globalThis.__schemastery_refs__ = void 0;
var ValidationError = class extends TypeError {
	options;
	name = "ValidationError";
	constructor(message, options) {
		let prefix = "$";
		for (const segment of options.path || []) if (typeof segment === "string") prefix += "." + segment;
		else if (typeof segment === "number") prefix += "[" + segment + "]";
		else if (typeof segment === "symbol") prefix += `[Symbol(${segment.toString()})]`;
		if (prefix.startsWith(".")) prefix = prefix.slice(1);
		super((prefix === "$" ? "" : `${prefix} `) + message);
		this.options = options;
	}
	static is(error) {
		return !!error?.[kValidationError];
	}
};
Object.defineProperty(ValidationError.prototype, kValidationError, { value: true });
const Schema = function(options) {
	const schema = function(data, options = {}) {
		return Schema.resolve(data, schema, options)[0];
	};
	if (options.refs) {
		const refs = mapValues(options.refs, (options) => new Schema(options));
		const getRef = (uid) => refs[uid];
		for (const key in refs) {
			const options = refs[key];
			options.sKey = getRef(options.sKey);
			options.inner = getRef(options.inner);
			options.list = options.list && options.list.map(getRef);
			options.dict = options.dict && mapValues(options.dict, getRef);
		}
		return refs[options.uid];
	}
	Object.assign(schema, options);
	if (typeof schema.callback === "string") try {
		schema.callback = new Function("return " + schema.callback)();
	} catch {}
	Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
	Object.setPrototypeOf(schema, Schema.prototype);
	schema.meta ||= {};
	schema.toString = schema.toString.bind(schema);
	return schema;
};
Schema.prototype = Object.create(Function.prototype);
Schema.prototype[kSchema] = true;
Object.defineProperty(Schema.prototype, "~standard", { get() {
	return {
		version: 1,
		vendor: "schemastery",
		validate: (value) => {
			try {
				return { value: Schema.resolve(value, this, {})[0] };
			} catch (error) {
				if (ValidationError.is(error)) return { issues: [{
					message: error.message,
					path: error.options.path
				}] };
				throw error;
			}
		}
	};
} });
Schema.ValidationError = ValidationError;
Schema.prototype.toJSON = function toJSON() {
	if (globalThis.__schemastery_refs__) {
		globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
		return this.uid;
	}
	globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
	globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
	const result = {
		uid: this.uid,
		refs: globalThis.__schemastery_refs__
	};
	globalThis.__schemastery_refs__ = void 0;
	return result;
};
Schema.prototype.set = function set(key, value) {
	this.dict[key] = value;
	return this;
};
Schema.prototype.push = function push(value) {
	this.list.push(value);
	return this;
};
function mergeDesc(original, messages) {
	const result = typeof original === "string" ? { "": original } : { ...original };
	for (const locale in messages) {
		const value = messages[locale];
		if (value?.$description || value?.$desc) result[locale] = value.$description || value.$desc;
		else if (typeof value === "string") result[locale] = value;
	}
	return result;
}
function getInner(value) {
	return value?.$value ?? value?.$inner;
}
function extractKeys(data) {
	return filterKeys(data ?? {}, (key) => !key.startsWith("$"));
}
Schema.prototype.i18n = function i18n(messages) {
	const schema = Schema(this);
	const desc = mergeDesc(schema.meta.description, messages);
	if (Object.keys(desc).length) schema.meta.description = desc;
	if (schema.dict) schema.dict = mapValues(schema.dict, (inner, key) => {
		return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
	});
	if (schema.list) schema.list = schema.list.map((inner, index) => {
		return inner.i18n(mapValues(messages, (data = {}) => {
			if (Array.isArray(getInner(data))) return getInner(data)[index];
			if (Array.isArray(data)) return data[index];
			return extractKeys(data);
		}));
	});
	if (schema.inner) schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
		if (getInner(data)) return getInner(data);
		return extractKeys(data);
	}));
	if (schema.sKey) schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
	return schema;
};
Schema.prototype.extra = function extra(key, value) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
};
for (const key of [
	"required",
	"disabled",
	"collapse",
	"hidden",
	"loose"
]) Object.assign(Schema.prototype, { [key](value = true) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
} });
Schema.prototype.deprecated = function deprecated() {
	const schema = Schema(this);
	schema.meta.badges ||= [];
	schema.meta.badges.push({
		text: "deprecated",
		type: "danger"
	});
	return schema;
};
Schema.prototype.experimental = function experimental() {
	const schema = Schema(this);
	schema.meta.badges ||= [];
	schema.meta.badges.push({
		text: "experimental",
		type: "warning"
	});
	return schema;
};
Schema.prototype.pattern = function pattern(regexp) {
	const schema = Schema(this);
	const pattern = pick(regexp, ["source", "flags"]);
	schema.meta = {
		...schema.meta,
		pattern
	};
	return schema;
};
Schema.prototype.simplify = function simplify(value) {
	if (isVolatile(value)) value = value.get();
	if (deepEqual(value, this.meta.default, this.type === "dict")) return null;
	if (isNullable(value)) return value;
	if (this.type === "object" || this.type === "dict") {
		const result = {};
		for (const key in value) {
			const item = (this.type === "object" ? this.dict[key] : this.inner)?.simplify(value[key]);
			if (this.type === "dict" || !isNullable(item)) result[key] = item;
		}
		if (deepEqual(result, this.meta.default, this.type === "dict")) return null;
		return result;
	} else if (this.type === "array" || this.type === "tuple") {
		const result = [];
		value.forEach((value, index) => {
			const schema = this.type === "array" ? this.inner : this.list[index];
			const item = schema ? schema.simplify(value) : value;
			result.push(item);
		});
		return result;
	} else if (this.type === "intersect") {
		const result = {};
		for (const item of this.list) Object.assign(result, item.simplify(value));
		return result;
	} else if (this.type === "union") for (const schema of this.list) try {
		Schema.resolve(value, schema, {});
		return schema.simplify(value);
	} catch {}
	return value;
};
Schema.prototype.toString = function toString(inline) {
	return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
};
Schema.prototype.role = function role(role, extra) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		role,
		extra
	};
	return schema;
};
for (const key of [
	"default",
	"link",
	"comment",
	"description",
	"max",
	"min",
	"step"
]) Object.assign(Schema.prototype, { [key](value) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
} });
Schema.prototype.volatile = function volatile() {
	if (this.meta.volatile) throw new TypeError("volatile schema is already wrapped");
	return this.extra("volatile", true);
};
const resolvers = {};
const checkedVolatile = Symbol("checked-volatile-schema");
function validateVolatileSchema(schema, path = [], blocked = false, seen = /* @__PURE__ */ new Map()) {
	const states = seen.get(schema) ?? /* @__PURE__ */ new Set();
	if (states.has(blocked)) return;
	states.add(blocked);
	seen.set(schema, states);
	if (schema.meta?.volatile && blocked) throw new ValidationError("volatile fields require a fixed object path without an enclosing volatile field", { path });
	const nested = blocked || !!schema.meta?.volatile;
	if (schema.dict) for (const [key, child] of Object.entries(schema.dict)) validateVolatileSchema(child, [...path, key], nested, seen);
	if (schema.sKey) validateVolatileSchema(schema.sKey, [...path, "<key>"], true, seen);
	if (schema.inner && (schema.type !== "lazy" || schema.inner[kSchema])) validateVolatileSchema(schema.inner, [...path, "*"], true, seen);
	if (schema.list) for (let index = 0; index < schema.list.length; index++) validateVolatileSchema(schema.list[index], [...path, String(index)], true, seen);
}
Schema.extend = function extend(type, resolve) {
	resolvers[type] = resolve;
};
Schema.resolve = function resolve(data, schema, options = {}, strict = false) {
	if (!schema) return [data];
	if (!options[checkedVolatile]) {
		validateVolatileSchema(schema, options.path);
		options = {
			...options,
			[checkedVolatile]: true
		};
	}
	if (schema.meta?.volatile) {
		const inner = Schema(schema);
		inner.meta = {
			...schema.meta,
			volatile: false
		};
		const [value, adapted] = Schema.resolve(data, inner, options, strict);
		try {
			return [createVolatile(value), adapted];
		} catch (error) {
			throw new ValidationError(error instanceof Error ? error.message : String(error), options);
		}
	}
	if (options.ignore?.(data, schema)) return [data];
	if (isNullable(data) && schema.type !== "lazy") {
		if (schema.meta.required) throw new ValidationError(`missing required value`, options);
		let current = schema;
		let fallback = schema.meta.default;
		while (current?.type === "intersect" && isNullable(fallback)) {
			current = current.list[0];
			fallback = current?.meta.default;
		}
		if (isNullable(fallback)) return [data];
		data = clone(fallback);
	}
	const callback = resolvers[schema.type];
	if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
	try {
		return callback(data, schema, options, strict);
	} catch (error) {
		if (!schema.meta.loose) throw error;
		return [schema.meta.default];
	}
};
Schema.from = function from(source) {
	if (isNullable(source)) return Schema.any();
	else if ([
		"string",
		"number",
		"boolean"
	].includes(typeof source)) return Schema.const(source).required();
	else if (source[kSchema]) return source;
	else if (typeof source === "function") switch (source) {
		case String: return Schema.string().required();
		case Number: return Schema.number().required();
		case Boolean: return Schema.boolean().required();
		case Function: return Schema.function().required();
		default: return Schema.is(source).required();
	}
	else throw new TypeError(`cannot infer schema from ${source}`);
};
Schema.lazy = function lazy(builder) {
	const toJSON = () => {
		if (!schema.inner[kSchema]) {
			schema.inner = schema.builder();
			schema.inner.meta = {
				...schema.meta,
				...schema.inner.meta
			};
		}
		return schema.inner.toJSON();
	};
	const schema = new Schema({
		type: "lazy",
		builder,
		inner: { toJSON }
	});
	return schema;
};
Schema.natural = function natural() {
	return Schema.number().step(1).min(0);
};
Schema.percent = function percent() {
	return Schema.number().step(.01).min(0).max(1).role("slider");
};
Schema.date = function date() {
	return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), (value, options) => {
		const date = new Date(value);
		if (isNaN(+date)) throw new ValidationError(`invalid date "${value}"`, options);
		return date;
	}, true)]);
};
Schema.regExp = function regExp(flag = "") {
	return Schema.union([Schema.is(RegExp), Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
		try {
			return new RegExp(value, flag);
		} catch (e) {
			throw new ValidationError(e.message, options);
		}
	}, true)]);
};
Schema.arrayBuffer = function arrayBuffer(encoding) {
	return Schema.union([
		Schema.is(ArrayBuffer),
		Schema.is(SharedArrayBuffer),
		Schema.transform(Schema.any(), (value, options) => {
			if (Binary.isSource(value)) return Binary.fromSource(value);
			throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
		}, true),
		...encoding ? [Schema.transform(Schema.string(), (value, options) => {
			try {
				return encoding === "base64" ? Binary.fromBase64(value) : Binary.fromHex(value);
			} catch (e) {
				throw new ValidationError(e.message, options);
			}
		}, true)] : []
	]);
};
Schema.extend("lazy", (data, schema, options, strict) => {
	if (!schema.inner[kSchema]) {
		schema.inner = schema.builder();
		schema.inner.meta = {
			...schema.meta,
			...schema.inner.meta
		};
		validateVolatileSchema(schema.inner, options.path, true);
	}
	return Schema.resolve(data, schema.inner, options, strict);
});
Schema.extend("any", (data) => {
	return [data];
});
Schema.extend("never", (data, _, options) => {
	throw new ValidationError(`expected nullable but got ${data}`, options);
});
Schema.extend("const", (data, { value }, options) => {
	if (deepEqual(data, value)) return [value];
	throw new ValidationError(`expected ${value} but got ${data}`, options);
});
function checkWithinRange(data, meta, description, options, skipMin = false) {
	const { max = Infinity, min = -Infinity } = meta;
	if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
	if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
}
Schema.extend("string", (data, { meta }, options) => {
	if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
	if (meta.pattern) {
		const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
		if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
	}
	checkWithinRange(data.length, meta, "string length", options);
	return [data];
});
function decimalShift(data, digits) {
	const str = data.toString();
	if (str.includes("e")) return data * Math.pow(10, digits);
	const index = str.indexOf(".");
	if (index === -1) return data * Math.pow(10, digits);
	const frac = str.slice(index + 1);
	const integer = str.slice(0, index);
	if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
	return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
}
function isMultipleOf(data, min, step) {
	step = Math.abs(step);
	if (!/^\d+\.\d+$/.test(step.toString())) return (data - min) % step === 0;
	const index = step.toString().indexOf(".");
	const digits = step.toString().slice(index + 1).length;
	return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
}
Schema.extend("number", (data, { meta }, options) => {
	if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
	checkWithinRange(data, meta, "number", options);
	const { step } = meta;
	if (step && !isMultipleOf(data, meta.min ?? 0, step)) throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
	return [data];
});
Schema.extend("boolean", (data, _, options) => {
	if (typeof data === "boolean") return [data];
	throw new ValidationError(`expected boolean but got ${data}`, options);
});
Schema.extend("bitset", (data, { bits, meta }, options) => {
	let value = 0, keys = [];
	if (typeof data === "number") {
		value = data;
		for (const key in bits) if (data & bits[key]) keys.push(key);
	} else if (Array.isArray(data)) {
		keys = data;
		for (const key of keys) {
			if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
			if (key in bits) value |= bits[key];
		}
	} else throw new ValidationError(`expected number or array but got ${data}`, options);
	if (value === meta.default) return [value];
	return [value, keys];
});
Schema.extend("function", (data, _, options) => {
	if (typeof data === "function") return [data];
	throw new ValidationError(`expected function but got ${data}`, options);
});
Schema.extend("is", (data, { constructor }, options) => {
	if (typeof constructor === "function") {
		if (data instanceof constructor) return [data];
		throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
	} else {
		if (isNullable(data)) throw new ValidationError(`expected ${constructor} but got ${data}`, options);
		let prototype = Object.getPrototypeOf(data);
		while (prototype) {
			if (prototype.constructor?.name === constructor) return [data];
			prototype = Object.getPrototypeOf(prototype);
		}
		throw new ValidationError(`expected ${constructor} but got ${data}`, options);
	}
});
function property(data, key, schema, options) {
	try {
		const [value, adapted] = Schema.resolve(data[key], schema, {
			...options,
			path: [...options.path || [], key]
		});
		if (adapted !== void 0) data[key] = adapted;
		return value;
	} catch (e) {
		if (!options?.autofix) throw e;
		delete data[key];
		return schema.meta.volatile ? createVolatile(schema.meta.default) : schema.meta.default;
	}
}
Schema.extend("array", (data, { inner, meta }, options) => {
	if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
	checkWithinRange(data.length, meta, "array length", options, !isNullable(inner.meta.default));
	return [data.map((_, index) => property(data, index, inner, options))];
});
Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
	if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
	const result = {};
	for (const key in data) {
		let rKey;
		try {
			rKey = Schema.resolve(key, sKey, options)[0];
		} catch (error) {
			if (strict) continue;
			throw error;
		}
		result[rKey] = property(data, key, inner, options);
		data[rKey] = data[key];
		if (key !== rKey) delete data[key];
	}
	return [result];
});
Schema.extend("tuple", (data, { list }, options, strict) => {
	if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
	const result = list.map((inner, index) => property(data, index, inner, options));
	if (strict) return [result];
	result.push(...data.slice(list.length));
	return [result];
});
function merge(result, data) {
	for (const key in data) {
		if (key in result) continue;
		result[key] = data[key];
	}
}
Schema.extend("object", (data, { dict }, options, strict) => {
	if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
	const result = {};
	for (const key in dict) {
		const value = property(data, key, dict[key], options);
		if (!isNullable(value) || key in data) result[key] = value;
	}
	if (!strict) merge(result, data);
	return [result];
});
Schema.extend("union", (data, { list, toString }, options, strict) => {
	const messages = [];
	for (const inner of list) try {
		return Schema.resolve(data, inner, options, strict);
	} catch (error) {
		messages.push(error);
	}
	throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
});
Schema.extend("intersect", (data, { list, toString }, options, strict) => {
	if (!list.length) return [data];
	let result;
	for (const inner of list) {
		const value = Schema.resolve(data, inner, options, true)[0];
		if (isNullable(value)) continue;
		if (isNullable(result)) result = value;
		else if (typeof result !== typeof value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
		else if (typeof value === "object") merge(result ??= {}, value);
		else if (result !== value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
	}
	if (!strict && isPlainObject(data)) merge(result, data);
	return [result];
});
Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
	const [result, adapted = data] = Schema.resolve(data, inner, options, true);
	if (preserve) return [callback(result)];
	else return [callback(result), callback(adapted)];
});
const formatters = {};
function defineMethod(name, keys, format) {
	formatters[name] = format;
	Object.assign(Schema, { [name](...args) {
		const schema = new Schema({ type: name });
		keys.forEach((key, index) => {
			switch (key) {
				case "sKey":
					schema.sKey = args[index] ?? Schema.string();
					break;
				case "inner":
					schema.inner = Schema.from(args[index]);
					break;
				case "list":
					schema.list = args[index].map(Schema.from);
					break;
				case "dict":
					schema.dict = mapValues(args[index], Schema.from);
					break;
				case "bits":
					schema.bits = {};
					for (const key in args[index]) {
						if (typeof args[index][key] !== "number") continue;
						schema.bits[key] = args[index][key];
					}
					break;
				case "callback": {
					const callback = schema.callback = args[index];
					callback["toJSON"] ||= () => callback.toString();
					break;
				}
				case "constructor": {
					const constructor = schema.constructor = args[index];
					if (typeof constructor === "function") constructor["toJSON"] ||= () => constructor["name"];
					break;
				}
				default: schema[key] = args[index];
			}
		});
		if (name === "object" || name === "dict") schema.meta.default = {};
		else if (name === "array" || name === "tuple") schema.meta.default = [];
		else if (name === "bitset") schema.meta.default = 0;
		return schema;
	} });
}
defineMethod("is", ["constructor"], ({ constructor }) => {
	if (typeof constructor === "function") return constructor.name;
	else return constructor;
});
defineMethod("any", [], () => "any");
defineMethod("never", [], () => "never");
defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
defineMethod("string", [], () => "string");
defineMethod("number", [], () => "number");
defineMethod("boolean", [], () => "boolean");
defineMethod("bitset", ["bits"], () => "bitset");
defineMethod("function", [], () => "function");
defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
defineMethod("object", ["dict"], ({ dict }) => {
	if (Object.keys(dict).length === 0) return "{}";
	return `{ ${Object.entries(dict).map(([key, inner]) => {
		return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
	}).join(", ")} }`;
});
defineMethod("union", ["list"], ({ list }, inline) => {
	const result = list.map(({ toString: format }) => format()).join(" | ");
	return inline ? `(${result})` : result;
});
defineMethod("intersect", ["list"], ({ list }) => {
	return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
});
defineMethod("transform", [
	"inner",
	"callback",
	"preserve"
], ({ inner }, isInner) => inner.toString(isInner));
//#endregion
//#region ../../git/git-command/src/porcelain.ts
/**
* Parse NUL-terminated numstat records. A rename record carries an empty path
* followed by the old and new paths.
* @param output - complete stdout of `git diff-tree -r -M -z --numstat`.
* @returns records in git's output order.
* @throws when a record is malformed, which indicates truncated output.
*/
function parseNumstat(output) {
	const queue = output.split("\0");
	if (queue.at(-1) !== "") throw new Error("numstat output is not NUL-terminated");
	queue.pop();
	const entries = [];
	while (queue.length > 0) {
		const record = queue.shift();
		const first = record.indexOf("	");
		const second = first < 0 ? -1 : record.indexOf("	", first + 1);
		if (second < 0) throw new Error(`malformed numstat record: ${record}`);
		const added = record.slice(0, first);
		const deleted = record.slice(first + 1, second);
		let target = record.slice(second + 1);
		let oldPath;
		if (target === "") {
			oldPath = queue.shift();
			const renamed = queue.shift();
			if (oldPath === void 0 || renamed === void 0) throw new Error("malformed numstat rename record");
			target = renamed;
		}
		const binary = added === "-";
		entries.push({
			path: target,
			...oldPath === void 0 ? {} : { oldPath },
			added: binary ? 0 : Number(added),
			deleted: binary ? 0 : Number(deleted),
			binary
		});
	}
	return entries;
}
//#endregion
//#region ../../git/git-command/src/index.ts
/**
* One git command through the subprocess seam.
*
* Two capabilities run git here — the turn change recorder and the browser's
* repository panel — and both must run it the same way: never shell-interpreted,
* never waiting on a credential prompt, never reading the user's ambient git
* configuration, never taking an optional lock under the user, and always under
* a caller-owned deadline with bounded output. This package is that one home.
* It also parses the one porcelain form both callers read back: NUL-terminated
* `--numstat` records.
*
* A nonzero exit is data the caller classifies, so nothing here raises one; a
* command that times out, is aborted, or cannot spawn is an exception, and the
* caller owns the cause because the process outcome carries none.
*
* @module @deepseek-ai/dsh-git-command
*/
/** Milliseconds a terminated git range has to exit before it is killed. */
const TERMINATE_GRACE_MS$1 = 2e3;
/** Bytes of one command's stderr kept as its diagnostic tail. */
const STDERR_TAIL_BYTES$1 = 16 * 1024;
/**
* Git's non-interactive environment, layered under every command's own entries.
*
* `GIT_CONFIG_COUNT=0` makes ambient indexed configuration inert: the subprocess
* credential scrub already removes `GIT_CONFIG_KEY_n` (its name matches `KEY`),
* and this makes any survivor meaningless. `GIT_TERMINAL_PROMPT=0` keeps a child
* from waiting on a prompt nobody can answer. `GIT_OPTIONAL_LOCKS=0` stops git
* refreshing an index under the user. `LC_ALL=C` is the stable wording that
* callers classify "not a repository" by.
*/
const GIT_ENV$1 = {
	GIT_CONFIG_COUNT: "0",
	GIT_TERMINAL_PROMPT: "0",
	GIT_OPTIONAL_LOCKS: "0",
	LC_ALL: "C"
};
/** Runs one resolved git executable with a deadline and bounded output. */
var GitRunner$1 = class {
	subprocess;
	executable;
	limits;
	/**
	* @param subprocess - the process seam every command spawns through.
	* @param executable - resolved absolute git executable.
	* @param limits - deadline and output cap for one command.
	*/
	constructor(subprocess, executable, limits) {
		this.subprocess = subprocess;
		this.executable = executable;
		this.limits = limits;
	}
	/**
	* Run one git subcommand to settlement.
	* @param args - arguments after the executable; never shell-interpreted.
	* @param options - directory, cancellation, and per-command overrides.
	* @returns the exit facts and the retained stdout and stderr.
	* @throws Error when the deadline or the caller's signal ended the command, or when the spawn itself failed.
	*/
	async run(args, options) {
		const timeout = AbortSignal.timeout(this.limits.timeoutMs);
		const signal = AbortSignal.any([options.signal, timeout]);
		const handle = this.subprocess.spawn({
			argv: [this.executable, ...args],
			cwd: options.cwd,
			stdio: {
				stdin: options.stdin === void 0 ? "ignore" : { data: options.stdin },
				stdout: { maxBytes: options.maxBytes ?? this.limits.outputMaxBytes },
				stderr: { maxBytes: STDERR_TAIL_BYTES$1 }
			},
			graceMs: TERMINATE_GRACE_MS$1,
			signal,
			env: {
				...GIT_ENV$1,
				...options.env
			}
		});
		const outcome = await handle.done;
		if (signal.aborted) {
			const cause = timeout.aborted ? `timed out after ${this.limits.timeoutMs}ms` : "was aborted";
			throw new Error(`git ${args.join(" ")} ${cause}`);
		}
		/* v8 ignore start -- collect-mode stdio always yields both readers. */
		const stdout = handle.collected.stdout?.readFrom(0) ?? {
			text: "",
			lossy: false
		};
		const stderr = handle.collected.stderr?.readFrom(0).text ?? "";
		/* v8 ignore stop */
		return {
			exitCode: outcome.exitCode,
			stdout: stdout.text,
			stderr,
			truncated: stdout.lossy
		};
	}
};
/**
* Resolve the git executable this host can run.
*
* On macOS the `/usr/bin/git` developer-tools stub opens an installer dialog
* instead of running, so it counts as absent until the tools are selected.
* @param subprocess - the process seam used to resolve and probe.
* @param signal - the caller's lifetime; cancels the lookup and the probe.
* @returns the executable path, or the reason none is usable.
* @throws Error when the lookup fails for a reason other than a missing executable.
*/
async function resolveGitExecutable$1(subprocess, signal) {
	const executable = await subprocess.resolveExecutable("git", void 0, signal).catch((error) => {
		if (error instanceof SubprocessExecutableNotFoundError) return void 0;
		throw error;
	});
	if (executable === void 0) return { reason: "missing" };
	if (process.platform !== "darwin" || executable !== "/usr/bin/git") return { executable };
	return (await subprocess.spawn({
		argv: ["/usr/bin/xcode-select", "-p"],
		cwd: homedir(),
		stdio: {
			stdin: "ignore",
			stdout: { maxBytes: 4096 },
			stderr: { maxBytes: 4096 }
		},
		graceMs: 1e3,
		signal
	}).done.catch(() => ({ exitCode: null }))).exitCode === 0 ? { executable } : { reason: "developer-tools" };
}
//#endregion
//#region ../git-controller/lib/index.js
/**
* Parsers for the git output this service reads.
*
* Every parser is pure and takes the exact bytes one command produced, so the
* controller owns process handling and the shapes stay testable without git.
* Records are NUL-separated wherever a path or a message can contain a newline,
* which is what makes a path list unambiguous; the field separator inside a
* record is the ASCII unit separator, and the free-text field is always last so
* a separator inside it cannot shift another field.
*
* @module @deepseek-ai/dsh-api-git-controller/src/porcelain
*/
/** Field separator inside one record of a custom `--format`. */
const FIELD = "";
/** Record separator: git's own NUL mode for the porcelain commands. */
const RECORD = "\0";
/** Map one porcelain status letter onto a side's kind. */
function statusKind(letter) {
	switch (letter) {
		case ".": return "unmodified";
		case "M": return "modified";
		case "A": return "added";
		case "D": return "deleted";
		case "R": return "renamed";
		case "C": return "copied";
		case "T": return "typechange";
		case "U": return "unmerged";
		default: return "unmodified";
	}
}
/**
* Split one `status` record into its fixed fields and its trailing path, which
* may itself contain spaces and therefore is everything after the last fixed
* field.
* @param record - one NUL-delimited record without its terminator.
* @param pathIndex - how many space-separated fields precede the path.
* @returns the leading fields and the path, or undefined for a short record.
*/
function splitPathRecord(record, pathIndex) {
	const fields = [];
	let position = 0;
	for (let index = 0; index < pathIndex; index += 1) {
		const space = record.indexOf(" ", position);
		if (space === -1) return void 0;
		fields.push(record.slice(position, space));
		position = space + 1;
	}
	return {
		fields,
		path: record.slice(position)
	};
}
/** One `# branch.<key> <value>` header of `status --porcelain=v2 --branch`. */
const BRANCH_HEADER = /^# branch\.([a-z]+)(?: (.*))?$/u;
/**
* Read the branch headers of `status --porcelain=v2 --branch -z`.
* @param output - the command's complete stdout.
* @returns HEAD's fact and the checked-out branch's divergence, when any.
*/
function parseBranchFacts(output) {
	let oid;
	let branch;
	let upstreamRef;
	let ahead = 0;
	let behind = 0;
	for (const record of output.split(RECORD)) {
		const parsed = BRANCH_HEADER.exec(record);
		if (parsed === null) continue;
		const key = parsed[1];
		const value = parsed[2] ?? "";
		if (key === "oid") oid = value === "(initial)" ? void 0 : value;
		else if (key === "head") branch = value === "(detached)" ? void 0 : value;
		else if (key === "upstream") upstreamRef = value;
		else if (key === "ab") {
			const [added, removed] = value.split(" ");
			ahead = Number.parseInt(added?.slice(1) ?? "0", 10);
			behind = Number.parseInt(removed?.slice(1) ?? "0", 10);
		}
	}
	const head = oid === void 0 ? {
		kind: "unborn",
		branch: branch ?? "HEAD"
	} : branch === void 0 ? {
		kind: "detached",
		oid
	} : {
		kind: "branch",
		branch,
		oid
	};
	if (upstreamRef === void 0) return { head };
	return {
		head,
		upstream: {
			ref: upstreamRef,
			ahead: Number.isSafeInteger(ahead) ? ahead : 0,
			behind: Number.isSafeInteger(behind) ? behind : 0
		}
	};
}
/**
* Read the changed-path records of `status --porcelain=v2 -z`.
* @param output - the command's complete stdout; branch headers are ignored.
* @returns one entry per changed path, in git's order.
*/
function parseStatusEntries(output) {
	const records = output.split(RECORD);
	const entries = [];
	for (let index = 0; index < records.length; index += 1) {
		const record = records[index];
		if (record === void 0 || record === "" || record.startsWith("#")) continue;
		const kind = record[0];
		if (kind === "?") {
			const path = record.slice(2);
			if (path !== "") entries.push({
				path,
				index: "unmodified",
				worktree: "untracked"
			});
			continue;
		}
		if (kind === "1") {
			const split = splitPathRecord(record, 8);
			if (split === void 0) continue;
			entries.push({
				path: split.path,
				index: statusKind(split.fields[1]?.[0] ?? "."),
				worktree: statusKind(split.fields[1]?.[1] ?? ".")
			});
			continue;
		}
		if (kind === "2") {
			const split = splitPathRecord(record, 9);
			if (split === void 0) continue;
			const from = records[index + 1];
			index += 1;
			entries.push({
				path: split.path,
				...from === void 0 || from === "" ? {} : { from },
				index: statusKind(split.fields[1]?.[0] ?? "."),
				worktree: statusKind(split.fields[1]?.[1] ?? ".")
			});
			continue;
		}
		if (kind === "u") {
			const split = splitPathRecord(record, 10);
			if (split === void 0) continue;
			entries.push({
				path: split.path,
				index: "unmerged",
				worktree: "unmerged"
			});
		}
	}
	return entries;
}
/**
* Read the five fields every commit record leads with, in the order
* `./index.ts` asks git for them.
* @param fields - one record split on the field separator.
* @returns those fields, or undefined when the record carries no object id.
*/
function commitHead(fields) {
	const oid = fields[0];
	if (oid === void 0 || oid === "") return void 0;
	return {
		oid,
		parents: fields[1] === void 0 || fields[1] === "" ? [] : fields[1].split(" "),
		authorName: fields[2] ?? "",
		authorEmail: fields[3] ?? "",
		authoredAt: fields[4] ?? ""
	};
}
/**
* Read the records of `log -z --format=<fields>`.
* @param output - the command's complete stdout.
* @returns one commit per record, with an empty decoration list.
*/
function parseLog(output) {
	const commits = [];
	for (const record of output.split(RECORD)) {
		if (record === "") continue;
		const fields = record.split(FIELD);
		const head = commitHead(fields);
		if (head === void 0) continue;
		commits.push({
			...head,
			subject: fields.slice(5).join(FIELD),
			refs: []
		});
	}
	return commits;
}
/**
* Read the records of `for-each-ref --format=<fields>`.
* @param output - the command's complete stdout, one ref per line.
* @returns one ref per record, in git's order.
*/
function parseRefs(output) {
	const refs = [];
	for (const line of output.split("\n")) {
		if (line === "") continue;
		const fields = line.split("	");
		const name = fields[0];
		const shortName = fields[1];
		if (name === void 0 || name === "" || shortName === void 0) continue;
		const kind = name.startsWith("refs/heads/") ? "local" : name.startsWith("refs/remotes/") ? "remote" : "tag";
		const objectOid = fields[3] ?? "";
		const peeledOid = fields[4] ?? "";
		refs.push({
			name,
			shortName,
			kind,
			oid: peeledOid === "" ? objectOid : peeledOid,
			head: fields[2] === "*",
			subject: (peeledOid === "" ? fields[5] : fields[6]) ?? "",
			committedAt: (peeledOid === "" ? fields[7] : fields[8]) ?? ""
		});
	}
	return refs;
}
/**
* Read `diff --no-color` output for one file.
*
* File headers before the first hunk are ignored: the caller already names the
* file it asked about. A `\ No newline at end of file` marker is dropped, since
* the panel renders lines rather than patching them.
* @param output - the command's complete stdout.
* @returns whether the pair is binary, and the hunks in file order.
*/
function parseUnifiedDiff(output) {
	const hunks = [];
	let binary = false;
	let current;
	for (const line of output.split("\n")) {
		if (line.startsWith("Binary files ") || line.startsWith("GIT binary patch")) {
			binary = true;
			continue;
		}
		if (line.startsWith("@@")) {
			if (current !== void 0) hunks.push({
				header: current.header,
				lines: current.lines
			});
			current = {
				header: line,
				lines: []
			};
			continue;
		}
		if (current === void 0 || line === "" || line.startsWith("\\")) continue;
		const marker = line[0];
		const text = line.slice(1);
		if (marker === "+") current.lines.push({
			kind: "add",
			text
		});
		else if (marker === "-") current.lines.push({
			kind: "delete",
			text
		});
		else if (marker === " ") current.lines.push({
			kind: "context",
			text
		});
	}
	if (current !== void 0) hunks.push({
		header: current.header,
		lines: current.lines
	});
	return {
		binary,
		hunks
	};
}
/**
* Map one diff status letter onto a change's kind.
* @param letter - the first letter of a raw status or a name-status entry.
* @returns the matching kind; an unrecognized letter reports a modification.
*/
function changeKind(letter) {
	switch (letter) {
		case "A": return "added";
		case "D": return "deleted";
		case "R": return "renamed";
		case "C": return "copied";
		case "T": return "typechange";
		default: return "modified";
	}
}
/**
* Read the records of `diff-tree --raw -z`.
*
* Each record starts with the mode/object header and ends with the status, and
* the paths that follow it are their own NUL-separated fields: one for an
* ordinary change, previous then current for a rename or copy.
* @param output - the command's complete stdout.
* @returns one change per record, in git's order.
*/
function parseRawChanges(output) {
	const records = output.split(RECORD);
	const changes = [];
	for (let index = 0; index < records.length; index += 1) {
		const record = records[index];
		if (record === void 0 || !record.startsWith(":")) continue;
		const kind = changeKind(record.slice(record.lastIndexOf(" ") + 1)[0] ?? "M");
		if (kind === "renamed" || kind === "copied") {
			const from = records[index + 1];
			const to = records[index + 2];
			index += 2;
			if (from === void 0 || from === "" || to === void 0 || to === "") continue;
			changes.push({
				path: to,
				from,
				kind
			});
			continue;
		}
		const path = records[index + 1];
		index += 1;
		if (path === void 0 || path === "") continue;
		changes.push({
			path,
			kind
		});
	}
	return changes;
}
/**
* Read one `show --no-patch --format=<fields>` record.
* @param output - the command's complete stdout.
* @returns the commit, or undefined when the record carries no object id.
*/
function parseCommitDetail(output) {
	const fields = (output.endsWith("\n") ? output.slice(0, -1) : output).split(FIELD);
	const head = commitHead(fields);
	if (head === void 0) return void 0;
	return {
		...head,
		subject: fields[5] ?? "",
		body: fields.slice(6).join(FIELD).replace(/\n+$/u, "")
	};
}
/**
* Git Remote owner: locates the repository behind a registered Workspace and
* serves the history graph, working-tree status, refs, and file comparisons the
* Client panel renders.
*
* The Workspace registration is the only path authority. A request names a
* `WorkspaceId` and this Host resolves its canonical directory, so no caller can
* point the service at an arbitrary directory, and every path that crosses the
* wire is relative to the repository root and validated here. Every command runs
* through the subprocess seam with git's non-interactive environment, a
* per-command deadline, and a bounded stdout (see `@deepseek-ai/dsh-git-command`).
*
* Read-only: this service reports repository state and changes nothing in it.
*
* @module @deepseek-ai/dsh-api-git-controller
*/
var __runInitializers$3 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/** Fields one `log` record carries, in the order `./porcelain.ts` reads them. */
const LOG_FORMAT = "%H%x1f%P%x1f%an%x1f%ae%x1f%aI%x1f%s";
/** Fields one `show --no-patch` record carries; the body is last. */
const SHOW_FORMAT = "%H%x1f%P%x1f%an%x1f%ae%x1f%aI%x1f%s%x1f%b";
/** Tab-separated fields of one `for-each-ref` line; the peeled forms are empty for a direct ref. */
const REF_FORMAT = [
	"%(refname)",
	"%(refname:short)",
	"%(HEAD)",
	"%(objectname)",
	"%(*objectname)",
	"%(subject)",
	"%(*subject)",
	"%(committerdate:iso-strict)",
	"%(*committerdate:iso-strict)"
].join("%09");
/** Refuse a wire number a request cannot use. */
function integerAtLeast(value, min, name) {
	if (!Number.isSafeInteger(value) || value < min) throw new RemoteError("gateway/bad-request", `${name} must be a safe integer of at least ${min}`, {});
	return value;
}
/**
* Validate one repository-relative path from the wire.
*
* The panel only ever sends a path git itself reported, so anything else is a
* defect or an attack: an absolute path or a `..` segment would leave the
* repository, and a NUL cannot travel through an argument at all.
* @param path - the path to validate.
* @returns the same path.
* @throws RemoteError with `git/bad-request` when the path is not repository-relative.
*/
function requireRelativePath$1(path) {
	if (path === "" || path.includes("\0") || path.startsWith("/") || path.startsWith("\\") || /^[a-z]:/iu.test(path) || path.split("/").includes("..")) throw new RemoteError("git/bad-request", `"${path}" is not a repository-relative path`, { reason: "path-outside-repository" });
	return path;
}
/**
* Validate one revision from the wire.
* @param revision - revision or refname to validate.
* @returns the same revision.
* @throws RemoteError with `git/bad-request` when it could be read as an option.
*/
function requireRevision(revision) {
	if (revision === "" || revision.includes("\0") || revision.startsWith("-")) throw new RemoteError("git/bad-request", `"${revision}" is not a usable revision`, { reason: "option-like-revision" });
	return revision;
}
/**
* Validate one object id from the wire.
* @param oid - object id to validate.
* @returns the same object id.
* @throws RemoteError with `git/bad-request` when it is not hexadecimal.
*/
function requireObjectId(oid) {
	if (!/^[0-9a-f]{4,64}$/iu.test(oid)) throw new RemoteError("git/bad-request", `"${oid}" is not a commit id`, { reason: "option-like-revision" });
	return oid;
}
/**
* A one-slot async wakeup: pushes coalesce while nobody is waiting, and a
* waiter resolves on the next push or rejects on abort.
* @returns the queue's one operation: wait for the next push.
*/
function createWakeQueue() {
	let waiting;
	let pending = false;
	return {
		push: () => {
			if (waiting === void 0) {
				pending = true;
				return;
			}
			const resolve = waiting;
			waiting = void 0;
			resolve();
		},
		next: (signal) => new Promise((resolve, reject) => {
			if (pending) {
				pending = false;
				resolve();
				return;
			}
			const abort = () => {
				waiting = void 0;
				reject(signal.reason instanceof Error ? signal.reason : /* @__PURE__ */ new Error("aborted"));
			};
			signal.addEventListener("abort", abort, { once: true });
			waiting = () => {
				signal.removeEventListener("abort", abort);
				resolve();
			};
		})
	};
}
/** Host Remote owner of the `git` namespace. */
let GitController = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _repository_decorators;
	let _status_decorators;
	let _refs_decorators;
	let _log_decorators;
	let _commit_decorators;
	let _diff_decorators;
	let _watch_decorators;
	return class GitController extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_repository_decorators = [Remote];
			_status_decorators = [Remote];
			_refs_decorators = [Remote];
			_log_decorators = [Remote];
			_commit_decorators = [Remote];
			_diff_decorators = [Remote];
			_watch_decorators = [Remote({ mode: "stream" })];
			__esDecorate$3(this, null, _repository_decorators, {
				kind: "method",
				name: "repository",
				static: false,
				private: false,
				access: {
					has: (obj) => "repository" in obj,
					get: (obj) => obj.repository
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _status_decorators, {
				kind: "method",
				name: "status",
				static: false,
				private: false,
				access: {
					has: (obj) => "status" in obj,
					get: (obj) => obj.status
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _refs_decorators, {
				kind: "method",
				name: "refs",
				static: false,
				private: false,
				access: {
					has: (obj) => "refs" in obj,
					get: (obj) => obj.refs
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _log_decorators, {
				kind: "method",
				name: "log",
				static: false,
				private: false,
				access: {
					has: (obj) => "log" in obj,
					get: (obj) => obj.log
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _commit_decorators, {
				kind: "method",
				name: "commit",
				static: false,
				private: false,
				access: {
					has: (obj) => "commit" in obj,
					get: (obj) => obj.commit
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _diff_decorators, {
				kind: "method",
				name: "diff",
				static: false,
				private: false,
				access: {
					has: (obj) => "diff" in obj,
					get: (obj) => obj.diff
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$3(this, null, _watch_decorators, {
				kind: "method",
				name: "watch",
				static: false,
				private: false,
				access: {
					has: (obj) => "watch" in obj,
					get: (obj) => obj.watch
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		config = __runInitializers$3(this, _instanceExtraInitializers);
		static inject = [
			"fs",
			"subprocess",
			"workspaceRegistry"
		];
		static Config = Schema.object({
			timeoutMs: Schema.number().step(1).min(1).default(3e4),
			outputMaxBytes: Schema.number().step(1).min(1).default(8 * 1024 * 1024),
			maxRefs: Schema.number().step(1).min(1).default(2e3),
			maxStatusEntries: Schema.number().step(1).min(1).default(5e3),
			maxLogPage: Schema.number().step(1).min(1).default(200),
			maxCommitFiles: Schema.number().step(1).min(1).default(1e3)
		});
		/** Cancels every command this plugin's lifetime owns. */
		lifetime = new AbortController();
		/** Resolved once per plugin lifetime; a rejected resolution is retried by the next request. */
		resolution;
		/**
		* @param ctx - Host context carrying the process seam and the Workspace registry.
		* @param config - deployment bounds on one call.
		*/
		constructor(ctx, config) {
			super(ctx, "gitController", { namespace: "git" });
			this.config = config;
			for (const [field, value] of Object.entries(config)) if (!Number.isSafeInteger(value) || value < 1) throw new Error(`git-controller requires a positive integer ${field}`);
			ctx.effect(() => () => {
				this.lifetime.abort();
			}, "git-controller: command lifetime");
		}
		/**
		* Locate the repository that contains a Workspace's directory.
		* @param workspaceId - registered Workspace whose directory is searched.
		* @param signal - caller cancellation.
		* @returns the located working tree, or `not-a-repository` when the directory is outside one.
		* @throws RemoteError when no such Workspace is registered.
		*/
		async repository(workspaceId, signal) {
			const located = await this.locate(workspaceId, signal);
			if (located === void 0) return { kind: "not-a-repository" };
			const status = await (await this.requireRunner()).run([
				"status",
				"--porcelain=v2",
				"--branch",
				"-z",
				"--untracked-files=no"
			], {
				cwd: located.root,
				signal
			});
			if (status.exitCode !== 0) throw this.failure("status", status);
			const facts = parseBranchFacts(status.stdout);
			return {
				kind: "repository",
				repository: {
					root: located.root,
					name: basename(located.root),
					head: facts.head,
					...facts.upstream === void 0 ? {} : { upstream: facts.upstream }
				}
			};
		}
		/**
		* Read the working tree's changed paths, each with its staged and unstaged sides.
		* @param workspaceId - registered Workspace whose repository is read.
		* @param signal - caller cancellation.
		* @returns the changed paths, cut to the configured cap.
		*/
		async status(workspaceId, signal) {
			const located = await this.requireRepository(workspaceId, signal);
			const result = await (await this.requireRunner()).run([
				"status",
				"--porcelain=v2",
				"-z",
				"--untracked-files=all"
			], {
				cwd: located.root,
				signal
			});
			if (result.exitCode !== 0) throw this.failure("status", result);
			const entries = parseStatusEntries(result.stdout);
			const cap = this.config.maxStatusEntries;
			return {
				entries: entries.slice(0, cap),
				truncated: entries.length > cap
			};
		}
		/**
		* Read every branch, remote-tracking ref, and tag.
		* @param workspaceId - registered Workspace whose repository is read.
		* @param signal - caller cancellation.
		* @returns the refs, cut to the configured cap.
		*/
		async refs(workspaceId, signal) {
			const located = await this.requireRepository(workspaceId, signal);
			const refs = await this.readRefs(located.root, signal);
			const cap = this.config.maxRefs;
			return {
				refs: refs.slice(0, cap),
				truncated: refs.length > cap
			};
		}
		/**
		* Walk the history from one revision, newest first, decorating each commit with the refs that point at it.
		* @param workspaceId - registered Workspace whose repository is read.
		* @param request - revision, window, and optional path filter.
		* @param signal - caller cancellation.
		* @returns one page of commits and whether the walk continues.
		*/
		async log(workspaceId, request, signal) {
			const located = await this.requireRepository(workspaceId, signal);
			const runner = await this.requireRunner();
			const cap = this.config.maxLogPage;
			const requested = request.limit === void 0 ? cap : integerAtLeast(request.limit, 1, "limit");
			if (requested > cap) throw new RemoteError("gateway/bad-request", `limit must be at most ${cap}`, {});
			const skip = request.skip === void 0 ? 0 : integerAtLeast(request.skip, 0, "skip");
			const revision = request.rev === void 0 || request.rev === "" ? "HEAD" : requireRevision(request.rev);
			const path = request.path === void 0 ? void 0 : requireRelativePath$1(request.path);
			const args = [
				"log",
				"-z",
				"--date-order",
				`--max-count=${requested + 1}`,
				`--skip=${skip}`,
				`--format=${LOG_FORMAT}`,
				revision
			];
			if (path !== void 0) args.push("--", path);
			const result = await runner.run(args, {
				cwd: located.root,
				signal
			});
			if (result.exitCode !== 0) {
				if (/does not have any commits yet/i.test(result.stderr)) return {
					commits: [],
					more: false
				};
				if (revision === "HEAD" && /ambiguous argument 'HEAD'/iu.test(result.stderr)) return {
					commits: [],
					more: false
				};
				throw /unknown revision|bad revision|ambiguous argument/i.test(result.stderr) ? new RemoteError("git/unknown-revision", `no revision "${revision}"`, { revision }) : this.failure("log", result);
			}
			const parsed = parseLog(result.stdout);
			const more = parsed.length > requested;
			const decorations = await this.decorations(located.root, signal);
			return {
				commits: parsed.slice(0, requested).map((commit) => ({
					...commit,
					refs: decorations.get(commit.oid) ?? []
				})),
				more
			};
		}
		/**
		* Read one commit's message, metadata, and complete file list.
		* @param workspaceId - registered Workspace whose repository is read.
		* @param oid - commit id to read.
		* @param signal - caller cancellation.
		* @returns the commit and its changed files, cut to the configured cap.
		*/
		async commit(workspaceId, oid, signal) {
			const located = await this.requireRepository(workspaceId, signal);
			const runner = await this.requireRunner();
			const revision = requireObjectId(oid);
			const shown = await runner.run([
				"show",
				"--no-patch",
				`--format=${SHOW_FORMAT}`,
				revision
			], {
				cwd: located.root,
				signal
			});
			if (shown.exitCode !== 0) throw /unknown revision|bad object|ambiguous argument|invalid object name/i.test(shown.stderr) ? new RemoteError("git/unknown-revision", `no commit "${revision}"`, { revision }) : this.failure("show", shown);
			const parsed = parseCommitDetail(shown.stdout);
			if (parsed === void 0) throw new RemoteError("git/unknown-revision", `no commit "${revision}"`, { revision });
			const files = await this.readFileChanges(located.root, revision, signal);
			const cap = this.config.maxCommitFiles;
			const decorations = await this.decorations(located.root, signal);
			return {
				...parsed,
				parents: [...parsed.parents],
				refs: decorations.get(parsed.oid) ?? [],
				files: files.slice(0, cap),
				filesTruncated: files.length > cap
			};
		}
		/**
		* Compare one file between two of its states.
		* @param workspaceId - registered Workspace whose repository is read.
		* @param request - the path, an optional pre-rename path, and which two states to compare.
		* @param signal - caller cancellation.
		* @returns the comparison, or an explicit untracked result when the working tree has no index entry for it.
		*/
		async diff(workspaceId, request, signal) {
			const located = await this.requireRepository(workspaceId, signal);
			const runner = await this.requireRunner();
			const path = requireRelativePath$1(request.path);
			const from = request.from === void 0 ? void 0 : requireRelativePath$1(request.from);
			const paths = from === void 0 ? [path] : [from, path];
			const base = {
				path,
				...from === void 0 ? {} : { from }
			};
			const side = request.side;
			let result;
			switch (side.kind) {
				case "worktree": {
					const tracked = await runner.run([
						"ls-files",
						"--error-unmatch",
						"--",
						path
					], {
						cwd: located.root,
						signal
					});
					if (tracked.exitCode === 1) return {
						...base,
						hunks: [],
						binary: false,
						untracked: true,
						truncated: false
					};
					if (tracked.exitCode !== 0) throw this.failure("ls-files", tracked);
					result = await runner.run([
						"diff",
						"--no-color",
						"-M",
						"--",
						...paths
					], {
						cwd: located.root,
						signal
					});
					break;
				}
				case "index":
					result = await runner.run([
						"diff",
						"--cached",
						"--no-color",
						"-M",
						"--",
						...paths
					], {
						cwd: located.root,
						signal
					});
					break;
				case "commit":
					result = await runner.run([
						"show",
						"--no-color",
						"-M",
						"--format=",
						requireObjectId(side.oid),
						"--",
						...paths
					], {
						cwd: located.root,
						signal
					});
					break;
				default: return assertNever(side);
			}
			if (result.exitCode !== 0) throw this.failure("diff", result);
			const parsed = parseUnifiedDiff(result.stdout);
			return {
				...base,
				hunks: parsed.hunks,
				binary: parsed.binary,
				untracked: false,
				truncated: result.truncated
			};
		}
		/** Resolve the executable once, and cancel the resolution with the plugin. */
		resolveRunner() {
			this.resolution ??= this.resolveOnce();
			return this.resolution;
		}
		async resolveOnce() {
			try {
				const resolved = await resolveGitExecutable$1(this.ctx.subprocess, this.lifetime.signal);
				if ("reason" in resolved) return {
					kind: "unavailable",
					reason: resolved.reason
				};
				return {
					kind: "runner",
					runner: new GitRunner$1(this.ctx.subprocess, resolved.executable, {
						timeoutMs: this.config.timeoutMs,
						outputMaxBytes: this.config.outputMaxBytes
					})
				};
			} catch (error) {
				this.resolution = void 0;
				throw error;
			}
		}
		/** The runner, or the explicit refusal the Client renders as "git is unavailable". */
		async requireRunner() {
			const resolution = await this.resolveRunner();
			if (resolution.kind === "unavailable") throw new RemoteError("git/unavailable", `git is unavailable (${resolution.reason})`, { reason: resolution.reason });
			return resolution.runner;
		}
		/** Resolve one Workspace's canonical directory; the registration is the only path authority. */
		workspacePath(workspaceId) {
			const workspace = this.ctx.workspaceRegistry.get(workspaceId);
			if (workspace === void 0) throw new RemoteError("workspace/not-found", `no workspace "${workspaceId}"`, { workspaceId });
			return workspace.path;
		}
		/** Locate the working tree containing a Workspace, or undefined when it is outside every repository. */
		/**
		* Watch the repository's own directory for the changes that make a read
		* stale: a commit, a checkout, an index write. A Workspace without a
		* repository ends the stream instead of failing, so a caller may start it
		* before it knows one exists.
		* @param workspaceId - registered Workspace to watch.
		* @param signal - generation cancellation.
		* @returns `ready` once the watch is active, then one frame per invalidation.
		*/
		async *watch(workspaceId, signal) {
			const located = await this.locate(workspaceId, signal).catch(() => void 0);
			if (located === void 0) return;
			const workspace = await this.ctx.fs.resolve(this.workspacePath(workspaceId), { signal });
			const directory = await this.ctx.fs.resolve(join(located.root, ".git"), { signal });
			if (!((await this.ctx.fs.stat(directory, signal))?.type === "directory" && this.ctx.fs.contains(workspace, directory))) return;
			const wake = createWakeQueue();
			const unwatch = await this.ctx.fs.watch(directory, (error) => {
				if (error === void 0) wake.push();
			}, signal).catch(() => void 0);
			if (unwatch === void 0) return;
			yield { kind: "ready" };
			try {
				while (!signal.aborted) {
					await wake.next(signal);
					yield { kind: "change" };
				}
			} finally {
				await unwatch();
			}
		}
		async locate(workspaceId, signal) {
			const result = await (await this.requireRunner()).run(["rev-parse", "--show-toplevel"], {
				cwd: this.workspacePath(workspaceId),
				signal
			});
			if (result.exitCode === 0) {
				const root = result.stdout.split("\n")[0];
				if (root === void 0 || root === "") throw this.failure("rev-parse", result);
				return { root };
			}
			if (result.exitCode === 128 && /not a git repository/i.test(result.stderr)) return void 0;
			throw this.failure("rev-parse", result);
		}
		/** Locate the working tree, or refuse the call as one made outside a repository. */
		async requireRepository(workspaceId, signal) {
			const located = await this.locate(workspaceId, signal);
			if (located === void 0) throw new RemoteError("git/not-a-repository", `workspace "${workspaceId}" is outside every git repository`, { workspaceId });
			return located;
		}
		/** Every ref, whether or not the caller keeps all of them. */
		async readRefs(root, signal) {
			const result = await (await this.requireRunner()).run(["for-each-ref", `--format=${REF_FORMAT}`], {
				cwd: root,
				signal
			});
			if (result.exitCode !== 0) throw this.failure("for-each-ref", result);
			return parseRefs(result.stdout);
		}
		/** Short ref names by the commit they point at, for decorating a history page. */
		async decorations(root, signal) {
			const byOid = /* @__PURE__ */ new Map();
			for (const ref of await this.readRefs(root, signal)) {
				const names = byOid.get(ref.oid);
				if (names === void 0) byOid.set(ref.oid, [ref.shortName]);
				else names.push(ref.shortName);
			}
			return byOid;
		}
		/** One commit's changed files: line counts from `--numstat`, kinds from `--raw`. */
		async readFileChanges(root, revision, signal) {
			const runner = await this.requireRunner();
			const shared = [
				"-r",
				"-M",
				"-z",
				"--no-commit-id",
				"--root",
				revision
			];
			const stats = await runner.run([
				"diff-tree",
				"--numstat",
				...shared
			], {
				cwd: root,
				signal
			});
			if (stats.exitCode !== 0) throw this.failure("diff-tree", stats);
			if (stats.truncated) throw this.outputCut("diff-tree");
			const raw = await runner.run([
				"diff-tree",
				"--raw",
				...shared
			], {
				cwd: root,
				signal
			});
			if (raw.exitCode !== 0) throw this.failure("diff-tree", raw);
			const kinds = new Map(parseRawChanges(raw.stdout).map((change) => [change.path, change.kind]));
			return parseNumstat(stats.stdout).map((entry) => ({
				path: entry.path,
				...entry.oldPath === void 0 ? {} : { from: entry.oldPath },
				kind: kinds.get(entry.path) ?? (entry.oldPath === void 0 ? "modified" : "renamed"),
				insertions: entry.added,
				deletions: entry.deleted,
				binary: entry.binary
			}));
		}
		/** The wire failure for a command that exited nonzero or was killed. */
		failure(command, result) {
			return new RemoteError("git/command-failed", `git ${command} failed: ${result.stderr.trim() === "" ? `exit ${String(result.exitCode)}` : result.stderr.trim()}`, { command });
		}
		/** The wire failure for a command whose stdout the configured cap cut short, which no parser can read. */
		outputCut(command) {
			return new RemoteError("git/command-failed", `git ${command} failed: stdout exceeded the configured output cap`, { command });
		}
	};
})();
//#endregion
//#region ../workspace-editor/lib/index.js
/**
* Workspace document editor: read, stat, and write one Workspace file as
* `workspaceEditor`, so a browser surface can let a person review and edit a
* file themselves instead of handing it to another application.
*
* The Workspace registration is the only directory authority: a request names a
* `WorkspaceId` and a path relative to it, and this service refuses any path
* that resolves outside that root. Writes are version-checked: a caller sends
* back the version it read, so a buffer the Host has moved past is refused
* instead of overwriting newer bytes.
*
* A write here is a person acting on their own machine, not an Agent tool call,
* which is what `writeMode` expresses: it selects the sandbox policy the write
* is performed under, and it defaults to the user's own authority because this
* controller already confines the target to the Workspace it named. Deployments
* that want browser edits confined further set `read-only`, which refuses every
* write while leaving reads intact.
*
* @module @deepseek-ai/dsh-api-workspace-editor
*/
var __runInitializers$2 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/** Modes a browser write may run under. */
const WRITE_MODES = [
	"read-only",
	"workspace-write",
	"danger-full-access"
];
/** The byte text never carries: its presence marks a document as binary. */
const NUL = String.fromCharCode(0);
/**
* Validate one Workspace-relative path from the wire.
* @param path - the path to validate.
* @returns the same path.
* @throws RemoteError with `workspace-editor/outside-workspace` when it is absolute or steps out.
*/
function requireRelativePath(path) {
	if (path === "" || path.includes(NUL) || path.startsWith("/") || path.startsWith("\\") || /^[a-z]:/iu.test(path) || path.split("/").includes("..")) throw new RemoteError("workspace-editor/outside-workspace", `"${path}" is not a workspace-relative path`, { path });
	return path;
}
/** Host Remote owner of the `workspaceEditor` namespace. */
let WorkspaceEditor = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _read_decorators;
	let _stat_decorators;
	let _write_decorators;
	return class WorkspaceEditor extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_read_decorators = [Remote];
			_stat_decorators = [Remote];
			_write_decorators = [Remote];
			__esDecorate$2(this, null, _read_decorators, {
				kind: "method",
				name: "read",
				static: false,
				private: false,
				access: {
					has: (obj) => "read" in obj,
					get: (obj) => obj.read
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _stat_decorators, {
				kind: "method",
				name: "stat",
				static: false,
				private: false,
				access: {
					has: (obj) => "stat" in obj,
					get: (obj) => obj.stat
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _write_decorators, {
				kind: "method",
				name: "write",
				static: false,
				private: false,
				access: {
					has: (obj) => "write" in obj,
					get: (obj) => obj.write
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		config = __runInitializers$2(this, _instanceExtraInitializers);
		static inject = [
			"fs",
			"sandboxPolicy",
			"workspaceRegistry"
		];
		static Config = Schema.object({
			maxFileBytes: Schema.number().step(1).min(1).max(Number.MAX_SAFE_INTEGER - 1).default(4 * 1024 * 1024),
			writeMode: Schema.union([...WRITE_MODES]).default("danger-full-access")
		});
		/**
		* @param ctx - Host context carrying the filesystem, the sandbox policy, and the Workspace registry.
		* @param config - the document cap and the write policy.
		*/
		constructor(ctx, config) {
			super(ctx, "workspaceEditor", { namespace: "workspaceEditor" });
			this.config = config;
			if (!Number.isSafeInteger(config.maxFileBytes) || config.maxFileBytes < 1) throw new Error("workspace-editor requires a positive integer maxFileBytes");
			if (!WRITE_MODES.includes(config.writeMode)) throw new Error(`workspace-editor requires writeMode to be one of ${WRITE_MODES.join(", ")}`);
		}
		/**
		* Read one document's complete text and the version a write must send back.
		* @param workspaceId - registered Workspace the path is relative to.
		* @param path - Workspace-relative path of the file to read.
		* @param signal - caller cancellation.
		* @returns the document's text, version, and size.
		* @throws RemoteError when the path is outside the Workspace, is not a regular file, is not text, or exceeds the cap.
		*/
		async read(workspaceId, path, signal) {
			const { target, info } = await this.locate(workspaceId, path, signal);
			if (info.size !== void 0 && info.size > this.config.maxFileBytes) throw this.tooLarge(path);
			let text;
			try {
				text = await this.ctx.fs.readText(target, signal);
			} catch (error) {
				throw this.classify(path, error);
			}
			if (text.includes(NUL)) throw new RemoteError("workspace-editor/not-text", `"${path}" contains NUL bytes`, { path });
			if (Buffer.byteLength(text, "utf8") > this.config.maxFileBytes) throw this.tooLarge(path);
			return {
				...this.statOf(target, info),
				path: this.relative(path),
				text
			};
		}
		/**
		* Report one document's identity and current version without its text.
		* @param workspaceId - registered Workspace the path is relative to.
		* @param path - Workspace-relative path of the file to stat.
		* @param signal - caller cancellation.
		* @returns the document's version and size.
		* @throws RemoteError when the path is outside the Workspace or is not a regular file.
		*/
		async stat(workspaceId, path, signal) {
			const { target, info } = await this.locate(workspaceId, path, signal);
			return {
				...this.statOf(target, info),
				path: this.relative(path)
			};
		}
		/**
		* Write one document's complete text under the caller's expectation.
		* @param workspaceId - registered Workspace the path is relative to.
		* @param path - Workspace-relative path of the file to write.
		* @param text - the complete new text.
		* @param expected - the state the caller read, or a create-only request.
		* @param signal - caller cancellation.
		* @returns the document's new version and size.
		* @throws RemoteError when the path is outside the Workspace, the content exceeds the cap,
		* the expectation no longer holds, or the write policy refuses it.
		*/
		async write(workspaceId, path, text, expected, signal) {
			const { target } = await this.prepare(workspaceId, path, signal);
			if (Buffer.byteLength(text, "utf8") > this.config.maxFileBytes) throw this.tooLarge(path);
			const intent = expected.kind === "createIfAbsent" ? { kind: "createIfAbsent" } : {
				kind: "replaceIfVersion",
				version: FsVersion(expected.version)
			};
			const policy = this.ctx.sandboxPolicy.resolve({ mode: this.config.writeMode });
			try {
				const outcome = await this.ctx.fs.writeText(target, text, intent, signal, policy);
				return {
					path: this.relative(path),
					absolutePath: this.ctx.fs.processPath(target),
					version: outcome.version,
					bytes: Buffer.byteLength(outcome.after, "utf8")
				};
			} catch (error) {
				throw await this.classifyWrite(path, target, error, signal);
			}
		}
		/** The Workspace's canonical directory; the registration is the only path authority. */
		workspaceRoot(workspaceId) {
			const workspace = this.ctx.workspaceRegistry.get(workspaceId);
			if (workspace === void 0) throw new RemoteError("workspace/not-found", `no workspace "${workspaceId}"`, { workspaceId });
			return workspace.path;
		}
		/** Resolve one path and refuse it unless the Workspace contains it. */
		async prepare(workspaceId, path, signal) {
			const root = this.workspaceRoot(workspaceId);
			const workspace = await this.ctx.fs.resolve(root, { signal });
			const target = await this.ctx.fs.resolve(requireRelativePath(path), {
				cwd: root,
				signal
			});
			if (!this.ctx.fs.contains(workspace, target)) throw new RemoteError("workspace-editor/outside-workspace", `"${path}" is outside the workspace`, { path });
			return { target };
		}
		/** Resolve one existing regular file, with the stat that names its version and size. */
		async locate(workspaceId, path, signal) {
			const { target } = await this.prepare(workspaceId, path, signal);
			const entry = await this.ctx.fs.lstat(path, { cwd: this.workspaceRoot(workspaceId) }, signal);
			if (entry === void 0) throw new RemoteError("workspace-editor/not-found", `no entry at "${path}"`, { path });
			if (entry.type !== "file") throw new RemoteError("workspace-editor/not-regular-file", `"${path}" is a ${entry.type}`, {
				path,
				kind: entry.type
			});
			const info = await this.ctx.fs.stat(target, signal);
			if (info === void 0) throw new RemoteError("workspace-editor/not-found", `no entry at "${path}"`, { path });
			if (info.type !== "file") throw new RemoteError("workspace-editor/not-regular-file", `"${path}" is a ${info.type}`, {
				path,
				kind: info.type
			});
			return {
				target,
				info
			};
		}
		statOf(target, info) {
			return {
				absolutePath: this.ctx.fs.processPath(target),
				version: info.version,
				bytes: info.size ?? 0
			};
		}
		/** The wire path: the caller's own spelling, normalized to `/`. */
		relative(path) {
			return path.replace(/\\/g, "/");
		}
		tooLarge(path) {
			return new RemoteError("workspace-editor/too-large", `"${path}" exceeds the ${this.config.maxFileBytes} byte document cap`, {
				path,
				limit: this.config.maxFileBytes
			});
		}
		/** Map a read failure onto the wire vocabulary. */
		classify(path, error) {
			if (errorCodeOf(error) === "FS_NOT_TEXT") return new RemoteError("workspace-editor/not-text", `"${path}" is not UTF-8 text`, { path }, { cause: error });
			return error;
		}
		/**
		* Map a write failure onto the wire vocabulary, reporting the version the file
		* holds now when the caller's expectation was what failed.
		*/
		async classifyWrite(path, target, error, signal) {
			const code = errorCodeOf(error);
			if (code === "FS_STALE_VERSION") {
				const current = await this.ctx.fs.stat(target, signal).catch(() => void 0);
				return new RemoteError("workspace-editor/stale", `"${path}" changed since it was read`, {
					path,
					...current === void 0 ? {} : { current: current.version }
				}, { cause: error });
			}
			if (code === "FS_NOT_OBSERVED") return new RemoteError("workspace-editor/not-observed", `"${path}" already exists`, { path }, { cause: error });
			if (code === "FS_TOO_LARGE") return this.tooLarge(path);
			if (code === "FS_NOT_TEXT") return new RemoteError("workspace-editor/not-text", `"${path}" is not UTF-8 text`, { path }, { cause: error });
			if (error instanceof FsError) return new RemoteError("workspace-editor/write-failed", `cannot write "${path}": ${error.message}`, {
				path,
				code: error.code
			}, { cause: error });
			return error;
		}
	};
})();
/**
* The filesystem error code an error carries, read structurally: the error class
* belongs to whichever `dsh-fs` instance the provider loaded, so no class
* identity is shared across the package boundary.
*/
function errorCodeOf(error) {
	return typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : void 0;
}
//#endregion
//#region ../session-manager-controller/lib/index.js
[...Object.values({
	httpProxy: ["http_proxy", "HTTP_PROXY"],
	httpsProxy: ["https_proxy", "HTTPS_PROXY"],
	noProxy: ["no_proxy", "NO_PROXY"]
}).flat()];
/** One IPv4 octet, so a loopback match cannot accept `127.999.1.1`. */
const OCTET = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)";
new RegExp(`^127\\.${OCTET}\\.${OCTET}\\.${OCTET}$`);
/** Executable lookup completed without finding an executable file. */
var SubprocessExecutableNotFoundError$1 = class extends Error {
	/**
	* @param message - provider-specific lookup diagnostic.
	* @param options - original provider failure, when available.
	*/
	constructor(message, options) {
		super(message, options);
		this.name = "SubprocessExecutableNotFoundError";
	}
};
/**
* One git command through the subprocess seam.
*
* Two capabilities run git here — the turn change recorder and the browser's
* repository panel — and both must run it the same way: never shell-interpreted,
* never waiting on a credential prompt, never reading the user's ambient git
* configuration, never taking an optional lock under the user, and always under
* a caller-owned deadline with bounded output. This package is that one home.
* It also parses the one porcelain form both callers read back: NUL-terminated
* `--numstat` records.
*
* A nonzero exit is data the caller classifies, so nothing here raises one; a
* command that times out, is aborted, or cannot spawn is an exception, and the
* caller owns the cause because the process outcome carries none.
*
* @module @deepseek-ai/dsh-git-command
*/
/** Milliseconds a terminated git range has to exit before it is killed. */
const TERMINATE_GRACE_MS = 2e3;
/** Bytes of one command's stderr kept as its diagnostic tail. */
const STDERR_TAIL_BYTES = 16 * 1024;
/**
* Git's non-interactive environment, layered under every command's own entries.
*
* `GIT_CONFIG_COUNT=0` makes ambient indexed configuration inert: the subprocess
* credential scrub already removes `GIT_CONFIG_KEY_n` (its name matches `KEY`),
* and this makes any survivor meaningless. `GIT_TERMINAL_PROMPT=0` keeps a child
* from waiting on a prompt nobody can answer. `GIT_OPTIONAL_LOCKS=0` stops git
* refreshing an index under the user. `LC_ALL=C` is the stable wording that
* callers classify "not a repository" by.
*/
const GIT_ENV = {
	GIT_CONFIG_COUNT: "0",
	GIT_TERMINAL_PROMPT: "0",
	GIT_OPTIONAL_LOCKS: "0",
	LC_ALL: "C"
};
/** Runs one resolved git executable with a deadline and bounded output. */
var GitRunner = class {
	subprocess;
	executable;
	limits;
	/**
	* @param subprocess - the process seam every command spawns through.
	* @param executable - resolved absolute git executable.
	* @param limits - deadline and output cap for one command.
	*/
	constructor(subprocess, executable, limits) {
		this.subprocess = subprocess;
		this.executable = executable;
		this.limits = limits;
	}
	/**
	* Run one git subcommand to settlement.
	* @param args - arguments after the executable; never shell-interpreted.
	* @param options - directory, cancellation, and per-command overrides.
	* @returns the exit facts and the retained stdout and stderr.
	* @throws Error when the deadline or the caller's signal ended the command, or when the spawn itself failed.
	*/
	async run(args, options) {
		const timeout = AbortSignal.timeout(this.limits.timeoutMs);
		const signal = AbortSignal.any([options.signal, timeout]);
		const handle = this.subprocess.spawn({
			argv: [this.executable, ...args],
			cwd: options.cwd,
			stdio: {
				stdin: options.stdin === void 0 ? "ignore" : { data: options.stdin },
				stdout: { maxBytes: options.maxBytes ?? this.limits.outputMaxBytes },
				stderr: { maxBytes: STDERR_TAIL_BYTES }
			},
			graceMs: TERMINATE_GRACE_MS,
			signal,
			env: {
				...GIT_ENV,
				...options.env
			}
		});
		const outcome = await handle.done;
		if (signal.aborted) {
			const cause = timeout.aborted ? `timed out after ${this.limits.timeoutMs}ms` : "was aborted";
			throw new Error(`git ${args.join(" ")} ${cause}`);
		}
		/* v8 ignore start -- collect-mode stdio always yields both readers. */
		const stdout = handle.collected.stdout?.readFrom(0) ?? {
			text: "",
			lossy: false
		};
		const stderr = handle.collected.stderr?.readFrom(0).text ?? "";
		/* v8 ignore stop */
		return {
			exitCode: outcome.exitCode,
			stdout: stdout.text,
			stderr,
			truncated: stdout.lossy
		};
	}
};
/**
* Resolve the git executable this host can run.
*
* On macOS the `/usr/bin/git` developer-tools stub opens an installer dialog
* instead of running, so it counts as absent until the tools are selected.
* @param subprocess - the process seam used to resolve and probe.
* @param signal - the caller's lifetime; cancels the lookup and the probe.
* @returns the executable path, or the reason none is usable.
* @throws Error when the lookup fails for a reason other than a missing executable.
*/
async function resolveGitExecutable(subprocess, signal) {
	const executable = await subprocess.resolveExecutable("git", void 0, signal).catch((error) => {
		if (error instanceof SubprocessExecutableNotFoundError$1) return void 0;
		throw error;
	});
	if (executable === void 0) return { reason: "missing" };
	if (process.platform !== "darwin" || executable !== "/usr/bin/git") return { executable };
	return (await subprocess.spawn({
		argv: ["/usr/bin/xcode-select", "-p"],
		cwd: homedir(),
		stdio: {
			stdin: "ignore",
			stdout: { maxBytes: 4096 },
			stderr: { maxBytes: 4096 }
		},
		graceMs: 1e3,
		signal
	}).done.catch(() => ({ exitCode: null }))).exitCode === 0 ? { executable } : { reason: "developer-tools" };
}
/**
* Session manager Remote owner: deletes one Session by moving its durable log
* directory into a trash folder, so the disk is reclaimed while the delete stays
* reversible for the retention window, and archives the Session in the same
* operation so its row leaves the default Sidebar list. The same namespace lists
* the trash and restores or purges one entry.
*
* The Session log itself stays append-only: this service never edits or
* truncates a log, it relocates a whole directory, and the trash sweep only
* removes directories the retention window has already expired.
*
* @module @deepseek-ai/dsh-api-session-manager-controller
*/
var __runInitializers$1 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$1 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/** The Harness home directory name under the operating-system home. */
const HOME_DIR_NAME = ".dsh";
/** Milliseconds in one day. */
const DAY_MS = 864e5;
/** Read the kind of each path from `git status --porcelain=v1 -z`. */
function parseGitStatus(output) {
	const files = {};
	const entries = output.split("\0");
	for (let index = 0; index < entries.length; index += 1) {
		const entry = entries[index];
		if (entry === void 0 || entry.length < 4) continue;
		const x = entry[0];
		const y = entry[1];
		if (x === "R" || x === "C" || y === "R" || y === "C") index += 1;
		files[entry.slice(3)] = x === "?" || x === "A" ? "added" : x === "D" || y === "D" ? "deleted" : x === "R" || y === "R" ? "renamed" : "modified";
	}
	return files;
}
/** Record each trashed directory carries, so a restore finds its way back. */
const MANIFEST_NAME = "session-manager.json";
/**
* Resolve the Harness home the same way the launcher does.
* @returns the normalized absolute Harness home path.
*/
function dshHome() {
	const configured = process.env.DSH_HOME;
	if (configured !== void 0 && configured.trim().length > 0) return resolve(configured);
	return join(homedir(), HOME_DIR_NAME);
}
/** Host Remote owner of the `sessionManager` namespace. */
let SessionManagerController = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _delete_decorators;
	let _listTrash_decorators;
	let _restoreTrash_decorators;
	let _purgeTrash_decorators;
	let _trash_decorators;
	let _sweepNow_decorators;
	let _gitStatus_decorators;
	return class SessionManagerController extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_delete_decorators = [Remote("delete")];
			_listTrash_decorators = [Remote("listTrash")];
			_restoreTrash_decorators = [Remote("restoreTrash")];
			_purgeTrash_decorators = [Remote("purgeTrash")];
			_trash_decorators = [Remote("trash")];
			_sweepNow_decorators = [Remote("sweep")];
			_gitStatus_decorators = [Remote("gitStatus")];
			__esDecorate$1(this, null, _delete_decorators, {
				kind: "method",
				name: "delete",
				static: false,
				private: false,
				access: {
					has: (obj) => "delete" in obj,
					get: (obj) => obj.delete
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _listTrash_decorators, {
				kind: "method",
				name: "listTrash",
				static: false,
				private: false,
				access: {
					has: (obj) => "listTrash" in obj,
					get: (obj) => obj.listTrash
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _restoreTrash_decorators, {
				kind: "method",
				name: "restoreTrash",
				static: false,
				private: false,
				access: {
					has: (obj) => "restoreTrash" in obj,
					get: (obj) => obj.restoreTrash
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _purgeTrash_decorators, {
				kind: "method",
				name: "purgeTrash",
				static: false,
				private: false,
				access: {
					has: (obj) => "purgeTrash" in obj,
					get: (obj) => obj.purgeTrash
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _trash_decorators, {
				kind: "method",
				name: "trash",
				static: false,
				private: false,
				access: {
					has: (obj) => "trash" in obj,
					get: (obj) => obj.trash
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _sweepNow_decorators, {
				kind: "method",
				name: "sweepNow",
				static: false,
				private: false,
				access: {
					has: (obj) => "sweepNow" in obj,
					get: (obj) => obj.sweepNow
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _gitStatus_decorators, {
				kind: "method",
				name: "gitStatus",
				static: false,
				private: false,
				access: {
					has: (obj) => "gitStatus" in obj,
					get: (obj) => obj.gitStatus
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		config = __runInitializers$1(this, _instanceExtraInitializers);
		static inject = ["workspaceRegistry", "subprocess"];
		static Config = Schema.object({
			sessionsRoot: Schema.string().default(""),
			trashDir: Schema.string().default(""),
			retentionDays: Schema.number().step(1).min(0).default(30),
			sweepMinutes: Schema.number().step(1).min(0).default(60)
		});
		sessionsRoot;
		trashDir;
		timer;
		/**
		* @param ctx - Host context carrying the Workspace registry the archive write goes through.
		* @param config - locations and retention window for the trash.
		*/
		constructor(ctx, config) {
			super(ctx, "sessionManager", { namespace: "sessionManager" });
			this.config = config;
			const home = dshHome();
			this.sessionsRoot = config.sessionsRoot === "" ? join(home, "sessions") : config.sessionsRoot;
			this.trashDir = config.trashDir === "" ? join(home, "trash", "sessions") : config.trashDir;
			this.sweep();
			if (config.sweepMinutes > 0) {
				this.timer = setInterval(() => {
					this.sweep();
				}, config.sweepMinutes * 6e4);
				this.timer.unref();
			} else this.timer = void 0;
		}
		/**
		* Move one Session's log directory to the trash and archive the Session, so its
		* row leaves the default list and its disk is reclaimed.
		* @param request - the Session to delete.
		* @returns whether a directory was moved, and where.
		*/
		async delete(request) {
			const sessionId = request.sessionId;
			const directory = await this.findSessionDir(request.sessionId);
			if (directory === void 0) return { trashed: false };
			const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/gu, "-");
			const target = join(this.trashDir, `${stamp}-${request.sessionId}`);
			await mkdir(this.trashDir, { recursive: true });
			await this.move(directory, target);
			const manifest = {
				sessionId: request.sessionId,
				source: directory,
				trashedAt: (/* @__PURE__ */ new Date()).toISOString(),
				...request.displayTitle === void 0 || request.displayTitle === "" ? {} : { title: request.displayTitle }
			};
			await writeFile(join(target, MANIFEST_NAME), `${JSON.stringify(manifest)}\n`, "utf8");
			await this.ctx.workspaceRegistry.archiveSession(sessionId, { stopActivity: true });
			return {
				trashed: true,
				trashPath: target
			};
		}
		/**
		* List what the trash currently holds, newest first.
		* @returns one entry per trashed directory.
		*/
		async listTrash() {
			return (await this.readTrash()).map((entry) => ({
				name: entry.name,
				sessionId: entry.manifest?.sessionId ?? sessionIdOf(entry.name),
				title: entry.manifest?.title ?? entry.manifest?.sessionId ?? sessionIdOf(entry.name),
				trashedAt: entry.manifest?.trashedAt ?? new Date(entry.mtimeMs).toISOString(),
				bytes: entry.bytes
			})).sort((left, right) => right.trashedAt.localeCompare(left.trashedAt));
		}
		/**
		* Move one trashed directory back to the Session directory it came from.
		* @param request - the trash entry to restore.
		* @returns whether a directory was moved back.
		*/
		async restoreTrash(request) {
			const path = join(this.trashDir, request.name);
			const manifest = await this.readManifest(path);
			if (manifest === void 0) return {
				restored: false,
				purged: false
			};
			await mkdir(dirname(manifest.source), { recursive: true });
			await rm(manifest.source, {
				recursive: true,
				force: true
			});
			await this.move(path, manifest.source);
			await this.ctx.workspaceRegistry.unarchiveSession(manifest.sessionId);
			return {
				restored: true,
				purged: false
			};
		}
		/**
		* Remove one trashed directory for good.
		* @param request - the trash entry to purge.
		* @returns whether a directory was removed.
		*/
		async purgeTrash(request) {
			const path = join(this.trashDir, request.name);
			try {
				await stat(path);
			} catch {
				return {
					restored: false,
					purged: false
				};
			}
			await rm(path, {
				recursive: true,
				force: true
			});
			return {
				restored: false,
				purged: true
			};
		}
		/**
		* Report the trash's occupancy and the window that keeps a delete reversible.
		* @returns the count, the bytes, and the retention window.
		*/
		async trash() {
			const entries = await this.readTrash();
			let bytes = 0;
			for (const entry of entries) bytes += entry.bytes;
			return {
				count: entries.length,
				bytes,
				retentionDays: this.config.retentionDays
			};
		}
		/**
		* Remove every trashed directory past the retention window.
		* @returns the number of directories purged.
		*/
		async sweepNow() {
			return this.sweep();
		}
		/**
		* Read the working tree's changed paths so the file tree can colour them.
		* @param request - absolute workspace directory whose repository is read.
		* @returns changed paths relative to the repository root, or unavailable when git cannot answer.
		*/
		async gitStatus(request) {
			const signal = AbortSignal.timeout(15e3);
			const resolution = await resolveGitExecutable(this.ctx.subprocess, signal);
			if (!("executable" in resolution)) return {
				available: false,
				files: {}
			};
			const result = await new GitRunner(this.ctx.subprocess, resolution.executable, {
				timeoutMs: 15e3,
				outputMaxBytes: 4 * 1024 * 1024
			}).run([
				"status",
				"--porcelain=v1",
				"-z",
				"--untracked-files=all"
			], {
				cwd: request.cwd,
				signal
			});
			if (result.exitCode !== 0) return {
				available: false,
				files: {}
			};
			return {
				available: true,
				files: parseGitStatus(result.stdout)
			};
		}
		/** Move a directory, falling back to copy-and-remove across filesystems. */
		async move(from, to) {
			try {
				await rename(from, to);
			} catch {
				await cp(from, to, {
					recursive: true,
					force: true
				});
				await rm(from, {
					recursive: true,
					force: true
				});
			}
		}
		/** Purge the trash entries whose retention window has expired. */
		async sweep() {
			const cutoff = Date.now() - this.config.retentionDays * DAY_MS;
			let purged = 0;
			for (const entry of await this.readTrash()) {
				const trashedAt = entry.manifest?.trashedAt;
				const stamp = trashedAt === void 0 ? entry.mtimeMs : Date.parse(trashedAt);
				if (!Number.isFinite(stamp) || stamp > cutoff) continue;
				await rm(entry.path, {
					recursive: true,
					force: true
				});
				purged += 1;
			}
			return purged;
		}
		/** Every directory currently in the trash, with the facts the sweep compares. */
		async readTrash() {
			let names;
			try {
				names = await readdir(this.trashDir);
			} catch {
				return [];
			}
			const entries = [];
			for (const name of names) {
				const path = join(this.trashDir, name);
				try {
					const info = await stat(path);
					if (!info.isDirectory()) continue;
					entries.push({
						name,
						path,
						bytes: await directoryBytes(path),
						mtimeMs: info.mtimeMs,
						manifest: await this.readManifest(path)
					});
				} catch {}
			}
			return entries;
		}
		/** One trash directory's manifest, when it carries a readable record. */
		async readManifest(path) {
			try {
				const raw = JSON.parse(await readFile(join(path, MANIFEST_NAME), "utf8"));
				if (typeof raw.sessionId !== "string" || typeof raw.source !== "string" || typeof raw.trashedAt !== "string") return void 0;
				return {
					sessionId: raw.sessionId,
					source: raw.source,
					trashedAt: raw.trashedAt,
					...typeof raw.title === "string" ? { title: raw.title } : {}
				};
			} catch {
				return;
			}
		}
		/**
		* Find one Session's on-disk directory by its id.
		* @param sessionId - the Session whose directory to locate.
		* @returns the absolute directory, or undefined when no project holds it.
		*/
		async findSessionDir(sessionId) {
			let projects;
			try {
				projects = await readdir(this.sessionsRoot);
			} catch {
				return;
			}
			for (const project of projects) {
				const candidate = join(this.sessionsRoot, project, sessionId);
				try {
					if ((await stat(candidate)).isDirectory()) return candidate;
				} catch {}
			}
		}
	};
})();
/** The Session id a trash directory name carries after its timestamp prefix. */
function sessionIdOf(name) {
	const marker = name.indexOf("session-");
	return marker === -1 ? name : name.slice(marker);
}
/** Total bytes of one directory tree, for the trash report. */
async function directoryBytes(root) {
	let total = 0;
	let entries;
	try {
		entries = await readdir(root, { withFileTypes: true });
	} catch {
		return 0;
	}
	for (const entry of entries) {
		const path = join(root, entry.name);
		if (entry.isDirectory()) {
			total += await directoryBytes(path);
			continue;
		}
		try {
			total += (await stat(path)).size;
		} catch {}
	}
	return total;
}
//#endregion
//#region ../../util/brand/src/index.ts
/**
* Apply a compile-time string brand without changing the value.
* @param value - string admitted by the domain that owns the target brand.
* @returns the same string with the requested compile-time brand.
*/
function brandString(value) {
	return value;
}
//#endregion
//#region ../../credentials/credentials/src/index.ts
const REF_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
/**
* Brand a raw string as a {@link CredentialRef}.
* @param value - candidate reference; a POSIX shell identifier such as `DEEPSEEK_API_KEY`.
* @returns the branded reference.
*/
function credentialRef(value) {
	if (!isCredentialRefName(value)) throw new TypeError(`credential ref "${value}" must match ${String(REF_PATTERN)}`);
	return brandString(value);
}
/**
* Whether a raw string could name a reference at all. Consumers that receive
* environment-variable names from somewhere else — a provider library's own
* ambient discovery, a hook payload — ask this before resolving, because a name
* outside the grammar has no reference to miss and should read as "not set"
* rather than as a thrown error.
* @param value - candidate reference.
* @returns true when {@link credentialRef} would accept it.
*/
function isCredentialRefName(value) {
	return REF_PATTERN.test(value);
}
//#endregion
//#region ../customizations-controller/lib/index.js
/**
* Customizations Remote owner: the Skills, MCP, and instruction-file inventory
* the Web Settings pane renders.
*
* The read projects state other owners already hold and invents none of its
* own: the skill registry's per-scope catalogs, the Loader rows whose module is
* the MCP client, the tools those rows registered, and the instruction files the
* agent-instructions plugin would load for this workspace. A skill catalog is
* scope-layered, so the read walks the composed agent presets and merges their
* catalogs by name; an MCP server's status derives from its row's enablement and
* fiber phase plus the `mcp__<server>__` tools actually present in the tool
* registry.
*
* Read-only: this service changes no configuration.
*
* @module @deepseek-ai/dsh-api-customizations-controller
*/
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __addDisposableResource = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/** The module specifier whose Loader rows are MCP servers. */
const MCP_CLIENT_MODULE = "@deepseek-ai/dsh-mcp-client";
/** Prefix one MCP server gives every tool it publishes. */
const MCP_TOOL_PREFIX = "mcp__";
/** The instruction file the harness home contributes, as `agent-instructions` reads it. */
const USER_INSTRUCTION_FILE = "AGENTS.md";
/** Runtime mirror: FiberState is a cross-package const enum. */
const FIBER_STATE = {
	PENDING: 0,
	LOADING: 1,
	ACTIVE: 2,
	FAILED: 3,
	DISPOSED: 4,
	UNLOADING: 5
};
/** Fiber phase as the wire spells it, with a disposed fiber reported as absent. */
const FIBER_PHASE = {
	[FIBER_STATE.PENDING]: "pending",
	[FIBER_STATE.LOADING]: "loading",
	[FIBER_STATE.ACTIVE]: "active",
	[FIBER_STATE.FAILED]: "failed",
	[FIBER_STATE.DISPOSED]: null,
	[FIBER_STATE.UNLOADING]: "unloading"
};
/** Fields the constructor re-checks, so a direct construction cannot bypass the schema. */
const POSITIVE_INTEGER_FIELDS = [
	"maxSkills",
	"maxMcpServers",
	"maxMcpTools",
	"maxRuleFiles",
	"maxRuleLevels",
	"bytesPerToken",
	"budgetTokens",
	"balanceTimeoutMs"
];
/** Whether a Loader config value is a plain object. */
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* Read the fields this inventory shows out of one MCP row's Loader config.
*
* The Loader stores an entry's config as the file spelled it, without applying
* the plugin's schema defaults, so this narrows the value instead of trusting a
* type: a row whose config names neither a stdio command nor an HTTP endpoint
* contributes no server to the pane.
* @param config - the Loader entry's configured value.
* @returns the server facts, or undefined when the config names no usable target.
*/
function readMcpRow(config) {
	if (!isRecord(config)) return void 0;
	const serverName = config.serverName;
	if (typeof serverName !== "string" || !/^[A-Za-z0-9_-]{1,32}$/u.test(serverName)) return void 0;
	if (config.transport === "stdio" && typeof config.command === "string") {
		const args = Array.isArray(config.args) ? config.args.filter((argument) => typeof argument === "string") : [];
		return {
			serverName,
			transport: "stdio",
			target: [config.command, ...args].join(" ")
		};
	}
	if (config.transport === "streamable-http" && typeof config.url === "string") return {
		serverName,
		transport: "streamable-http",
		target: config.url
	};
}
/** Fold one scope's skills into the merged catalog, keeping the first metadata seen. */
function collect(merged, skills, preset) {
	for (const summary of skills) {
		const existing = merged.get(summary.name);
		if (existing === void 0) {
			merged.set(summary.name, {
				summary,
				presets: preset === void 0 ? [] : [preset]
			});
			continue;
		}
		if (preset !== void 0 && !existing.presets.includes(preset)) existing.presets.push(preset);
	}
}
/** Project one merged catalog entry onto the wire. */
function skillView(skill) {
	const { summary } = skill;
	return {
		name: summary.name,
		description: summary.description,
		...summary.whenToUse === void 0 ? {} : { whenToUse: summary.whenToUse },
		...summary.path === void 0 ? {} : { path: summary.path },
		source: summary.source,
		provider: summary.provider,
		modelInvocable: summary.invocation.modelInvocable,
		userInvocable: summary.invocation.userInvocable,
		presets: skill.presets
	};
}
/** UTF-8 bytes one string occupies on the wire. */
function byteLength(text) {
	return new TextEncoder().encode(text).length;
}
/** Bytes one skill contributes to the catalog the model is offered. */
function catalogBytesOf(skill) {
	return byteLength(skill.name) + byteLength(skill.description) + byteLength(skill.whenToUse ?? "");
}
/** Host Remote owner of the `customizations` namespace. */
let CustomizationsController = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _addMcpServer_decorators;
	let _removeMcpServer_decorators;
	let _setManagedMcpServerEnabled_decorators;
	let _balance_decorators;
	let _snapshot_decorators;
	return class CustomizationsController extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_addMcpServer_decorators = [Remote("addMcpServer")];
			_removeMcpServer_decorators = [Remote("removeMcpServer")];
			_setManagedMcpServerEnabled_decorators = [Remote("setManagedMcpServerEnabled")];
			_balance_decorators = [Remote("balance")];
			_snapshot_decorators = [Remote("snapshot")];
			__esDecorate(this, null, _addMcpServer_decorators, {
				kind: "method",
				name: "addMcpServer",
				static: false,
				private: false,
				access: {
					has: (obj) => "addMcpServer" in obj,
					get: (obj) => obj.addMcpServer
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _removeMcpServer_decorators, {
				kind: "method",
				name: "removeMcpServer",
				static: false,
				private: false,
				access: {
					has: (obj) => "removeMcpServer" in obj,
					get: (obj) => obj.removeMcpServer
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _setManagedMcpServerEnabled_decorators, {
				kind: "method",
				name: "setManagedMcpServerEnabled",
				static: false,
				private: false,
				access: {
					has: (obj) => "setManagedMcpServerEnabled" in obj,
					get: (obj) => obj.setManagedMcpServerEnabled
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _balance_decorators, {
				kind: "method",
				name: "balance",
				static: false,
				private: false,
				access: {
					has: (obj) => "balance" in obj,
					get: (obj) => obj.balance
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _snapshot_decorators, {
				kind: "method",
				name: "snapshot",
				static: false,
				private: false,
				access: {
					has: (obj) => "snapshot" in obj,
					get: (obj) => obj.snapshot
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		config = __runInitializers(this, _instanceExtraInitializers);
		static inject = ["loader", "tools"];
		static Config = Schema.object({
			maxSkills: Schema.number().step(1).min(1).default(500),
			maxMcpServers: Schema.number().step(1).min(1).default(100),
			maxMcpTools: Schema.number().step(1).min(1).default(200),
			maxRuleFiles: Schema.number().step(1).min(1).default(64),
			maxRuleLevels: Schema.number().step(1).min(1).default(64),
			bytesPerToken: Schema.number().step(1).min(1).default(4),
			budgetTokens: Schema.number().step(1).min(1).default(65536),
			projectMarker: Schema.string().default(".git"),
			instructionFileCandidates: Schema.array(String).default(["AGENTS.md", "CLAUDE.md"]),
			localInstructionFileCandidates: Schema.array(String).default(["AGENTS.local.md", "CLAUDE.local.md"]),
			instructionDirectories: Schema.array(String).default([".agents/rules"]),
			mcpServersFile: Schema.string().default(""),
			projectMcpFile: Schema.string().default(""),
			apiKeyEnv: Schema.string().default("DEEPSEEK_API_KEY"),
			balanceUrl: Schema.string().default("https://api.deepseek.com/user/balance"),
			balanceTimeoutMs: Schema.number().step(1).min(1).default(1e4)
		});
		/** Loader row id per managed record, for the rows this plugin mounted itself. */
		mounted = /* @__PURE__ */ new Map();
		/** Whether the panel-managed list has been read and mounted once. */
		synced = false;
		/** Workspace directory whose project rows are mounted, when discovery is enabled. */
		projectRoot;
		/** Project-declared rows this plugin mounted, by server name, with the config they were mounted from. */
		projectRows = /* @__PURE__ */ new Map();
		/**
		* @param ctx - Host context carrying the Loader and the tool registry.
		* @param config - deployment bounds and estimates for one snapshot.
		*/
		constructor(ctx, config) {
			super(ctx, "customizations", { namespace: "customizations" });
			this.config = config;
			for (const field of POSITIVE_INTEGER_FIELDS) {
				const value = config[field];
				if (!Number.isSafeInteger(value) || value < 1) throw new Error(`customizations-controller requires a positive integer ${field}`);
			}
			ctx.effect(() => () => this.releaseProjectRows(() => true), "customizations-controller: project MCP rows");
		}
		/**
		* Add one panel-managed MCP server and mount its row immediately.
		* @param server - the record to store and mount.
		* @returns nothing; the caller re-reads the snapshot.
		* @throws RemoteError when the record is invalid or cannot be written.
		*/
		async addMcpServer(server) {
			const record = validateManagedServer(server);
			const servers = await this.readStore();
			if (servers.some((existing) => existing.id === record.id)) throw new RemoteError("customizations/duplicate-id", `a managed server "${record.id}" exists`, { id: record.id });
			if (servers.some((existing) => existing.serverName === record.serverName)) throw new RemoteError("customizations/duplicate-name", `serverName "${record.serverName}" is taken`, { serverName: record.serverName });
			await this.writeStore([...servers, record]);
			if (record.enabled) await this.mount(record);
		}
		/**
		* Remove one panel-managed MCP server and unmount its row.
		* @param id - managed record id.
		* @returns nothing; a missing record is already in the asked-for state.
		* @throws RemoteError when the store cannot be written.
		*/
		async removeMcpServer(id) {
			const servers = await this.readStore();
			await this.writeStore(servers.filter((server) => server.id !== id));
			await this.unmount(id);
		}
		/**
		* Enable or disable one panel-managed MCP server without touching the profile.
		* @param id - managed record id.
		* @param enabled - whether the panel should mount the row.
		* @returns nothing; the caller re-reads the snapshot.
		* @throws RemoteError when the record is unknown or the store cannot be written.
		*/
		async setManagedMcpServerEnabled(id, enabled) {
			const servers = await this.readStore();
			const found = servers.find((server) => server.id === id);
			if (found === void 0) throw new RemoteError("customizations/unknown-server", `no managed server "${id}"`, { id });
			await this.writeStore(servers.map((server) => server.id === id ? {
				...server,
				enabled
			} : server));
			if (enabled) await this.mount({
				...found,
				enabled
			});
			else await this.unmount(id);
		}
		/**
		* Read the DeepSeek platform balance for this deployment's API key.
		*
		* A deployment without a stored key answers `no-key`; a refused or unreachable
		* request answers `failed`. Neither is an error: the pane reports what it knows.
		* @returns the wallet figures, or the state that explains their absence.
		*/
		async balance() {
			const key = await this.apiKey();
			if (key === void 0) return { state: "no-key" };
			try {
				const response = await fetch(this.config.balanceUrl, {
					headers: {
						accept: "application/json",
						authorization: `Bearer ${key}`
					},
					signal: AbortSignal.timeout(this.config.balanceTimeoutMs)
				});
				if (!response.ok) return { state: "failed" };
				return readBalance(await response.json());
			} catch {
				return { state: "failed" };
			}
		}
		/** The DeepSeek API key this deployment authenticates with, from credentials first. */
		async apiKey() {
			const credentials = this.ctx.get("credentials");
			if (credentials !== void 0) try {
				const resolved = await credentials.resolve(credentialRef(this.config.apiKeyEnv));
				if (resolved !== void 0 && resolved.value !== "") return resolved.value;
			} catch {}
			const ambient = process.env[this.config.apiKeyEnv];
			return ambient === void 0 || ambient === "" ? void 0 : ambient;
		}
		/**
		* Read every Skill, MCP server, and instruction file one Session's workspace holds.
		*
		* The read owns no Session, so it projects the workspace directory of the
		* Session identity a caller names: skills merge across the composed presets and
		* the global layer read under that directory, MCP rows come from the Loader
		* wherever they were declared, and instruction files are probed from that
		* Session's directory. Without a named Session — or for one whose header
		* records no directory — the read falls back to the first registered Workspace.
		* @param sessionId - Session whose workspace the project-scoped read follows.
		* @returns the merged catalog, the MCP rows, the instruction chain, and the estimate.
		*/
		async snapshot(sessionId) {
			const cwd = await this.workspaceCwd(sessionId);
			await this.syncStore();
			await this.syncProject(cwd);
			const skills = await this.readSkills(cwd);
			const rules = await this.readRules(cwd);
			const instructionBytes = rules.rules.reduce((total, rule) => total + rule.bytes, 0);
			const catalogBytes = skills.skills.reduce((total, skill) => total + catalogBytesOf(skill), 0);
			const usage = {
				instructionBytes,
				catalogBytes,
				estimatedTokens: Math.ceil((instructionBytes + catalogBytes) / this.config.bytesPerToken),
				budgetTokens: this.config.budgetTokens
			};
			return {
				...skills,
				...rules,
				usage,
				mcpServers: this.readMcpServers()
			};
		}
		/** Merge the global skill layer with every composed preset's catalog. */
		async readSkills(cwd) {
			const registry = this.ctx.get("skills");
			if (registry === void 0) return {
				skillsAvailable: false,
				presets: [],
				skills: [],
				skillsTruncated: false
			};
			const lookup = cwd === void 0 ? {} : { cwd };
			const merged = /* @__PURE__ */ new Map();
			try {
				collect(merged, await registry.list(lookup), void 0);
			} catch (error) {
				this.ctx.logger.warn(`customizations: global skill catalog unavailable: ${String(error)}`);
			}
			const presets = [];
			const roster = this.ctx.get("agentPresets");
			if (roster !== void 0) for (const preset of await roster.compositionInventory()) {
				presets.push(preset.id);
				try {
					const env_1 = {
						stack: [],
						error: void 0,
						hasError: false
					};
					try {
						const lease = __addDisposableResource(env_1, await roster.acquireScope(preset.id), true);
						collect(merged, await registry.list({
							scope: lease.key,
							...lookup
						}), preset.id);
					} catch (e_1) {
						env_1.error = e_1;
						env_1.hasError = true;
					} finally {
						const result_1 = __disposeResources(env_1);
						if (result_1) await result_1;
					}
				} catch (error) {
					this.ctx.logger.warn(`customizations: preset "${preset.id}" skill catalog unavailable: ${String(error)}`);
				}
			}
			const all = [...merged.values()].sort((left, right) => left.summary.name.localeCompare(right.summary.name));
			return {
				skillsAvailable: true,
				presets,
				skills: all.slice(0, this.config.maxSkills).map(skillView),
				skillsTruncated: all.length > this.config.maxSkills
			};
		}
		/** Read every MCP Loader row and the tools each one currently publishes. */
		readMcpServers() {
			const tools = this.ctx.tools.schemas();
			const manageable = this.ctx.get("pluginManager") !== void 0;
			const servers = [];
			for (const entry of this.ctx.loader.entries()) {
				if (entry.options.name !== MCP_CLIENT_MODULE) continue;
				const facts = readMcpRow(entry.options.config);
				if (facts === void 0) continue;
				const managedId = this.managedIdOf(entry.id);
				const projectName = this.projectNameOf(entry.id);
				servers.push({
					entryId: entry.id,
					serverName: facts.serverName,
					transport: facts.transport,
					target: facts.target,
					enabled: !entry.disabled,
					fiberPhase: entry.fiber === void 0 ? null : FIBER_PHASE[entry.fiber.state],
					tools: this.toolsOf(tools, facts.serverName),
					manageable,
					origin: managedId !== void 0 ? "panel" : projectName !== void 0 ? "project" : "profile",
					...managedId === void 0 ? {} : { managedId }
				});
				if (servers.length >= this.config.maxMcpServers) break;
			}
			return servers;
		}
		/** Read the tools registered under one server's namespace. */
		toolsOf(schemas, serverName) {
			const prefix = `${MCP_TOOL_PREFIX}${serverName}__`;
			return schemas.filter((schema) => schema.name.startsWith(prefix)).slice(0, this.config.maxMcpTools).map((schema) => ({
				name: schema.name.slice(prefix.length),
				description: schema.description
			}));
		}
		/**
		* Probe the instruction chain this workspace's agents load: the harness home's
		* own file first, then every existing candidate from the project root down to
		* the workspace directory, and every Markdown file the configured instruction
		* directories hold there.
		*
		* File discovery belongs to `agent-instructions`; this read mirrors its
		* candidate names, instruction directories, and root marker, which the
		* deployment configures here in the same terms, so the pane reports the files
		* that plugin would load.
		*/
		async readRules(cwd) {
			const fs = this.ctx.get("fs");
			if (fs === void 0 || cwd === void 0) return {
				rules: [],
				rulesTruncated: false
			};
			const files = [];
			const home = this.ctx.get("dshHomePath");
			if (home !== void 0) {
				const path = join(home(), USER_INSTRUCTION_FILE);
				const bytes = await readInstructionBytes(fs, path);
				if (bytes !== void 0) files.push({
					name: USER_INSTRUCTION_FILE,
					path,
					scope: "user",
					bytes
				});
			}
			const root = await projectRoot(fs, cwd, this.config);
			for (const directory of ancestors(root, cwd)) {
				const names = [
					...this.config.instructionFileCandidates,
					...this.config.localInstructionFileCandidates,
					...await directoryRuleFiles(fs, directory, this.config.instructionDirectories)
				];
				for (const name of names) {
					const path = join(directory, name);
					const bytes = await readInstructionBytes(fs, path);
					if (bytes !== void 0) files.push({
						name,
						path,
						scope: "project",
						bytes
					});
				}
			}
			return {
				rules: files.slice(0, this.config.maxRuleFiles),
				rulesTruncated: files.length > this.config.maxRuleFiles
			};
		}
		/** The managed record behind one Loader row, when this plugin mounted it. */
		managedIdOf(entryId) {
			for (const [id, mounted] of this.mounted) if (mounted === entryId) return id;
		}
		/** The project server name behind one Loader row, when the workspace declared it. */
		projectNameOf(entryId) {
			for (const [serverName, mounted] of this.projectRows) if (mounted.entryId === entryId) return serverName;
		}
		/**
		* Mount the rows the Session's workspace declares, and release the ones it does not.
		*
		* Discovery is opt-in: `projectMcpFile` names a workspace-relative file and an
		* empty setting mounts nothing. Because the file comes from the workspace and
		* every row it declares spawns a process, this plugin reads it only for the
		* directory the read already resolved, and rows the profile or the panel
		* already declare under the same server name win. A stdio row that names no
		* working directory runs in the workspace that declares it.
		* @param cwd - the workspace directory the read resolved, when it has one.
		*/
		async syncProject(cwd) {
			if (cwd === void 0 || this.config.projectMcpFile === "") {
				await this.releaseProjectRows(() => true);
				this.projectRoot = void 0;
				return;
			}
			if (this.projectRoot !== cwd) {
				await this.releaseProjectRows(() => true);
				this.projectRoot = cwd;
			}
			const taken = this.takenServerNames();
			const declared = (await this.readShared(resolve(cwd, this.config.projectMcpFile), this.ctx.get("fs"))).filter((server) => !taken.has(server.serverName));
			const names = new Set(declared.map((server) => server.serverName));
			await this.releaseProjectRows((serverName) => !names.has(serverName));
			for (const server of declared) {
				const resolved = server.transport === "stdio" && server.cwd === void 0 ? {
					...server,
					cwd
				} : server;
				const config = JSON.stringify(mcpConfigOf(resolved));
				const mounted = this.projectRows.get(resolved.serverName);
				if (mounted?.config === config) continue;
				if (mounted !== void 0) await this.disposeRow(mounted.entryId);
				const entryId = await this.ctx.loader.create({
					name: MCP_CLIENT_MODULE,
					config: mcpConfigOf(resolved)
				});
				this.projectRows.set(resolved.serverName, {
					entryId,
					config
				});
				await this.ctx.loader.resolve(entryId).fiber?.await();
			}
		}
		/** Server names the profile and the panel already declare, which the workspace file may not duplicate. */
		takenServerNames() {
			const names = /* @__PURE__ */ new Set();
			for (const entry of this.ctx.loader.entries()) {
				if (entry.options.name !== MCP_CLIENT_MODULE) continue;
				if (this.projectNameOf(entry.id) !== void 0) continue;
				const facts = readMcpRow(entry.options.config);
				if (facts !== void 0) names.add(facts.serverName);
			}
			return names;
		}
		/** Dispose every project row the selector names, in mount order. */
		async releaseProjectRows(select) {
			for (const [serverName, mounted] of [...this.projectRows]) {
				if (!select(serverName)) continue;
				this.projectRows.delete(serverName);
				await this.disposeRow(mounted.entryId);
			}
		}
		/** Dispose one Loader row this plugin created. */
		async disposeRow(entryId) {
			const entry = this.ctx.loader.store[entryId];
			if (entry === void 0) return;
			const disposal = entry.fiber?.dispose();
			this.ctx.loader.remove(entryId);
			await disposal;
		}
		/** Read and mount the managed list once per lifetime. */
		async syncStore() {
			if (this.synced) return;
			this.synced = true;
			for (const server of await this.readStore()) if (server.enabled) await this.mount(server);
		}
		/** Create the Loader row for one managed server, replacing any row it already owns. */
		async mount(server) {
			await this.unmount(server.id);
			const id = await this.ctx.loader.create({
				name: MCP_CLIENT_MODULE,
				config: mcpConfigOf(server)
			});
			this.mounted.set(server.id, id);
			await this.ctx.loader.resolve(id).fiber?.await();
		}
		/** Dispose the Loader row one managed server owns, when it has one. */
		async unmount(recordId) {
			const id = this.mounted.get(recordId);
			if (id === void 0) return;
			this.mounted.delete(recordId);
			await this.disposeRow(id);
		}
		/** The managed-server store path, or undefined when the deployment has no harness home. */
		storePath() {
			if (this.config.mcpServersFile !== "") return this.config.mcpServersFile;
			const home = this.ctx.get("dshHomePath");
			return home === void 0 ? void 0 : join(home(), "mcp.json");
		}
		/** Read the `mcpServers` map; an absent or unreadable file reads as empty. */
		readStore() {
			return this.readShared(this.storePath());
		}
		/**
		* Read one shared `mcpServers` file; an absent, unreadable, or foreign file reads as empty.
		* @param path - absolute file path, or undefined when the deployment has no such file.
		* @param fs - workspace filesystem provider, which owns a file inside a Session's workspace.
		*/
		async readShared(path, fs) {
			if (path === void 0) return [];
			try {
				let text;
				if (fs === void 0) text = await readFile(path, "utf8");
				else text = await fs.readText(await fs.resolve(path));
				const parsed = JSON.parse(text);
				if (!isRecord(parsed) || !isRecord(parsed.mcpServers)) return [];
				return Object.entries(parsed.mcpServers).flatMap(([name, entry]) => {
					const server = readSharedServer(name, entry);
					return server === void 0 ? [] : [server];
				});
			} catch {
				return [];
			}
		}
		/** Replace the `mcpServers` map atomically and privately, in the shared file format. */
		async writeStore(servers) {
			const path = this.storePath();
			if (path === void 0) throw new RemoteError("customizations/no-store", "this deployment has no harness home to store MCP servers in", {});
			const mcpServers = {};
			for (const server of servers) mcpServers[server.serverName] = sharedServerOf(server);
			await mkdir(dirname(path), { recursive: true });
			await writeFile(path, `${JSON.stringify({ mcpServers }, null, 2)}\n`, { mode: 384 });
		}
		/**
		* The workspace directory the project-scoped part of the read follows: the
		* named Session's own recorded directory, else the first registered Workspace.
		*
		* A Session header is the authoritative record of the directory its Agent runs
		* in, so the pane reports the same files that Session loads. A live Agent
		* answers from its header; a Session that is only stored is read through
		* `sessionPersistence`, whose `stat` does not load the event body.
		* @param sessionId - Session the caller is showing, when it named one.
		* @returns the directory to discover project skills and instruction files under.
		*/
		async workspaceCwd(sessionId) {
			if (sessionId !== void 0) {
				const live = this.ctx.get("sessions")?.get(sessionId)?.header.cwd;
				const stored = live === void 0 ? (await this.ctx.get("sessionPersistence")?.stat(sessionId))?.header.cwd : void 0;
				const recorded = live ?? stored;
				if (recorded !== void 0) return recorded;
			}
			return this.ctx.get("workspaceRegistry")?.list()[0]?.path;
		}
	};
})();
/**
* Read one instruction file's UTF-8 byte count, or undefined when it is absent or unreadable.
* @param fs - the host filesystem the probe runs through.
* @param path - absolute candidate path.
* @returns the byte count, or undefined when the path holds no readable file.
*/
async function readInstructionBytes(fs, path) {
	try {
		return byteLength(await fs.readText(await fs.resolve(path)));
	} catch {
		return;
	}
}
/**
* Every Markdown file the configured instruction directories hold under one directory.
*
* The names are directory-relative candidates in file-name order, matching what
* `agent-instructions` loads from the same directories. An absent or unreadable
* directory contributes nothing rather than failing the chain.
* @param fs - the host filesystem the listing runs through.
* @param directory - absolute ancestor directory being walked.
* @param instructionDirectories - configured same-directory instruction directories.
* @returns joinable relative paths, ordered by file name.
*/
async function directoryRuleFiles(fs, directory, instructionDirectories) {
	const names = [];
	for (const instructionDirectory of instructionDirectories) {
		let entries;
		try {
			entries = await fs.listDir(await fs.resolve(join(directory, instructionDirectory)));
		} catch {
			continue;
		}
		for (const entry of entries) if (entry.type === "file" && entry.name.endsWith(".md") && !entry.name.startsWith(".")) names.push(join(instructionDirectory, entry.name));
	}
	return names.sort();
}
/**
* Walk upward to the nearest directory carrying the project marker.
* @param fs - the host filesystem the probe runs through.
* @param cwd - the workspace directory the walk starts at.
* @param config - the marker name and the ancestor bound.
* @returns the marked ancestor, or the workspace directory when no probe finds one.
*/
async function projectRoot(fs, cwd, config) {
	let directory = cwd;
	for (let level = 0; level < config.maxRuleLevels; level += 1) {
		const parent = dirname(directory);
		/* v8 ignore next -- root is always an ancestor of cwd: projectRoot only walks upward */
		if (parent === directory) break;
		directory = parent;
		try {
			if (await fs.stat(await fs.resolve(join(directory, config.projectMarker))) !== void 0) return directory;
		} catch {}
	}
	return cwd;
}
/** Read the platform's wallet answer, or the state that explains an unreadable one. */
function readBalance(value) {
	if (!isRecord(value) || !Array.isArray(value.balance_infos)) return { state: "failed" };
	const first = value.balance_infos[0];
	if (!isRecord(first) || typeof first.currency !== "string" || typeof first.total_balance !== "string") return { state: "failed" };
	return {
		state: "ready",
		currency: first.currency,
		total: first.total_balance,
		...typeof first.granted_balance === "string" ? { granted: first.granted_balance } : {},
		...typeof first.topped_up_balance === "string" ? { toppedUp: first.topped_up_balance } : {}
	};
}
/** One string list, or undefined when the value is not a list of strings. */
function stringList(value) {
	if (!Array.isArray(value)) return void 0;
	return value.every((item) => typeof item === "string") ? [...value] : void 0;
}
/** One string record, or undefined when the value is not a record of strings. */
function stringRecord(value) {
	if (!isRecord(value)) return void 0;
	const entries = Object.entries(value);
	if (!entries.every(([, item]) => typeof item === "string")) return void 0;
	return Object.fromEntries(entries);
}
/**
* Read one `mcpServers` entry in the shared file format.
*
* The format is the one Claude, Cursor, and Antigravity write: a map keyed by
* server name, `command`/`args`/`env` for a local process and `url`/`headers`
* for an HTTP endpoint, with an optional `disabled` flag. The key becomes the
* server's tool namespace.
* @param name - the map key.
* @param entry - the parsed entry value.
* @returns the managed record, or undefined when the entry names no usable target.
*/
function readSharedServer(name, entry) {
	if (!isRecord(entry) || !/^[A-Za-z0-9_-]{1,32}$/u.test(name)) return void 0;
	const enabled = entry.disabled !== true;
	const args = stringList(entry.args);
	const env = stringRecord(entry.env);
	const headers = stringRecord(entry.headers);
	const cwd = typeof entry.cwd === "string" ? entry.cwd : void 0;
	if (entry.transport !== "streamable-http" && typeof entry.command === "string" && entry.command !== "") return {
		id: name,
		serverName: name,
		transport: "stdio",
		command: entry.command,
		...args === void 0 ? {} : { args },
		...env === void 0 ? {} : { env },
		...cwd === void 0 ? {} : { cwd },
		enabled
	};
	if (typeof entry.url === "string" && entry.url !== "") return {
		id: name,
		serverName: name,
		transport: "streamable-http",
		url: entry.url,
		...headers === void 0 ? {} : { headers },
		enabled
	};
}
/** Project one managed record back onto the shared file format. */
function sharedServerOf(server) {
	const disabled = !server.enabled;
	if (server.transport === "stdio") return {
		disabled,
		/* v8 ignore next -- a stdio record always carries the command its transport requires */
		command: server.command ?? "",
		args: [...server.args ?? []],
		...server.env === void 0 ? {} : { env: { ...server.env } },
		...server.cwd === void 0 || server.cwd === "" ? {} : { cwd: server.cwd }
	};
	return {
		disabled,
		transport: "streamable-http",
		/* v8 ignore next -- an HTTP record always carries the URL its transport requires */
		url: server.url ?? "",
		...server.headers === void 0 ? {} : { headers: { ...server.headers } }
	};
}
/**
* Reject a record the Loader could not mount, before it reaches the store.
* @param server - the record a caller asked to add.
* @returns the same record once it names a usable transport.
* @throws RemoteError when the id, name, or target is missing or malformed.
*/
function validateManagedServer(server) {
	if (typeof server.id !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/u.test(server.id)) throw new RemoteError("customizations/bad-request", "id must start with a letter or digit and use [A-Za-z0-9_-]", {});
	if (!/^[A-Za-z0-9_-]{1,32}$/u.test(server.serverName)) throw new RemoteError("customizations/bad-request", "serverName must match [A-Za-z0-9_-]{1,32}", {});
	if (server.transport === "stdio" && (typeof server.command !== "string" || server.command === "")) throw new RemoteError("customizations/bad-request", "a stdio server needs a command", {});
	if (server.transport === "streamable-http" && (typeof server.url !== "string" || server.url === "")) throw new RemoteError("customizations/bad-request", "an http server needs a url", {});
	return server;
}
/** Project one managed record onto the MCP client's own config fields. */
function mcpConfigOf(server) {
	if (server.transport === "stdio") return {
		transport: "stdio",
		serverName: server.serverName,
		/* v8 ignore next -- a stdio record always carries the command its transport requires */
		command: server.command ?? "",
		args: [...server.args ?? []],
		...server.env === void 0 ? {} : { env: { ...server.env } },
		...server.cwd === void 0 || server.cwd === "" ? {} : { cwd: server.cwd }
	};
	return {
		transport: "streamable-http",
		serverName: server.serverName,
		/* v8 ignore next -- an HTTP record always carries the URL its transport requires */
		url: server.url ?? "",
		headers: { ...server.headers ?? {} }
	};
}
/** Every directory from one broad root down to a specific directory, inclusive. */
function ancestors(root, cwd) {
	if (root === cwd) return [cwd];
	const chain = [];
	let directory = cwd;
	while (directory !== root) {
		chain.unshift(directory);
		const parent = dirname(directory);
		/* v8 ignore next -- root is always an ancestor of cwd: projectRoot only walks upward */
		if (parent === directory) break;
		directory = parent;
	}
	/* v8 ignore next -- the walk stops at root, so the chain never starts there */
	if (chain[0] !== root) chain.unshift(root);
	return chain;
}
//#endregion
//#region host.entry.mjs
/**
* The workbench host: one plugin that starts every IDE service.
*
* The four controllers are imported from their built node halves, which are
* already decorator-transformed, and composed on one fiber.
*/
const inject = [...new Set([
	...GitController.inject,
	...WorkspaceEditor.inject,
	...SessionManagerController.inject,
	...CustomizationsController.inject
])];
function apply(ctx) {
	ctx.plugin(GitController, GitController.Config({}));
	ctx.plugin(WorkspaceEditor, WorkspaceEditor.Config({}));
	ctx.plugin(SessionManagerController, SessionManagerController.Config({}));
	ctx.plugin(CustomizationsController, CustomizationsController.Config({ projectMcpFile: ".agents/mcp.json" }));
}
//#endregion
export { apply, inject };
