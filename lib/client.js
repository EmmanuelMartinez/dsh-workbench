window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-workbench",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
				throw new Error("cached value already set");
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) Object.assign(mergedDescriptors, Object.getOwnPropertyDescriptors(def));
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const _undefined$2 = /^undefined$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUndefined = /*@__PURE__*/ $constructor("$ZodUndefined", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = _undefined$2;
			inst._zod.values = new Set([void 0]);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (typeof input === "undefined") return payload;
				payload.issues.push({
					expected: "undefined",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodVoid = /*@__PURE__*/ $constructor("$ZodVoid", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (typeof input === "undefined") return payload;
				payload.issues.push({
					expected: "void",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!isPlainObject(input)) {
					payload.issues.push({
						expected: "record",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				const proms = [];
				const values = def.keyType._zod.values;
				if (values) {
					payload.value = {};
					const recordKeys = /* @__PURE__ */ new Set();
					for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
						recordKeys.add(typeof key === "number" ? key.toString() : key);
						const keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (keyResult.issues.length) {
							payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const outKey = keyResult.value;
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}
					}
					let unrecognized;
					for (const key in input) if (!recordKeys.has(key)) {
						unrecognized = unrecognized ?? [];
						unrecognized.push(key);
					}
					if (unrecognized && unrecognized.length > 0) payload.issues.push({
						code: "unrecognized_keys",
						input,
						inst,
						keys: unrecognized
					});
				} else {
					payload.value = {};
					for (const key of Reflect.ownKeys(input)) {
						if (key === "__proto__") continue;
						if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
						let keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
							const retryResult = def.keyType._zod.run({
								value: Number(key),
								issues: []
							}, ctx);
							if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (retryResult.issues.length === 0) keyResult = retryResult;
						}
						if (keyResult.issues.length) {
							if (def.mode === "loose") payload.value[key] = input[key];
							else payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}
					}
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
			const values = new Set(def.values);
			inst._zod.values = values;
			inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _undefined$1(Class, params) {
			return new Class({
				type: "undefined",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _void$1(Class, params) {
			return new Class({
				type: "void",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const undefinedProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
		};
		const voidProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, _params) => {
			const def = schema._zod.def;
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
			else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const recordProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			const keyType = def.keyType;
			const patterns = keyType._zod.bag?.patterns;
			if (def.mode === "loose" && patterns && patterns.size > 0) {
				const valueSchema = process(def.valueType, ctx, {
					...params,
					path: [
						...params.path,
						"patternProperties",
						"*"
					]
				});
				json.patternProperties = {};
				for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
			} else {
				if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
					...params,
					path: [...params.path, "propertyNames"]
				});
				json.additionalProperties = process(def.valueType, ctx, {
					...params,
					path: [...params.path, "additionalProperties"]
				});
			}
			const keyValues = keyType._zod.values;
			if (keyValues) {
				const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
				if (validKeyValues.length > 0) json.required = validKeyValues;
			}
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUndefined = /*@__PURE__*/ $constructor("ZodUndefined", (inst, def) => {
			$ZodUndefined.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
		});
		function _undefined(params) {
			return /* @__PURE__ */ _undefined$1(ZodUndefined, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodVoid = /*@__PURE__*/ $constructor("ZodVoid", (inst, def) => {
			$ZodVoid.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
		});
		function _void(params) {
			return /* @__PURE__ */ _void$1(ZodVoid, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			return new ZodObject({
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			});
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
			$ZodRecord.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
			inst.keyType = def.keyType;
			inst.valueType = def.valueType;
		});
		function record(keyType, valueType, params) {
			if (!valueType || !valueType._zod) return new ZodRecord({
				type: "record",
				keyType: string(),
				valueType: keyType,
				...normalizeParams(valueType)
			});
			return new ZodRecord({
				type: "record",
				keyType,
				valueType,
				...normalizeParams(params)
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			return new ZodEnum({
				type: "enum",
				entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region ../../api/git-controller/lib/typert.remote-client.js
		let _deepseek_ai_dsh_api_git_controller_git_commit_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_commit_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_commit_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_commit_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_commit_parameter_1$schema = () => _deepseek_ai_dsh_api_git_controller_git_commit_parameter_1$schema$value ??= string();
		let _deepseek_ai_dsh_api_git_controller_git_commit_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_commit_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_commit_result$schema$value ??= object({
			"body": string().readonly(),
			"files": array(object({
				"path": string().readonly(),
				"from": string().readonly().optional(),
				"kind": union([
					literal("modified"),
					literal("added"),
					literal("deleted"),
					literal("renamed"),
					literal("copied"),
					literal("typechange")
				]).readonly(),
				"insertions": number().readonly(),
				"deletions": number().readonly(),
				"binary": boolean().readonly()
			})).readonly(),
			"filesTruncated": boolean().readonly(),
			"oid": string().readonly(),
			"parents": array(string()).readonly(),
			"subject": string().readonly(),
			"authorName": string().readonly(),
			"authorEmail": string().readonly(),
			"authoredAt": string().readonly(),
			"refs": array(string()).readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_diff_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_diff_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_diff_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_diff_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_diff_parameter_1$schema = () => _deepseek_ai_dsh_api_git_controller_git_diff_parameter_1$schema$value ??= object({
			"path": string().readonly(),
			"from": string().readonly().optional(),
			"side": union([
				object({ "kind": literal("worktree").readonly() }),
				object({ "kind": literal("index").readonly() }),
				object({
					"kind": literal("commit").readonly(),
					"oid": string().readonly()
				})
			]).readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_diff_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_diff_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_diff_result$schema$value ??= object({
			"path": string().readonly(),
			"from": string().readonly().optional(),
			"hunks": array(object({
				"header": string().readonly(),
				"lines": array(object({
					"kind": union([
						literal("add"),
						literal("delete"),
						literal("context")
					]).readonly(),
					"text": string().readonly()
				})).readonly()
			})).readonly(),
			"binary": boolean().readonly(),
			"untracked": boolean().readonly(),
			"truncated": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_log_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_log_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_log_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_log_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_log_parameter_1$schema = () => _deepseek_ai_dsh_api_git_controller_git_log_parameter_1$schema$value ??= object({
			"rev": string().readonly().optional(),
			"skip": number().readonly().optional(),
			"limit": number().readonly().optional(),
			"path": string().readonly().optional()
		});
		let _deepseek_ai_dsh_api_git_controller_git_log_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_log_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_log_result$schema$value ??= object({
			"commits": array(object({
				"oid": string().readonly(),
				"parents": array(string()).readonly(),
				"subject": string().readonly(),
				"authorName": string().readonly(),
				"authorEmail": string().readonly(),
				"authoredAt": string().readonly(),
				"refs": array(string()).readonly()
			})).readonly(),
			"more": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_refs_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_refs_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_refs_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_refs_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_refs_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_refs_result$schema$value ??= object({
			"refs": array(object({
				"name": string().readonly(),
				"shortName": string().readonly(),
				"kind": union([
					literal("local"),
					literal("remote"),
					literal("tag")
				]).readonly(),
				"oid": string().readonly(),
				"head": boolean().readonly(),
				"subject": string().readonly(),
				"committedAt": string().readonly()
			})).readonly(),
			"truncated": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_repository_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_repository_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_repository_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_repository_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_repository_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_repository_result$schema$value ??= union([object({
			"kind": literal("repository").readonly(),
			"repository": object({
				"root": string().readonly(),
				"name": string().readonly(),
				"head": union([
					object({
						"kind": literal("branch").readonly(),
						"branch": string().readonly(),
						"oid": string().readonly()
					}),
					object({
						"kind": literal("detached").readonly(),
						"oid": string().readonly()
					}),
					object({
						"kind": literal("unborn").readonly(),
						"branch": string().readonly()
					})
				]).readonly(),
				"upstream": object({
					"ref": string().readonly(),
					"ahead": number().readonly(),
					"behind": number().readonly()
				}).readonly().optional()
			}).readonly()
		}), object({ "kind": literal("not-a-repository").readonly() })]);
		let _deepseek_ai_dsh_api_git_controller_git_status_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_status_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_status_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_status_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_status_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_status_result$schema$value ??= object({
			"entries": array(object({
				"path": string().readonly(),
				"from": string().readonly().optional(),
				"index": union([
					literal("unmodified"),
					literal("modified"),
					literal("added"),
					literal("deleted"),
					literal("renamed"),
					literal("copied"),
					literal("typechange"),
					literal("unmerged"),
					literal("untracked")
				]).readonly(),
				"worktree": union([
					literal("unmodified"),
					literal("modified"),
					literal("added"),
					literal("deleted"),
					literal("renamed"),
					literal("copied"),
					literal("typechange"),
					literal("unmerged"),
					literal("untracked")
				]).readonly()
			})).readonly(),
			"truncated": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_git_controller_git_watch_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_watch_parameter_0$schema = () => _deepseek_ai_dsh_api_git_controller_git_watch_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_git_controller_git_watch_result$schema$value;
		const _deepseek_ai_dsh_api_git_controller_git_watch_result$schema = () => _deepseek_ai_dsh_api_git_controller_git_watch_result$schema$value ??= union([object({ "kind": literal("ready").readonly() }), object({ "kind": literal("change").readonly() })]);
		const TYPERT_REMOTE$3 = {
			package: "@deepseek-ai/dsh-api-git-controller",
			descriptors: [
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/commit",
					service: "gitController",
					namespace: "git",
					method: "commit",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_commit_parameter_0$schema
						}
					}, {
						name: "oid",
						wire: "oid",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-git-controller#git/commit:oid",
							create: _deepseek_ai_dsh_api_git_controller_git_commit_parameter_1$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitCommitDetailView",
						create: _deepseek_ai_dsh_api_git_controller_git_commit_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 331,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/diff",
					service: "gitController",
					namespace: "git",
					method: "diff",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_diff_parameter_0$schema
						}
					}, {
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitDiffRequest",
							create: _deepseek_ai_dsh_api_git_controller_git_diff_parameter_1$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitFileDiffView",
						create: _deepseek_ai_dsh_api_git_controller_git_diff_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 365,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/log",
					service: "gitController",
					namespace: "git",
					method: "log",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_log_parameter_0$schema
						}
					}, {
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitLogRequest",
							create: _deepseek_ai_dsh_api_git_controller_git_log_parameter_1$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitLogPage",
						create: _deepseek_ai_dsh_api_git_controller_git_log_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 290,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/refs",
					service: "gitController",
					namespace: "git",
					method: "refs",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_refs_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitRefsView",
						create: _deepseek_ai_dsh_api_git_controller_git_refs_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 275,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/repository",
					service: "gitController",
					namespace: "git",
					method: "repository",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_repository_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitRepositoryResult",
						create: _deepseek_ai_dsh_api_git_controller_git_repository_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 227,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/status",
					service: "gitController",
					namespace: "git",
					method: "status",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_status_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitStatusView",
						create: _deepseek_ai_dsh_api_git_controller_git_status_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 255,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-git-controller#git/watch",
					service: "gitController",
					namespace: "git",
					method: "watch",
					mode: "stream",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_git_controller_git_watch_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-git-controller/types#GitWatchFrame",
						create: _deepseek_ai_dsh_api_git_controller_git_watch_result$schema
					},
					sourceLocation: {
						"file": "packages/api/git-controller/src/index.ts",
						"line": 455,
						"column": 10
					}
				}
			]
		};
		//#endregion
		//#region ../../util/workspace-path/src/file-address.ts
		/** The scheme and type every file address opens with. */
		const FILE_ADDRESS_PREFIX = "dsh-resource://file/";
		/** Component-encode one id or path segment, keeping `:` literal for drive letters. */
		function encodeSegment(segment) {
			return encodeURIComponent(segment).replace(/%3A/gi, ":");
		}
		/** Encode a `/`-separated path segment by segment. */
		function encodePath(path) {
			return path.split("/").map(encodeSegment).join("/");
		}
		/**
		* Build the address of a file read through one Session.
		* @param sessionId - the Session whose Host workspace resolves the path.
		* @param path - absolute or workspace-relative path; backslashes are normalized to `/`, and leading `./` prefixes are dropped.
		* @returns the `dsh-resource://file/session/<sessionId>/<path>` address.
		*/
		function sessionFileAddress(sessionId, path) {
			const normalized = path.replace(/\\/g, "/").replace(/^(?:\.\/)+/, "");
			return `${FILE_ADDRESS_PREFIX}session/${encodeSegment(sessionId)}/${encodePath(normalized)}`;
		}
		//#endregion
		//#region ../../util/workspace-path/src/index.ts
		/**
		* Browser-safe Workspace path and display helpers.
		* @module @deepseek-ai/dsh-util-workspace-path
		*/
		/** Whether a path uses a Windows drive or UNC prefix. */
		function isWindowsStylePath(value) {
			return /^[A-Za-z]:[/\\]/.test(value) || value.startsWith("\\\\");
		}
		/**
		* Whether a path is absolute in either spelling the Host accepts: POSIX (`/a/b`) or Windows drive or UNC.
		* @param path - the path to classify.
		* @returns `true` for an absolute path; `false` for a Workspace-relative one.
		*/
		function isAbsoluteWorkspacePath(path) {
			return path.startsWith("/") || isWindowsStylePath(path);
		}
		/**
		* Resolve a Workspace-relative path into the Host-facing spelling used by path operations.
		* @param cwd - Session Workspace root, when known.
		* @param path - Absolute or Workspace-relative path.
		* @returns an absolute path when a Workspace root is available, otherwise the original path.
		*/
		function resolveWorkspacePath(cwd, path) {
			if (isAbsoluteWorkspacePath(path)) return path;
			if (cwd === void 0 || cwd === "") return path;
			const separator = isWindowsStylePath(cwd) && cwd.includes("\\") ? "\\" : "/";
			return `${cwd.replace(/[/\\]+$/, "")}${separator}${path.replace(/^[/\\]+/, "")}`;
		}
		/**
		* The address for a path as a caller holds it: a relative path, or an absolute
		* path inside the Session's workspace, becomes a `session`-scoped address; an
		* absolute path outside it, or one whose workspace root is unknown, keeps its
		* absolute path in that Session's address.
		* @param sessionId - the Session the path is read in.
		* @param cwd - that Session's workspace root, when known.
		* @param path - absolute or workspace-relative path, in either separator spelling.
		* @returns the `dsh-resource://file/…` address.
		*/
		function fileAddressFor(sessionId, cwd, path) {
			const normalized = path.replace(/\\/g, "/");
			if (!isAbsoluteWorkspacePath(normalized)) return sessionFileAddress(sessionId, normalized);
			const root = cwd === void 0 ? "" : cwd.replace(/\\/g, "/").replace(/\/+$/, "");
			if (root !== "" && normalized === root) return sessionFileAddress(sessionId, "");
			if (root !== "" && normalized.startsWith(`${root}/`)) return sessionFileAddress(sessionId, normalized.slice(root.length + 1));
			return sessionFileAddress(sessionId, normalized);
		}
		/**
		* Assign a lane and a colour to every commit of one page.
		* @param commits - commits in the order the history walk returned them, newest first.
		* @returns one row per commit, in the same order.
		*/
		function assignLanes(commits) {
			const waiting = [];
			const colors = /* @__PURE__ */ new Map();
			const colorOf = (line) => {
				const known = colors.get(line);
				if (known !== void 0) return known;
				const next = colors.size % 5;
				colors.set(line, next);
				return next;
			};
			const snapshot = () => waiting.map((entry, index) => entry === void 0 ? void 0 : {
				lane: index,
				color: colorOf(entry.line)
			});
			const rows = [];
			for (const commit of commits) {
				let lane = waiting.findIndex((entry) => entry?.oid === commit.oid);
				if (lane === -1) {
					const free = waiting.indexOf(void 0);
					lane = free === -1 ? waiting.length : free;
					waiting[lane] = {
						oid: commit.oid,
						line: commit.oid
					};
				}
				const own = waiting[lane];
				if (own === void 0) continue;
				const incoming = rows.length === 0 ? [] : snapshot();
				for (let index = 0; index < waiting.length; index += 1) if (index !== lane && waiting[index]?.oid === commit.oid) waiting[index] = void 0;
				const [first, ...rest] = commit.parents;
				waiting[lane] = first === void 0 ? void 0 : {
					oid: first,
					line: own.line
				};
				for (const parent of rest) {
					if (waiting.some((entry) => entry?.oid === parent)) continue;
					const free = waiting.indexOf(void 0);
					const next = {
						oid: parent,
						line: parent
					};
					if (free === -1) waiting.push(next);
					else waiting[free] = next;
				}
				while (waiting.length > 0 && waiting[waiting.length - 1] === void 0) waiting.pop();
				const outgoing = snapshot();
				const width = Math.max(incoming.length, outgoing.length, lane + 1);
				const rails = [];
				for (let index = 0; index < width; index += 1) {
					const above = incoming[index];
					const below = outgoing[index];
					const rail = below ?? above;
					if (rail === void 0) continue;
					rails.push({
						lane: index,
						color: rail.color,
						from: above === void 0 ? 14 : 0,
						to: below === void 0 ? 14 : 28
					});
				}
				rows.push({
					commit,
					lane,
					rails,
					color: colorOf(own.line)
				});
			}
			return rows;
		}
		//#endregion
		//#region ../ui-git/src/client/tree.ts
		/** How strongly each status paints a row; the strongest descendant wins. */
		const SEVERITY = {
			unmodified: 0,
			untracked: 1,
			added: 1,
			copied: 2,
			renamed: 3,
			typechange: 4,
			modified: 5,
			deleted: 6,
			unmerged: 7
		};
		/**
		* The side of a change a file row reports: the working tree wins over the index.
		* @param entry - one changed path with its two sides.
		* @returns the status the row draws.
		*/
		function dominantKind(entry) {
			if (entry.worktree !== "unmodified" && entry.worktree !== "untracked") return entry.worktree;
			if (entry.index !== "unmodified") return entry.index;
			return entry.worktree;
		}
		/** Directories first, then case-insensitive natural name order. */
		const byName = (left, right) => {
			const leftDir = left.children.size > 0;
			if (leftDir !== right.children.size > 0) return leftDir ? -1 : 1;
			return left.name.localeCompare(right.name, void 0, {
				numeric: true,
				sensitivity: "base"
			});
		};
		/**
		* Build the nested changes tree from git's changed-path list.
		* @param entries - paths relative to the repository root, in git's order.
		* @returns the root level, directories before files.
		*/
		function buildChangeTree(entries) {
			const root = {
				path: "",
				name: "",
				children: /* @__PURE__ */ new Map()
			};
			for (const entry of entries) {
				const segments = entry.path.split("/");
				let node = root;
				let path = "";
				for (const [index, segment] of segments.entries()) {
					path = path === "" ? segment : `${path}/${segment}`;
					let child = node.children.get(segment);
					if (child === void 0) {
						child = {
							path,
							name: segment,
							children: /* @__PURE__ */ new Map()
						};
						node.children.set(segment, child);
					}
					if (index === segments.length - 1) child.entry = entry;
					node = child;
				}
			}
			const convert = (nodes) => [...nodes].sort(byName).map((node) => {
				const children = convert(node.children.values());
				const own = node.entry === void 0 ? "unmodified" : dominantKind(node.entry);
				const kind = children.reduce((current, child) => SEVERITY[child.kind] > SEVERITY[current] ? child.kind : current, own);
				return {
					path: node.path,
					name: node.name,
					children,
					kind,
					...node.entry === void 0 ? {} : { entry: node.entry }
				};
			});
			return convert(root.children.values());
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-git/src/client/GitPanel.module.css.mjs
		const css$14 = ".zEHuoq_panel{box-sizing:border-box;background:var(--dsw-alias-bg-base);min-width:0;height:100%;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.zEHuoq_titleIcon{color:var(--dsw-alias-label-secondary)}.zEHuoq_head{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);flex:none;justify-content:space-between;align-items:center;gap:8px;min-height:32px;padding:4px 8px 4px 10px;display:flex}.zEHuoq_identity{min-width:0;color:var(--dsw-alias-label-secondary);align-items:center;gap:5px;display:flex}.zEHuoq_branch{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500;overflow:hidden}.zEHuoq_repoName{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.zEHuoq_repoName:before{color:var(--dsw-alias-border-l1);content:\"·\";margin-right:5px}.zEHuoq_mono{font-family:var(--dsw-font-family-mono,ui-monospace, monospace);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);font-size:11px}.zEHuoq_tools{flex:none;align-items:center;gap:2px;min-width:0;display:flex;overflow-x:auto}.zEHuoq_workspaceButton{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;flex:none;padding:2px 6px;font-size:12px}.zEHuoq_workspaceButton[data-active=true]{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}.zEHuoq_iconButton{border-radius:var(--dsw-radius-sm);width:24px;height:24px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.zEHuoq_iconButton:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}.zEHuoq_notice{color:var(--dsw-alias-label-secondary);flex:none;margin:0;padding:10px 12px;font-size:12px}.zEHuoq_note{color:var(--dsw-alias-label-secondary);margin:0;padding:4px 10px 8px 26px;font-size:12px}.zEHuoq_scroll{scrollbar-color:var(--dsw-alias-scrollbar-bg-l2) transparent;flex:auto;min-height:0;overflow-y:auto}.zEHuoq_scroll::-webkit-scrollbar{width:8px}.zEHuoq_scroll::-webkit-scrollbar-thumb{border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-scrollbar-bg-l2)}.zEHuoq_scroll::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-scrollbar-hover-l2)}.zEHuoq_section{border-bottom:.5px solid var(--dsw-alias-border-l2)}.zEHuoq_sectionToggle{z-index:1;box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);text-align:left;background:var(--dsw-alias-bg-base);cursor:pointer;border:0;align-items:center;gap:4px;padding:5px 8px;font-size:12px;font-weight:500;display:flex;position:sticky;top:0}.zEHuoq_sectionToggle:hover{background:var(--dsw-alias-bg-layer-2)}.zEHuoq_sectionTitle{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.zEHuoq_count{font-variant-numeric:tabular-nums;min-width:18px;color:var(--dsw-alias-label-secondary);text-align:center;background:var(--dsw-alias-bg-layer-2);border-radius:9px;flex:none;padding:0 5px;font-size:11px}.zEHuoq_sectionBody{padding-bottom:2px}.zEHuoq_tree{margin:0;padding:0;list-style:none}.zEHuoq_rowButton{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:5px;padding:3px 8px;font-size:13px;display:flex}.zEHuoq_rowButton:hover{background:var(--dsw-alias-bg-layer-2)}.zEHuoq_chevron,.zEHuoq_folderIcon{color:var(--dsw-alias-label-secondary);flex:none}.zEHuoq_dirName{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.zEHuoq_folderDot{background:var(--dsw-alias-state-idle-primary);border-radius:50%;flex:none;width:7px;height:7px;margin-right:2px}.zEHuoq_folderDot[data-kind=modified],.zEHuoq_folderDot[data-kind=typechange]{background:var(--dsw-alias-state-warn-primary)}.zEHuoq_folderDot[data-kind=added],.zEHuoq_folderDot[data-kind=untracked]{background:var(--dsw-alias-state-success-primary)}.zEHuoq_folderDot[data-kind=deleted],.zEHuoq_folderDot[data-kind=unmerged]{background:var(--dsw-alias-state-error-primary)}.zEHuoq_folderDot[data-kind=renamed],.zEHuoq_folderDot[data-kind=copied]{background:var(--dsw-alias-state-business-primary)}.zEHuoq_fileName{white-space:nowrap;min-width:0;display:flex;overflow:hidden}.zEHuoq_pathDir{min-width:0;color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;flex:0 auto;overflow:hidden}.zEHuoq_letter{width:11px;font-family:var(--dsw-font-family-mono,ui-monospace, monospace);text-align:center;flex:none;font-size:11px;font-weight:500}.zEHuoq_letter[data-kind=modified],.zEHuoq_letter[data-kind=typechange]{color:var(--dsw-alias-state-warn-primary)}.zEHuoq_letter[data-kind=added],.zEHuoq_letter[data-kind=untracked]{color:var(--dsw-alias-state-success-primary)}.zEHuoq_letter[data-kind=deleted],.zEHuoq_letter[data-kind=unmerged]{color:var(--dsw-alias-state-error-primary)}.zEHuoq_letter[data-kind=renamed],.zEHuoq_letter[data-kind=copied]{color:var(--dsw-alias-state-business-primary)}.zEHuoq_letter[data-kind=unmodified]{color:var(--dsw-alias-state-idle-primary)}.zEHuoq_graph{margin:0;padding:0;list-style:none}.zEHuoq_commitRow[data-selected=true]{background:var(--dsw-alias-bg-layer-2)}.zEHuoq_commitButton{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:4px;padding:2px 8px 2px 6px;display:flex}.zEHuoq_commitButton:hover{background:var(--dsw-alias-bg-layer-2)}.zEHuoq_gutter{flex:none}.zEHuoq_rail{stroke-width:1.5px;stroke:var(--dsw-alias-border-l1)}.zEHuoq_rail[data-color=\"0\"]{stroke:var(--dsw-alias-state-business-primary)}.zEHuoq_rail[data-color=\"1\"]{stroke:var(--dsw-alias-state-success-primary)}.zEHuoq_rail[data-color=\"2\"]{stroke:var(--dsw-alias-state-warn-primary)}.zEHuoq_rail[data-color=\"3\"]{stroke:var(--dsw-alias-state-error-primary)}.zEHuoq_rail[data-color=\"4\"]{stroke:var(--dsw-alias-state-idle-primary)}.zEHuoq_dot{fill:var(--dsw-alias-label-secondary)}.zEHuoq_dot[data-color=\"0\"]{fill:var(--dsw-alias-state-business-primary)}.zEHuoq_dot[data-color=\"1\"]{fill:var(--dsw-alias-state-success-primary)}.zEHuoq_dot[data-color=\"2\"]{fill:var(--dsw-alias-state-warn-primary)}.zEHuoq_dot[data-color=\"3\"]{fill:var(--dsw-alias-state-error-primary)}.zEHuoq_dot[data-color=\"4\"]{fill:var(--dsw-alias-state-idle-primary)}.zEHuoq_commitText{flex:auto;align-items:baseline;gap:6px;min-width:0;display:flex}.zEHuoq_subject{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;font-size:13px;overflow:hidden}.zEHuoq_pills{flex:none;gap:3px;max-width:45%;display:flex;overflow:hidden}.zEHuoq_pill{color:var(--dsw-alias-label-primary-foreground);text-overflow:ellipsis;white-space:nowrap;background:var(--dsw-alias-state-business-primary);border-radius:8px;padding:0 5px;font-size:11px;overflow:hidden}.zEHuoq_commitBox{box-sizing:border-box;border-top:.5px solid var(--dsw-alias-border-l2);flex:none;align-items:flex-end;gap:6px;padding:6px 8px;display:flex}.zEHuoq_textarea{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-sm);min-width:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);resize:none;flex:auto;padding:5px 7px;font-family:inherit;font-size:12px}.zEHuoq_textarea::placeholder{color:var(--dsw-alias-label-secondary)}.zEHuoq_commitAction{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-primary-foreground);background:var(--dsw-alias-state-business-primary);cursor:pointer;border:0;flex:none;padding:5px 10px;font-size:12px}.zEHuoq_commitAction:disabled,.zEHuoq_textarea:disabled{opacity:.55;cursor:default}";
		const tagId$14 = "@deepseek-ai/dsh-workbench/GitPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$14) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$14;
			tag.textContent = css$14;
			document.head.appendChild(tag);
		}
		var GitPanel_module_css_default = {
			"branch": "zEHuoq_branch",
			"chevron": "zEHuoq_chevron",
			"commitAction": "zEHuoq_commitAction",
			"commitBox": "zEHuoq_commitBox",
			"commitButton": "zEHuoq_commitButton",
			"commitRow": "zEHuoq_commitRow",
			"commitText": "zEHuoq_commitText",
			"count": "zEHuoq_count",
			"dirName": "zEHuoq_dirName",
			"dot": "zEHuoq_dot",
			"fileName": "zEHuoq_fileName",
			"folderDot": "zEHuoq_folderDot",
			"folderIcon": "zEHuoq_folderIcon",
			"graph": "zEHuoq_graph",
			"gutter": "zEHuoq_gutter",
			"head": "zEHuoq_head",
			"iconButton": "zEHuoq_iconButton",
			"identity": "zEHuoq_identity",
			"letter": "zEHuoq_letter",
			"mono": "zEHuoq_mono",
			"note": "zEHuoq_note",
			"notice": "zEHuoq_notice",
			"panel": "zEHuoq_panel",
			"pathDir": "zEHuoq_pathDir",
			"pill": "zEHuoq_pill",
			"pills": "zEHuoq_pills",
			"rail": "zEHuoq_rail",
			"repoName": "zEHuoq_repoName",
			"rowButton": "zEHuoq_rowButton",
			"scroll": "zEHuoq_scroll",
			"section": "zEHuoq_section",
			"sectionBody": "zEHuoq_sectionBody",
			"sectionTitle": "zEHuoq_sectionTitle",
			"sectionToggle": "zEHuoq_sectionToggle",
			"subject": "zEHuoq_subject",
			"textarea": "zEHuoq_textarea",
			"titleIcon": "zEHuoq_titleIcon",
			"tools": "zEHuoq_tools",
			"tree": "zEHuoq_tree",
			"workspaceButton": "zEHuoq_workspaceButton"
		};
		//#endregion
		//#region ../ui-git/src/client/GitPanel.tsx
		/**
		* The Git tab body: one Workspace's repository in a narrow right-Sidebar panel.
		*
		* Two collapsible sections carry the surface — **Changes** as a directory tree
		* with git's status letters, and **Graph** as the history lanes with the refs
		* that point at each commit. The commit box is present but read-only: the Host
		* controller exposes no write operation yet, so stage, discard and commit are
		* deliberately not offered.
		*
		* The body draws only what its props carry: state through the hook the renderer
		* binds, selections and refresh through the injected face, and copy through the
		* dictionary.
		*/
		/** git's own status letter for one side of a change; a space means no change. */
		const STATUS_LETTER = {
			unmodified: " ",
			modified: "M",
			added: "A",
			deleted: "D",
			renamed: "R",
			copied: "C",
			typechange: "T",
			unmerged: "U",
			untracked: "?"
		};
		/** Lane column width in pixels; the stylesheet and the gutter agree on it. */
		const LANE_STEP = 12;
		/** Ref pills one history row draws before it counts the rest. */
		const REF_PILLS = 2;
		/**
		* One status letter.
		* @param props - the state this side of the change holds.
		* @returns the letter chip.
		*/
		function Letter({ kind }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: GitPanel_module_css_default.letter,
				"data-kind": kind,
				"aria-hidden": "true",
				children: STATUS_LETTER[kind]
			});
		}
		/**
		* The graph gutter: the rails carried through this row and the commit's dot.
		* @param props - one history row's geometry.
		* @returns the gutter drawing.
		*/
		function Gutter({ row }) {
			const width = row.rails.reduce((widest, rail) => Math.max(widest, rail.lane + 1), row.lane + 1) * LANE_STEP;
			const centre = (lane) => lane * LANE_STEP + LANE_STEP / 2;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: GitPanel_module_css_default.gutter,
				width,
				height: 22,
				viewBox: `0 0 ${String(width)} 22`,
				"aria-hidden": "true",
				children: [row.rails.map((rail) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
					className: GitPanel_module_css_default.rail,
					"data-color": rail.color,
					x1: centre(rail.lane),
					x2: centre(rail.lane),
					y1: rail.from,
					y2: rail.to
				}, rail.lane)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					className: GitPanel_module_css_default.dot,
					"data-color": row.color,
					cx: centre(row.lane),
					cy: 11,
					r: 3.5
				})]
			});
		}
		/**
		* One changed path or one collapsed directory of them.
		* @param props - the node, the collapsed set, its toggler, and the open callback.
		* @returns the row and, for an expanded directory, its children.
		*/
		function ChangeNodeRow({ node, expanded, onToggle, onOpen, onOpenInEditor }) {
			if (node.entry !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: GitPanel_module_css_default.rowButton,
				title: node.entry.from === void 0 ? node.entry.path : `${node.entry.path} ← ${node.entry.from}`,
				onClick: () => {
					onOpen(node.entry?.path ?? node.path);
				},
				onDoubleClick: () => {
					onOpenInEditor(node.entry?.path ?? node.path);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Letter, { kind: node.kind }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: GitPanel_module_css_default.fileName,
					children: node.name
				})]
			}) });
			const isExpanded = expanded.has(node.path);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: GitPanel_module_css_default.rowButton,
				"aria-expanded": isExpanded,
				onClick: () => {
					onToggle(node.path);
				},
				children: [
					isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, {
						size: 13,
						className: GitPanel_module_css_default.chevron
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutlineRegular, {
						size: 13,
						className: GitPanel_module_css_default.chevron
					}),
					isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenRegular, {
						size: 14,
						className: GitPanel_module_css_default.folderIcon
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {
						size: 14,
						className: GitPanel_module_css_default.folderIcon
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: GitPanel_module_css_default.dirName,
						children: node.name
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: GitPanel_module_css_default.folderDot,
						"data-kind": node.kind,
						"aria-hidden": "true"
					})
				]
			}), isExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: GitPanel_module_css_default.tree,
				children: node.children.map((child) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChangeNodeRow, {
					node: child,
					expanded,
					onToggle,
					onOpen,
					onOpenInEditor
				}, child.path))
			})] });
		}
		/**
		* One history row.
		* @param props - the row's geometry, its selection, and the selection callback.
		* @returns the row.
		*/
		function CommitRow({ row, selected, onSelect }) {
			const commit = row.commit;
			const extra = commit.refs.length - REF_PILLS;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				className: GitPanel_module_css_default.commitRow,
				"data-selected": selected,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: GitPanel_module_css_default.commitButton,
					onClick: () => {
						onSelect(commit.oid);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Gutter, { row }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: GitPanel_module_css_default.commitText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: GitPanel_module_css_default.subject,
							children: commit.subject
						}), commit.refs.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: GitPanel_module_css_default.pills,
							children: [commit.refs.slice(0, REF_PILLS).map((ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: GitPanel_module_css_default.pill,
								children: ref
							}, ref)), extra > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: GitPanel_module_css_default.pill,
								children: ["+", String(extra)]
							})]
						})]
					})]
				})
			});
		}
		/**
		* One collapsible section of the panel.
		* @param props - the section's label, count, open state, toggler, and children.
		* @returns the section.
		*/
		function Section({ label, count, open, onToggle, children }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: GitPanel_module_css_default.section,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: GitPanel_module_css_default.sectionToggle,
					"aria-expanded": open,
					onClick: onToggle,
					children: [
						open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 14 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutlineRegular, { size: 14 }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: GitPanel_module_css_default.sectionTitle,
							children: label
						}),
						count > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: GitPanel_module_css_default.count,
							children: count
						})
					]
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: GitPanel_module_css_default.sectionBody,
					children
				})]
			});
		}
		/**
		* Render the Git panel.
		* @param props - the tab runtime currency, the panel's injected face, and the translator.
		* @returns the panel element.
		*/
		function GitPanel({ useGitPanel, useGitWorkspaces, selectWorkspace, selectCommit, openFile, openFileInEditor, refresh, t }) {
			const state = useGitPanel((snapshot) => snapshot);
			const workspaces = useGitWorkspaces((snapshot) => snapshot.items);
			const [changesOpen, setChangesOpen] = (0, react.useState)(true);
			const [graphOpen, setGraphOpen] = (0, react.useState)(true);
			const [expanded, setExpanded] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			(0, react.useEffect)(() => {
				if (state.workspaceId !== void 0) return;
				const first = workspaces[0];
				if (first === void 0) return;
				selectWorkspace(first.workspaceId);
			}, [
				state.workspaceId,
				workspaces,
				selectWorkspace
			]);
			const repository = state.repository;
			const entries = state.status?.entries ?? [];
			const branch = repository === void 0 ? "" : repository.head.kind === "branch" || repository.head.kind === "unborn" ? repository.head.branch : t("detached");
			const rows = assignLanes(state.commits);
			const ready = state.failure === void 0 && repository !== void 0;
			const toggleNode = (path) => {
				setExpanded((previous) => {
					const next = new Set(previous);
					if (next.has(path)) next.delete(path);
					else next.add(path);
					return next;
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: GitPanel_module_css_default.panel,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: GitPanel_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: GitPanel_module_css_default.identity,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular, { size: 14 }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: GitPanel_module_css_default.branch,
									children: branch
								}),
								repository?.upstream !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: GitPanel_module_css_default.mono,
									children: [
										"+",
										String(repository.upstream.ahead),
										" -",
										String(repository.upstream.behind)
									]
								}),
								repository !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: GitPanel_module_css_default.repoName,
									children: repository.name
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: GitPanel_module_css_default.tools,
							children: [workspaces.length > 1 && workspaces.map((workspace) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: GitPanel_module_css_default.workspaceButton,
								"data-active": workspace.workspaceId === state.workspaceId,
								onClick: () => {
									selectWorkspace(workspace.workspaceId);
								},
								children: workspace.title
							}, workspace.workspaceId)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
								label: t("refresh"),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: GitPanel_module_css_default.iconButton,
									"aria-label": t("refresh"),
									onClick: () => {
										refresh();
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineRegular, { size: 14 })
								})
							})]
						})]
					}),
					state.failure !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: GitPanel_module_css_default.notice,
						children: state.failure.code === "git/unavailable" ? t("unavailable") : t("failed")
					}),
					state.failure === void 0 && state.workspaceId === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: GitPanel_module_css_default.notice,
						children: t("noWorkspace")
					}),
					state.failure === void 0 && state.workspaceId !== void 0 && state.phase === "loading" && repository === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: GitPanel_module_css_default.notice,
						children: t("loading")
					}),
					state.failure === void 0 && state.notARepository && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: GitPanel_module_css_default.notice,
						children: t("notARepository")
					}),
					ready && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: GitPanel_module_css_default.scroll,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Section, {
							label: t("changes"),
							count: entries.length,
							open: changesOpen,
							onToggle: () => {
								setChangesOpen(!changesOpen);
							},
							children: entries.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: GitPanel_module_css_default.note,
								children: t("noChanges")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: GitPanel_module_css_default.tree,
								children: buildChangeTree(entries).map((node) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChangeNodeRow, {
									node,
									expanded,
									onToggle: toggleNode,
									onOpen: openFile,
									onOpenInEditor: openFileInEditor
								}, node.path))
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Section, {
							label: t("graph"),
							count: state.commits.length,
							open: graphOpen,
							onToggle: () => {
								setGraphOpen(!graphOpen);
							},
							children: [state.commits.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: GitPanel_module_css_default.note,
								children: t("noCommits")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: GitPanel_module_css_default.graph,
								children: rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CommitRow, {
									row,
									selected: row.commit.oid === state.selected,
									onSelect: selectCommit
								}, row.commit.oid))
							}), state.more && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: GitPanel_module_css_default.note,
								children: t("moreCommits")
							})]
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: GitPanel_module_css_default.commitBox,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
							className: GitPanel_module_css_default.textarea,
							rows: 2,
							disabled: true,
							placeholder: t("commitPlaceholder"),
							"aria-label": t("commitPlaceholder")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: GitPanel_module_css_default.commitAction,
							disabled: true,
							children: t("commit")
						})]
					})] })
				]
			});
		}
		//#endregion
		//#region ../ui-git/src/client/GitTitle.tsx
		/**
		* The title as the chip and a floating panel's header show it.
		* @param props - the tab information hook.
		* @returns the branch glyph followed by the tab's title text.
		*/
		function GitTitle({ useTabInfo }) {
			const { tab } = useTabInfo();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular, {
				size: 16,
				className: GitPanel_module_css_default.titleIcon
			}), tab.title] });
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-git/src/client/GitPage.module.css.mjs
		const css$13 = ".-NUz6a_page{box-sizing:border-box;background:var(--dsw-alias-bg-base);min-width:0;height:100%;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.-NUz6a_head{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);flex:none;justify-content:space-between;align-items:center;gap:12px;height:44px;padding:0 12px 0 16px;display:flex}[data-platform=darwin] .-NUz6a_head{height:calc(44px + var(--dsh-frame-top-clearance,0px));padding-top:var(--dsh-frame-top-clearance,0px)}.-NUz6a_identity{min-width:0;color:var(--dsw-alias-label-secondary);align-items:center;gap:6px;display:flex}.-NUz6a_branch{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500;overflow:hidden}.-NUz6a_upstream,.-NUz6a_repoName{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.-NUz6a_repoName:before{color:var(--dsw-alias-border-l1);content:\"·\";margin-right:6px}.-NUz6a_mono{font-family:var(--dsw-font-family-mono,ui-monospace, monospace);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);font-size:11px}.-NUz6a_tools{flex:none;align-items:center;gap:4px;display:flex}.-NUz6a_workspaces{gap:2px;max-width:40vw;display:flex;overflow-x:auto}.-NUz6a_workspaceButton{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-secondary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;padding:3px 8px;font-size:12px}.-NUz6a_workspaceButton:hover{background:var(--dsw-alias-bg-layer-2)}.-NUz6a_workspaceButton[data-active=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}.-NUz6a_iconButton{border-radius:var(--dsw-radius-sm);width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;justify-content:center;align-items:center;padding:0;display:inline-flex}.-NUz6a_iconButton:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}.-NUz6a_iconButton:focus-visible,.-NUz6a_workspaceButton:focus-visible,.-NUz6a_sectionToggle:focus-visible,.-NUz6a_commitButton:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.-NUz6a_body{flex:1;grid-template-columns:minmax(0,1fr);min-height:0;display:grid}.-NUz6a_body[data-detail=true]{grid-template-columns:minmax(0,1fr) minmax(280px,380px)}.-NUz6a_main{min-width:0;padding:4px 0 32px;overflow:auto}.-NUz6a_sectionToggle{width:100%;color:var(--dsw-alias-label-primary);font:inherit;letter-spacing:.02em;text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:6px;padding:6px 16px;font-size:12px;font-weight:600;display:flex}.-NUz6a_sectionToggle:hover{background:var(--dsw-alias-bg-layer-1)}.-NUz6a_changes{padding-bottom:6px}.-NUz6a_group+.-NUz6a_group{margin-top:2px}.-NUz6a_groupLabel{letter-spacing:.04em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);align-items:center;gap:6px;margin:0;padding:8px 16px 4px;font-size:11px;font-weight:600;display:flex}.-NUz6a_count{border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);padding:0 5px;font-size:10px}.-NUz6a_files{flex-direction:column;margin:0;padding:0;list-style:none;display:flex}.-NUz6a_fileRow{min-width:0}.-NUz6a_fileButton{box-sizing:border-box;width:100%;min-width:0;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:8px;padding:3px 16px;font-size:13px;display:flex}.-NUz6a_fileButton:hover{background:var(--dsw-alias-bg-layer-1)}.-NUz6a_fileButton:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.-NUz6a_letter{width:12px;font-family:var(--dsw-font-family-mono,ui-monospace, monospace);text-align:center;color:var(--dsw-alias-label-secondary);flex:none;font-size:12px;font-weight:600}.-NUz6a_letter[data-kind=modified]{color:var(--dsw-alias-state-warn-primary)}.-NUz6a_letter[data-kind=added],.-NUz6a_letter[data-kind=untracked]{color:var(--dsw-alias-state-success-primary)}.-NUz6a_letter[data-kind=deleted],.-NUz6a_letter[data-kind=unmerged]{color:var(--dsw-alias-state-error-primary)}.-NUz6a_letter[data-kind=renamed],.-NUz6a_letter[data-kind=copied],.-NUz6a_letter[data-kind=typechange]{color:var(--dsw-alias-state-business-primary)}.-NUz6a_fileText{align-items:baseline;gap:6px;min-width:0;display:flex}.-NUz6a_path{min-width:0;display:flex}.-NUz6a_pathDir{color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.-NUz6a_pathName{flex:none}.-NUz6a_renamedFrom{color:var(--dsw-alias-label-secondary);flex:none;font-size:11px}.-NUz6a_renamedFrom:before{content:\"← \"}.-NUz6a_counts{font-family:var(--dsw-font-family-mono,ui-monospace, monospace);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);flex:none;margin-left:auto;font-size:11px}.-NUz6a_graph{flex-direction:column;margin:0;padding:0;list-style:none;display:flex}.-NUz6a_commitRow{min-width:0}.-NUz6a_commitButton{box-sizing:border-box;width:100%;height:28px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:10px;padding:0 16px 0 8px;font-size:13px;display:flex}.-NUz6a_commitButton:hover{background:var(--dsw-alias-bg-layer-1)}.-NUz6a_commitRow[data-selected=true] .-NUz6a_commitButton{background:var(--dsw-alias-bg-layer-2)}.-NUz6a_gutter{flex:none;display:block}.-NUz6a_rail{stroke-width:2px;opacity:.5}.-NUz6a_dot{stroke-width:2px;fill:var(--dsw-alias-bg-base)}.-NUz6a_rail[data-color=\"0\"],.-NUz6a_dot[data-color=\"0\"]{stroke:var(--dsw-alias-state-business-primary)}.-NUz6a_rail[data-color=\"1\"],.-NUz6a_dot[data-color=\"1\"]{stroke:var(--dsw-alias-state-success-primary)}.-NUz6a_rail[data-color=\"2\"],.-NUz6a_dot[data-color=\"2\"]{stroke:var(--dsw-alias-state-warn-primary)}.-NUz6a_rail[data-color=\"3\"],.-NUz6a_dot[data-color=\"3\"]{stroke:var(--dsw-alias-state-error-primary)}.-NUz6a_rail[data-color=\"4\"],.-NUz6a_dot[data-color=\"4\"]{stroke:var(--dsw-alias-state-idle-primary)}.-NUz6a_dot[data-color=\"0\"]{fill:var(--dsw-alias-state-business-primary)}.-NUz6a_commitRow[data-selected=true] .-NUz6a_dot{fill:var(--dsw-alias-bg-layer-2)}.-NUz6a_subject{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.-NUz6a_pills{flex:none;gap:4px;display:flex}.-NUz6a_pill{border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);padding:0 6px;font-size:11px}.-NUz6a_rowMeta{font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);flex:none;font-size:11px}@media (width<=960px){.-NUz6a_rowMeta{display:none}}.-NUz6a_detail{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-left:.5px solid var(--dsw-alias-border-l2);flex-direction:column;gap:8px;min-width:0;padding:12px 16px 32px;display:flex;overflow:auto}.-NUz6a_detailHead{justify-content:space-between;align-items:center;display:flex}.-NUz6a_oid{font-family:var(--dsw-font-family-mono,ui-monospace, monospace);color:var(--dsw-alias-label-secondary);font-size:11px}.-NUz6a_detailSubject{margin:0;font-size:14px;font-weight:500;line-height:20px}.-NUz6a_body{font-family:var(--dsw-font-family-mono,ui-monospace, monospace);white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;line-height:18px}.-NUz6a_facts{grid-template-columns:auto minmax(0,1fr);gap:2px 12px;margin:0;font-size:12px;display:grid}.-NUz6a_facts dt{color:var(--dsw-alias-label-secondary)}.-NUz6a_facts dd{overflow-wrap:anywhere;margin:0}.-NUz6a_notice{text-align:center;color:var(--dsw-alias-label-secondary);flex-direction:column;align-items:center;gap:6px;margin:0;padding:56px 24px;font-size:13px;display:flex}.-NUz6a_noticeDetail{overflow-wrap:anywhere;font-size:12px}.-NUz6a_note{color:var(--dsw-alias-label-secondary);margin:0;padding:2px 16px;font-size:12px}.-NUz6a_groupLabel .-NUz6a_note,.-NUz6a_sectionToggle .-NUz6a_note{text-transform:none;letter-spacing:0;padding:0;font-weight:400}.-NUz6a_railIcon{justify-content:center;align-items:center;display:inline-flex;position:relative}.-NUz6a_railBadge{box-sizing:border-box;corner-shape:round;background:var(--dsw-alias-state-business-primary);min-width:11px;color:var(--dsw-alias-label-primary-foreground);font-variant-numeric:tabular-nums;text-align:center;border-radius:999px;padding:0 2px;font-size:7px;font-weight:600;line-height:10px;position:absolute;top:-6px;right:-6px}";
		const tagId$13 = "@deepseek-ai/dsh-workbench/GitPage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$13) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$13;
			tag.textContent = css$13;
			document.head.appendChild(tag);
		}
		var GitPage_module_css_default = {
			"body": "-NUz6a_body",
			"branch": "-NUz6a_branch",
			"changes": "-NUz6a_changes",
			"commitButton": "-NUz6a_commitButton",
			"commitRow": "-NUz6a_commitRow",
			"count": "-NUz6a_count",
			"counts": "-NUz6a_counts",
			"detail": "-NUz6a_detail",
			"detailHead": "-NUz6a_detailHead",
			"detailSubject": "-NUz6a_detailSubject",
			"dot": "-NUz6a_dot",
			"facts": "-NUz6a_facts",
			"fileButton": "-NUz6a_fileButton",
			"fileRow": "-NUz6a_fileRow",
			"fileText": "-NUz6a_fileText",
			"files": "-NUz6a_files",
			"graph": "-NUz6a_graph",
			"group": "-NUz6a_group",
			"groupLabel": "-NUz6a_groupLabel",
			"gutter": "-NUz6a_gutter",
			"head": "-NUz6a_head",
			"iconButton": "-NUz6a_iconButton",
			"identity": "-NUz6a_identity",
			"letter": "-NUz6a_letter",
			"main": "-NUz6a_main",
			"mono": "-NUz6a_mono",
			"note": "-NUz6a_note",
			"notice": "-NUz6a_notice",
			"noticeDetail": "-NUz6a_noticeDetail",
			"oid": "-NUz6a_oid",
			"page": "-NUz6a_page",
			"path": "-NUz6a_path",
			"pathDir": "-NUz6a_pathDir",
			"pathName": "-NUz6a_pathName",
			"pill": "-NUz6a_pill",
			"pills": "-NUz6a_pills",
			"rail": "-NUz6a_rail",
			"railBadge": "-NUz6a_railBadge",
			"railIcon": "-NUz6a_railIcon",
			"renamedFrom": "-NUz6a_renamedFrom",
			"repoName": "-NUz6a_repoName",
			"rowMeta": "-NUz6a_rowMeta",
			"sectionToggle": "-NUz6a_sectionToggle",
			"subject": "-NUz6a_subject",
			"tools": "-NUz6a_tools",
			"upstream": "-NUz6a_upstream",
			"workspaceButton": "-NUz6a_workspaceButton",
			"workspaces": "-NUz6a_workspaces"
		};
		//#endregion
		//#region ../ui-git/src/client/GitRailIcon.tsx
		/** Counts above this many changes read as that ceiling. */
		const BADGE_CEILING = 99;
		/**
		* Render the branch glyph and, when the repository has changes, their count.
		* @param props - the rail's icon edge, the shared count, and the translator.
		* @returns the glyph with its badge.
		*/
		function GitRailIcon({ size, useChangeCount, t }) {
			const count = useChangeCount((value) => value);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: GitPage_module_css_default.railIcon,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular, { size }), count > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: GitPage_module_css_default.railBadge,
					"aria-label": t("rail.count", { count }),
					children: count > BADGE_CEILING ? `${BADGE_CEILING}+` : count
				})]
			});
		}
		/** This implementation's identity in the tab system, and the key its body registers under. */
		const GIT_ID = "@deepseek-ai/dsh-client-ui-git";
		/**
		* The git type's registry definition.
		* @param t - namespace-bound translate, read fresh on every label call.
		* @returns the definition to register.
		*/
		function gitDefinition(t) {
			return {
				id: GIT_ID,
				kind: "git",
				priority: "builtin",
				title: () => t("title"),
				guide: [{
					id: "git",
					order: 20,
					title: () => t("panel"),
					description: () => t("guide.description"),
					icon: _deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular
				}]
			};
		}
		//#endregion
		//#region ../ui-git/src/client/change-count.ts
		/**
		* Create the source the panel writes and the badge reads.
		* @returns the observable readers subscribe to, with the panel's writer.
		*/
		function createChangeCountSource() {
			let count = 0;
			const listeners = /* @__PURE__ */ new Set();
			return {
				getSnapshot: () => count,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				publish: (next) => {
					if (next === count) return;
					count = next;
					for (const listener of [...listeners]) listener();
				}
			};
		}
		//#endregion
		//#region ../ui-git/src/client/live.ts
		/** Default quiet period: long enough to swallow one commit's file writes. */
		const DEBOUNCE_MS = 250;
		/**
		* Create the follow loop.
		* @param options - the watch to follow and the callback a change settles into.
		* @returns the handle the owning plugin drives.
		*/
		function createGitLive({ watch, onChange, debounceMs = DEBOUNCE_MS }) {
			let controller;
			let timer;
			let generation = 0;
			const stop = () => {
				controller?.abort();
				controller = void 0;
				if (timer === void 0) return;
				clearTimeout(timer);
				timer = void 0;
			};
			return {
				follow(workspaceId) {
					stop();
					const current = ++generation;
					if (workspaceId === void 0) return;
					const own = new AbortController();
					controller = own;
					(async () => {
						try {
							for await (const frame of watch(workspaceId, own.signal)) {
								if (current !== generation || own.signal.aborted) return;
								if (timer !== void 0) clearTimeout(timer);
								timer = setTimeout(() => {
									timer = void 0;
									onChange();
								}, debounceMs);
							}
						} catch (error) {}
					})();
				},
				dispose() {
					generation += 1;
					stop();
				}
			};
		}
		const INITIAL = {
			phase: "idle",
			notARepository: false,
			commits: [],
			more: false
		};
		/** Observable Git panel state plus the selections that drive it. */
		var GitPanelModel = class {
			resolveRemote;
			changeCount;
			state = INITIAL;
			listeners = /* @__PURE__ */ new Set();
			generation = 0;
			/**
			* @param resolveRemote - resolves the generated `git` namespace, mounting it when the
			*   deployment's static Client assembly predates it.
			* @param changeCount - the shared count the rail badge reads, which outlives this panel.
			*/
			constructor(resolveRemote, changeCount) {
				this.resolveRemote = resolveRemote;
				this.changeCount = changeCount;
			}
			/**
			* Read the state a render should draw.
			* @returns the same reference until the state moves.
			*/
			getSnapshot() {
				return this.state;
			}
			/**
			* Observe state changes.
			* @param listener - called after every published state.
			* @returns the unsubscribe function.
			*/
			subscribe(listener) {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			/**
			* Read one Workspace's repository; a repeat of the current selection is ignored.
			* @param workspaceId - Workspace whose repository the panel shows.
			*/
			selectWorkspace(workspaceId) {
				if (this.state.workspaceId === workspaceId) return;
				this.generation += 1;
				this.publish({
					phase: "loading",
					workspaceId,
					notARepository: false,
					commits: [],
					more: false
				});
				this.load(this.generation);
			}
			/** Re-read the current selection, keeping the selected commit's oid. */
			refresh() {
				if (this.state.workspaceId === void 0) return;
				this.generation += 1;
				this.publish({
					...this.state,
					phase: "loading"
				});
				this.load(this.generation);
			}
			/**
			* Read one commit's detail.
			* @param oid - commit id the history page reported.
			*/
			selectCommit(oid) {
				if (this.state.selected === oid) return;
				const generation = this.generation;
				const { commit: _previous, ...rest } = this.state;
				this.publish({
					...rest,
					selected: oid
				});
				this.loadCommit(oid, generation);
			}
			/** Drop the selected commit and its detail, leaving the history in place. */
			clearCommit() {
				if (this.state.selected === void 0) return;
				const { commit: _detail, selected: _selected, ...rest } = this.state;
				this.publish(rest);
			}
			/** Stop publishing: the owning registration is gone. */
			dispose() {
				this.generation += 1;
				this.listeners.clear();
			}
			async load(generation) {
				const workspaceId = this.state.workspaceId;
				if (workspaceId === void 0) return;
				const remote = await this.resolveRemote();
				const located = await remote.repository(workspaceId);
				if (generation !== this.generation) return;
				if (!located.ok) {
					this.publish({
						...INITIAL,
						workspaceId,
						phase: "error",
						failure: located.error
					});
					return;
				}
				if (located.value.kind === "not-a-repository") {
					this.changeCount.publish(0);
					this.publish({
						phase: "ready",
						workspaceId,
						notARepository: true,
						commits: [],
						more: false
					});
					return;
				}
				const [status, refs, log] = await Promise.all([
					remote.status(workspaceId),
					remote.refs(workspaceId),
					remote.log(workspaceId, { limit: 100 })
				]);
				if (generation !== this.generation) return;
				if (!status.ok) {
					this.publishFailure(workspaceId, status.error);
					return;
				}
				if (!refs.ok) {
					this.publishFailure(workspaceId, refs.error);
					return;
				}
				if (!log.ok) {
					this.publishFailure(workspaceId, log.error);
					return;
				}
				this.changeCount.publish(status.value.entries.length);
				this.publish({
					phase: "ready",
					workspaceId,
					notARepository: false,
					repository: located.value.repository,
					status: status.value,
					refs: refs.value,
					commits: log.value.commits,
					more: log.value.more,
					...this.state.selected === void 0 ? {} : { selected: this.state.selected }
				});
				const selected = this.state.selected;
				if (selected !== void 0 && this.state.commit === void 0) this.loadCommit(selected, generation);
			}
			async loadCommit(oid, generation) {
				const workspaceId = this.state.workspaceId;
				if (workspaceId === void 0) return;
				const result = await (await this.resolveRemote()).commit(workspaceId, oid);
				if (generation !== this.generation || this.state.selected !== oid) return;
				if (!result.ok) {
					const { commit: _stale, ...rest } = this.state;
					this.publish({
						...rest,
						phase: "error",
						failure: result.error
					});
					return;
				}
				this.publish({
					...this.state,
					commit: result.value
				});
			}
			/** Publish one failed read of the selected Workspace. */
			publishFailure(workspaceId, failure) {
				this.publish({
					...INITIAL,
					workspaceId,
					phase: "error",
					failure
				});
			}
			/** Publish one state and notify every listener. */
			publish(state) {
				this.state = state;
				for (const listener of [...this.listeners]) listener();
			}
		};
		//#endregion
		//#region ../ui-git/src/client/locales.ts
		/** Git panel interface copy. */
		/** Simplified Chinese dictionary and key source of truth. */
		const zh$5 = {
			panel: "版本控制",
			"guide.description": "查看工作区的 git 仓库。",
			"rail.count": "{count} 个改动的文件",
			title: "版本控制",
			workspace: "工作区",
			refresh: "刷新",
			loading: "正在读取仓库…",
			noWorkspace: "选择一个工作区以查看它的仓库。",
			notARepository: "该工作区不在任何 git 仓库内。",
			unavailable: "此 Host 上没有可用的 git。",
			failed: "无法读取仓库。",
			changes: "更改",
			graph: "提交图",
			detached: "游离 HEAD",
			noChanges: "没有改动的文件。",
			staged: "已暂存",
			unstaged: "未暂存",
			untracked: "未跟踪",
			history: "历史",
			noCommits: "还没有提交。",
			moreCommits: "更早的提交未显示。",
			truncated: "已按配置的上限截断。",
			files: "文件",
			commit: "提交",
			commitPlaceholder: "提交信息（只读）",
			author: "作者",
			date: "日期",
			parents: "父提交",
			binary: "二进制",
			refs: "引用",
			close: "关闭"
		};
		/** English dictionary checked against the Chinese key set. */
		const en$5 = {
			panel: "Source control",
			"guide.description": "Review the workspace git repository.",
			"rail.count": "{count} changed files",
			title: "Source control",
			workspace: "Workspace",
			refresh: "Refresh",
			loading: "Reading repository…",
			noWorkspace: "Select a workspace to show its repository.",
			notARepository: "This workspace is not inside a git repository.",
			unavailable: "Git is unavailable on this Host.",
			failed: "The repository could not be read.",
			changes: "Changes",
			graph: "Graph",
			detached: "detached",
			noChanges: "No changed files.",
			staged: "Staged",
			unstaged: "Unstaged",
			untracked: "Untracked",
			history: "History",
			noCommits: "No commits yet.",
			moreCommits: "Older commits are not shown.",
			truncated: "Cut at the configured limit.",
			files: "Files",
			commit: "Commit",
			commitPlaceholder: "Commit message (read-only)",
			author: "Author",
			date: "Date",
			parents: "Parents",
			binary: "Binary",
			refs: "Refs",
			close: "Close"
		};
		/** Required services: the slots, dictionaries, right Sidebar and its tab registry, Workspace rows, and the `git` namespace. */
		const inject$6 = [
			"slots",
			"locale",
			"workspaces",
			"sidebarRight",
			"sidebarRightTabs",
			"remote"
		];
		/**
		* Contribute the Source control tab to the right Sidebar and its rail button.
		* @param ctx - the browser plugin context.
		*/
		function apply$6(ctx) {
			ctx.effect(() => ctx.locale.register("git", {
				zh: zh$5,
				en: en$5
			}), "ui-git: dictionaries");
			const t = ctx.locale.bind("git");
			let mounting;
			const ensureRemote = async () => {
				if (ctx.get("remote.git") !== void 0) return;
				mounting ??= (async () => {
					try {
						await ctx.remote.$mount(TYPERT_REMOTE$3);
					} catch (error) {
						if (ctx.get("remote.git") === void 0) throw error;
					} finally {
						mounting = void 0;
					}
				})();
				await mounting;
			};
			const gitService = () => {
				const service = ctx.get("remote.git");
				if (service === void 0) throw new Error("git: remote namespace is unavailable");
				return service;
			};
			let lastSession = ctx.sidebarRight.mounted.getSnapshot();
			ctx.effect(() => ctx.sidebarRight.mounted.subscribe(() => {
				const current = ctx.sidebarRight.mounted.getSnapshot();
				if (current !== void 0) lastSession = current;
			}), "ui-git: on-screen session");
			const changeCount = createChangeCountSource();
			const onlyWorkspace = () => {
				const items = ctx.workspaces.list.getSnapshot().items;
				return items.length === 1 ? items[0]?.workspaceId : void 0;
			};
			let model;
			let live;
			let warmed = false;
			function refreshCount() {
				const workspaceId = model.getSnapshot().workspaceId ?? onlyWorkspace();
				if (workspaceId === void 0) return;
				if (ctx.get("remote.git") === void 0) return;
				gitService().status(workspaceId).then((result) => {
					if (result.ok) changeCount.publish(result.value.entries.length);
				});
			}
			function syncLive() {
				live.follow(model.getSnapshot().workspaceId ?? onlyWorkspace());
			}
			const warm = async () => {
				await ensureRemote();
				if (warmed) return;
				warmed = true;
				refreshCount();
				syncLive();
			};
			model = new GitPanelModel(async () => {
				await warm();
				return gitService();
			}, changeCount);
			ctx.effect(() => () => {
				model.dispose();
			}, "ui-git: panel model");
			ctx.effect(() => {
				return ctx.workspaces.list.subscribe(() => {
					if (warmed) refreshCount();
				});
			}, "ui-git: change count");
			live = createGitLive({
				watch: (workspaceId, signal) => ctx.remote.$stream({
					name: `repository ${workspaceId}`,
					open: () => gitService().watch(workspaceId, signal),
					ended: () => /* @__PURE__ */ new Error(`Repository watch ended: ${workspaceId}`)
				}),
				onChange: () => {
					if (model.getSnapshot().workspaceId === void 0) refreshCount();
					else model.refresh();
				}
			});
			ctx.effect(() => {
				const off = ctx.workspaces.list.subscribe(() => {
					if (warmed) syncLive();
				});
				return () => {
					off();
					live.dispose();
				};
			}, "ui-git: live repository");
			/** Absolute path of one changed file, when a repository is located. */
			const absoluteOf = (path) => {
				const root = model.getSnapshot().repository?.root;
				if (root === void 0) return void 0;
				return `${root.replace(/[/\\]+$/u, "")}/${path}`;
			};
			/** Hand one file to the Editor panel; answers whether it was taken. */
			const openInEditor = (path) => {
				const absolute = absoluteOf(path);
				return absolute !== void 0 && ctx.get("editorNavigation")?.open(absolute) === true;
			};
			/** Show one file in the right column's read-only preview, beside the conversation. */
			const openPreview = (path) => {
				const absolute = absoluteOf(path);
				if (absolute === void 0) return;
				const session = ctx.sidebarRight.mounted.getSnapshot() ?? lastSession;
				if (session === void 0) return;
				const address = fileAddressFor(session, void 0, absolute);
				ctx.sidebarRight.openResourceIn(session, address);
			};
			const injected = () => ({
				hooks: {
					gitPanel: model,
					gitWorkspaces: ctx.workspaces.list
				},
				selectWorkspace: (workspaceId) => {
					model.selectWorkspace(workspaceId);
				},
				selectCommit: (oid) => {
					model.selectCommit(oid);
				},
				clearCommit: () => {
					model.clearCommit();
				},
				refresh: () => {
					model.refresh();
				},
				openFile: openPreview,
				openFileInEditor: (path) => {
					if (!openInEditor(path)) openPreview(path);
				}
			});
			ctx.effect(() => ctx.sidebarRightTabs.register(gitDefinition(t)), "ui-git: git type");
			ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
				name: "sidebar.right.pane.tab",
				key: GIT_ID,
				locale: "git",
				inject: injected
			}, GitPanel)), "ui-git: git tab body");
			ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab.title", () => ctx.slots.register({
				name: "sidebar.right.pane.tab.title",
				key: GIT_ID
			}, GitTitle)), "ui-git: git tab title");
			ctx.effect(() => ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: "git",
				order: 20,
				label: () => t("panel"),
				locale: "git",
				inject: () => ({ hooks: { changeCount } })
			}, GitRailIcon)), "ui-git: rail entry");
		}
		//#endregion
		//#region ../../api/workspace-editor/lib/typert.remote-client.js
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_0$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_1$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_1$schema$value ??= string();
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_result$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_result$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_result$schema$value ??= object({
			"text": string().readonly(),
			"path": string().readonly(),
			"absolutePath": string().readonly(),
			"version": string().readonly(),
			"bytes": number().readonly()
		});
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_0$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_1$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_1$schema$value ??= string();
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_result$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_result$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_result$schema$value ??= object({
			"path": string().readonly(),
			"absolutePath": string().readonly(),
			"version": string().readonly(),
			"bytes": number().readonly()
		});
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_0$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_0$schema$value ??= intersection(string(), unknown());
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_1$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_1$schema$value ??= string();
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_2$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_2$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_2$schema$value ??= string();
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_3$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_3$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_3$schema$value ??= union([object({
			"kind": literal("replaceIfVersion").readonly(),
			"version": string().readonly()
		}), object({ "kind": literal("createIfAbsent").readonly() })]);
		let _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_result$schema$value;
		const _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_result$schema = () => _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_result$schema$value ??= object({
			"path": string().readonly(),
			"absolutePath": string().readonly(),
			"version": string().readonly(),
			"bytes": number().readonly()
		});
		const TYPERT_REMOTE$2 = {
			package: "@deepseek-ai/dsh-api-workspace-editor",
			descriptors: [
				{
					id: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/read",
					service: "workspaceEditor",
					namespace: "workspaceEditor",
					method: "read",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_0$schema
						}
					}, {
						name: "path",
						wire: "path",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/read:path",
							create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_parameter_1$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-workspace-editor/types#WorkspaceDocumentView",
						create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_read_result$schema
					},
					sourceLocation: {
						"file": "packages/api/workspace-editor/src/index.ts",
						"line": 115,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/stat",
					service: "workspaceEditor",
					namespace: "workspaceEditor",
					method: "stat",
					invocation: { kind: "direct" },
					parameters: [{
						name: "workspaceId",
						wire: "workspaceId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
							create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_0$schema
						}
					}, {
						name: "path",
						wire: "path",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/stat:path",
							create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_parameter_1$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-workspace-editor/types#WorkspaceDocumentStatView",
						create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_stat_result$schema
					},
					sourceLocation: {
						"file": "packages/api/workspace-editor/src/index.ts",
						"line": 144,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/write",
					service: "workspaceEditor",
					namespace: "workspaceEditor",
					method: "write",
					invocation: { kind: "direct" },
					parameters: [
						{
							name: "workspaceId",
							wire: "workspaceId",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@deepseek-ai/dsh-workspace/types#WorkspaceId",
								create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_0$schema
							}
						},
						{
							name: "path",
							wire: "path",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/write:path",
								create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_1$schema
							}
						},
						{
							name: "text",
							wire: "text",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@deepseek-ai/dsh-api-workspace-editor#workspaceEditor/write:text",
								create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_2$schema
							}
						},
						{
							name: "expected",
							wire: "expected",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@deepseek-ai/dsh-api-workspace-editor/types#WorkspaceWriteExpectation",
								create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_parameter_3$schema
							}
						}
					],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-workspace-editor/types#WorkspaceDocumentStatView",
						create: _deepseek_ai_dsh_api_workspace_editor_workspaceEditor_write_result$schema
					},
					sourceLocation: {
						"file": "packages/api/workspace-editor/src/index.ts",
						"line": 161,
						"column": 9
					}
				}
			]
		};
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-editor/src/client/MarkdownView.module.css.mjs
		const css$12 = ".ao0FpW_page{box-sizing:border-box;min-height:0;color:var(--dsw-alias-label-primary);flex:auto;padding:20px 28px 40px;font-size:14px;line-height:1.65;overflow:auto}.ao0FpW_heading{margin:1.2em 0 .5em;font-weight:600;line-height:1.3}h1.ao0FpW_heading{font-size:1.7em}h2.ao0FpW_heading{font-size:1.35em}h3.ao0FpW_heading{font-size:1.15em}.ao0FpW_paragraph{margin:0 0 .85em}.ao0FpW_list{margin:0 0 .9em;padding-left:1.5em}.ao0FpW_list li{margin:.2em 0}.ao0FpW_quote{border-left:3px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);margin:0 0 .9em;padding:.1em 0 .1em 1em}.ao0FpW_rule{border:0;border-top:.5px solid var(--dsw-alias-border-l2);margin:1.2em 0}.ao0FpW_code{background:var(--dsw-alias-bg-layer-2);font-family:var(--dsw-font-family-mono,ui-monospace, monospace);border-radius:8px;margin:0 0 1em;padding:12px 14px;font-size:12.5px;line-height:1.5;overflow:auto}.ao0FpW_inlineCode{background:var(--dsw-alias-bg-layer-2);font-family:var(--dsw-font-family-mono,ui-monospace, monospace);border-radius:4px;padding:1px 5px;font-size:.92em}.ao0FpW_page a{color:var(--dsw-alias-state-business-primary);text-decoration:none}.ao0FpW_page a:hover{text-decoration:underline}";
		const tagId$12 = "@deepseek-ai/dsh-workbench/MarkdownView.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$12) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$12;
			tag.textContent = css$12;
			document.head.appendChild(tag);
		}
		var MarkdownView_module_css_default = {
			"code": "ao0FpW_code",
			"heading": "ao0FpW_heading",
			"inlineCode": "ao0FpW_inlineCode",
			"list": "ao0FpW_list",
			"page": "ao0FpW_page",
			"paragraph": "ao0FpW_paragraph",
			"quote": "ao0FpW_quote",
			"rule": "ao0FpW_rule"
		};
		//#endregion
		//#region ../ui-editor/src/client/MarkdownView.tsx
		/** Inline tokens: code, bold, italic, and a link. */
		const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/gu;
		/**
		* Format one line's inline markup.
		* @param text - the line's text.
		* @param key - stable prefix for the produced keys.
		* @returns the formatted nodes.
		*/
		function inline(text, key) {
			const nodes = [];
			let index = 0;
			for (const match of text.matchAll(INLINE)) {
				const at = match.index ?? 0;
				if (at > index) nodes.push(text.slice(index, at));
				const token = match[0];
				const id = `${key}-${String(at)}`;
				if (token.startsWith("`")) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
					className: MarkdownView_module_css_default.inlineCode,
					children: token.slice(1, -1)
				}, id));
				else if (token.startsWith("**")) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: token.slice(2, -2) }, id));
				else if (token.startsWith("*")) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: token.slice(1, -1) }, id));
				else {
					const link = /^\[([^\]]+)\]\(([^)]+)\)$/u.exec(token);
					if (link === null) nodes.push(token);
					else nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						href: link[2],
						target: "_blank",
						rel: "noreferrer",
						children: link[1]
					}, id));
				}
				index = at + token.length;
			}
			if (index < text.length) nodes.push(text.slice(index));
			return nodes;
		}
		/**
		* Render one Markdown document.
		* @param props.text - the document's source.
		* @returns the rendered blocks.
		*/
		function MarkdownView({ text }) {
			const lines = text.split("\n");
			const blocks = [];
			let index = 0;
			while (index < lines.length) {
				const line = lines[index] ?? "";
				const key = `b${String(index)}`;
				if (/^```(.*)$/u.exec(line) !== null) {
					const code = [];
					index += 1;
					while (index < lines.length && !(lines[index] ?? "").startsWith("```")) {
						code.push(lines[index] ?? "");
						index += 1;
					}
					index += 1;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						className: MarkdownView_module_css_default.code,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: code.join("\n") })
					}, key));
					continue;
				}
				const heading = /^(#{1,6})\s+(.*)$/u.exec(line);
				if (heading !== null) {
					const Tag = [
						"h1",
						"h2",
						"h3",
						"h4",
						"h5",
						"h6"
					][(heading[1] ?? "#").length - 1] ?? "h6";
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
						className: MarkdownView_module_css_default.heading,
						children: inline(heading[2] ?? "", key)
					}, key));
					index += 1;
					continue;
				}
				if (/^---+$/u.test(line)) {
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("hr", { className: MarkdownView_module_css_default.rule }, key));
					index += 1;
					continue;
				}
				if (line.startsWith("> ")) {
					const quote = [];
					while (index < lines.length && (lines[index] ?? "").startsWith("> ")) {
						quote.push((lines[index] ?? "").slice(2));
						index += 1;
					}
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("blockquote", {
						className: MarkdownView_module_css_default.quote,
						children: inline(quote.join(" "), key)
					}, key));
					continue;
				}
				if (/^\s*([-*]|\d+\.)\s+/u.test(line)) {
					const ordered = /^\s*\d+\.\s+/u.test(line);
					const items = [];
					let itemIndex = 0;
					while (index < lines.length && /^\s*([-*]|\d+\.)\s+/u.test(lines[index] ?? "")) {
						const content = (lines[index] ?? "").replace(/^\s*([-*]|\d+\.)\s+/u, "");
						items.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: inline(content, key + String(itemIndex)) }, key + String(itemIndex)));
						itemIndex += 1;
						index += 1;
					}
					blocks.push(ordered ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
						className: MarkdownView_module_css_default.list,
						children: items
					}, key) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						className: MarkdownView_module_css_default.list,
						children: items
					}, key));
					continue;
				}
				if (line.trim() === "") {
					index += 1;
					continue;
				}
				const paragraph = [];
				while (index < lines.length) {
					const next = lines[index] ?? "";
					if (next.trim() === "" || /^(#{1,6})\s+/u.test(next) || next.startsWith("```") || next.startsWith("> ") || /^---+$/u.test(next)) break;
					paragraph.push(next);
					index += 1;
				}
				blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: MarkdownView_module_css_default.paragraph,
					children: inline(paragraph.join(" "), key)
				}, key));
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: MarkdownView_module_css_default.page,
				children: blocks
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-editor/src/client/CodeEditor.module.css.mjs
		const css$11 = ".MqOVsa_code{min-width:0;min-height:0;font-family:var(--dsw-font-family-mono,ui-monospace, monospace);background:var(--dsw-alias-bg-base);flex:auto;font-size:12.5px;line-height:20px;display:flex;position:relative;overflow:hidden}.MqOVsa_gutter{color:var(--dsw-alias-label-secondary);text-align:right;user-select:none;flex:none;padding:8px 4px 8px 0;overflow:hidden}.MqOVsa_lineNumber{border-left:2px solid #0000;height:20px;padding-left:4px;display:block}.MqOVsa_lineNumber[data-mark=added]{border-left-color:var(--dsw-alias-state-success-primary)}.MqOVsa_lineNumber[data-mark=modified]{border-left-color:var(--dsw-alias-state-warn-primary)}.MqOVsa_lineNumber[data-mark=deleted]{border-left-color:var(--dsw-alias-state-error-primary)}.MqOVsa_surface{flex:auto;min-width:0;position:relative}.MqOVsa_highlight{color:var(--dsw-alias-label-primary);white-space:pre;tab-size:2;pointer-events:none;margin:0;padding:8px 12px;position:absolute;inset:0;overflow:hidden}.MqOVsa_line{display:inline}.MqOVsa_match{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 30%, transparent);border-radius:2px}.MqOVsa_matchCurrent{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 60%, transparent);border-radius:2px}.MqOVsa_input{box-sizing:border-box;width:100%;height:100%;font:inherit;line-height:inherit;color:#0000;white-space:pre;tab-size:2;caret-color:var(--dsw-alias-label-primary);resize:none;scrollbar-color:var(--dsw-alias-scrollbar-bg-l2) transparent;background:0 0;border:0;outline:none;margin:0;padding:8px 12px;position:absolute;inset:0}.MqOVsa_input::selection{background:#38bdf86b}.MqOVsa_findBar{z-index:2;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);align-items:center;gap:4px;padding:4px 6px;display:flex;position:absolute;top:6px;right:12px}.MqOVsa_findInput{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-sm);width:140px;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);padding:3px 6px;font-size:12px}.MqOVsa_findInput::placeholder{color:var(--dsw-alias-label-secondary)}.MqOVsa_findCount{min-width:40px;color:var(--dsw-alias-label-secondary);text-align:center;font-size:11px}.MqOVsa_findButton{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);cursor:pointer;border:0;flex:none;padding:3px 8px;font-size:12px}.MqOVsa_findButton:hover{background:var(--dsw-alias-bg-layer-1)}.MqOVsa_status{box-sizing:border-box;border-top:.5px solid var(--dsw-alias-border-l2);height:24px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);pointer-events:none;justify-content:flex-end;align-items:center;gap:12px;padding:0 12px;font-size:11px;display:flex;position:absolute;bottom:0;left:0;right:0}";
		const tagId$11 = "@deepseek-ai/dsh-workbench/CodeEditor.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$11) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$11;
			tag.textContent = css$11;
			document.head.appendChild(tag);
		}
		var CodeEditor_module_css_default = {
			"code": "MqOVsa_code",
			"findBar": "MqOVsa_findBar",
			"findButton": "MqOVsa_findButton",
			"findCount": "MqOVsa_findCount",
			"findInput": "MqOVsa_findInput",
			"gutter": "MqOVsa_gutter",
			"highlight": "MqOVsa_highlight",
			"input": "MqOVsa_input",
			"line": "MqOVsa_line",
			"lineNumber": "MqOVsa_lineNumber",
			"match": "MqOVsa_match",
			"matchCurrent": "MqOVsa_matchCurrent",
			"status": "MqOVsa_status",
			"surface": "MqOVsa_surface"
		};
		//#endregion
		//#region ../ui-editor/src/client/CodeEditor.tsx
		/**
		* The editable code surface: a syntax-highlighted layer under a transparent
		* textarea, a line-number gutter with git marks, and a find/replace bar.
		*
		* Editing stays native — the textarea owns the caret, selection, IME and
		* accessibility — while the highlighted layer behind it carries the colours
		* Shiki assigns through the theme's `--shiki-*` properties. The gutter reads the
		* comparison the panel loaded, and the find bar drives the same textarea rather
		* than a second editing model.
		*/
		/** One line's rendered height; the gutter, the layers and this agree. */
		const LINE_HEIGHT = 20;
		/**
		* Split one line's highlighted runs at the find matches that cross them.
		* @param runs - the line's Shiki runs, in order.
		* @param lineStart - the line's offset in the buffer.
		* @param matches - every match in the buffer.
		* @param currentStart - the focused match's offset, when there is one.
		* @returns the segments to render, in reading order.
		*/
		function segmentsOf(runs, lineStart, matches, currentStart) {
			const segments = [];
			const push = (text, style, match) => {
				if (text === "") return;
				segments.push({
					text,
					style,
					match: match !== void 0,
					current: match !== void 0 && match.start === currentStart
				});
			};
			let offset = 0;
			for (const run of runs) {
				const runStart = lineStart + offset;
				const runEnd = runStart + run.text.length;
				const overlaps = matches.filter((match) => match.end > runStart && match.start < runEnd).map((match) => ({
					start: Math.max(match.start, runStart) - runStart,
					end: Math.min(match.end, runEnd) - runStart,
					match
				})).sort((left, right) => left.start - right.start);
				let cursor = 0;
				for (const overlap of overlaps) {
					if (overlap.start > cursor) push(run.text.slice(cursor, overlap.start), run.style, void 0);
					push(run.text.slice(overlap.start, overlap.end), run.style, overlap.match);
					cursor = Math.max(cursor, overlap.end);
				}
				if (cursor < run.text.length) push(run.text.slice(cursor), run.style, void 0);
				offset += run.text.length;
			}
			return segments;
		}
		/** One-based line and column of a caret offset. */
		function caretOf(text, offset) {
			let line = 1;
			let lineStart = 0;
			for (let index = 0; index < offset && index < text.length; index += 1) if (text[index] === "\n") {
				line += 1;
				lineStart = index + 1;
			}
			return {
				line,
				column: offset - lineStart + 1
			};
		}
		/**
		* The highlighted surface, its gutter, its find bar, and the caret readout.
		* @param props - the buffer, its name, its marks, and the panel's callbacks.
		* @returns the editable code surface.
		*/
		function CodeEditor({ value, name, ariaLabel, onChange, onSelect, onReference, onKeyDown, marks, labels }) {
			const highlighter = (0, _deepseek_ai_dsh_client_ui_primitives.useCodeHighlighter)((0, _deepseek_ai_dsh_client_ui_primitives.languageForPath)(name));
			const lines = (0, react.useMemo)(() => value.split("\n"), [value]);
			const spans = (0, react.useMemo)(() => highlighter(value), [highlighter, value]);
			const highlight = (0, react.useRef)(null);
			const gutter = (0, react.useRef)(null);
			const input = (0, react.useRef)(null);
			const [caret, setCaret] = (0, react.useState)({
				line: 1,
				column: 1
			});
			const [findOpen, setFindOpen] = (0, react.useState)(false);
			const [query, setQuery] = (0, react.useState)("");
			const [replacement, setReplacement] = (0, react.useState)("");
			const [cursor, setCursor] = (0, react.useState)(0);
			const lineStarts = (0, react.useMemo)(() => {
				const starts = [];
				let offset = 0;
				for (const line of lines) {
					starts.push(offset);
					offset += line.length + 1;
				}
				return starts;
			}, [lines]);
			const matches = (0, react.useMemo)(() => {
				if (query === "") return [];
				const haystack = value.toLowerCase();
				const needle = query.toLowerCase();
				const found = [];
				let index = haystack.indexOf(needle);
				while (index !== -1) {
					found.push({
						start: index,
						end: index + needle.length
					});
					index = haystack.indexOf(needle, index + Math.max(1, needle.length));
				}
				return found;
			}, [query, value]);
			const current = matches.length === 0 ? -1 : Math.min(cursor, matches.length - 1);
			/** Mirror the textarea's scroll onto the two layers it scrolls. */
			const sync = (0, react.useCallback)((target) => {
				if (highlight.current !== null) {
					highlight.current.scrollTop = target.scrollTop;
					highlight.current.scrollLeft = target.scrollLeft;
				}
				if (gutter.current !== null) gutter.current.scrollTop = target.scrollTop;
			}, []);
			const track = (target) => {
				setCaret(caretOf(target.value, target.selectionStart));
				onSelect(target.selectionStart, target.selectionEnd);
				sync(target);
			};
			const onScroll = (event) => {
				sync(event.currentTarget);
			};
			/** Select one match and bring it into view. */
			const reveal = (index) => {
				const match = matches[index];
				const target = input.current;
				if (match === void 0 || target === null) return;
				target.focus();
				target.setSelectionRange(match.start, match.end);
				const line = caretOf(value, match.start).line;
				target.scrollTop = Math.max(0, (line - 1) * LINE_HEIGHT - target.clientHeight / 2);
				sync(target);
				setCaret({
					line,
					column: 1
				});
				onSelect(match.start, match.end);
			};
			const go = (delta) => {
				if (matches.length === 0) return;
				const index = (current + delta + matches.length) % matches.length;
				setCursor(index);
				reveal(index);
			};
			const openFind = () => {
				setFindOpen(true);
				if (query !== "" && matches.length > 0) reveal(current === -1 ? 0 : current);
			};
			const closeFind = () => {
				setFindOpen(false);
				input.current?.focus();
			};
			const replaceOne = () => {
				const match = matches[current];
				if (match === void 0) return;
				onChange(`${value.slice(0, match.start)}${replacement}${value.slice(match.end)}`);
			};
			const replaceAll = () => {
				if (query === "") return;
				const escaped = query.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
				onChange(value.replace(new RegExp(escaped, "giu"), replacement));
			};
			const keyDown = (event) => {
				if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "l") {
					event.preventDefault();
					onReference();
					return;
				}
				if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") {
					event.preventDefault();
					openFind();
					return;
				}
				if (findOpen && event.key === "Escape") {
					event.preventDefault();
					closeFind();
					return;
				}
				if (findOpen && event.key === "Enter") {
					event.preventDefault();
					go(event.shiftKey ? -1 : 1);
					return;
				}
				onKeyDown(event);
			};
			const barKeyDown = (event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					closeFind();
					return;
				}
				if (event.key === "Enter") {
					event.preventDefault();
					go(event.shiftKey ? -1 : 1);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: CodeEditor_module_css_default.code,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: gutter,
						className: CodeEditor_module_css_default.gutter,
						"aria-hidden": "true",
						children: lines.map((_line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: CodeEditor_module_css_default.lineNumber,
							"data-mark": marks?.get(index + 1),
							children: index + 1
						}, index))
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CodeEditor_module_css_default.surface,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
								ref: highlight,
								className: CodeEditor_module_css_default.highlight,
								"aria-hidden": "true",
								children: spans === void 0 ? value : lines.map((_line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: CodeEditor_module_css_default.line,
									children: [segmentsOf(spans[index] ?? [], lineStarts[index] ?? 0, matches, matches[current]?.start).map((segment, segmentIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: segment.style,
										className: segment.current ? CodeEditor_module_css_default.matchCurrent : segment.match ? CodeEditor_module_css_default.match : void 0,
										children: segment.text
									}, segmentIndex)), "\n"]
								}, index))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
								ref: input,
								className: CodeEditor_module_css_default.input,
								"aria-label": ariaLabel,
								spellCheck: false,
								value,
								onChange: (event) => {
									onChange(event.target.value);
									track(event.currentTarget);
								},
								onSelect: (event) => {
									track(event.currentTarget);
								},
								onClick: (event) => {
									track(event.currentTarget);
								},
								onKeyUp: (event) => {
									track(event.currentTarget);
								},
								onScroll,
								onKeyDown: keyDown
							}),
							findOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CodeEditor_module_css_default.findBar,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										className: CodeEditor_module_css_default.findInput,
										autoFocus: true,
										value: query,
										placeholder: labels.find,
										"aria-label": labels.find,
										onChange: (event) => {
											setQuery(event.target.value);
											setCursor(0);
										},
										onKeyDown: barKeyDown
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: CodeEditor_module_css_default.findCount,
										children: matches.length === 0 ? labels.noMatches : `${String(current + 1)}/${String(matches.length)}`
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: CodeEditor_module_css_default.findButton,
										"aria-label": labels.previous,
										onClick: () => {
											go(-1);
										},
										children: "↑"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: CodeEditor_module_css_default.findButton,
										"aria-label": labels.next,
										onClick: () => {
											go(1);
										},
										children: "↓"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										className: CodeEditor_module_css_default.findInput,
										value: replacement,
										placeholder: labels.replace,
										"aria-label": labels.replace,
										onChange: (event) => {
											setReplacement(event.target.value);
										},
										onKeyDown: barKeyDown
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: CodeEditor_module_css_default.findButton,
										onClick: replaceOne,
										children: labels.replaceOne
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: CodeEditor_module_css_default.findButton,
										onClick: replaceAll,
										children: labels.replaceAll
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: CodeEditor_module_css_default.findButton,
										"aria-label": labels.close,
										onClick: closeFind,
										children: "×"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CodeEditor_module_css_default.status,
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								"Ln ",
								caret.line,
								", Col ",
								caret.column
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Spaces: 2" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "UTF-8" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: (0, _deepseek_ai_dsh_client_ui_primitives.languageForPath)(name) ?? "text" })
						]
					})
				]
			});
		}
		//#endregion
		//#region ../ui-editor/src/client/marks.ts
		/** One hunk header's starting line numbers, from its @@ -a,b +c,d @@ text. */
		function starts(header) {
			const parsed = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/u.exec(header);
			return {
				old: Number.parseInt(parsed?.[1] ?? "1", 10),
				next: Number.parseInt(parsed?.[2] ?? "1", 10)
			};
		}
		/**
		* Build the per-line marks of one comparison.
		* @param hunks - the file's diff hunks, in file order.
		* @returns marks keyed by one-based new-file line number.
		*/
		function gutterMarks(hunks) {
			const marks = /* @__PURE__ */ new Map();
			for (const hunk of hunks) {
				let line = starts(hunk.header).next;
				let index = 0;
				const lines = hunk.lines;
				while (index < lines.length) {
					const current = lines[index];
					if (current === void 0) break;
					if (current.kind === "delete") {
						let deleted = 0;
						while (lines[index]?.kind === "delete") {
							deleted += 1;
							index += 1;
						}
						let inserted = 0;
						while (lines[index]?.kind === "add") {
							inserted += 1;
							const target = line + inserted - 1;
							marks.set(target, deleted > 0 ? "modified" : "added");
							index += 1;
						}
						if (inserted === 0) marks.set(Math.max(1, line), "deleted");
						line += inserted;
						continue;
					}
					if (current.kind === "add") {
						marks.set(line, "added");
						line += 1;
						index += 1;
						continue;
					}
					line += 1;
					index += 1;
				}
			}
			return marks;
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-editor/src/client/EditorPage.module.css.mjs
		const css$10 = "._8NH8ca_page{box-sizing:border-box;background:var(--dsw-alias-bg-base);min-width:0;height:100%;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}._8NH8ca_tabs{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);flex:none;gap:2px;height:36px;padding:4px 8px 0;display:flex;overflow-x:auto}[data-platform=darwin] ._8NH8ca_tabs{height:calc(36px + var(--dsh-frame-top-clearance,0px));padding-top:calc(4px + var(--dsh-frame-top-clearance,0px))}._8NH8ca_tab{border-radius:var(--dsw-radius-md) var(--dsw-radius-md) 0 0;color:var(--dsw-alias-label-secondary);flex:none;align-items:center;display:flex}._8NH8ca_tab[data-active=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}._8NH8ca_tabButton{max-width:220px;color:inherit;font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:6px;padding:6px 4px 6px 10px;font-size:13px;display:flex}._8NH8ca_tabName{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._8NH8ca_dot{corner-shape:round;background:var(--dsw-alias-state-warn-primary);border-radius:50%;flex:none;width:7px;height:7px}._8NH8ca_tabClose{border-radius:var(--dsw-radius-sm);width:20px;height:20px;color:inherit;cursor:pointer;background:0 0;border:0;flex:none;justify-content:center;align-items:center;margin-right:4px;padding:0;display:inline-flex}._8NH8ca_tabClose:hover{background:var(--dsw-alias-bg-layer-1)}._8NH8ca_bar{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:8px;height:36px;padding:0 12px;display:flex}._8NH8ca_path{min-width:0;font-family:var(--dsw-font-family-mono,ui-monospace, monospace);color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;flex:auto;font-size:12px;overflow:hidden}._8NH8ca_status{font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);flex:none;font-size:11px}._8NH8ca_actions{flex:none;align-items:center;gap:2px;display:flex}._8NH8ca_iconButton,._8NH8ca_iconPrimary{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;border-radius:8px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}._8NH8ca_iconButton:hover,._8NH8ca_iconButton[aria-pressed=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}._8NH8ca_iconPrimary{background:var(--dsw-alias-state-business-primary);color:#fff}._8NH8ca_iconPrimary:disabled{opacity:.4;cursor:default}._8NH8ca_iconButton:focus-visible,._8NH8ca_iconPrimary:focus-visible,._8NH8ca_tabButton:focus-visible,._8NH8ca_tabClose:focus-visible,._8NH8ca_editor:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}._8NH8ca_banner{border-bottom:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-state-warn-primary);flex-direction:column;flex:none;gap:2px;margin:0;padding:8px 12px;font-size:12px;display:flex}._8NH8ca_detail{color:var(--dsw-alias-label-secondary)}._8NH8ca_editor{box-sizing:border-box;background:var(--dsw-alias-bg-base);width:100%;min-height:0;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family-mono,ui-monospace, monospace);tab-size:2;resize:none;border:0;flex:auto;padding:12px 16px 32px;font-size:13px;line-height:20px}._8NH8ca_editor:focus{outline:none}._8NH8ca_modes{border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);flex:none;gap:2px;padding:2px;display:flex}._8NH8ca_diff{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);min-height:0;font-family:var(--dsw-font-family-mono,ui-monospace, monospace);flex:auto;padding-bottom:32px;font-size:12px;line-height:18px;overflow:auto}._8NH8ca_diffHead{border-bottom:.5px solid var(--dsw-alias-border-l2);font-family:var(--dsw-font-family-sans,system-ui, sans-serif);color:var(--dsw-alias-label-secondary);align-items:baseline;gap:8px;margin:0;padding:6px 16px;font-size:12px;display:flex}._8NH8ca_hunk{margin:0}._8NH8ca_hunkHeader{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);margin:0;padding:2px 16px;font-size:11px}._8NH8ca_diffLine{grid-template-columns:44px 44px 16px minmax(0,1fr);align-items:baseline;display:grid}._8NH8ca_lineNumber{font-variant-numeric:tabular-nums;text-align:right;color:var(--dsw-alias-label-secondary);padding-right:8px}._8NH8ca_marker{text-align:center;color:var(--dsw-alias-label-secondary)}._8NH8ca_diffText{overflow-wrap:anywhere;white-space:pre-wrap;padding-right:16px}._8NH8ca_diffLine[data-kind=add]{background:var(--dsw-alias-file-diff-added-bg)}._8NH8ca_diffLine[data-kind=add] ._8NH8ca_lineNumber{background:var(--dsw-alias-file-diff-added-gutter)}._8NH8ca_diffLine[data-kind=add] ._8NH8ca_marker{color:var(--dsw-alias-file-diff-added-marker)}._8NH8ca_diffLine[data-kind=delete]{background:var(--dsw-alias-file-diff-deleted-bg)}._8NH8ca_diffLine[data-kind=delete] ._8NH8ca_lineNumber{background:var(--dsw-alias-file-diff-deleted-gutter)}._8NH8ca_diffLine[data-kind=delete] ._8NH8ca_marker{color:var(--dsw-alias-file-diff-deleted-marker)}._8NH8ca_notice{text-align:center;color:var(--dsw-alias-label-secondary);margin:0;padding:56px 24px;font-size:13px}._8NH8ca_diffBar{gap:6px;padding:0 12px 8px;display:flex}._8NH8ca_rejectButton,._8NH8ca_acceptButton{border:.5px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:3px 8px;font-size:12px}._8NH8ca_rejectButton{margin-left:8px}._8NH8ca_rejectButton:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}._8NH8ca_acceptButton:hover{border-color:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}";
		const tagId$10 = "@deepseek-ai/dsh-workbench/EditorPage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$10;
			tag.textContent = css$10;
			document.head.appendChild(tag);
		}
		var EditorPage_module_css_default = {
			"acceptButton": "_8NH8ca_acceptButton",
			"actions": "_8NH8ca_actions",
			"banner": "_8NH8ca_banner",
			"bar": "_8NH8ca_bar",
			"detail": "_8NH8ca_detail",
			"diff": "_8NH8ca_diff",
			"diffBar": "_8NH8ca_diffBar",
			"diffHead": "_8NH8ca_diffHead",
			"diffLine": "_8NH8ca_diffLine",
			"diffText": "_8NH8ca_diffText",
			"dot": "_8NH8ca_dot",
			"editor": "_8NH8ca_editor",
			"hunk": "_8NH8ca_hunk",
			"hunkHeader": "_8NH8ca_hunkHeader",
			"iconButton": "_8NH8ca_iconButton",
			"iconPrimary": "_8NH8ca_iconPrimary",
			"lineNumber": "_8NH8ca_lineNumber",
			"marker": "_8NH8ca_marker",
			"modes": "_8NH8ca_modes",
			"notice": "_8NH8ca_notice",
			"page": "_8NH8ca_page",
			"path": "_8NH8ca_path",
			"rejectButton": "_8NH8ca_rejectButton",
			"status": "_8NH8ca_status",
			"tab": "_8NH8ca_tab",
			"tabButton": "_8NH8ca_tabButton",
			"tabClose": "_8NH8ca_tabClose",
			"tabName": "_8NH8ca_tabName",
			"tabs": "_8NH8ca_tabs"
		};
		//#endregion
		//#region ../ui-editor/src/client/EditorPage.tsx
		/**
		* The Editor page: a tab strip of open documents over one editable buffer, and
		* the same document's comparison against its repository when that is what the
		* user asked to see.
		*
		* Saving is explicit (⌘S or the Save control); the autosave switch makes a save
		* follow a pause in typing instead. A buffer the Host has moved past shows its
		* conflict in place, with the reload that discards the local edit and reads the
		* file as it stands.
		*/
		/** Two spaces, the indent one Tab inserts into the buffer. */
		const INDENT = "  ";
		/** The starting line numbers of one hunk, read from its `@@ -a,b +c,d @@` header. */
		function hunkStart(header) {
			const parsed = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/u.exec(header);
			return {
				old: Number.parseInt(parsed?.[1] ?? "1", 10),
				next: Number.parseInt(parsed?.[2] ?? "1", 10)
			};
		}
		/**
		* One hunk: its header, then each line with the numbers it holds on both sides.
		* @param props - the hunk to draw.
		* @returns the hunk block.
		*/
		function Hunk({ hunk, onReject, t }) {
			const start = hunkStart(hunk.header);
			let old = start.old;
			let next = start.next;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: EditorPage_module_css_default.hunk,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
					className: EditorPage_module_css_default.hunkHeader,
					children: [hunk.header, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: EditorPage_module_css_default.rejectButton,
						onClick: onReject,
						children: t("reject")
					})]
				}), hunk.lines.map((line, index) => {
					const oldNumber = line.kind === "add" ? "" : String(old);
					const newNumber = line.kind === "delete" ? "" : String(next);
					if (line.kind !== "add") old += 1;
					if (line.kind !== "delete") next += 1;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: EditorPage_module_css_default.diffLine,
						"data-kind": line.kind,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.lineNumber,
								children: oldNumber
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.lineNumber,
								children: newNumber
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.marker,
								"aria-hidden": "true",
								children: line.kind === "add" ? "+" : line.kind === "delete" ? "-" : " "
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.diffText,
								children: line.text
							})
						]
					}, index);
				})]
			});
		}
		/**
		* One document's comparison: its side, its hunks, or the reason there are none.
		* @param props - the document and the translator.
		* @returns the comparison view.
		*/
		function DiffView({ document, t, onAccept, onRejectHunk, onRejectFile }) {
			const diff = document.diff;
			if (diff === void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: EditorPage_module_css_default.notice,
				children: t("loading")
			});
			if (diff.kind === "unavailable") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: EditorPage_module_css_default.notice,
				children: t("noRepository")
			});
			if (diff.kind === "unchanged") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: EditorPage_module_css_default.notice,
				children: t("noChanges")
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: EditorPage_module_css_default.diff,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						className: EditorPage_module_css_default.diffHead,
						children: [
							diff.side === "worktree" ? t("workingTree") : t("staged"),
							diff.untracked && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.detail,
								children: t("untrackedFile")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.detail,
								children: diff.path
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: EditorPage_module_css_default.diffBar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: EditorPage_module_css_default.acceptButton,
							onClick: onAccept,
							children: t("acceptAll")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: EditorPage_module_css_default.rejectButton,
							onClick: onRejectFile,
							children: t("rejectAll")
						})]
					}),
					diff.binary && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: EditorPage_module_css_default.notice,
						children: t("binary")
					}),
					diff.hunks.map((hunk, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Hunk, {
						hunk,
						t,
						onReject: () => {
							onRejectHunk(index);
						}
					}, index)),
					diff.truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: EditorPage_module_css_default.note,
						children: t("truncated")
					})
				]
			});
		}
		/**
		* Render the Editor panel.
		* @param props - the main slot's runtime currency, the panel's injected face, and the translator.
		* @returns the page element.
		*/
		function EditorPage({ useEditor, activate, close, edit, save, reload, toggleAutosave, showDiff, showEdit, select, t, surface, expand, dock, reference, rejectHunk, rejectFile }) {
			const state = useEditor((snapshot) => snapshot);
			const active = state.documents.find((document) => document.id === state.active);
			const [preview, setPreview] = (0, react.useState)(false);
			const markdown = active !== void 0 && /\.(md|markdown)$/iu.test(active.name);
			(0, react.useEffect)(() => {
				setPreview(false);
			}, [active?.id]);
			const onKeyDown = (event) => {
				if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
					event.preventDefault();
					if (active !== void 0) save(active.id);
					return;
				}
				if (event.key !== "Tab" || active === void 0) return;
				event.preventDefault();
				const target = event.currentTarget;
				const start = target.selectionStart;
				const next = `${target.value.slice(0, start)}${INDENT}${target.value.slice(target.selectionEnd)}`;
				edit(active.id, next);
				const caret = start + 2;
				requestAnimationFrame(() => {
					target.setSelectionRange(caret, caret);
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: EditorPage_module_css_default.page,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: EditorPage_module_css_default.tabs,
						role: "tablist",
						children: state.documents.map((document) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: EditorPage_module_css_default.tab,
							"data-active": document.id === state.active,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								"aria-selected": document.id === state.active,
								className: EditorPage_module_css_default.tabButton,
								onClick: () => {
									activate(document.id);
								},
								children: [document.dirty && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: EditorPage_module_css_default.dot,
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: EditorPage_module_css_default.tabName,
									children: document.name
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: EditorPage_module_css_default.tabClose,
								"aria-label": `${t("close")} ${document.name}`,
								onClick: () => {
									close(document.id);
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutlineRegular, { size: 12 })
							})]
						}, document.id))
					}),
					active === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: EditorPage_module_css_default.notice,
						children: t("empty")
					}),
					active !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: EditorPage_module_css_default.bar,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: EditorPage_module_css_default.path,
									children: active.path
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: EditorPage_module_css_default.status,
									children: active.busy ? t("saving") : active.dirty ? t("unsaved") : t("saved")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: EditorPage_module_css_default.actions,
									children: [
										markdown && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: preview ? t("code") : t("preview"),
											"aria-label": preview ? t("code") : t("preview"),
											"aria-pressed": preview,
											onClick: () => {
												setPreview((value) => !value);
											},
											children: preview ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutlineRegular, { size: 15 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconInspectOutlineRegular, { size: 15 })
										}),
										state.gitAvailable && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: t("edit"),
											"aria-label": t("edit"),
											"aria-pressed": active.mode === "edit",
											onClick: () => {
												showEdit(active.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, { size: 15 })
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: t("diff"),
											"aria-label": t("diff"),
											"aria-pressed": active.mode === "diff",
											onClick: () => {
												showDiff(active.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCompareSplitOutlineRegular, { size: 15 })
										})] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: surface === "panel" ? t("expand") : t("dock"),
											"aria-label": surface === "panel" ? t("expand") : t("dock"),
											onClick: surface === "panel" ? expand : dock,
											children: surface === "panel" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFullscreenOutlineRegular, { size: 15 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutlineRegular, { size: 15 })
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: t("autosave"),
											"aria-label": t("autosave"),
											"aria-pressed": state.autosave,
											onClick: () => {
												toggleAutosave();
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconClockOutlineRegular, { size: 15 })
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconButton,
											title: t("reload"),
											"aria-label": t("reload"),
											onClick: () => {
												reload(active.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineRegular, { size: 15 })
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: EditorPage_module_css_default.iconPrimary,
											title: t("save"),
											"aria-label": t("save"),
											disabled: !active.dirty,
											onClick: () => {
												save(active.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutlineRegular, { size: 15 })
										})
									]
								})
							]
						}),
						active.conflict !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: EditorPage_module_css_default.banner,
							role: "alert",
							children: [t("conflict"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.detail,
								children: t("conflictKeep")
							})]
						}),
						active.failure !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: EditorPage_module_css_default.banner,
							role: "alert",
							children: [t("failed"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: EditorPage_module_css_default.detail,
								children: active.failure.message
							})]
						}),
						active.mode === "diff" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DiffView, {
							document: active,
							t,
							onAccept: () => {
								showEdit(active.id);
							},
							onRejectHunk: (index) => {
								rejectHunk(active.id, index);
							},
							onRejectFile: () => {
								rejectFile(active.id);
							}
						}) : preview && markdown ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MarkdownView, { text: active.text }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodeEditor, {
							value: active.text,
							name: active.name,
							ariaLabel: active.name,
							marks: active.diff?.kind === "ready" ? gutterMarks(active.diff.hunks) : void 0,
							labels: {
								find: t("find"),
								replace: t("replace"),
								next: t("findNext"),
								previous: t("findPrevious"),
								replaceOne: t("replaceOne"),
								replaceAll: t("replaceAll"),
								close: t("closeFind"),
								noMatches: t("noMatches")
							},
							onChange: (text) => {
								edit(active.id, text);
							},
							onSelect: (start, end) => {
								select(start, end);
							},
							onReference: reference,
							onKeyDown
						})
					] })
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-editor/src/client/OpenInEditorAction.module.css.mjs
		const css$9 = "._1UY9Oq_action{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);cursor:pointer;border:0;flex:none;padding:3px 10px;font-size:12px}._1UY9Oq_action:hover{background:var(--dsw-alias-bg-layer-1)}";
		const tagId$9 = "@deepseek-ai/dsh-workbench/OpenInEditorAction.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$9;
			tag.textContent = css$9;
			document.head.appendChild(tag);
		}
		var OpenInEditorAction_module_css_default = { "action": "_1UY9Oq_action" };
		//#endregion
		//#region ../ui-editor/src/client/OpenInEditorAction.tsx
		/**
		* Render the Edit action in the document header.
		* @param props - the previewed path, the injected open gesture, and the translator.
		* @returns the Edit button.
		*/
		function OpenInEditorAction({ absolutePath, open, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: OpenInEditorAction_module_css_default.action,
				onClick: () => {
					open(absolutePath);
				},
				children: t("edit")
			});
		}
		//#endregion
		//#region ../ui-editor/src/client/EditorPanelIcon.tsx
		/**
		* Render the edit glyph at the size the sidebar asks for.
		* @param props - the sidebar's icon share: the requested edge in pixels and whether the panel is selected.
		* @returns the icon element.
		*/
		function EditorPanelIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, { size });
		}
		//#endregion
		//#region ../ui-editor/src/client/model.ts
		/** Which two states one comparison reports. */
		/**
		* The new-side range one hunk header names.
		* @param header - the hunk's `@@ -a,b +c,d @@` header.
		* @returns the one-based start and line count, or undefined when malformed.
		*/
		function hunkRange(header) {
			const match = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/u.exec(header);
			if (match === null) return void 0;
			return {
				next: Number(match[1]),
				count: match[2] === void 0 ? 1 : Number(match[2])
			};
		}
		/** Whether a save follows a pause in typing, and how long the pause is. */
		const AUTOSAVE_DELAY_MS = 1200;
		/**
		* The tab identity of one document.
		* @param workspaceId - Workspace the path belongs to.
		* @param path - Workspace-relative path.
		* @returns the identity used to find and replace the document.
		*/
		function documentId(workspaceId, path) {
			return `${workspaceId}\u0000${path}`;
		}
		/** The display name of one path: its final segment. */
		function nameOf(path) {
			const cut = path.lastIndexOf("/");
			return cut === -1 ? path : path.slice(cut + 1);
		}
		/** Editor state plus the operations a panel drives. */
		var EditorModel = class {
			resolveRemote;
			locate;
			git;
			state;
			listeners = /* @__PURE__ */ new Set();
			generations = /* @__PURE__ */ new Map();
			autosaveTimer;
			/**
			* @param resolveRemote - resolves the generated `workspaceEditor` namespace, mounting it
			*   when the deployment's static Client assembly predates it.
			* @param locate - resolves the Workspace a caller's absolute path falls in.
			* @param git - the `git` namespace a comparison is asked of, absent in compositions without it.
			*/
			constructor(resolveRemote, locate, git) {
				this.resolveRemote = resolveRemote;
				this.locate = locate;
				this.git = git;
				this.state = {
					documents: [],
					autosave: false,
					gitAvailable: git !== void 0
				};
			}
			/**
			* Read the state a render should draw.
			* @returns the same reference until the state moves.
			*/
			getSnapshot() {
				return this.state;
			}
			/**
			* Observe state changes.
			* @param listener - called after every published state.
			* @returns the unsubscribe function.
			*/
			subscribe(listener) {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			/**
			* Open one document, revealing it when it is already open.
			* @param workspaceId - Workspace the path belongs to.
			* @param path - Workspace-relative path.
			*/
			open(workspaceId, path) {
				const id = documentId(workspaceId, path);
				if (this.state.documents.some((document) => document.id === id)) {
					this.publish({
						...this.state,
						active: id
					});
					return;
				}
				const document = {
					id,
					workspaceId,
					path,
					name: nameOf(path),
					saved: "",
					text: "",
					dirty: false,
					busy: true,
					mode: "edit"
				};
				this.publish({
					...this.state,
					documents: [...this.state.documents, document],
					active: id
				});
				this.load(id);
			}
			/**
			* Open the document at one absolute path, when a Workspace contains it.
			* @param absolutePath - absolute path of a file in the Host's execution world.
			* @returns whether the document was opened; `false` leaves the caller to open it another way.
			*/
			openAbsolute(absolutePath) {
				const located = this.locate(absolutePath);
				if (located === void 0) return false;
				const prefix = `${located.root.replace(/[/\\]+$/u, "")}/`;
				if (!absolutePath.startsWith(prefix)) return false;
				this.open(located.workspaceId, absolutePath.slice(prefix.length));
				return true;
			}
			/**
			* Close one document, dropping any unsaved buffer with it.
			* @param id - tab identity returned by {@link documentId}.
			*/
			close(id) {
				const documents = this.state.documents.filter((document) => document.id !== id);
				if (documents.length === this.state.documents.length) return;
				this.generations.set(id, (this.generations.get(id) ?? 0) + 1);
				const active = this.state.active === id ? documents[documents.length - 1]?.id : this.state.active;
				this.publish({
					...this.state,
					documents,
					...active === void 0 ? {} : { active }
				});
			}
			/**
			* Show one open document.
			* @param id - tab identity to activate.
			*/
			activate(id) {
				if (this.state.active === id || !this.state.documents.some((document) => document.id === id)) return;
				this.publish({
					...this.state,
					active: id
				});
			}
			/**
			* Remember the active buffer's selection, so a shortcut can name its lines.
			* @param start - selection start offset in the buffer.
			* @param end - selection end offset in the buffer.
			*/
			select(start, end) {
				const selection = this.state.selection;
				if (selection?.start === start && selection.end === end) return;
				this.publish({
					...this.state,
					selection: {
						start,
						end
					}
				});
			}
			/**
			* Replace one buffer's text.
			* @param id - tab identity to edit.
			* @param text - the complete new buffer.
			*/
			edit(id, text) {
				const document = this.find(id);
				if (document === void 0) return;
				this.patch(id, {
					text,
					dirty: text !== document.saved
				});
				if (this.state.autosave) this.armAutosave(id);
			}
			/**
			* Save one buffer at the version it was read from.
			* @param id - tab identity to save.
			*/
			async save(id) {
				const document = this.find(id);
				if (document === void 0 || document.busy || document.version === void 0 || !document.dirty) return;
				const generation = this.generations.get(id) ?? 0;
				this.patch(id, {
					busy: true,
					failure: void 0
				});
				const text = document.text;
				const result = await (await this.resolveRemote()).write(document.workspaceId, document.path, text, {
					kind: "replaceIfVersion",
					version: document.version
				});
				if ((this.generations.get(id) ?? 0) !== generation || this.find(id) === void 0) return;
				if (!result.ok) {
					const stale = result.error.code === "workspace-editor/stale";
					const current = stale ? result.error.details.current : void 0;
					this.patch(id, {
						busy: false,
						failure: result.error,
						conflict: stale ? current === void 0 ? {} : { current } : void 0
					});
					return;
				}
				this.patch(id, {
					saved: text,
					dirty: false,
					busy: false,
					version: result.value.version,
					bytes: result.value.bytes,
					failure: void 0,
					conflict: void 0,
					diff: void 0
				});
			}
			/**
			* Read the document again, replacing the buffer and clearing any conflict.
			* @param id - tab identity to reload.
			*/
			async reload(id) {
				if (this.find(id) === void 0) return;
				this.patch(id, {
					busy: true,
					conflict: void 0,
					failure: void 0
				});
				await this.load(id, true);
			}
			/** Turn autosave on or off, saving any dirty buffer when it is turned off. */
			toggleAutosave() {
				const autosave = !this.state.autosave;
				this.publish({
					...this.state,
					autosave
				});
				if (autosave) {
					const active = this.state.active;
					if (active !== void 0) this.armAutosave(active);
					return;
				}
				this.disarmAutosave();
				const dirty = this.state.documents.filter((document) => document.dirty);
				for (const document of dirty) this.save(document.id);
			}
			/**
			* Show one document's comparison, reading it on the first request.
			* @param id - tab identity to compare.
			*/
			showDiff(id) {
				const document = this.find(id);
				if (document === void 0) return;
				this.patch(id, { mode: "diff" });
				if (document.diff === void 0) this.loadDiff(id);
			}
			/**
			* Show one document's buffer.
			* @param id - tab identity to edit.
			*/
			showEdit(id) {
				this.patch(id, { mode: "edit" });
			}
			/**
			* Revert one comparison hunk to the repository's version.
			* @param id - tab identity.
			* @param index - hunk position in the comparison.
			*/
			async rejectHunk(id, index) {
				const document = this.find(id);
				const diff = document?.diff;
				if (document === void 0 || diff?.kind !== "ready") return;
				const hunk = diff.hunks[index];
				if (hunk === void 0) return;
				const range = hunkRange(hunk.header);
				if (range === void 0) return;
				const lines = document.text.split("\n");
				const at = range.count === 0 ? range.next : range.next - 1;
				lines.splice(at, range.count, ...hunk.lines.filter((line) => line.kind !== "add").map((line) => line.text));
				this.edit(id, lines.join("\n"));
				await this.save(id);
				await this.loadDiff(id);
			}
			/**
			* Revert one absolute path to its repository version, whether or not it is
			* already open in the Editor.
			* @param absolutePath - the file the review rejected.
			* @returns whether the file was reverted.
			*/
			async rejectPath(absolutePath) {
				const existing = this.state.documents.find((document) => document.absolutePath === absolutePath);
				if (existing !== void 0) {
					await this.rejectFile(existing.id);
					return true;
				}
				if (!this.openAbsolute(absolutePath)) return false;
				const opened = this.state.documents.find((document) => document.absolutePath === absolutePath);
				if (opened === void 0) return false;
				await this.rejectFile(opened.id);
				this.close(opened.id);
				return true;
			}
			/**
			* Revert every comparison hunk of one document.
			* @param id - tab identity.
			*/
			async rejectFile(id) {
				const document = this.find(id);
				const diff = document?.diff;
				if (document === void 0 || diff?.kind !== "ready") return;
				const lines = document.text.split("\n");
				for (const hunk of [...diff.hunks].reverse()) {
					const range = hunkRange(hunk.header);
					if (range === void 0) continue;
					const at = range.count === 0 ? range.next : range.next - 1;
					lines.splice(at, range.count, ...hunk.lines.filter((line) => line.kind !== "add").map((line) => line.text));
				}
				this.edit(id, lines.join("\n"));
				await this.save(id);
				await this.loadDiff(id);
			}
			/** Read one document's comparison against its repository. */
			async loadDiff(id) {
				const document = this.find(id);
				if (document === void 0) return;
				const unavailable = { kind: "unavailable" };
				const git = this.git;
				const absolute = document.absolutePath;
				if (git === void 0 || absolute === void 0) {
					this.patch(id, { diff: unavailable });
					return;
				}
				const located = await git.repository(document.workspaceId);
				if (this.find(id) === void 0) return;
				if (!located.ok || located.value.kind !== "repository") {
					this.patch(id, { diff: unavailable });
					return;
				}
				const root = located.value.repository.root.replace(/[/\\]+$/u, "");
				if (!absolute.startsWith(`${root}/`)) {
					this.patch(id, { diff: unavailable });
					return;
				}
				const path = absolute.slice(root.length + 1);
				const status = await git.status(document.workspaceId);
				if (this.find(id) === void 0) return;
				if (!status.ok) {
					this.patch(id, { diff: unavailable });
					return;
				}
				const entry = status.value.entries.find((candidate) => candidate.path === path);
				if (entry === void 0) {
					this.patch(id, { diff: { kind: "unchanged" } });
					return;
				}
				const side = entry.worktree !== "unmodified" ? "worktree" : "index";
				const compared = await git.diff(document.workspaceId, {
					path,
					...entry.from === void 0 ? {} : { from: entry.from },
					side: { kind: side }
				});
				if (this.find(id) === void 0) return;
				if (!compared.ok) {
					this.patch(id, { diff: unavailable });
					return;
				}
				this.patch(id, { diff: {
					kind: "ready",
					side,
					path,
					hunks: compared.value.hunks,
					binary: compared.value.binary,
					untracked: compared.value.untracked,
					truncated: compared.value.truncated
				} });
			}
			/** Stop publishing and cancel any pending save: the owning registration is gone. */
			dispose() {
				this.disarmAutosave();
				for (const document of this.state.documents) this.generations.set(document.id, (this.generations.get(document.id) ?? 0) + 1);
				this.listeners.clear();
			}
			find(id) {
				return this.state.documents.find((document) => document.id === id);
			}
			async load(id, replacing = false) {
				const document = this.find(id);
				if (document === void 0) return;
				const generation = (this.generations.get(id) ?? 0) + (replacing ? 1 : 0);
				if (replacing) this.generations.set(id, generation);
				const result = await (await this.resolveRemote()).read(document.workspaceId, document.path);
				if ((this.generations.get(id) ?? 0) !== generation || this.find(id) === void 0) return;
				if (!result.ok) {
					this.patch(id, {
						busy: false,
						failure: result.error
					});
					return;
				}
				this.patch(id, {
					saved: result.value.text,
					text: result.value.text,
					absolutePath: result.value.absolutePath,
					version: result.value.version,
					bytes: result.value.bytes,
					dirty: false,
					busy: false,
					failure: void 0,
					conflict: void 0,
					diff: void 0
				});
				this.loadDiff(id);
			}
			armAutosave(id) {
				this.disarmAutosave();
				this.autosaveTimer = setTimeout(() => {
					this.autosaveTimer = void 0;
					this.save(id);
				}, AUTOSAVE_DELAY_MS);
			}
			disarmAutosave() {
				if (this.autosaveTimer === void 0) return;
				clearTimeout(this.autosaveTimer);
				this.autosaveTimer = void 0;
			}
			/** Publish one document's change, keeping the others by identity. */
			patch(id, change) {
				const documents = this.state.documents.map((document) => {
					if (document.id !== id) return document;
					return {
						...document,
						...change
					};
				});
				this.publish({
					...this.state,
					documents
				});
			}
			/** Publish one state and notify every listener. */
			publish(state) {
				this.state = state;
				for (const listener of [...this.listeners]) listener();
			}
		};
		//#endregion
		//#region ../ui-editor/src/client/locales.ts
		/** Editor panel interface copy. */
		/** Simplified Chinese dictionary and key source of truth. */
		const zh$4 = {
			panel: "编辑器",
			title: "编辑器",
			empty: "没有打开的文档。",
			close: "关闭",
			expand: "全屏",
			reject: "拒绝",
			acceptAll: "全部接受",
			rejectAll: "全部拒绝",
			preview: "预览",
			code: "代码",
			dock: "停靠",
			tabGuide: "在对话旁边打开并编辑文件。",
			save: "保存",
			saving: "正在保存…",
			unsaved: "未保存",
			saved: "已保存",
			reload: "重新加载",
			autosave: "自动保存",
			conflict: "该文件在你打开期间已被改动。",
			conflictKeep: "你的改动仍在缓冲区里；重新加载会丢弃它们。",
			failed: "无法读取或写入该文档。",
			edit: "编辑",
			diff: "差异",
			find: "查找",
			replace: "替换为",
			findNext: "下一个匹配",
			findPrevious: "上一个匹配",
			replaceOne: "替换",
			replaceAll: "全部替换",
			closeFind: "关闭查找",
			noMatches: "无匹配",
			loading: "正在读取…",
			noRepository: "该文件不在 git 仓库内。",
			noChanges: "此文件相对仓库没有改动。",
			workingTree: "工作树改动",
			staged: "已暂存改动",
			untrackedFile: "未跟踪文件",
			binary: "二进制文件没有可显示的行。",
			truncated: "已按配置的上限截断。",
			"shortcut.reference": "把当前文件的引用插入输入框",
			"shortcut.referenceUnavailable": "没有可引用的文件或会话"
		};
		/** English dictionary checked against the Chinese key set. */
		const en$4 = {
			panel: "Editor",
			title: "Editor",
			empty: "No document is open.",
			close: "Close",
			expand: "Expand",
			reject: "Reject",
			acceptAll: "Accept all",
			rejectAll: "Reject all",
			preview: "Preview",
			code: "Code",
			dock: "Dock",
			tabGuide: "Open and edit a file beside the conversation.",
			save: "Save",
			saving: "Saving…",
			unsaved: "Unsaved",
			saved: "Saved",
			reload: "Reload",
			autosave: "Autosave",
			conflict: "This file changed while you had it open.",
			conflictKeep: "Your edit is still in the buffer; reloading discards it.",
			failed: "The document could not be read or written.",
			edit: "Edit",
			diff: "Diff",
			find: "Find",
			replace: "Replace",
			findNext: "Next match",
			findPrevious: "Previous match",
			replaceOne: "Replace",
			replaceAll: "Replace all",
			closeFind: "Close find",
			noMatches: "No matches",
			loading: "Reading…",
			noRepository: "This file is not inside a git repository.",
			noChanges: "This file has no change against the repository.",
			workingTree: "Working tree changes",
			staged: "Staged changes",
			untrackedFile: "Untracked file",
			binary: "A binary file has no lines to show.",
			truncated: "Cut at the configured limit.",
			"shortcut.reference": "Insert a reference to the open file",
			"shortcut.referenceUnavailable": "No open file or session to reference"
		};
		//#endregion
		//#region ../ui-editor/src/client/slots.ts
		/** The name this plugin provides its review actions under. */
		const WORKBENCH_REVIEW = "workbenchReview";
		/** The name this plugin provides its navigation under. */
		const EDITOR_NAVIGATION = "editorNavigation";
		//#endregion
		//#region ../ui-editor/src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS$3 = "editor";
		/**
		* The `@` mention for one path, quoted when it holds a space.
		* @param path - the document's path, as the Host reported it.
		* @returns the mention text a reference carries.
		*/
		function mentionOf(path) {
			return path.includes(" ") ? `@"${path}"` : `@${path}`;
		}
		/**
		* The selected lines of one buffer, in the `#L` form the app already reads in
		* file links: `#L24` for one line, `#L24-L30` for a span.
		* @param text - the buffer the offsets index into.
		* @param selection - the selection offsets, absent when the buffer has none.
		* @returns the mention fragment and the display suffix; both empty without a selection.
		*/
		function lineRangeOf(text, selection) {
			if (selection === void 0 || selection.end <= selection.start) return {
				fragment: "",
				label: ""
			};
			const start = lineOf(text, selection.start);
			const end = lineOf(text, selection.end);
			if (end <= start) return {
				fragment: `#L${String(start)}`,
				label: `:${String(start)}`
			};
			return {
				fragment: `#L${String(start)}-L${String(end)}`,
				label: `:${String(start)}-${String(end)}`
			};
		}
		/**
		* One-based line number of a buffer offset.
		* @param text - the buffer the offset indexes into.
		* @param offset - zero-based offset.
		* @returns the one-based line the offset falls on.
		*/
		function lineOf(text, offset) {
			let line = 1;
			for (let index = 0; index < offset && index < text.length; index += 1) if (text[index] === "\n") line += 1;
			return line;
		}
		/** The id shared by the sidebar entry and the main panel it opens. */
		const PANEL_ID = "editor";
		/** The right-panel tab kind this plugin owns, so the Editor can sit beside the conversation. */
		const EDITOR_TAB_KIND = "editor";
		/** The tab's identity, and the key its body registers under. */
		const EDITOR_TAB_ID = "@deepseek-ai/dsh-client-ui-editor";
		/** Required services: the slots, dictionaries, frame, workspaces, shortcuts, sessions, and the `workspaceEditor` namespace. */
		const inject$5 = [
			"slots",
			"locale",
			"layout",
			"workspaces",
			"remote",
			"shortcuts",
			"uiSession",
			"sidebarRight",
			"sidebarRightTabs"
		];
		/**
		* Contribute the Editor entry to the sidebar and the page it selects.
		* @param ctx - the browser plugin context.
		*/
		function apply$5(ctx) {
			ctx.effect(() => ctx.locale.register(NS$3, {
				zh: zh$4,
				en: en$4
			}), "ui-editor: dictionaries");
			const t = ctx.locale.bind(NS$3);
			let mounting;
			const ensureRemote = async () => {
				if (ctx.get("remote.workspaceEditor") !== void 0) return;
				mounting ??= (async () => {
					try {
						await ctx.remote.$mount(TYPERT_REMOTE$2);
					} catch (error) {
						if (ctx.get("remote.workspaceEditor") === void 0) throw error;
					} finally {
						mounting = void 0;
					}
				})();
				await mounting;
			};
			const editorService = () => {
				const service = ctx.get("remote.workspaceEditor");
				if (service === void 0) throw new Error("workspaceEditor: remote namespace is unavailable");
				return service;
			};
			ctx.slots.inject("main", function* () {
				const git = ctx.get("remote.git");
				const locate = (absolutePath) => {
					let best;
					for (const item of ctx.workspaces.list.getSnapshot().items) {
						const root = item.path.replace(/[/\\]+$/u, "");
						if (!absolutePath.startsWith(`${root}/`)) continue;
						if (best === void 0 || root.length > best.root.length) best = {
							workspaceId: item.workspaceId,
							root
						};
					}
					return best;
				};
				const model = new EditorModel(async () => {
					await ensureRemote();
					return editorService();
				}, locate, git);
				/**
				* The reference one gesture hands to the chat. The Editor owns the central
				* column, so its panel replaces the Conversation and unmounts the input:
				* the gesture records what it references and returns to the Conversation,
				* and the live subscription below delivers it as soon as that input exists.
				*/
				let pending;
				/**
				* Hand the pending reference to the session input the moment that input is
				* reachable. The shell lives in the Session scope, so it usually answers
				* even while the Conversation panel is hidden.
				*/
				const deliverPending = () => {
					if (pending === void 0) return;
					const actions = ctx.uiSession.adapter.current.getSnapshot().props.inputActions;
					if (actions?.insertReferenceAtCaret === void 0) return;
					const reference = pending;
					pending = void 0;
					actions.insertReferenceAtCaret(reference);
				};
				ctx.effect(() => ctx.uiSession.adapter.current.subscribe(deliverPending), "ui-editor: pending reference delivery");
				/**
				* Return to the Conversation, then deliver once its shell publishes input
				* actions. The editor surface has none, so delivering before the switch
				* would leave the reference undelivered.
				* @param reference - the reference to hand to the composer.
				*/
				const handOver = (reference) => {
					pending = reference;
					ctx.layout.selectPanel(null);
					const attempt = (tries) => {
						deliverPending();
						if (pending === void 0) return;
						const composer = document.querySelector("[contenteditable=\"true\"]");
						if (composer !== null) {
							composer.focus();
							const data = new DataTransfer();
							data.setData("text/plain", reference.clipboardText);
							composer.dispatchEvent(new ClipboardEvent("paste", {
								clipboardData: data,
								bubbles: true,
								cancelable: true
							}));
							pending = void 0;
							return;
						}
						if (tries < 40) window.setTimeout(() => {
							attempt(tries + 1);
						}, 50);
					};
					attempt(0);
				};
				/**
				* What one reference insertion would name: the document the Editor shows.
				* @returns the reference to hand over, or undefined when nothing is open.
				*/
				const referenceFor = () => {
					const state = model.getSnapshot();
					const document = state.documents.find((item) => item.id === state.active);
					if (document === void 0) return void 0;
					const range = lineRangeOf(document.text, state.selection);
					const mention = `${mentionOf(document.path)}${range.fragment}`;
					return {
						source: "reference",
						ref: mention,
						label: `${document.name}${range.label}`,
						appearance: "file",
						clipboardText: mention
					};
				};
				/**
				* What the page selection names when the Editor shows no document.
				*
				* The file inspector and the conversation both select plain text, so the
				* same gesture hands that text to the composer instead of blocking.
				* @returns the reference to hand over, or undefined when nothing is selected.
				*/
				const selectionReference = () => {
					const text = (window.getSelection()?.toString() ?? "").trim();
					if (text === "") return void 0;
					const collapsed = text.replace(/\s+/g, " ");
					return {
						source: "reference",
						ref: collapsed.slice(0, 2e3),
						label: collapsed.length > 60 ? `${collapsed.slice(0, 57)}…` : collapsed,
						clipboardText: text
					};
				};
				yield ctx.shortcuts.register({
					id: "editor.insertReference",
					label: () => t("shortcut.reference"),
					aliases: ["insert file reference", "referenciar fichero"],
					defaults: {
						"web:macos": {
							code: "KeyL",
							modifiers: ["primary", "alt"]
						},
						"web:windows": {
							code: "KeyL",
							modifiers: ["primary", "alt"]
						},
						"desktop:macos": {
							code: "KeyL",
							modifiers: ["primary"]
						},
						"desktop:windows": {
							code: "KeyL",
							modifiers: ["primary"]
						},
						"desktop:linux": {
							code: "KeyL",
							modifiers: ["primary"]
						}
					},
					regions: ["page", "editable"],
					modals: [],
					resolve: () => {
						const reference = referenceFor() ?? selectionReference();
						if (reference === void 0) return {
							status: "blocked",
							reason: t("shortcut.referenceUnavailable")
						};
						return {
							status: "handled",
							run: () => {
								handOver(reference);
							}
						};
					}
				});
				/**
				* The face both Editor surfaces render through.
				* @param surface - the docked right pane or the full-screen centre.
				* @returns the injected callbacks for that surface.
				*/
				const injected = (surface) => ({
					surface,
					hooks: { editor: model },
					activate: (id) => {
						model.activate(id);
					},
					close: (id) => {
						model.close(id);
						if (model.getSnapshot().documents.length === 0) {
							ctx.layout.selectPanel(null);
							restoreSidebar();
						}
					},
					edit: (id, text) => {
						model.edit(id, text);
					},
					save: async (id) => {
						await model.save(id);
					},
					reload: async (id) => {
						await model.reload(id);
					},
					toggleAutosave: () => {
						model.toggleAutosave();
					},
					showDiff: (id) => {
						model.showDiff(id);
					},
					showEdit: (id) => {
						model.showEdit(id);
					},
					select: (start, end) => {
						model.select(start, end);
					},
					reference: () => {
						const reference = referenceFor();
						if (reference !== void 0) handOver(reference);
					},
					rejectHunk: (id, index) => {
						model.rejectHunk(id, index);
					},
					rejectFile: (id) => {
						model.rejectFile(id);
					},
					expand: () => {
						ctx.layout.selectPanel(PANEL_ID);
					},
					dock: () => {
						ctx.layout.selectPanel(null);
						const openDocked = (attempt) => {
							try {
								ctx.sidebarRight.openTab(EDITOR_TAB_KIND);
							} catch {
								if (attempt < 20) window.setTimeout(() => {
									openDocked(attempt + 1);
								}, 50);
							}
						};
						window.setTimeout(() => {
							openDocked(0);
						}, 0);
						collapseSidebarForEditor();
					}
				});
				yield ctx.slots.register({
					name: "main",
					key: PANEL_ID,
					locale: NS$3,
					inject: () => injected("fullscreen")
				}, EditorPage);
				ctx.effect(() => ctx.sidebarRightTabs.register({
					id: EDITOR_TAB_ID,
					kind: EDITOR_TAB_KIND,
					priority: "builtin",
					title: () => t("title"),
					guide: [{
						id: "editor",
						order: 15,
						title: () => t("title"),
						description: () => t("tabGuide"),
						icon: _deepseek_ai_dsh_client_ui_primitives.IconFolderOpenRegular
					}]
				}), "ui-editor: tab type");
				yield ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
					name: "sidebar.right.pane.tab",
					key: EDITOR_TAB_ID,
					locale: NS$3,
					inject: () => injected("panel")
				}, EditorPage));
				yield () => {
					model.dispose();
				};
				let sidebarWasOpen = false;
				/**
				* Close the Workspaces column unless it already is.
				*/
				const collapseSidebarForEditor = () => {
					const layout = ctx.get("layout");
					if (layout === void 0 || typeof layout.sidebarCollapsed !== "boolean") return;
					if (layout.sidebarCollapsed) return;
					sidebarWasOpen = true;
					layout.setSidebarCollapsed(true);
				};
				/**
				* Restore the Workspaces column when the Editor had closed it.
				*/
				const restoreSidebar = () => {
					if (!sidebarWasOpen) return;
					sidebarWasOpen = false;
					const layout = ctx.get("layout");
					if (layout === void 0 || typeof layout.setSidebarCollapsed !== "function") return;
					layout.setSidebarCollapsed(false);
				};
				const disposeNavigation = ctx.reflect.provide(EDITOR_NAVIGATION, { open: (absolutePath) => {
					const opened = model.openAbsolute(absolutePath);
					if (opened) {
						ctx.sidebarRight.openTab(EDITOR_TAB_KIND);
						ctx.layout.selectPanel(null);
						collapseSidebarForEditor();
					}
					return opened;
				} });
				yield () => {
					disposeNavigation();
				};
				const disposeReview = ctx.reflect.provide(WORKBENCH_REVIEW, { rejectPath: async (absolutePath) => await model.rejectPath(absolutePath) });
				yield () => {
					disposeReview();
				};
				yield ctx.slots.inject("sidebar.right.tab.document.actions", () => ctx.slots.register({
					name: "sidebar.right.tab.document.actions",
					id: "editor",
					order: 10,
					locale: NS$3,
					inject: () => ({ open: (absolutePath) => {
						ctx.get("editorNavigation")?.open(absolutePath);
					} })
				}, OpenInEditorAction));
			});
			ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: PANEL_ID,
				order: 15,
				label: () => t("panel"),
				locale: NS$3
			}, EditorPanelIcon));
		}
		//#endregion
		//#region ../../api/session-manager-controller/lib/typert.remote-client.js
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_parameter_0$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_parameter_0$schema$value ??= object({
			"sessionId": string().readonly(),
			"displayTitle": string().readonly().optional()
		});
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_result$schema$value ??= object({
			"trashed": boolean().readonly(),
			"trashPath": string().readonly().optional()
		});
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_parameter_0$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_parameter_0$schema$value ??= object({ "cwd": string().readonly() });
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_result$schema$value ??= object({
			"available": boolean().readonly(),
			"files": record(string(), union([
				literal("modified"),
				literal("added"),
				literal("deleted"),
				literal("renamed")
			])).readonly().readonly()
		});
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_listTrash_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_listTrash_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_listTrash_result$schema$value ??= array(object({
			"name": string().readonly(),
			"sessionId": string().readonly(),
			"title": string().readonly(),
			"trashedAt": string().readonly(),
			"bytes": number().readonly()
		}));
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_parameter_0$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_parameter_0$schema$value ??= object({ "name": string().readonly() });
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_result$schema$value ??= object({
			"restored": boolean().readonly(),
			"purged": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_parameter_0$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_parameter_0$schema$value ??= object({ "name": string().readonly() });
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_result$schema$value ??= object({
			"restored": boolean().readonly(),
			"purged": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_sweep_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_sweep_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_sweep_result$schema$value ??= number();
		let _deepseek_ai_dsh_api_session_manager_controller_sessionManager_trash_result$schema$value;
		const _deepseek_ai_dsh_api_session_manager_controller_sessionManager_trash_result$schema = () => _deepseek_ai_dsh_api_session_manager_controller_sessionManager_trash_result$schema$value ??= object({
			"count": number().readonly(),
			"bytes": number().readonly(),
			"retentionDays": number().readonly()
		});
		const TYPERT_REMOTE$1 = {
			package: "@deepseek-ai/dsh-api-session-manager-controller",
			descriptors: [
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/delete",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "delete",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionDeleteRequest",
							create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionDeleteResult",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_delete_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 134,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/gitStatus",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "gitStatus",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#GitStatusRequest",
							create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#GitStatusResult",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_gitStatus_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 237,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/listTrash",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "listTrash",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/listTrash:result",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_listTrash_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 163,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/purgeTrash",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "purgeTrash",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionTrashRequest",
							create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionTrashResult",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_purgeTrash_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 199,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/restoreTrash",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "restoreTrash",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionTrashRequest",
							create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionTrashResult",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_restoreTrash_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 182,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/sweep",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "sweep",
					implementation: "sweepNow",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/sweep:result",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_sweep_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 227,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-session-manager-controller#sessionManager/trash",
					service: "sessionManager",
					namespace: "sessionManager",
					method: "trash",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-session-manager-controller/types#SessionTrashState",
						create: _deepseek_ai_dsh_api_session_manager_controller_sessionManager_trash_result$schema
					},
					sourceLocation: {
						"file": "packages/api/session-manager-controller/src/index.ts",
						"line": 215,
						"column": 9
					}
				}
			]
		};
		//#endregion
		//#region ../ui-session-manager/src/client/DeleteSession.tsx
		/**
		* Render the delete row.
		* @param props - the row identity, the injected delete gesture, and the locale seat.
		* @returns the menu row.
		*/
		function DeleteSessionMenuItem({ sessionId, displayTitle, useMenuOpenState, deleteSession, t }) {
			const [, setMenuOpen] = useMenuOpenState();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.MenuItemButton, {
				danger: true,
				separatorBefore: true,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 14 }),
				onSelect: () => {
					setMenuOpen(false);
					deleteSession(sessionId, displayTitle);
				},
				children: t("deleteSession")
			});
		}
		//#endregion
		//#region ../ui-session-manager/src/client/definition.tsx
		/**
		* The `trash` tab type: a page the frame's right rail opens by kind, not a
		* viewer that claims an address.
		*/
		/** The tab kind this plugin owns. */
		const TRASH_KIND = "trash";
		/** This implementation's identity in the tab system, and the key its body registers under. */
		const TRASH_ID = "@deepseek-ai/dsh-client-ui-session-manager";
		/**
		* The trash type's registry definition.
		* @param t - namespace-bound translate, read fresh on every label call.
		* @returns the definition to register.
		*/
		function trashDefinition(t) {
			return {
				id: TRASH_ID,
				kind: TRASH_KIND,
				priority: "builtin",
				title: () => t("trash.title"),
				guide: [{
					id: "trash",
					order: 30,
					title: () => t("trash.title"),
					description: () => t("guide.description"),
					icon: _deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular
				}]
			};
		}
		//#endregion
		//#region ../ui-session-manager/src/client/locales.ts
		/** Session manager copy: the delete action and the trash browser. */
		/** Dictionary namespace owned by this plugin. */
		const NS$2 = "sessionManager";
		/** Simplified Chinese dictionary and key source of truth. */
		const zh$3 = {
			deleteSession: "删除会话",
			"trash.title": "回收站",
			"rail.files": "文件",
			"rail.terminal": "终端",
			"guide.description": "查看已删除的会话。",
			"trash.empty": "回收站是空的。",
			"trash.restore": "恢复",
			"trash.purge": "彻底删除"
		};
		/** English dictionary checked against the Chinese key set. */
		const en$3 = {
			deleteSession: "Delete session",
			"trash.title": "Trash",
			"rail.files": "Files",
			"rail.terminal": "Terminal",
			"guide.description": "Browse deleted sessions.",
			"trash.empty": "The trash is empty.",
			"trash.restore": "Restore",
			"trash.purge": "Delete forever"
		};
		//#endregion
		//#region ../ui-session-manager/src/client/FileDragShim.tsx
		/**
		* Two enhancements for the in-box Workspace file tree, applied from outside it.
		*
		* The deployment's tree predates the drag source and does not know git. It
		* already marks every row with `data-files-entry` and its absolute
		* `data-files-path`, so this overlay adds both without replacing the panel:
		* rows become drag sources carrying the workspace-relative path, file names
		* take the colour of their working-tree state (green added, yellow modified),
		* and a folder takes the strongest state found under it.
		*
		* It replaces no package and owns no service, so it cannot strand another
		* plugin the way a panel replacement can.
		*/
		/** The custom payload the reference drop target reads first. */
		const FILE_PATH_DRAG_MIME = "application/x-dsh-path";
		/** How often the working tree is re-read while the panel is open. */
		const REFRESH_MS = 5e3;
		/** Name colour per working-tree state. */
		const KIND_COLOR = {
			added: "var(--dsw-alias-state-success-primary)",
			modified: "var(--dsw-alias-state-warn-primary)",
			renamed: "var(--dsw-alias-state-warn-primary)",
			deleted: "var(--dsw-alias-state-error-primary)"
		};
		/** Longest directory prefix every listed row shares, which is the workspace root. */
		function workspaceRoot() {
			const paths = [...document.querySelectorAll("[data-files-entry]")].map((element) => element.getAttribute("data-files-path")).filter((path) => path !== null && path.startsWith("/"));
			if (paths.length === 0) return void 0;
			let prefix = paths[0] ?? "";
			for (const path of paths) while (prefix !== "" && !path.startsWith(prefix)) prefix = prefix.slice(0, prefix.lastIndexOf("/"));
			return prefix.includes("/") ? prefix : void 0;
		}
		/** The row's path relative to the workspace root. */
		function relativePath(path) {
			const root = workspaceRoot();
			return root !== void 0 && path.startsWith(`${root}/`) ? path.slice(root.length + 1) : path;
		}
		/** Mark one row with its state, or clear the mark when it has none. */
		function mark(row, kind) {
			const button = row.querySelector("button");
			if (kind === void 0) {
				row.removeAttribute("data-git-status");
				if (button !== null) button.style.color = "";
			} else {
				row.setAttribute("data-git-status", kind);
				if (button !== null) button.style.color = KIND_COLOR[kind];
			}
		}
		/** The strongest state among the changed paths under one folder. */
		function folderKind(changed, prefix) {
			let found;
			for (const [path, kind] of changed) {
				if (!path.startsWith(prefix)) continue;
				if (kind === "modified" || kind === "renamed") return "modified";
				if (kind === "added") found = "added";
				else if (kind === "deleted" && found === void 0) found = "deleted";
			}
			return found;
		}
		/** Install the drag source, the git tint on files, and the folder rollup. */
		function FilesOverlay({ status, open }) {
			(0, react.useEffect)(() => {
				let files = {};
				const paint = () => {
					const changed = Object.entries(files);
					for (const row of document.querySelectorAll("[data-files-entry=\"file\"]")) {
						const path = row.getAttribute("data-files-path");
						if (path !== null) mark(row, files[relativePath(path)]);
					}
					for (const row of document.querySelectorAll("[data-files-entry=\"directory\"]")) {
						const path = row.getAttribute("data-files-path");
						if (path === null) continue;
						const relative = relativePath(path);
						if (relative === "") continue;
						mark(row, folderKind(changed, `${relative}/`));
					}
				};
				const enhance = () => {
					for (const row of document.querySelectorAll("[data-files-entry=\"file\"]")) {
						if (row.getAttribute("data-drag-shim") === "true") continue;
						row.setAttribute("data-drag-shim", "true");
						row.setAttribute("draggable", "true");
						row.addEventListener("dragstart", (event) => {
							const transfer = event instanceof DragEvent ? event.dataTransfer : null;
							if (transfer === null) return;
							const path = row.getAttribute("data-files-path");
							if (path === null) return;
							const relative = relativePath(path);
							transfer.setData(FILE_PATH_DRAG_MIME, relative);
							transfer.setData("text/plain", `@${relative}`);
							transfer.effectAllowed = "copy";
						});
						row.addEventListener("click", (event) => {
							const path = row.getAttribute("data-files-path");
							if (path === null) return;
							event.preventDefault();
							event.stopPropagation();
							open(path);
						}, true);
					}
					paint();
				};
				const refresh = () => {
					const root = workspaceRoot();
					if (root === void 0) return;
					status(root).then((result) => {
						if (!result.available) return;
						files = result.files;
						paint();
					}).catch(() => {});
				};
				const observer = new MutationObserver(enhance);
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
				enhance();
				refresh();
				const timer = window.setInterval(refresh, REFRESH_MS);
				window.addEventListener("focus", refresh);
				return () => {
					observer.disconnect();
					window.clearInterval(timer);
					window.removeEventListener("focus", refresh);
				};
			}, [status]);
			return null;
		}
		//#endregion
		//#region ../ui-session-manager/src/client/RailGlyphs.tsx
		/**
		* The Files rail glyph.
		* @param props - the rail's icon edge.
		* @returns the workspace tree glyph.
		*/
		function FilesRailIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconWorkspaceTreeOutlineRegular, { size });
		}
		/**
		* The Terminal rail glyph: a prompt mark drawn with `currentColor`, so the rail
		* lights it like any other tool.
		* @param props - the rail's icon edge.
		* @returns the prompt glyph.
		*/
		function TerminalRailIcon$1({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				strokeWidth: 1.2,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "1.6",
						y: "2.6",
						width: "12.8",
						height: "10.8",
						rx: "2.2",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M4.4 6.2L6.6 8L4.4 9.8",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M7.6 10H11.2",
						stroke: "currentColor"
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-session-manager/src/client/TrashPanel.module.css.mjs
		const css$8 = ".jXwvdW_empty{color:var(--dsw-alias-label-secondary);text-align:center;margin:0;padding:24px 16px;font-size:13px}.jXwvdW_titleIcon{color:var(--dsw-alias-label-secondary);flex:none}.jXwvdW_list{margin:0;padding:0;list-style:none}.jXwvdW_row{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l2);align-items:center;gap:10px;padding:8px 12px;font-size:12px;display:flex}.jXwvdW_title{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:auto;overflow:hidden}.jXwvdW_when{min-width:110px;color:var(--dsw-alias-label-primary);flex:none}.jXwvdW_size{min-width:64px;font-family:var(--ds-font-family-code);color:var(--dsw-alias-label-tertiary);flex:none}.jXwvdW_actions{flex:auto;justify-content:flex-end;gap:6px;display:inline-flex}";
		const tagId$8 = "@deepseek-ai/dsh-workbench/TrashPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		var TrashPanel_module_css_default = {
			"actions": "jXwvdW_actions",
			"empty": "jXwvdW_empty",
			"list": "jXwvdW_list",
			"row": "jXwvdW_row",
			"size": "jXwvdW_size",
			"title": "jXwvdW_title",
			"titleIcon": "jXwvdW_titleIcon",
			"when": "jXwvdW_when"
		};
		//#endregion
		//#region ../ui-session-manager/src/client/TrashPanel.tsx
		/**
		* The trash browser: what the deletes hold, with Restore and Delete forever.
		*
		* The list is loaded once per mount and after every action; the entries are the
		* Host's, so nothing here is derived.
		*/
		/** One entry's size, with a localized unit. */
		const BYTES = new Intl.NumberFormat(void 0, {
			style: "unit",
			unit: "byte",
			notation: "compact",
			maximumFractionDigits: 1
		});
		/** One entry's delete time, in the reader's locale. */
		const WHEN = new Intl.DateTimeFormat(void 0, {
			dateStyle: "short",
			timeStyle: "short"
		});
		/**
		* Render the trash list.
		* @param props - the Host actions and the locale seat.
		* @returns the list, or the empty state.
		*/
		function TrashPanel({ list, restore, purge, useTrashRevision, t }) {
			const revision = useTrashRevision((value) => value);
			const [entries, setEntries] = (0, react.useState)([]);
			const [busy, setBusy] = (0, react.useState)(false);
			const refresh = (0, react.useCallback)(() => {
				list().then(setEntries).catch(() => {
					setEntries([]);
				});
			}, [list]);
			(0, react.useEffect)(() => {
				refresh();
			}, [refresh, revision]);
			const settle = (action, name) => {
				setBusy(true);
				action(name).then(() => {
					setBusy(false);
					refresh();
				}).catch(() => {
					setBusy(false);
				});
			};
			if (entries.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: TrashPanel_module_css_default.empty,
				children: t("trash.empty")
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: TrashPanel_module_css_default.list,
				children: entries.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: TrashPanel_module_css_default.row,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TrashPanel_module_css_default.title,
							title: entry.title,
							children: entry.title
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TrashPanel_module_css_default.when,
							children: WHEN.format(new Date(entry.trashedAt))
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TrashPanel_module_css_default.size,
							children: BYTES.format(entry.bytes)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: TrashPanel_module_css_default.actions,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: busy,
								onClick: () => {
									settle(restore, entry.name);
								},
								children: t("trash.restore")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: busy,
								onClick: () => {
									settle(purge, entry.name);
								},
								children: t("trash.purge")
							})]
						})
					]
				}, entry.name))
			});
		}
		//#endregion
		//#region ../ui-session-manager/src/client/TrashRailIcon.tsx
		/**
		* Render the trash glyph.
		* @param props - the rail's icon edge.
		* @returns the glyph.
		*/
		function TrashRailIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, { size });
		}
		//#endregion
		//#region ../ui-session-manager/src/client/TrashTitle.tsx
		/**
		* The title as the chip shows it.
		* @param props - the tab information hook.
		* @returns the trash glyph followed by the tab's title text.
		*/
		function TrashTitle({ useTabInfo }) {
			const { tab } = useTabInfo();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, {
				size: 16,
				className: TrashPanel_module_css_default.titleIcon
			}), tab.title] });
		}
		//#endregion
		//#region ../ui-session-manager/src/client/index.ts
		/** Services this plugin reads: slots, its dictionaries, the Remote store, and the right Sidebar's tab registry. */
		const inject$4 = [
			"slots",
			"locale",
			"remote",
			"sidebarRightTabs"
		];
		/**
		* Contribute the Delete session row and the Trash tab.
		* @param ctx - the browser plugin context.
		*/
		function apply$4(ctx) {
			ctx.effect(() => ctx.locale.register(NS$2, {
				zh: zh$3,
				en: en$3
			}), "ui-session-manager: dictionaries");
			const t = ctx.locale.bind(NS$2);
			let mounting;
			const ensureRemote = async () => {
				if (ctx.get("remote.sessionManager") !== void 0) return;
				mounting ??= (async () => {
					try {
						await ctx.remote.$mount(TYPERT_REMOTE$1);
					} catch (error) {
						if (ctx.get("remote.sessionManager") === void 0) throw error;
					} finally {
						mounting = void 0;
					}
				})();
				await mounting;
			};
			const service = () => {
				const found = ctx.get("remote.sessionManager");
				if (found === void 0) throw new Error("sessionManager: remote namespace is unavailable");
				return found;
			};
			let trashRevision = 0;
			const trashListeners = /* @__PURE__ */ new Set();
			const trashChanges = {
				getSnapshot: () => trashRevision,
				subscribe: (listener) => {
					trashListeners.add(listener);
					return () => {
						trashListeners.delete(listener);
					};
				}
			};
			const movedTrash = () => {
				trashRevision += 1;
				for (const listener of [...trashListeners]) listener();
			};
			ctx.slots.inject("sidebar.workspaces.session.menu.item", () => ctx.slots.register({
				name: "sidebar.workspaces.session.menu.item",
				id: "delete",
				order: 450,
				locale: NS$2,
				inject: () => ({ deleteSession: (sessionId, displayTitle) => {
					ensureRemote().then(() => service().delete({
						sessionId,
						displayTitle
					})).then(() => {
						movedTrash();
					}).catch((reason) => {
						movedTrash();
						console.warn("session delete rejected:", reason);
					});
				} })
			}, DeleteSessionMenuItem));
			ctx.effect(() => ctx.sidebarRightTabs.register(trashDefinition(t)), "ui-session-manager: trash type");
			const trashInjected = () => ({
				hooks: { trashRevision: trashChanges },
				list: async () => {
					await ensureRemote();
					const result = await service().listTrash();
					return result.ok ? result.value : [];
				},
				restore: async (name) => {
					await ensureRemote();
					return service().restoreTrash({ name });
				},
				purge: async (name) => {
					await ensureRemote();
					return service().purgeTrash({ name });
				}
			});
			ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
				name: "sidebar.right.pane.tab",
				key: TRASH_ID,
				locale: NS$2,
				inject: trashInjected
			}, TrashPanel));
			ctx.slots.inject("sidebar.right.pane.tab.title", () => ctx.slots.register({
				name: "sidebar.right.pane.tab.title",
				key: TRASH_ID
			}, TrashTitle));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "files-overlay",
				inject: () => ({
					status: async (cwd) => {
						await ensureRemote();
						const result = await service().gitStatus({ cwd });
						return result.ok ? result.value : {
							available: false,
							files: {}
						};
					},
					open: (absolutePath) => {
						ctx.get("editorNavigation")?.open(absolutePath);
					}
				})
			}, FilesOverlay));
			ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: TRASH_KIND,
				order: 1e3,
				label: () => t("trash.title"),
				locale: NS$2
			}, TrashRailIcon));
			ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: "files",
				order: 10,
				label: () => t("rail.files"),
				locale: NS$2
			}, FilesRailIcon));
			ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: "terminal",
				order: 45,
				label: () => t("rail.terminal"),
				locale: NS$2
			}, TerminalRailIcon$1));
		}
		//#endregion
		//#region ../ui-deliverables/src/changes.ts
		/** Authenticated GET route serving one announced change summary while its Session lives. */
		const CHANGED_FILES_PATH = "/api/changes.summary";
		/** Authenticated GET route serving one listed file's turn-start and turn-end comparison while its Session lives. */
		const CHANGES_DIFF_PATH = "/api/changes.diff";
		/** Authenticated POST route for opening a changed file on the Host desktop. */
		const CHANGES_OPEN_PATH = "/api/changes.open";
		/**
		* Browser-relative form of {@link CHANGED_FILES_PATH}; see
		* .agents/notes/implemented/architecture/2026-09-14-web-document-relative-app-routes.md.
		*/
		const CHANGED_FILES_ROUTE = CHANGED_FILES_PATH.slice(1);
		/** Browser-relative form of {@link CHANGES_DIFF_PATH}. */
		const CHANGES_DIFF_ROUTE = CHANGES_DIFF_PATH.slice(1);
		/** Browser-relative form of {@link CHANGES_OPEN_PATH}. */
		const CHANGES_OPEN_ROUTE = CHANGES_OPEN_PATH.slice(1);
		/** Resource-address prefix of a turn's review tab in the right Sidebar. */
		const CHANGES_REVIEW_ADDRESS = "dsh-resource://changes-review/session/";
		function isRecord$1(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		/**
		* Validate one changed-file record read from the summary route.
		* @param value - decoded JSON.
		* @returns whether the record carries a path, a display path, and line counts.
		*/
		function isChangedFile(value) {
			if (!isRecord$1(value)) return false;
			const { path, display, added, deleted, binary, oversized } = value;
			return typeof path === "string" && path.length > 0 && typeof display === "string" && display.length > 0 && Number.isSafeInteger(added) && Number.isSafeInteger(deleted) && (binary === void 0 || binary === true) && (oversized === void 0 || oversized === true);
		}
		/**
		* Validate a summary read from the summary route.
		* @param value - decoded JSON.
		* @returns whether the value identifies a turn, a complete file list, the total count, and the line totals.
		*/
		function isChangesSummary(value) {
			if (!isRecord$1(value)) return false;
			const { turn, files, total, added, deleted } = value;
			return Number.isSafeInteger(turn) && turn >= 1 && Number.isSafeInteger(total) && Number.isSafeInteger(added) && Number.isSafeInteger(deleted) && Array.isArray(files) && files.every(isChangedFile);
		}
		function isHunk(value) {
			if (!isRecord$1(value)) return false;
			const { oldStart, oldLines, newStart, newLines, lines } = value;
			return [
				oldStart,
				oldLines,
				newStart,
				newLines
			].every((field) => Number.isSafeInteger(field) && field >= 0) && Array.isArray(lines) && lines.every((line) => typeof line === "string" && /^[+ -]/.test(line));
		}
		/**
		* Validate a comparison read from the comparison route.
		* @param value - decoded JSON.
		* @returns whether the value is a text comparison with well-formed hunks, or a binary or oversized refusal.
		*/
		function isChangesDiff(value) {
			if (!isRecord$1(value)) return false;
			const { kind, path, display } = value;
			if (typeof path !== "string" || path.length === 0 || typeof display !== "string" || display.length === 0) return false;
			if (kind === "binary" || kind === "oversized") return true;
			if (kind !== "text") return false;
			const { before, after, hunks, coarse } = value;
			return typeof before === "boolean" && typeof after === "boolean" && typeof coarse === "boolean" && Array.isArray(hunks) && hunks.every(isHunk);
		}
		/**
		* Validate the `workspace/changes` event data read from a Session log.
		* @param value - decoded durable event data.
		* @returns whether the event names a turn.
		*/
		function isChangesEvent(value) {
			return isRecord$1(value) && Number.isSafeInteger(value.turn) && value.turn >= 1;
		}
		/**
		* Build authenticated coordinates for the summary one `workspace/changes` event announced.
		* @param sessionId - owning Session.
		* @param seq - event sequence.
		* @returns document-relative summary route.
		*/
		function changesSummaryUrl(sessionId, seq) {
			return `${CHANGED_FILES_ROUTE}?${new URLSearchParams({
				sessionId,
				seq: String(seq)
			})}`;
		}
		/**
		* Build authenticated coordinates for one listed file's comparison.
		* @param sessionId - owning Session.
		* @param seq - workspace/changes event sequence.
		* @param index - original index in the summary's files array.
		* @returns document-relative comparison route.
		*/
		function changesDiffUrl(sessionId, seq, index) {
			return `${CHANGES_DIFF_ROUTE}?${new URLSearchParams({
				sessionId,
				seq: String(seq),
				index: String(index)
			})}`;
		}
		/**
		* Build authenticated coordinates for a changed file's native open.
		* @param sessionId - owning Session.
		* @param seq - workspace/changes event sequence.
		* @param index - original index in the summary's files array.
		* @returns document-relative action route.
		*/
		function changedFileUrl(sessionId, seq, index) {
			return `${CHANGES_OPEN_ROUTE}?${new URLSearchParams({
				sessionId,
				seq: String(seq),
				index: String(index)
			})}`;
		}
		/**
		* The right-Sidebar address of one turn's review. The Session and the event
		* sequence identify the content; the turn rides along for the tab title.
		* @param coordinates - viewed Session, announcing event, and turn.
		* @returns a `dsh-resource://changes-review/session/…` address.
		*/
		function changesReviewAddress(coordinates) {
			const { sessionId, seq, turn } = coordinates;
			return `${CHANGES_REVIEW_ADDRESS}${encodeURIComponent(sessionId)}/${seq}/${turn}`;
		}
		/**
		* Read the coordinates back out of a review address.
		* @param address - a resource address.
		* @returns the coordinates, or undefined for any other address.
		*/
		function parseChangesReviewAddress(address) {
			if (!address.startsWith("dsh-resource://changes-review/session/")) return void 0;
			const parts = address.slice(38).split("/");
			if (parts.length !== 3) return void 0;
			const [sessionId, seq, turn] = parts;
			if (sessionId === "" || !/^\d+$/.test(seq) || !/^[1-9]\d*$/.test(turn)) return void 0;
			try {
				return {
					sessionId: decodeURIComponent(sessionId),
					seq: Number(seq),
					turn: Number(turn)
				};
			} catch {
				return;
			}
		}
		//#endregion
		//#region ../ui-deliverables/src/client/host-read-store.ts
		/**
		* Fetch-once cache of Host-served records keyed by their authenticated URL:
		* one read per URL while a state stands, cleared on connection replacement,
		* cancelled on disposal. Each store decides what a response means and which
		* states a later request reads again.
		*/
		/** One browser plugin's reads of one record kind. */
		var HostReadStore = class {
			policy;
			/** Record URLs key the state across Sessions and turns. */
			state = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({});
			lifetime = new AbortController();
			/** The connection generation the current states belong to; a reset aborts it so no older read publishes. */
			generation = new AbortController();
			pending = /* @__PURE__ */ new Set();
			constructor(policy) {
				this.policy = policy;
			}
			/**
			* Read one URL unless a state the policy keeps already stands for it.
			* @param url - the record's authenticated URL.
			* @returns after the state is published.
			*/
			async loadUrl(url) {
				const current = this.state.getSnapshot()[url];
				if (this.lifetime.signal.aborted || current !== void 0 && !this.policy.retryable(current)) return;
				this.state.update((state) => {
					state[url] = this.policy.loading;
				});
				const task = this.read(url, AbortSignal.any([this.lifetime.signal, this.generation.signal]));
				this.pending.add(task);
				try {
					await task;
				} finally {
					this.pending.delete(task);
				}
			}
			/** Forget every state and abandon in-flight reads; a replaced connection may reach a Host that no longer serves them. */
			reset() {
				this.generation.abort();
				this.generation = new AbortController();
				this.state.set({});
			}
			/** Cancel outstanding reads and wait until none can publish state. */
			async dispose() {
				this.lifetime.abort();
				await Promise.all(this.pending);
			}
			async read(url, signal) {
				let next;
				try {
					next = await this.policy.decode(await fetch(url, { signal }));
				} catch {
					next = this.policy.failed;
				}
				if (!signal.aborted) this.state.update((state) => {
					state[url] = next;
				});
			}
		};
		//#endregion
		//#region ../ui-deliverables/src/client/changes-diff.ts
		/** One browser plugin's comparison reads; a failed read is the one state a later request replaces. */
		var ChangesDiffStore = class extends HostReadStore {
			constructor() {
				super({
					loading: "loading",
					failed: "error",
					retryable: (state) => state === "error",
					decode: async (response) => {
						if (response.status === 404) return "missing";
						if (!response.ok) return "error";
						const value = await response.json();
						return isChangesDiff(value) ? value : "error";
					}
				});
			}
			/**
			* Read one comparison; a cached comparison or a missing one is kept, a failed one is read again.
			* @param sessionId - viewed Session.
			* @param seq - the announcing event's sequence.
			* @param index - the file's index in the summary.
			* @returns after the state is published.
			*/
			load(sessionId, seq, index) {
				return this.loadUrl(changesDiffUrl(sessionId, seq, index));
			}
		};
		//#endregion
		//#region ../ui-deliverables/src/client/changes-summary.ts
		/** One browser plugin's summary reads; a summary or a missing answer is kept until the connection is replaced. */
		var ChangesSummaryStore = class extends HostReadStore {
			constructor() {
				super({
					loading: "loading",
					failed: "missing",
					retryable: () => false,
					decode: async (response) => {
						if (!response.ok) return "missing";
						const value = await response.json();
						return isChangesSummary(value) ? value : "missing";
					}
				});
			}
			/**
			* Read one summary once; a later read of the same coordinates returns the cached state.
			* @param sessionId - viewed Session.
			* @param seq - the announcing event's sequence.
			* @returns after the state is published.
			*/
			load(sessionId, seq) {
				return this.loadUrl(changesSummaryUrl(sessionId, seq));
			}
		};
		//#endregion
		//#region ../ui-deliverables/src/presented.ts
		/** Authenticated POST route for opening a workspace file on the Host desktop. */
		const PRESENT_OPEN_PATH = "/api/present.open";
		/** Authenticated desktop availability and destination metadata. */
		const PRESENT_HOST_PATH = "/api/present.host";
		/**
		* Browser-relative form of {@link PRESENT_OPEN_PATH}; see
		* .agents/notes/implemented/architecture/2026-09-14-web-document-relative-app-routes.md.
		*/
		const PRESENT_OPEN_ROUTE = PRESENT_OPEN_PATH.slice(1);
		/** Browser-relative form of {@link PRESENT_HOST_PATH}. */
		const PRESENT_HOST_ROUTE = PRESENT_HOST_PATH.slice(1);
		/**
		* Validate desktop metadata received over HTTP.
		* @param value - decoded response.
		* @returns whether all displayed and actionable fields are supported.
		*/
		function isPresentedHost(value) {
			if (typeof value !== "object" || value === null) return false;
			const host = value;
			return typeof host.name === "string" && typeof host.available === "boolean" && (host.fileManager === null || host.fileManager === "finder" || host.fileManager === "explorer" || host.fileManager === "directory");
		}
		/**
		* Validate a file declaration read from a Session log.
		* @param value - decoded durable data.
		* @returns whether the declaration contains a path and optional description.
		*/
		function isPresentedFile(value) {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
			const { path, description } = value;
			return typeof path === "string" && path.trim().length > 0 && (description === void 0 || typeof description === "string");
		}
		/**
		* Build authenticated coordinates for a declared file.
		* @param sessionId - owning Session.
		* @param seq - deliverables/presented event sequence.
		* @param index - original index in the event's files array.
		* @returns document-relative file action route.
		*/
		function presentedFileUrl(sessionId, seq, index) {
			return `${PRESENT_OPEN_ROUTE}?${new URLSearchParams({
				sessionId,
				seq: String(seq),
				index: String(index)
			})}`;
		}
		/**
		* Validate a delivery event before reading its turn or file declarations.
		* @param value - decoded durable event data.
		* @returns whether the event identifies a turn, call, and file list.
		*/
		function isPresentedData(value) {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
			const { turn, callId, files } = value;
			return typeof turn === "number" && Number.isSafeInteger(turn) && turn >= 1 && typeof callId === "string" && callId.length > 0 && Array.isArray(files);
		}
		/**
		* Trailing path segment, the part that identifies the file at a glance.
		* @param path - Slash- or backslash-separated path.
		* @returns The final segment, or the whole string when separator-free.
		*/
		function basename(path) {
			const at = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
			return at === -1 ? path : path.slice(at + 1);
		}
		//#endregion
		//#region ../ui-deliverables/src/client/present-open.ts
		/** Shared native-open status for delivery cards, the changed-files card, and closing-message file mentions. */
		/** Success feedback remains fully visible for five seconds before fading. */
		const PRESENTED_SUCCESS_HOLD_MS = 5e3;
		/** One browser plugin's file-open requests, cancelled when that plugin is disposed. */
		var PresentedOpenController = class {
			/** File action URLs key the state across Sessions, turns, and both clickable surfaces. */
			state = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({});
			/** Native destination metadata, or a retryable read failure. */
			host = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)(null);
			expiry = /* @__PURE__ */ new Map();
			loading;
			metadata = new AbortController();
			lifetime = new AbortController();
			pending = /* @__PURE__ */ new Set();
			/**
			* Open a declared file once while a request for the same coordinates is pending.
			* Failures remain visible on the card and a later gesture retries them.
			* @param sessionId - viewed Session, including a fork's own identity.
			* @param seq - durable delivery event sequence.
			* @param index - original file index within that event.
			* @param action - default application open or file-manager reveal.
			* @param application - registered handler identifier for an explicit application choice.
			* @returns null after a successful handoff, or the failure to announce after publishing card status.
			*/
			open(sessionId, seq, index, action = "open", application) {
				return this.openUrl(presentedFileUrl(sessionId, seq, index), action, application);
			}
			/**
			* Open one recorded changed file in the Host's default application.
			* @param sessionId - viewed Session.
			* @param seq - durable workspace/changes event sequence.
			* @param index - original file index within that event.
			* @param action - application open or file-manager reveal.
			* @param application - registered handler identifier for an explicit application choice.
			* @returns null after a successful handoff, or the failure to announce after publishing card status.
			*/
			openChanged(sessionId, seq, index, action = "open", application) {
				return this.openUrl(changedFileUrl(sessionId, seq, index), action, application);
			}
			async openUrl(url, action, application) {
				const phase = this.state.getSnapshot()[url];
				if (this.lifetime.signal.aborted || phase === "opening" || phase === "revealing") return null;
				this.clearExpiry(url);
				this.state.update((state) => {
					state[url] = action === "open" ? "opening" : "revealing";
				});
				const task = this.request(url, action, application);
				this.pending.add(task);
				try {
					return await task;
				} finally {
					this.pending.delete(task);
				}
			}
			/**
			* Read the serving desktop metadata, coalescing concurrent reads; a later call retries failure.
			* @returns after metadata or a retryable error is published.
			*/
			async loadHost() {
				if (this.lifetime.signal.aborted) return;
				if (this.loading !== void 0) return this.loading;
				this.host.set(null);
				const task = this.readHost(AbortSignal.any([this.lifetime.signal, this.metadata.signal]));
				this.loading = task;
				this.pending.add(task);
				try {
					await task;
				} finally {
					if (this.loading === task) this.loading = void 0;
					this.pending.delete(task);
				}
			}
			/** Invalidate desktop metadata on connection replacement; mounted cards request the new Host. */
			resetHost() {
				const wasLoading = this.loading !== void 0;
				this.metadata.abort();
				this.metadata = new AbortController();
				this.loading = void 0;
				this.host.set(null);
				if (wasLoading) this.loadHost();
			}
			async readHost(signal) {
				let host = "error";
				try {
					const response = await fetch(PRESENT_HOST_ROUTE, { signal });
					if (response.ok) {
						const value = await response.json();
						if (isPresentedHost(value)) host = value;
					}
				} catch {
					host = "error";
				}
				if (!signal.aborted) this.host.set(host);
			}
			/** Cancel outstanding requests and wait until no request can publish state. */
			async dispose() {
				this.lifetime.abort();
				for (const url of this.expiry.keys()) this.clearExpiry(url);
				await Promise.all(this.pending);
			}
			clearExpiry(url) {
				clearTimeout(this.expiry.get(url));
				this.expiry.delete(url);
			}
			async request(url, action, application) {
				const failure = action === "open" ? "error" : "revealError";
				let phase = action === "open" ? "opened" : "revealed";
				try {
					const target = action === "reveal" ? `${url}&action=reveal` : application === void 0 ? url : `${url}&application=${encodeURIComponent(application)}`;
					const response = await fetch(target, {
						method: "POST",
						signal: this.lifetime.signal
					});
					if (!response.ok) phase = response.status === 422 ? "nativeUnavailable" : failure;
				} catch {
					phase = failure;
				}
				if (!this.lifetime.signal.aborted) {
					if (phase === "opened" || phase === "revealed") this.expiry.set(url, setTimeout(() => {
						this.expiry.delete(url);
						this.state.update((state) => {
							Reflect.deleteProperty(state, url);
						});
					}, 5200));
					this.state.update((state) => {
						state[url] = phase;
					});
				}
				return phase === "opened" || phase === "revealed" ? null : action === "reveal" ? "revealError" : "openError";
			}
		};
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-deliverables/src/client/PresentRow.module.css.mjs
		const css$7 = "._8ihg1q_summary{min-width:0;color:inherit;align-items:center;gap:8px;margin-left:8px;font-size:12px;display:flex}._8ihg1q_summary>:first-child{flex-shrink:0}._8ihg1q_paths{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._8ihg1q_output{border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;padding:12px;font-size:12px}._8ihg1q_inspect{color:var(--dsw-alias-link);font:inherit;cursor:pointer;background:0 0;border:none;align-self:flex-start;padding:4px 0;font-size:12px}";
		const tagId$7 = "@deepseek-ai/dsh-workbench/PresentRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$7;
			tag.textContent = css$7;
			document.head.appendChild(tag);
		}
		var PresentRow_module_css_default = {
			"inspect": "_8ihg1q_inspect",
			"output": "_8ihg1q_output",
			"paths": "_8ihg1q_paths",
			"summary": "_8ihg1q_summary"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/PresentRow.tsx
		/** Present call status and expandable durable result text. */
		/* v8 ignore next -- Non-expandable rows never invoke DisclosureRow's required toggle callback. */
		const noop = () => void 0;
		/** Raw arguments can be partial while a call is streaming. */
		function fileNames(raw) {
			let args;
			try {
				args = JSON.parse(raw);
			} catch {
				return raw;
			}
			if (typeof args !== "object" || args === null || !("files" in args) || !Array.isArray(args.files)) return raw;
			return args.files.flatMap((file) => typeof file === "object" && file !== null && "path" in file && typeof file.path === "string" ? [file.path] : []).join(", ");
		}
		/**
		* Render a present call using its recorded arguments and result.
		* @param props - tool call and localized status copy.
		* @returns a status row with a result disclosure.
		*/
		function PresentRow(props) {
			return props.phase === "preparing" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PreparingPresentRow, { ...props }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StartedPresentRow, { ...props });
		}
		function PreparingPresentRow({ t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				"data-tool": "present",
				"data-state": "preparing",
				"aria-label": t("row.preparing"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					title: t("row.title"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDeliverDocRegular, { size: 14 }),
					open: false,
					expandable: false,
					onToggle: noop,
					running: true
				})
			});
		}
		function StartedPresentRow({ block, inspect, t }) {
			const settled = "kind" in block;
			const state = !settled ? "running" : block.error?.code === "interrupted" ? "stopped" : block.isError ? "error" : "ok";
			const args = (settled ? block.call?.argsRaw : block.argsRaw) ?? "";
			const details = (settled ? block.content.map((item) => item.type === "text" ? item.text : JSON.stringify(item)).join("\n") : "") || (settled && block.error ? `${block.error.name}: ${block.error.code}` : "");
			const [expanded, setExpanded] = (0, react.useState)(false);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				"data-tool": "present",
				"data-state": state,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					title: t("row.title"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDeliverDocRegular, { size: 14 }),
					open: expanded && details !== "",
					expandable: details !== "",
					expandOnRowClick: true,
					keepContentWhenOpen: true,
					onToggle: () => {
						setExpanded((value) => !value);
					},
					collapsedContent: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: PresentRow_module_css_default.summary,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t(`row.${state}`) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: PresentRow_module_css_default.paths,
							children: fileNames(args)
						})]
					}),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						className: PresentRow_module_css_default.output,
						children: details
					}), inspect && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: PresentRow_module_css_default.inspect,
						onClick: inspect,
						children: t("row.inspect")
					})]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-deliverables/src/client/FileDiff.module.css.mjs
		const css$6 = ".XlkLBW_root{--diff-empty-fill:color-mix(in srgb, var(--dsw-alias-interactive-bg-hover) 50%, transparent);box-sizing:border-box;width:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.XlkLBW_header{box-sizing:border-box;border-bottom:.5px solid var(--dsw-alias-border-l3);flex:none;align-items:center;gap:6px;height:38px;padding:0 6px 0 8px;display:flex}.XlkLBW_status{color:var(--dsw-alias-label-secondary);align-items:center;gap:12px;margin:0;padding:16px;font-size:13px;display:flex}.XlkLBW_body{min-height:0;font:var(--dsw-font-markdown-code-block);flex-direction:column;flex:auto;padding:8px 0 16px;display:flex;overflow:auto}.XlkLBW_columns{flex:auto;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:0;display:grid}.XlkLBW_column,.XlkLBW_body[data-review-view=unified]:not([data-review-wrap]){grid-template-columns:minmax(max-content,100%);align-content:start;display:grid}.XlkLBW_column{overscroll-behavior:none;min-width:0;overflow-x:scroll}.XlkLBW_column+.XlkLBW_column{border-left:.5px solid var(--dsw-alias-border-l3)}.XlkLBW_sideLine{box-sizing:border-box;white-space:pre;grid-template-columns:3.5em max-content;width:max-content;min-width:100%;min-height:22px;line-height:22px;display:grid}.XlkLBW_note{font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-tertiary);margin:0;padding:4px 16px 8px}.XlkLBW_hunk{margin-bottom:8px}.XlkLBW_hunkHeader{color:var(--dsw-alias-label-tertiary);white-space:pre;padding:4px 16px}.XlkLBW_line{box-sizing:border-box;white-space:pre;grid-template-columns:3.5em 3.5em 1.2em minmax(0,1fr);min-height:22px;line-height:22px;display:grid}.XlkLBW_splitLine{white-space:pre;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:22px;line-height:22px;display:grid}.XlkLBW_cell{box-sizing:border-box;grid-template-columns:3.5em minmax(0,1fr);min-width:0;display:grid}.XlkLBW_cell+.XlkLBW_cell{border-left:.5px solid var(--dsw-alias-border-l3)}.XlkLBW_number{color:var(--dsw-alias-label-tertiary);text-align:right;user-select:none;padding-right:8px}.XlkLBW_sign{text-align:center;user-select:none}.XlkLBW_text{padding-right:16px}.XlkLBW_body[data-review-wrap] .XlkLBW_line,.XlkLBW_body[data-review-wrap] .XlkLBW_splitLine{white-space:pre-wrap}.XlkLBW_body[data-review-wrap] .XlkLBW_text{overflow-wrap:anywhere}.XlkLBW_add{--diff-gutter-fill:var(--dsw-alias-file-diff-added-gutter);--diff-marker:var(--dsw-alias-file-diff-added-marker);background:var(--dsw-alias-file-diff-added-bg)}.XlkLBW_del{--diff-gutter-fill:var(--dsw-alias-file-diff-deleted-gutter);--diff-marker:var(--dsw-alias-file-diff-deleted-marker);background:var(--dsw-alias-file-diff-deleted-bg)}.XlkLBW_add .XlkLBW_number,.XlkLBW_del .XlkLBW_number{background:var(--diff-gutter-fill);color:var(--diff-marker)}.XlkLBW_add .XlkLBW_number:first-child,.XlkLBW_del .XlkLBW_number:first-child{box-shadow:inset 3px 0 0 var(--diff-marker)}.XlkLBW_add .XlkLBW_sign,.XlkLBW_del .XlkLBW_sign{color:var(--diff-marker)}.XlkLBW_context .XlkLBW_text{color:var(--dsw-alias-label-secondary)}.XlkLBW_empty{background:var(--diff-empty-fill)}";
		const tagId$6 = "@deepseek-ai/dsh-workbench/FileDiff.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$6;
			tag.textContent = css$6;
			document.head.appendChild(tag);
		}
		var FileDiff_module_css_default = {
			"add": "XlkLBW_add",
			"body": "XlkLBW_body",
			"cell": "XlkLBW_cell",
			"column": "XlkLBW_column",
			"columns": "XlkLBW_columns",
			"context": "XlkLBW_context",
			"del": "XlkLBW_del",
			"empty": "XlkLBW_empty",
			"header": "XlkLBW_header",
			"hunk": "XlkLBW_hunk",
			"hunkHeader": "XlkLBW_hunkHeader",
			"line": "XlkLBW_line",
			"note": "XlkLBW_note",
			"number": "XlkLBW_number",
			"root": "XlkLBW_root",
			"sideLine": "XlkLBW_sideLine",
			"sign": "XlkLBW_sign",
			"splitLine": "XlkLBW_splitLine",
			"status": "XlkLBW_status",
			"text": "XlkLBW_text"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/FileDiff.tsx
		/** Shared file comparison for the turn-tail hover preview and Sidebar review. */
		/** Maximum rendered lines per comparison. */
		const MAX_RENDERED_LINES = 5e3;
		function highlightedSide(rows, side, highlighter) {
			const source = rows.flatMap((row) => {
				const no = row[side];
				return no === void 0 ? [] : [{
					no,
					text: row.text
				}];
			});
			if (source.length === 0) return /* @__PURE__ */ new Map();
			const highlighted = highlighter(source.map((line) => line.text).join("\n"));
			if (highlighted === void 0) return void 0;
			return new Map(source.map((line, index) => {
				return [line.no, highlighted[index] ?? []];
			}));
		}
		function hunkHighlights(hunk, highlighter) {
			const rows = hunkRows(hunk);
			return {
				old: highlightedSide(rows, "old", highlighter),
				new: highlightedSide(rows, "new", highlighter)
			};
		}
		function DiffText({ text, spans }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: FileDiff_module_css_default.text,
				"data-diff-code": spans === void 0 ? void 0 : "",
				children: spans === void 0 ? text : spans.map((span, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: span.style,
					children: span.text
				}, index))
			});
		}
		/**
		* Number a hunk's lines: context lines count on both sides, deletions on the
		* old side, additions on the new side.
		* @param hunk - a served hunk.
		* @returns the rows in order.
		*/
		function hunkRows(hunk) {
			let oldNo = hunk.oldStart;
			let newNo = hunk.newStart;
			return hunk.lines.map((line) => {
				const text = line.slice(1);
				switch (line[0]) {
					case "+": return {
						kind: "add",
						old: void 0,
						new: newNo++,
						text
					};
					case "-": return {
						kind: "del",
						old: oldNo++,
						new: void 0,
						text
					};
					default: return {
						kind: "context",
						old: oldNo++,
						new: newNo++,
						text
					};
				}
			});
		}
		/**
		* Pair a hunk's lines for the side-by-side view: each run of deletions is
		* aligned with the run of additions that follows it, row by row, and context
		* lines sit on both sides.
		* @param hunk - a served hunk.
		* @returns the rows in order.
		*/
		function splitRows(hunk) {
			const rows = [];
			let dels = [];
			let adds = [];
			const flush = () => {
				for (let at = 0; at < Math.max(dels.length, adds.length); at += 1) {
					const left = dels[at];
					const right = adds[at];
					rows.push({
						...left === void 0 ? {} : { left },
						...right === void 0 ? {} : { right }
					});
				}
				dels = [];
				adds = [];
			};
			for (const row of hunkRows(hunk)) if (row.kind === "del") dels.push({
				no: row.old,
				text: row.text,
				kind: "del"
			});
			else if (row.kind === "add") adds.push({
				no: row.new,
				text: row.text,
				kind: "add"
			});
			else {
				flush();
				rows.push({
					left: {
						no: row.old,
						text: row.text,
						kind: "context"
					},
					right: {
						no: row.new,
						text: row.text,
						kind: "context"
					}
				});
			}
			flush();
			return rows;
		}
		/**
		* The hunks to draw, cut at {@link MAX_RENDERED_LINES} lines in total.
		* @param hunks - served hunks.
		* @returns the hunks with the last one shortened as needed, and whether anything was cut.
		*/
		function renderedHunks(hunks) {
			let budget = MAX_RENDERED_LINES;
			const kept = [];
			for (const hunk of hunks) {
				if (budget === 0) return {
					hunks: kept,
					truncated: true
				};
				kept.push(hunk.lines.length <= budget ? hunk : {
					...hunk,
					lines: hunk.lines.slice(0, budget)
				});
				budget -= Math.min(budget, hunk.lines.length);
			}
			return {
				hunks: kept,
				truncated: hunks.some((hunk, at) => kept[at] !== hunk)
			};
		}
		/** The one-line fact about a text comparison worth stating above its hunks, if any. */
		function noteOf(diff) {
			if (!diff.before) return "diff.created";
			if (!diff.after) return "diff.deleted";
			if (diff.hunks.length === 0) return "diff.unchanged";
		}
		/**
		* Render a file comparison with the same states and highlighting in previews and review tabs.
		* Addition-only and deletion-only comparisons use one column without changing the requested layout.
		* @param props - comparison state, layout choices, retry action, and localized copy.
		* @returns the comparison or its loading, unavailable, or error state.
		*/
		function FileDiff({ state, split, wrap, retry, t }) {
			if (state === void 0 || state === "loading") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FileDiff_module_css_default.status,
				role: "status",
				children: t("diff.loading")
			});
			if (state === "missing") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FileDiff_module_css_default.status,
				children: t("diff.missing")
			});
			if (state === "error") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FileDiff_module_css_default.status,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("diff.error") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					size: "sm",
					onClick: retry,
					children: t("presented.retry")
				})]
			});
			if (state.kind === "binary") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FileDiff_module_css_default.status,
				children: t("diff.binary")
			});
			if (state.kind === "oversized") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FileDiff_module_css_default.status,
				children: t("diff.oversized")
			});
			const oneSided = state.hunks.some((hunk) => hunk.lines.some((line) => line.startsWith("+"))) !== state.hunks.some((hunk) => hunk.lines.some((line) => line.startsWith("-")));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextDiff, {
				diff: state,
				split: split && !oneSided,
				wrap,
				t
			});
		}
		/** The kind a paired row carries: a deletion or addition on either side, otherwise context. */
		function splitRowKind(row) {
			return row.left?.kind === "del" ? "del" : row.right?.kind === "add" ? "add" : "context";
		}
		function hunkHeader(hunk) {
			return `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`;
		}
		/**
		* The side-by-side view without wrapping: two columns that clip their long
		* lines and scroll together on both axes, so a long line on one side never
		* runs under the other and both sides show the same rows and columns of text.
		* Every line is one fixed-height row, which keeps the sides aligned.
		* The columns suppress elastic overscroll while retaining native in-range scrolling.
		*/
		function SplitColumns({ hunks, highlights }) {
			const paired = (0, react.useMemo)(() => hunks.map((hunk) => ({
				header: hunkHeader(hunk),
				rows: splitRows(hunk)
			})), [hunks]);
			const columns = (0, react.useRef)({
				left: null,
				right: null
			});
			const offsets = (0, react.useRef)({
				left: {
					scrollLeft: 0,
					scrollTop: 0
				},
				right: {
					scrollLeft: 0,
					scrollTop: 0
				}
			});
			const follow = (side) => (event) => {
				const peer = side === "left" ? "right" : "left";
				const other = columns.current[peer];
				/* v8 ignore next -- Both column refs are attached before browser scroll events can run. */
				if (other === null) return;
				for (const axis of ["scrollLeft", "scrollTop"]) {
					const value = event.currentTarget[axis];
					if (offsets.current[side][axis] === value) continue;
					offsets.current[side][axis] = value;
					other[axis] = value;
					offsets.current[peer][axis] = other[axis];
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: FileDiff_module_css_default.columns,
				children: ["left", "right"].map((side) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: FileDiff_module_css_default.column,
					"data-diff-side": side,
					ref: (element) => {
						columns.current[side] = element;
					},
					onScroll: follow(side),
					children: paired.map((hunk, position) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: FileDiff_module_css_default.hunk,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: FileDiff_module_css_default.hunkHeader,
							"data-diff-hunk-header": true,
							children: hunk.header
						}), hunk.rows.map((row, at) => {
							const cell = row[side];
							const spans = cell === void 0 ? void 0 : highlights[position]?.[side === "left" ? "old" : "new"]?.get(cell.no);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: `${FileDiff_module_css_default.sideLine} ${cell === void 0 ? FileDiff_module_css_default.empty : FileDiff_module_css_default[cell.kind]}`,
								"data-diff-line": splitRowKind(row),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: FileDiff_module_css_default.number,
									children: cell?.no ?? ""
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DiffText, {
									text: cell?.text ?? "",
									spans
								})]
							}, at);
						})]
					}, position))
				}, side))
			});
		}
		/** The hunks of a text comparison with their line numbers, unified or side by side. */
		function TextDiff({ diff, split, wrap, t }) {
			const note = noteOf(diff);
			const { hunks, truncated } = (0, react.useMemo)(() => renderedHunks(diff.hunks), [diff.hunks]);
			const highlighter = (0, _deepseek_ai_dsh_client_ui_primitives.useCodeHighlighter)((0, _deepseek_ai_dsh_client_ui_primitives.languageForPath)(diff.path));
			const highlights = (0, react.useMemo)(() => hunks.map((hunk) => hunkHighlights(hunk, highlighter)), [hunks, highlighter]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FileDiff_module_css_default.body,
				"data-review-view": split ? "split" : "unified",
				"data-review-wrap": wrap || void 0,
				children: [
					note !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: FileDiff_module_css_default.note,
						"data-diff-note": hunks.length === 0 ? "empty" : "metadata",
						children: t(note)
					}),
					diff.coarse && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: FileDiff_module_css_default.note,
						"data-diff-coarse": true,
						children: t("diff.coarse")
					}),
					truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: FileDiff_module_css_default.note,
						"data-diff-truncated": true,
						children: t("diff.truncated", { count: String(5e3) })
					}),
					split && !wrap ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SplitColumns, {
						hunks,
						highlights
					}) : hunks.map((hunk, position) => {
						const highlighted = highlights[position];
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: FileDiff_module_css_default.hunk,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: FileDiff_module_css_default.hunkHeader,
								"data-diff-hunk-header": true,
								children: hunkHeader(hunk)
							}), split ? splitRows(hunk).map((row, at) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: FileDiff_module_css_default.splitLine,
								"data-diff-line": splitRowKind(row),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: `${FileDiff_module_css_default.cell} ${row.left === void 0 ? FileDiff_module_css_default.empty : FileDiff_module_css_default[row.left.kind]}`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: FileDiff_module_css_default.number,
										children: row.left?.no ?? ""
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DiffText, {
										text: row.left?.text ?? "",
										spans: row.left === void 0 ? void 0 : highlighted?.old?.get(row.left.no)
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: `${FileDiff_module_css_default.cell} ${row.right === void 0 ? FileDiff_module_css_default.empty : FileDiff_module_css_default[row.right.kind]}`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: FileDiff_module_css_default.number,
										children: row.right?.no ?? ""
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DiffText, {
										text: row.right?.text ?? "",
										spans: row.right === void 0 ? void 0 : highlighted?.new?.get(row.right.no)
									})]
								})]
							}, at)) : hunkRows(hunk).map((row, at) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: `${FileDiff_module_css_default.line} ${FileDiff_module_css_default[row.kind]}`,
								"data-diff-line": row.kind,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: FileDiff_module_css_default.number,
										children: row.old ?? ""
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: FileDiff_module_css_default.number,
										children: row.new ?? ""
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: FileDiff_module_css_default.sign,
										children: row.kind === "add" ? "+" : row.kind === "del" ? "-" : " "
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DiffText, {
										text: row.text,
										spans: row.kind === "add" ? highlighted?.new?.get(row.new) : highlighted?.old?.get(row.old)
									})
								]
							}, at))]
						}, position);
					})
				]
			});
		}
		//#endregion
		//#region ../../core/session/src/surface.ts
		/** Runtime counterpart of the message-producing event union. */
		const SURFACE_EVENT_TYPES = new Set([
			"system/message",
			"developer/message",
			"user/message",
			"assistant/message",
			"tool/result"
		]);
		/**
		* Narrow an event to a surface-eligible event carrying its required marker.
		* @param event - event to test.
		* @returns true when both the type and marker identify a surface event.
		*/
		function isSurfaceEvent(event) {
			if (!SURFACE_EVENT_TYPES.has(event.type)) return false;
			return event.surfaceOp !== void 0;
		}
		/**
		* Narrow an event to an append-origin surface event: one that entered the
		* surface at its own log position and was never itself a replacement copy.
		*
		* The model-visible surface deliberately shadows replaced ranges, so it is the
		* wrong source for a human transcript — a landed replacement would erase
		* conversation the user already saw. Append-origin events are that transcript's
		* durable source material; replacement copies stay model-only.
		* @param event - event to test.
		* @returns true when the event appended to the surface tail.
		*/
		function isAppendSurfaceEvent(event) {
			return isSurfaceEvent(event) && event.surfaceOp === "append";
		}
		//#endregion
		//#region ../ui-deliverables/src/client/turn-deliverables.ts
		/**
		* Turn-scoped produced-file Definition and readers. Client-only and
		* model-free: produced paths come from successful first-party mutation calls,
		* changed files from the Host's recorded git summary, and deliveries from
		* `present`; never from presentation data or the closing prose.
		*/
		/**
		* Extract the path from a supported first-party mutation call. Session
		* `tool/call` events are root calls; PTC dispatch children do not enter this
		* Definition independently.
		* @param name - wire tool name.
		* @param argsRaw - model-produced JSON arguments.
		* @returns the mutation path, or null when the call is not a supported mutation.
		*/
		function mutationPath(name, argsRaw) {
			let args;
			try {
				args = JSON.parse(argsRaw);
			} catch {
				return null;
			}
			if (!isRecord(args)) return null;
			switch (name) {
				case "write": return typeof args.content === "string" ? pathValue(args.file_path) : null;
				case "edit": return validEditArgs(args) ? pathValue(args.file_path) : null;
				case "str_replace_editor": return editorMutationPath(args);
				default: return null;
			}
		}
		/** Validate the fields that an `edit` execution requires. */
		function validEditArgs(args) {
			return typeof args.old_string === "string" && args.old_string.length > 0 && typeof args.new_string === "string" && args.old_string !== args.new_string && (args.replace_all === void 0 || typeof args.replace_all === "boolean");
		}
		/** Extract a path only from a complete mutating editor command. */
		function editorMutationPath(args) {
			const path = pathValue(args.path);
			if (path === null) return null;
			switch (args.command) {
				case "create": return typeof args.file_text === "string" ? path : null;
				case "str_replace": return typeof args.old_str === "string" && args.old_str.length > 0 && (args.new_str === void 0 || typeof args.new_str === "string") ? path : null;
				case "insert": return typeof args.insert_line === "number" && Number.isInteger(args.insert_line) && args.insert_line >= 0 && typeof args.new_str === "string" ? path : null;
				default: return null;
			}
		}
		/** A non-blank path preserves the exact spelling supplied to the tool. */
		function pathValue(value) {
			return typeof value === "string" && value.trim().length > 0 ? value : null;
		}
		/** Narrow parsed JSON to an argument object. */
		function isRecord(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		/**
		* Files produced by one Turn data value.
		*
		* The source is the arguments of successful `write`, `edit`, and mutating
		* `str_replace_editor` calls, not the closing prose: a produced file must be
		* listed whether or not the model remembered to name it. Reads, unsupported
		* tools, malformed calls, and failed results contribute nothing. Paths keep
		* first-seen order and appear once, so a file written and then edited in the
		* same turn is one entry.
		*
		* The Conversation Location index owns turn membership before this function
		* runs, so paths cannot spill across turns and this derivation does not infer
		* boundaries from neighboring presentation Nodes.
		* @param data - engine-published Deliverables data for one Turn.
		* @param seq - closing Assistant seq; later Tool settlements are excluded.
		* @returns Produced paths in first-seen order; empty when the turn wrote nothing.
		*/
		function producedForClosing(data, seq = Number.POSITIVE_INFINITY) {
			if (data === void 0) return [];
			const paths = [];
			const seen = /* @__PURE__ */ new Set();
			for (const produced of data.produced) {
				if (produced.seq > seq || seen.has(produced.path)) continue;
				seen.add(produced.path);
				paths.push(produced.path);
			}
			return paths;
		}
		/**
		* Claim the turn-tail chain only when its closing turn produced files.
		* @param owner - Turn-tail owner currency for the closing assistant.
		* @returns Produced paths as the component's match, or null to decline before mount.
		*/
		function selectProducedFiles(owner) {
			const paths = producedForClosing(owner.turn.data.get("deliverables"), owner.seq);
			return paths.length === 0 ? null : paths;
		}
		/** Turn-local successful mutation accumulator; it publishes no view Node. */
		const deliverablesDefinition = {
			kind: "deliverables",
			match: (event) => {
				if (event.type === "turn/start") return {
					id: String(event.data.turn),
					role: "start"
				};
				if (event.type === "tool/call") return {
					id: String(event.data.turn),
					role: "update"
				};
				if (event.type === "deliverables/presented") return isPresentedData(event.data) ? {
					id: String(event.data.turn),
					role: "update"
				} : null;
				if (event.type === "workspace/changes") return isChangesEvent(event.data) ? {
					id: String(event.data.turn),
					role: "update"
				} : null;
				if (event.type === "tool/result" && isAppendSurfaceEvent(event)) return {
					id: String(event.data.turn),
					role: "update"
				};
				return null;
			},
			start: (_context, match) => {
				if (match.event.type !== "turn/start") throw new Error("deliverables start requires turn/start");
				return {
					turn: match.event.data.turn,
					calls: /* @__PURE__ */ new Map(),
					produced: []
				};
			},
			update: (context, match) => {
				if (match.event.type === "workspace/changes") return {
					...context.state,
					changes: { seq: match.event.seq }
				};
				if (match.event.type === "deliverables/presented") {
					const { files } = match.event.data;
					const seq = match.event.seq;
					const presented = [];
					for (let index = 0; index < files.length; index += 1) {
						const file = files[index];
						if (isPresentedFile(file)) presented.push({
							...file,
							seq,
							index
						});
					}
					if (presented.length === 0) return context.state;
					return {
						...context.state,
						presented: [...context.state.presented ?? [], ...presented]
					};
				}
				if (match.event.type === "tool/call") {
					const calls = new Map(context.state.calls);
					calls.set(String(match.event.data.callId), mutationPath(match.event.data.name, match.event.data.arguments));
					return {
						...context.state,
						calls
					};
				}
				if (match.event.type !== "tool/result") return context.state;
				if (match.event.data.message.isError === true) return context.state;
				const callId = String(match.event.data.message.source.callId);
				const path = context.state.calls.get(callId);
				return path === null || path === void 0 ? context.state : {
					...context.state,
					produced: [...context.state.produced, {
						seq: match.event.seq,
						path
					}]
				};
			},
			buildLocationData: (context, scope, previous) => {
				if (scope !== "turn" || context.state === void 0) return null;
				if (previous?.kind === "turn" && previous.turn === context.state.turn && previous.key === "deliverables" && previous.value.produced === context.state.produced && previous.value.presented === context.state.presented && previous.value.changes === context.state.changes) return previous;
				return {
					kind: "turn",
					turn: context.state.turn,
					key: "deliverables",
					value: {
						produced: context.state.produced,
						...context.state.presented === void 0 ? {} : { presented: context.state.presented },
						...context.state.changes === void 0 ? {} : { changes: context.state.changes }
					}
				};
			}
		};
		/**
		* The turn's latest change announcement.
		* @param owner - closing turn.
		* @returns the announcement, or null when the Host recorded none.
		*/
		function changesForClosing(owner) {
			return owner.turn.data.get("deliverables")?.changes ?? null;
		}
		/**
		* Select the latest declaration of each path before the closing reply.
		* @param owner - closing turn and sequence.
		* @returns replayable deliveries in first-seen path order.
		*/
		function presentedForClosing(owner) {
			const files = /* @__PURE__ */ new Map();
			for (const file of owner.turn.data.get("deliverables")?.presented ?? []) if (file.seq < owner.seq) files.set(file.path, file);
			return [...files.values()];
		}
		/**
		* Resolves inline-code references against one turn's produced or delivered
		* paths. Exact paths resolve directly; a basename resolves only when exactly
		* one supplied path has that basename. Ambiguous and unknown tokens stay inert.
		* @param paths - The turn's produced or delivered paths, already deduplicated.
		* @param openFile - The chat view's file opener.
		* @param label - Localizes the accessible open-label for a resolved path.
		* @returns The resolver MarkdownText consumes; the full path rides `title`,
		* the same disambiguator the row's chips carry.
		*/
		function producedFileMentions(paths, openFile, label) {
			return { resolve(value) {
				const path = paths.includes(value) ? value : onlyPathWithBasename(paths, value);
				if (path === void 0) return void 0;
				return {
					open: () => {
						openFile(path);
					},
					label: label(path),
					title: path
				};
			} };
		}
		/** The single supplied path whose basename is exactly `value`, else undefined. */
		function onlyPathWithBasename(paths, value) {
			const matches = paths.filter((path) => basename(path) === value);
			return matches.length === 1 ? matches[0] : void 0;
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-deliverables/src/client/ChangedFiles.module.css.mjs
		const css$5 = "._92WqEq_card{--changes-fill:var(--dsw-static-neutral-50);--changes-hover:var(--dsw-static-neutral-100);border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1);min-width:0;color:var(--dsw-alias-label-primary);flex-direction:column;margin-top:4px;display:flex;overflow:hidden}._92WqEq_card[data-single=true]{border-color:var(--dsw-alias-border-l1)}body[data-ds-dark-theme] ._92WqEq_card{--changes-fill:var(--dsw-static-neutral-850);--changes-hover:var(--dsw-static-neutral-800)}._92WqEq_header{box-sizing:border-box;background:0 0;align-items:center;width:100%;min-width:0;height:34px;margin:0;padding:0 6px 0 0;display:flex}._92WqEq_headerMain{min-width:0;height:34px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:auto;align-items:center;gap:8px;margin:0;padding:6px 4px 6px 12px;transition:background-color .12s;display:flex}._92WqEq_headerMain:hover:not(:disabled),._92WqEq_headerMain:focus-visible{background:var(--changes-hover)}._92WqEq_headerMain:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline:none}._92WqEq_headerMain:disabled{cursor:progress}._92WqEq_disclosure{width:26px;height:26px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:6px;flex:none;justify-content:center;align-items:center;padding:0;transition:background-color .12s;display:inline-flex}._92WqEq_disclosure:hover{background:var(--changes-hover);color:var(--dsw-alias-label-primary)}._92WqEq_disclosure:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline:none}._92WqEq_disclosure svg{width:14px;height:14px}._92WqEq_title{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;font-size:13px;font-weight:500;line-height:20px;overflow:hidden}._92WqEq_statCounts{font-family:var(--ds-font-family-code);color:var(--dsw-alias-label-tertiary);flex:none;gap:6px;font-size:11px;line-height:16px;display:inline-flex}._92WqEq_stat[data-error=true],._92WqEq_counts[data-error=true]{color:var(--dsw-alias-state-error-primary)}._92WqEq_added{color:var(--dsw-alias-state-success-primary)}._92WqEq_deleted{color:var(--dsw-alias-state-error-primary)}._92WqEq_list{border-top:.5px solid var(--dsw-alias-border-l2);margin:0;padding:0;list-style:none}._92WqEq_row{box-sizing:border-box;width:100%;min-width:0;min-height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;font-family:var(--ds-font-family-code);text-align:left;background:0 0;border:0;justify-content:space-between;align-items:center;gap:10px;margin:0;padding:7px 18px 7px 14px;font-size:11px;line-height:18px;display:flex}._92WqEq_row:hover:not(:disabled),._92WqEq_row:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}._92WqEq_row:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline:none}._92WqEq_row:disabled{cursor:progress}._92WqEq_path{min-width:0;font-family:var(--dsw-font-family);text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}._92WqEq_counts{white-space:nowrap;color:var(--dsw-alias-label-tertiary);flex:none;gap:6px;display:inline-flex}@media (pointer:coarse){._92WqEq_row{min-height:44px}}._92WqEq_preview{max-height:100%;overflow:hidden}._92WqEq_previewPath{min-width:0;color:var(--dsw-alias-label-tertiary);font-family:var(--ds-font-family-code);white-space:nowrap;flex:auto;font-size:12px;line-height:20px;overflow:auto hidden}._92WqEq_preview [data-diff-note=metadata],._92WqEq_preview [data-diff-hunk-header]{display:none}._92WqEq_rowReject{border:.5px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;margin:2px 8px 6px;padding:2px 8px;font-size:11px}._92WqEq_rowReject:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}._92WqEq_reviewActions{justify-content:flex-end;gap:6px;padding:4px 10px 8px;display:flex}._92WqEq_actionButton{border:.5px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:3px 10px;font-size:12px}._92WqEq_actionButton[data-danger=true]:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}";
		const tagId$5 = "@deepseek-ai/dsh-workbench/ChangedFiles.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var ChangedFiles_module_css_default = {
			"actionButton": "_92WqEq_actionButton",
			"added": "_92WqEq_added",
			"card": "_92WqEq_card",
			"counts": "_92WqEq_counts",
			"deleted": "_92WqEq_deleted",
			"disclosure": "_92WqEq_disclosure",
			"header": "_92WqEq_header",
			"headerMain": "_92WqEq_headerMain",
			"list": "_92WqEq_list",
			"path": "_92WqEq_path",
			"preview": "_92WqEq_preview",
			"previewPath": "_92WqEq_previewPath",
			"reviewActions": "_92WqEq_reviewActions",
			"row": "_92WqEq_row",
			"rowReject": "_92WqEq_rowReject",
			"stat": "_92WqEq_stat",
			"statCounts": "_92WqEq_statCounts",
			"title": "_92WqEq_title"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/ChangedFiles.tsx
		/** Turn changes use a compact single-file card or a header with a folded file list. */
		const GROUPED$1 = new Intl.NumberFormat("en-US");
		/** Added and deleted line counts in the card's colors. */
		function Counts$1({ added, deleted, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ChangedFiles_module_css_default.added,
				children: t("changes.added", { count: GROUPED$1.format(added) })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ChangedFiles_module_css_default.deleted,
				children: t("changes.deleted", { count: GROUPED$1.format(deleted) })
			})] });
		}
		/**
		* Render one turn's changed files. The header opens the turn's review in the
		* right Sidebar on its first file. A single file uses only the header; it and
		* multi-file rows preview their comparison after a 500ms hover.
		* @param props - the recorded summary, the review opener, and localized copy.
		* @returns the card.
		*/
		function ChangedFiles({ changes, cwd, openReview, onReject, t, sessionId, useChangesDiff, loadChangesDiff }) {
			const cardRef = (0, react.useRef)(null);
			const pathDescriptionId = (0, react.useId)();
			const [expanded, setExpanded] = (0, react.useState)(false);
			const singleFile = changes.total === 1 ? changes.files[0] : void 0;
			const rows = expanded ? changes.files : [];
			const header = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: ChangedFiles_module_css_default.header,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ChangedFiles_module_css_default.headerMain,
					"aria-label": singleFile === void 0 ? t("changes.openReview") : t("changes.viewDiff", { name: singleFile.display }),
					"aria-describedby": singleFile === void 0 ? void 0 : pathDescriptionId,
					onClick: () => {
						openReview(0);
					},
					children: [
						singleFile === void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.FileTypeIcon, {
							kind: "code",
							size: 15
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.FileTypeIcon, {
							path: singleFile.path,
							size: 15
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ChangedFiles_module_css_default.title,
							children: singleFile === void 0 ? t("changes.title", { count: String(changes.total) }) : t("changes.singleTitle", { name: basename(singleFile.path) })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ChangedFiles_module_css_default.statCounts,
							children: singleFile?.binary === true ? t("changes.binary") : singleFile?.oversized === true ? t("changes.oversized") : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Counts$1, {
								t,
								added: changes.added,
								deleted: changes.deleted
							})
						})
					]
				}), singleFile === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ChangedFiles_module_css_default.disclosure,
					"aria-expanded": expanded,
					"aria-label": t(expanded ? "changes.collapseAria" : "changes.expandAria", { count: String(changes.files.length) }),
					onClick: () => {
						setExpanded((value) => !value);
					},
					children: expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronUpOutlineRegular, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, {})
				})]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: cardRef,
				className: ChangedFiles_module_css_default.card,
				"data-changed-files": true,
				"data-single": singleFile !== void 0 || void 0,
				children: [
					singleFile === void 0 ? header : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
						variant: "preview",
						widthAnchorRef: cardRef,
						openDelayMs: 500,
						anchor: header,
						content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChangedFilePreview, {
							sessionId,
							seq: changes.seq,
							index: 0,
							display: resolveWorkspacePath(cwd, singleFile.path),
							useChangesDiff,
							loadChangesDiff,
							t
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						id: pathDescriptionId,
						hidden: true,
						children: resolveWorkspacePath(cwd, singleFile.path)
					})] }),
					singleFile === void 0 && rows.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						className: ChangedFiles_module_css_default.list,
						children: rows.map((file, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
								variant: "preview",
								widthAnchorRef: cardRef,
								openDelayMs: 500,
								content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChangedFilePreview, {
									sessionId,
									seq: changes.seq,
									index,
									display: resolveWorkspacePath(cwd, file.path),
									useChangesDiff,
									loadChangesDiff,
									t
								}),
								anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: ChangedFiles_module_css_default.row,
									"aria-label": t("changes.viewDiff", { name: file.display }),
									"aria-describedby": `${pathDescriptionId}-${index}`,
									onClick: () => {
										openReview(index);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: ChangedFiles_module_css_default.path,
										children: file.display
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: ChangedFiles_module_css_default.counts,
										children: file.binary === true ? t("changes.binary") : file.oversized === true ? t("changes.oversized") : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Counts$1, {
											t,
											added: file.added,
											deleted: file.deleted
										})
									})]
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ChangedFiles_module_css_default.rowReject,
								"aria-label": t("changes.rejectFile", { name: file.display }),
								onClick: () => {
									onReject(resolveWorkspacePath(cwd, file.path));
								},
								children: t("changes.reject")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								id: `${pathDescriptionId}-${index}`,
								hidden: true,
								children: resolveWorkspacePath(cwd, file.path)
							})
						] }, file.display))
					}),
					singleFile === void 0 && expanded && rows.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ChangedFiles_module_css_default.reviewActions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ChangedFiles_module_css_default.actionButton,
							onClick: () => {
								setExpanded(false);
							},
							children: t("changes.acceptAll")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ChangedFiles_module_css_default.actionButton,
							"data-danger": "true",
							onClick: () => {
								for (const file of changes.files) onReject(resolveWorkspacePath(cwd, file.path));
							},
							children: t("changes.rejectAll")
						})]
					})
				]
			});
		}
		/** Mounted only while its hover card is open, so passing over a row does not read a comparison. */
		function ChangedFilePreview({ sessionId, seq, index, display, useChangesDiff, loadChangesDiff, t }) {
			const state = useChangesDiff((value) => value[changesDiffUrl(sessionId, seq, index)]);
			(0, react.useEffect)(() => {
				if (state === void 0) loadChangesDiff(sessionId, seq, index);
			}, [
				state,
				sessionId,
				seq,
				index,
				loadChangesDiff
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${FileDiff_module_css_default.root} ${ChangedFiles_module_css_default.preview}`,
				"data-changes-hover-preview": true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: FileDiff_module_css_default.header,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ChangedFiles_module_css_default.previewPath,
						"data-changes-preview-path": true,
						children: display
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileDiff, {
					state,
					split: false,
					wrap: false,
					t,
					retry: () => {
						loadChangesDiff(sessionId, seq, index);
					}
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-deliverables/src/client/Deliverables.module.css.mjs
		const css$4 = ".WCVRZG_root{--deliverable-fill:var(--dsw-static-neutral-50);--deliverable-hover:var(--dsw-static-neutral-100);flex-direction:column;gap:16px;min-width:0;margin-top:4px;display:flex;container-type:inline-size}.WCVRZG_root[data-after-changes=true]{margin-top:0}body[data-ds-dark-theme] .WCVRZG_root{--deliverable-fill:var(--dsw-static-neutral-850);--deliverable-hover:var(--dsw-static-neutral-800)}.WCVRZG_hostStatus{color:var(--dsw-alias-label-secondary);align-items:center;gap:8px;font-size:12px;line-height:18px;display:flex}.WCVRZG_presented{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;min-width:0;display:grid}.WCVRZG_presented[data-single=true]{grid-template-columns:minmax(0,1fr)}.WCVRZG_file{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg);background:var(--deliverable-fill);min-width:0;height:60px;color:var(--dsw-alias-label-primary);align-items:center;gap:10px;padding:8px 10px;transition:background-color .12s;display:flex;position:relative;overflow:hidden}.WCVRZG_file:hover{background:var(--deliverable-hover)}.WCVRZG_cardPreview{z-index:1;border-radius:inherit;cursor:pointer;background:0 0;border:0;width:100%;padding:0;position:absolute;inset:0}.WCVRZG_cardPreview:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline:none}.WCVRZG_fileIcon{z-index:2;box-sizing:border-box;pointer-events:none;border:.5px solid var(--dsw-alias-border-l1);background:color-mix(in srgb, var(--dsw-static-neutral-00) 50%, transparent);width:40px;height:40px;color:var(--dsw-alias-link);border-radius:10px;flex:none;place-items:center;display:grid;position:relative;overflow:hidden}body[data-ds-dark-theme] .WCVRZG_fileIcon{background:color-mix(in srgb, var(--dsw-static-neutral-00) 5%, transparent)}.WCVRZG_fileBody{z-index:2;pointer-events:none;flex:1;justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex;position:relative}.WCVRZG_details{flex-direction:column;flex:1;justify-content:center;gap:2px;min-width:0;display:flex}.WCVRZG_fileName{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500;line-height:20px;overflow:hidden}.WCVRZG_description{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;font-weight:400;line-height:16px;overflow:hidden}.WCVRZG_description[data-error=true]{color:var(--dsw-alias-state-error-primary)}.WCVRZG_previewHint,.WCVRZG_file:hover .WCVRZG_description:not([role=status]) .WCVRZG_secondaryText{display:none}.WCVRZG_file:hover .WCVRZG_description:not([role=status]) .WCVRZG_previewHint{display:inline}.WCVRZG_toggle{border-radius:var(--dsw-radius-sm);min-width:0;color:var(--dsw-alias-label-tertiary);cursor:pointer;font:inherit;background:0 0;border:0;align-self:center;align-items:center;gap:4px;padding:1px 11px;font-size:12px;line-height:18px;display:inline-flex}.WCVRZG_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.WCVRZG_toggle svg{flex:none;width:14px;height:14px}@container (width<=620px){.WCVRZG_presented{grid-template-columns:minmax(0,1fr)}}.WCVRZG_actions{pointer-events:auto;flex:none;display:inline-flex}.WCVRZG_secondaryText[data-success]{animation-name:WCVRZG_success-fade;animation-timing-function:ease-out;animation-fill-mode:forwards}@keyframes WCVRZG_success-fade{to{opacity:0}}@media (prefers-reduced-motion:reduce){.WCVRZG_secondaryText[data-success]{animation-name:none}}";
		const tagId$4 = "@deepseek-ai/dsh-workbench/Deliverables.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var Deliverables_module_css_default = {
			"actions": "WCVRZG_actions",
			"cardPreview": "WCVRZG_cardPreview",
			"description": "WCVRZG_description",
			"details": "WCVRZG_details",
			"file": "WCVRZG_file",
			"fileBody": "WCVRZG_fileBody",
			"fileIcon": "WCVRZG_fileIcon",
			"fileName": "WCVRZG_fileName",
			"hostStatus": "WCVRZG_hostStatus",
			"presented": "WCVRZG_presented",
			"previewHint": "WCVRZG_previewHint",
			"root": "WCVRZG_root",
			"secondaryText": "WCVRZG_secondaryText",
			"success-fade": "WCVRZG_success-fade",
			"toggle": "WCVRZG_toggle"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/PresentedFileCard.tsx
		function cardDescription(description, fallback) {
			const trimmed = description?.replace(/\s*(?:\([^()]*\)|（[^（）]*）)\s*$/u, "").trim();
			return trimmed === void 0 || trimmed === "" ? fallback : trimmed;
		}
		/**
		* Render independent file actions without nesting buttons inside a clickable card.
		* @param props - durable file metadata, Sidebar preview, Host capabilities, gesture status, and localized copy.
		* @returns the file card and its anchored action menu.
		*/
		function PresentedFileCard({ file, cwd, phase, host, onPreview, actions, t }) {
			const succeeded = phase === "opened" || phase === "revealed";
			const reveal = host?.fileManager ?? "directory";
			const name = basename(file.path);
			const metadata = (0, _deepseek_ai_dsh_client_ui_primitives.fileExtension)(name).toUpperCase() || t("presented.file");
			const status = phase === void 0 ? cardDescription(file.description, metadata) : t(reveal === "directory" && phase === "revealed" ? "presented.directoryOpened" : reveal === "directory" && phase === "revealing" ? "presented.directoryOpening" : reveal === "directory" && phase === "revealError" ? "presented.directoryError" : `presented.${phase}`);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Deliverables_module_css_default.file,
				"data-presented-file": true,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: Deliverables_module_css_default.cardPreview,
						title: resolveWorkspacePath(cwd, file.path),
						"aria-label": t("presented.previewCard", { name: file.path }),
						onClick: onPreview
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Deliverables_module_css_default.fileIcon,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.FileTypeIcon, {
							path: file.path,
							size: 20
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Deliverables_module_css_default.fileBody,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: Deliverables_module_css_default.details,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: Deliverables_module_css_default.fileName,
								children: name
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: Deliverables_module_css_default.description,
								"data-presented-description": true,
								role: phase === void 0 ? void 0 : "status",
								"data-error": phase === "error" || phase === "revealError" || phase === "nativeUnavailable" ? true : void 0,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: Deliverables_module_css_default.secondaryText,
									"data-success": succeeded || void 0,
									style: succeeded ? {
										animationDelay: `${PRESENTED_SUCCESS_HOLD_MS}ms`,
										animationDuration: `200ms`
									} : void 0,
									children: status
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: Deliverables_module_css_default.previewHint,
									children: t("presented.preview")
								})]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: Deliverables_module_css_default.actions,
							children: actions
						})]
					})
				]
			});
		}
		//#endregion
		//#region ../ui-deliverables/src/client/Deliverables.tsx
		/** The changed-files card, shown only while the Host serves the turn's summary, and explicitly declared files for a closing turn. */
		const COLLAPSED_PRESENTED_COUNT = 4;
		/**
		* Claim turns with a change announcement or declared files.
		* @param owner - closing turn.
		* @returns matched announcement and deliveries, or null for a turn with neither.
		*/
		function selectDeliverables(owner) {
			const changes = changesForClosing(owner);
			const presented = presentedForClosing(owner);
			return changes === null && presented.length === 0 ? null : {
				changes,
				presented
			};
		}
		/**
		* Contribute file deliveries alongside other completed-Turn artifacts.
		* @param props - closing Turn, file actions, and localized copy.
		* @returns file rows, or null when the Turn declares none.
		*/
		function DeliverablesTail(props) {
			const matched = selectDeliverables(props);
			return matched === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Deliverables, {
				...props,
				matched
			});
		}
		/**
		* Render the changed-files card, once the Host has served the announced
		* summary and it lists a file, and shared native opening controls for declared
		* files. A summary the Host no longer serves leaves no card.
		* @param props - matched announcement and files, workspace opener, and localized copy.
		* @returns the closing turn's file rows.
		*/
		function Deliverables({ matched, openFile, t, sessionId, useSessions, openPresented, openChangesReview, rejectFile, usePresentedOpen, usePresentedHost, useChangesDiff, loadChangesDiff, useChangesSummary, reloadPresentedHost, loadChangesSummary, useShowCodeDiff, renderSlot }) {
			const [expanded, setExpanded] = (0, react.useState)(false);
			const showCodeDiff = useShowCodeDiff((value) => value);
			const cwd = useSessions((state) => state.byId[sessionId]?.cwd);
			const states = usePresentedOpen((value) => value);
			const host = usePresentedHost((value) => value);
			const announced = showCodeDiff ? matched.changes : null;
			const summary = useChangesSummary((value) => announced === null ? void 0 : value[changesSummaryUrl(sessionId, announced.seq)]);
			(0, react.useEffect)(() => {
				if (announced !== null && summary === void 0) loadChangesSummary(sessionId, announced.seq);
			}, [
				announced,
				summary,
				sessionId,
				loadChangesSummary
			]);
			const changes = announced !== null && typeof summary === "object" && summary.files.length > 0 ? {
				seq: announced.seq,
				...summary
			} : null;
			const collapsible = matched.presented.length > COLLAPSED_PRESENTED_COUNT;
			const presented = collapsible && !expanded ? matched.presented.slice(0, COLLAPSED_PRESENTED_COUNT) : matched.presented;
			(0, react.useEffect)(() => {
				if (host === null) reloadPresentedHost();
			}, [host, reloadPresentedHost]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [changes !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChangedFiles, {
				changes,
				cwd,
				t,
				sessionId,
				useChangesDiff,
				loadChangesDiff,
				onReject: rejectFile,
				openReview: (index) => {
					openChangesReview({
						sessionId,
						seq: changes.seq,
						turn: changes.turn
					}, index);
				}
			}), matched.presented.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Deliverables_module_css_default.root,
				"data-after-changes": changes !== null || void 0,
				children: [
					host === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Deliverables_module_css_default.hostStatus,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("presented.hostError") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							onClick: () => {
								reloadPresentedHost();
							},
							children: t("presented.retry")
						})]
					}),
					host !== null && host !== "error" && !host.available && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Deliverables_module_css_default.hostStatus,
						children: t("presented.unavailable")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Deliverables_module_css_default.presented,
						"data-presented-files-row": true,
						"data-single": matched.presented.length === 1 ? true : void 0,
						children: presented.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PresentedFileCard, {
							file,
							cwd,
							phase: states[presentedFileUrl(sessionId, file.seq, file.index)],
							host: host === "error" ? null : host,
							t,
							onPreview: () => {
								openFile(file.path);
							},
							actions: renderSlot("deliverables.file.actions", {
								actionUrl: presentedFileUrl(sessionId, file.seq, file.index),
								available: host !== null && host !== "error" && host.available,
								pending: states[presentedFileUrl(sessionId, file.seq, file.index)] === "opening" || states[presentedFileUrl(sessionId, file.seq, file.index)] === "revealing",
								onAction: (action, application) => openPresented(sessionId, file.seq, file.index, action, application)
							})
						}, `${file.seq}:${file.index}`))
					}),
					collapsible && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: Deliverables_module_css_default.toggle,
						"aria-expanded": expanded,
						"aria-label": t(expanded ? "presented.collapseAria" : "presented.expandAria", { count: matched.presented.length }),
						onClick: () => {
							setExpanded((value) => !value);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t(expanded ? "presented.collapse" : "presented.all", { count: matched.presented.length }) }), expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronUpOutlineRegular, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, {})]
					})
				]
			})] });
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-deliverables/src/client/ReviewTab.module.css.mjs
		const css$3 = ".QwOwnG_root{height:100%}.QwOwnG_selector{flex:0 auto;min-width:0}.QwOwnG_selectorLabel{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;font-size:12px;overflow:hidden}.QwOwnG_selectorButton{box-sizing:border-box;border-radius:var(--dsw-radius-sm);max-width:100%;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;background:0 0;border:0;align-items:center;gap:4px;padding:0 6px 0 8px;font-size:12px;line-height:20px;display:inline-flex}.QwOwnG_selectorButton:hover,.QwOwnG_selectorButton[aria-expanded=true]{background:var(--dsw-alias-interactive-bg-hover)}.QwOwnG_selectorButton svg{flex:none;display:block}.QwOwnG_item{justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex}.QwOwnG_itemPath{text-overflow:ellipsis;white-space:nowrap;min-width:0;line-height:20px;overflow:hidden}.QwOwnG_itemCounts,.QwOwnG_counts{font-family:var(--ds-font-family-code);color:var(--dsw-alias-label-tertiary);flex:none;align-items:center;gap:6px;font-size:12px;line-height:20px;display:inline-flex}.QwOwnG_counts{min-width:0;margin-right:auto}.QwOwnG_added{color:var(--dsw-alias-state-success-primary)}.QwOwnG_deleted{color:var(--dsw-alias-state-error-primary)}.QwOwnG_label{color:var(--dsw-alias-label-tertiary)}.QwOwnG_tools{flex:none;align-items:center;gap:2px;margin-left:auto;display:inline-flex}.QwOwnG_tool{border-radius:var(--dsw-radius-sm);width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;flex:none;justify-content:center;align-items:center;padding:6px;display:inline-flex}.QwOwnG_tool svg{width:15px;height:15px}.QwOwnG_tool:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.QwOwnG_tool[aria-pressed=true] .QwOwnG_compareIcon{transform:rotate(90deg)}.QwOwnG_tool:disabled{cursor:progress}.QwOwnG_tool[data-error]{color:var(--dsw-alias-state-error-primary)}";
		const tagId$3 = "@deepseek-ai/dsh-workbench/ReviewTab.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var ReviewTab_module_css_default = {
			"added": "QwOwnG_added",
			"compareIcon": "QwOwnG_compareIcon",
			"counts": "QwOwnG_counts",
			"deleted": "QwOwnG_deleted",
			"item": "QwOwnG_item",
			"itemCounts": "QwOwnG_itemCounts",
			"itemPath": "QwOwnG_itemPath",
			"label": "QwOwnG_label",
			"root": "QwOwnG_root",
			"selector": "QwOwnG_selector",
			"selectorButton": "QwOwnG_selectorButton",
			"selectorLabel": "QwOwnG_selectorLabel",
			"tool": "QwOwnG_tool",
			"tools": "QwOwnG_tools"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/ReviewTab.tsx
		/**
		* The review tab: one turn's changed files behind a file selector, with the
		* selected file's turn-start and turn-end comparison drawn unified or side by
		* side, wrapped or scrolling, and controls to open the file itself.
		*/
		const GROUPED = new Intl.NumberFormat("en-US");
		/** The file index a navigation names, when it names one. */
		function navigatedIndex(params) {
			const index = params?.index;
			return typeof index === "number" && Number.isSafeInteger(index) && index >= 0 ? index : void 0;
		}
		/** Added and deleted line counts in the card's colors. */
		function Counts({ file, t }) {
			if (file.binary === true) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ReviewTab_module_css_default.label,
				children: t("changes.binary")
			});
			if (file.oversized === true) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ReviewTab_module_css_default.label,
				children: t("changes.oversized")
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ReviewTab_module_css_default.added,
				children: t("changes.added", { count: GROUPED.format(file.added) })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ReviewTab_module_css_default.deleted,
				children: t("changes.deleted", { count: GROUPED.format(file.deleted) })
			})] });
		}
		/**
		* The review type's body, registered under `sidebar.right.pane.tab` as `changes-review`.
		* @param props - composed slot props.
		* @returns the selected file's comparison behind the file selector, or the state that stands in for it.
		*/
		function ReviewTab({ useTabInfo, sessionId, useSessions, useStore, actions, useChangesSummary, useChangesDiff, usePresentedOpen, usePresentedHost, loadChangesSummary, loadChangesDiff, reloadPresentedHost, openChanged, t, renderSlot }) {
			const { tab } = useTabInfo();
			const { navigation, signal } = tab;
			const coordinates = (0, react.useMemo)(() => parseChangesReviewAddress(tab.contentId), [tab.contentId]);
			if (coordinates === void 0) throw new Error(`ui-deliverables: not a review address "${tab.contentId}"`);
			const { seq } = coordinates;
			const cwd = useSessions((sessions) => sessions.byId[sessionId]?.cwd);
			const summary = useChangesSummary((value) => value[changesSummaryUrl(sessionId, seq)]);
			const state = useStore((store) => store.byTab[tab.id]);
			const host = usePresentedHost((value) => value);
			(0, react.useEffect)(() => {
				if (state?.navigated === navigation.revision) return;
				actions.navigated(tab.id, navigation.revision, navigatedIndex(navigation.params) ?? state?.index ?? 0);
			}, [
				state,
				navigation.revision,
				navigation.params,
				actions,
				tab.id
			]);
			(0, react.useEffect)(() => {
				const forget = () => {
					actions.forget(tab.id);
				};
				signal.addEventListener("abort", forget, { once: true });
				return () => {
					signal.removeEventListener("abort", forget);
				};
			}, [
				signal,
				actions,
				tab.id
			]);
			(0, react.useEffect)(() => {
				if (summary === void 0) loadChangesSummary(sessionId, seq);
			}, [
				summary,
				sessionId,
				seq,
				loadChangesSummary
			]);
			(0, react.useEffect)(() => {
				if (host === null) reloadPresentedHost();
			}, [host, reloadPresentedHost]);
			const files = typeof summary === "object" ? summary.files : [];
			const index = state !== void 0 && files[state.index] !== void 0 ? state.index : 0;
			const file = files[index];
			const diffState = useChangesDiff((value) => file === void 0 ? void 0 : value[changesDiffUrl(sessionId, seq, index)]);
			(0, react.useEffect)(() => {
				if (file !== void 0 && diffState === void 0) loadChangesDiff(sessionId, seq, index);
			}, [
				file,
				diffState,
				sessionId,
				seq,
				index,
				loadChangesDiff
			]);
			const phase = usePresentedOpen((value) => file === void 0 ? void 0 : value[changedFileUrl(sessionId, seq, index)]);
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const split = state?.split === true;
			const wrap = state?.wrap === true;
			const native = host !== null && host !== "error" && host.available && phase !== "nativeUnavailable";
			const summaryState = summary === void 0 || summary === "loading" ? "loading" : summary === "missing" ? "missing" : "ready";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${FileDiff_module_css_default.root} ${ReviewTab_module_css_default.root}`,
				"data-changes-review": true,
				"data-review-state": summaryState,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: FileDiff_module_css_default.header,
						children: [
							file === void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ReviewTab_module_css_default.selectorLabel,
								children: t("review.title", { turn: String(coordinates.turn) })
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
								className: ReviewTab_module_css_default.selector,
								open: menuOpen,
								autoFocus: true,
								portal: true,
								align: "start",
								dense: true,
								onClose: () => {
									setMenuOpen(false);
								},
								anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: ReviewTab_module_css_default.selectorButton,
									"aria-haspopup": "menu",
									"aria-expanded": menuOpen,
									"aria-label": t("review.selectFile"),
									title: file.display,
									"data-review-file": file.path,
									onClick: () => {
										setMenuOpen((value) => !value);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.PathLabel, { path: file.display }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 12 })]
								}),
								items: files.map((entry, at) => ({
									id: String(at),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: ReviewTab_module_css_default.item,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: ReviewTab_module_css_default.itemPath,
											children: entry.display
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: ReviewTab_module_css_default.itemCounts,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Counts, {
												file: entry,
												t
											})
										})]
									})
								})),
								selectedId: String(index),
								onSelect: (id) => {
									actions.selected(tab.id, Number(id));
									setMenuOpen(false);
								}
							}),
							file !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ReviewTab_module_css_default.counts,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Counts, {
									file,
									t
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: ReviewTab_module_css_default.tools,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label: t(split ? "review.unified" : "review.split"),
										side: "bottom",
										delayMs: 500,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: ReviewTab_module_css_default.tool,
											"aria-pressed": split,
											"aria-label": t("review.splitAria"),
											"data-review-tool": "split",
											onClick: () => {
												actions.toggledSplit(tab.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCompareSplitOutlineRegular, { className: ReviewTab_module_css_default.compareIcon })
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label: t(wrap ? "review.nowrap" : "review.wrap"),
										side: "bottom",
										delayMs: 500,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: ReviewTab_module_css_default.tool,
											"aria-pressed": wrap,
											"aria-label": t("review.wrapAria"),
											"data-review-tool": "wrap",
											onClick: () => {
												actions.toggledWrap(tab.id);
											},
											children: wrap ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNowrapFillRegular, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconWrapFillRegular, {})
										})
									}),
									file !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
										label: t("review.openFile"),
										side: "bottom",
										delayMs: 500,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: ReviewTab_module_css_default.tool,
											"aria-label": t("review.openFileAria", { name: file.display }),
											"data-review-tool": "open-file",
											onClick: () => {
												tab.actions.openResource(fileAddressFor(sessionId, cwd, file.path));
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconInspectOutlineRegular, {})
										})
									}),
									file !== void 0 && renderSlot("deliverables.review.file.actions", {
										actionUrl: changedFileUrl(sessionId, seq, index),
										available: native,
										pending: phase === "opening" || phase === "revealing",
										onAction: (action, application) => openChanged(sessionId, seq, index, action, application)
									})
								]
							})
						]
					}),
					summaryState === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: FileDiff_module_css_default.status,
						role: "status",
						children: t("diff.loading")
					}),
					summaryState === "missing" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: FileDiff_module_css_default.status,
						children: t("diff.missing")
					}),
					file !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileDiff, {
						state: diffState,
						split,
						wrap,
						t,
						retry: () => {
							loadChangesDiff(sessionId, seq, index);
						}
					})
				]
			});
		}
		//#endregion
		//#region ../ui-deliverables/src/client/review-definition.ts
		/** The tab kind this package owns. */
		const CHANGES_REVIEW_KIND = "changes-review";
		/** This implementation's identity in the tab system, and the key its body registers under. */
		const CHANGES_REVIEW_ID = "@deepseek-ai/dsh-client-ui-deliverables";
		/**
		* The review type's registry definition.
		* @param t - namespace-bound translate, read fresh on every title call.
		* @returns the definition to register.
		*/
		function changesReviewDefinition(t) {
			return {
				id: CHANGES_REVIEW_ID,
				kind: CHANGES_REVIEW_KIND,
				patterns: ["dsh-resource://changes-review/**"],
				priority: "builtin",
				canOpen: (address) => parseChangesReviewAddress(address) !== void 0,
				title: (address) => {
					const turn = parseChangesReviewAddress(address)?.turn;
					return turn === void 0 ? address : t("review.title", { turn: String(turn) });
				}
			};
		}
		//#endregion
		//#region ../ui-deliverables/src/client/review-store.ts
		/**
		* The review tab's view state: which listed file is shown, whether hunks are
		* drawn side by side, and whether long lines wrap. One bucket per tab, so two
		* reviews in one session keep their own choices; the bucket ends with the
		* tab record's signal.
		*/
		function bucket(state, tabId) {
			const tab = state.byTab[tabId];
			if (tab === void 0) throw new Error(`ui-deliverables: no review state for tab "${tabId}"`);
			return tab;
		}
		/**
		* Declare the review tab's store; the registration declares it as an
		* exclusive store, so the framework mints one instance per session.
		* @returns the store handle to declare on the registration.
		*/
		function createReviewStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({ byTab: {} }),
				actions: {
					/**
					* Apply a navigation: seed a side-by-side, unwrapped tab on its first one, then show the navigated file.
					* @param d - draft state.
					* @param tabId - the tab being drawn.
					* @param revision - the navigation revision being applied.
					* @param index - the file index the navigation named, or the current one.
					*/
					navigated: (d, tabId, revision, index) => {
						const tab = d.byTab[tabId];
						if (tab === void 0) d.byTab[tabId] = {
							index,
							split: true,
							wrap: false,
							navigated: revision
						};
						else {
							tab.index = index;
							tab.navigated = revision;
						}
					},
					/**
					* Show another listed file.
					* @param d - draft state.
					* @param tabId - the tab being drawn.
					* @param index - original index in the summary's files array.
					*/
					selected: (d, tabId, index) => {
						bucket(d, tabId).index = index;
					},
					/**
					* Switch between the unified and the side-by-side view.
					* @param d - draft state.
					* @param tabId - the tab being drawn.
					*/
					toggledSplit: (d, tabId) => {
						const tab = bucket(d, tabId);
						tab.split = !tab.split;
					},
					/**
					* Switch line wrapping.
					* @param d - draft state.
					* @param tabId - the tab being drawn.
					*/
					toggledWrap: (d, tabId) => {
						const tab = bucket(d, tabId);
						tab.wrap = !tab.wrap;
					},
					/**
					* Drop a tab's bucket once its record is gone.
					* @param d - draft state.
					* @param tabId - the tab that ended.
					*/
					forget: (d, tabId) => {
						d.byTab = Object.fromEntries(Object.entries(d.byTab).filter(([id]) => id !== tabId));
					}
				}
			});
		}
		//#endregion
		//#region ../ui-deliverables/src/client/locales.ts
		/** `deliverables` namespace dictionaries: cards, comparison tab, and file-mention copy. */
		/** Dictionary namespace owned by this plugin. */
		const NS$1 = "deliverables";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh$2 = {
			"presented.nativeUnavailable": "此文件没有可用的主机路径，请在侧边栏预览",
			"presented.revealError": "无法在文件管理器中显示，请重试",
			"presented.directoryError": "无法打开所在文件夹，请重试",
			"presented.directoryOpening": "正在打开所在文件夹…",
			"presented.directoryOpened": "已请求打开所在文件夹",
			"presented.revealed": "已请求在文件管理器中显示",
			"presented.revealing": "正在文件管理器中显示…",
			"presented.unavailable": "此主机没有可用的桌面，无法使用外部程序打开文件或文件夹；文件仍可在侧边栏预览",
			"presented.retry": "重试",
			"presented.hostError": "无法读取主机桌面信息",
			"presented.preview": "在侧边栏预览",
			"presented.previewButton": "在侧边栏打开 {name}",
			"presented.previewCard": "在侧边栏预览 {name}",
			"presented.all": "全部 {count} 个文件",
			"presented.expandAria": "展开全部 {count} 个交付文件",
			"presented.collapse": "收起",
			"presented.collapseAria": "收起交付文件列表",
			"presented.opening": "正在打开…",
			"presented.opened": "已请求打开",
			"presented.error": "打开失败，点击重试",
			"presented.file": "文件",
			"row.title": "交付文件",
			"row.running": "正在交付",
			"row.preparing": "准备交付",
			"row.ok": "已交付",
			"row.error": "交付失败",
			"row.stopped": "已中断",
			"row.inspect": "查看调用",
			"changes.title": "已编辑 {count} 个文件",
			"changes.singleTitle": "已编辑 {name}",
			"changes.added": "+{count}",
			"changes.deleted": "-{count}",
			"changes.binary": "二进制",
			"changes.reject": "拒绝",
			"changes.rejectAll": "全部拒绝",
			"changes.acceptAll": "全部接受",
			"changes.rejectFile": "拒绝 {name}",
			"changes.openReview": "在侧边栏查看本轮改动",
			"changes.all": "全部 {count} 个文件",
			"changes.expandAria": "展开全部 {count} 个改动文件",
			"changes.collapse": "收起",
			"changes.collapseAria": "收起改动文件列表",
			"changes.oversized": "过大",
			"changes.viewDiff": "查看 {name} 的改动",
			"review.title": "第 {turn} 轮改动",
			"review.selectFile": "选择要查看的文件",
			"review.split": "切换为左右对比",
			"review.unified": "切换为单栏对比",
			"review.splitAria": "左右对比",
			"review.wrap": "开启自动换行",
			"review.nowrap": "关闭自动换行",
			"review.wrapAria": "自动换行",
			"review.openFile": "在侧边栏打开整个文件",
			"review.openFileAria": "在侧边栏打开 {name}",
			"diff.loading": "正在读取改动…",
			"diff.missing": "这轮改动的内容已不可用",
			"diff.error": "无法读取改动",
			"diff.binary": "二进制文件，无法显示改动",
			"diff.oversized": "文件过大，无法显示改动",
			"diff.created": "本轮新建的文件",
			"diff.deleted": "本轮删除的文件",
			"diff.unchanged": "两侧内容相同",
			"diff.coarse": "逐行对比超时，按整个文件替换显示",
			"diff.truncated": "只显示前 {count} 行"
		};
		/** English dictionary (same key set). */
		const en$2 = {
			"presented.nativeUnavailable": "This file has no available Host path. Preview it in the sidebar.",
			"presented.revealError": "Could not show in file manager. Try again.",
			"presented.directoryError": "Could not open containing folder. Try again.",
			"presented.directoryOpening": "Opening containing folder…",
			"presented.directoryOpened": "Requested opening containing folder",
			"presented.revealed": "Requested display in file manager",
			"presented.revealing": "Showing in file manager…",
			"presented.unavailable": "This Host has no desktop available to open files or folders in external apps. Files can still be previewed in the sidebar.",
			"presented.retry": "Retry",
			"presented.hostError": "Could not read the Host desktop information",
			"presented.preview": "Preview in sidebar",
			"presented.previewButton": "Open {name} in sidebar",
			"presented.previewCard": "Preview {name} in sidebar",
			"presented.all": "All {count} files",
			"presented.expandAria": "Show all {count} delivered files",
			"presented.collapse": "Collapse",
			"presented.collapseAria": "Collapse delivered files",
			"presented.opening": "Opening…",
			"presented.opened": "Open requested",
			"presented.error": "Could not open. Click to retry.",
			"presented.file": "File",
			"row.title": "Present files",
			"row.running": "Delivering",
			"row.preparing": "Preparing deliverables",
			"row.ok": "Delivered",
			"row.error": "Delivery failed",
			"row.stopped": "Interrupted",
			"row.inspect": "Inspect call",
			"changes.title": "Edited {count} files",
			"changes.singleTitle": "Edited {name}",
			"changes.added": "+{count}",
			"changes.deleted": "-{count}",
			"changes.binary": "binary",
			"changes.reject": "Reject",
			"changes.rejectAll": "Reject all",
			"changes.acceptAll": "Accept all",
			"changes.rejectFile": "Reject {name}",
			"changes.openReview": "Review this turn’s changes in the sidebar",
			"changes.all": "All {count} files",
			"changes.expandAria": "Show all {count} changed files",
			"changes.collapse": "Collapse",
			"changes.collapseAria": "Collapse changed files",
			"changes.oversized": "too large",
			"changes.viewDiff": "View changes to {name}",
			"review.title": "Review · turn {turn}",
			"review.selectFile": "Choose the file to review",
			"review.split": "Switch to split view",
			"review.unified": "Switch to unified view",
			"review.splitAria": "Split view",
			"review.wrap": "Enable line wrap",
			"review.nowrap": "Disable line wrap",
			"review.wrapAria": "Line wrap",
			"review.openFile": "Open the whole file in the sidebar",
			"review.openFileAria": "Open {name} in sidebar",
			"diff.loading": "Reading changes…",
			"diff.missing": "The contents of this turn’s changes are no longer available",
			"diff.error": "Could not read the changes",
			"diff.binary": "Binary file; changes cannot be shown",
			"diff.oversized": "File too large; changes cannot be shown",
			"diff.created": "Created in this turn",
			"diff.deleted": "Deleted in this turn",
			"diff.unchanged": "Both sides hold the same lines",
			"diff.coarse": "Line comparison timed out; shown as a whole-file replacement",
			"diff.truncated": "Showing the first {count} lines"
		};
		//#endregion
		//#region ../ui-deliverables/src/client/index.ts
		/** Required services for the tail-slot and tab-type registrations and their dictionaries. */
		const inject$3 = [
			"slots",
			"locale",
			"uiConversation",
			"remote",
			"remote.session",
			"sidebarRightTabs",
			"sidebarRight",
			"configForms"
		];
		/**
		* Client plugin body: register the dictionaries, the turn-tail entry, and the comparison tab type.
		* @param ctx - client root context.
		*/
		function apply$3(ctx) {
			const opener = new PresentedOpenController();
			const summaries = new ChangesSummaryStore();
			const diffs = new ChangesDiffStore();
			ctx.effect(() => () => Promise.all([
				opener.dispose(),
				summaries.dispose(),
				diffs.dispose()
			]));
			ctx.on("connection/reset", () => {
				opener.resetHost();
				summaries.reset();
				diffs.reset();
			});
			ctx.uiConversation.events.register(deliverablesDefinition);
			ctx.effect(() => ctx.locale.register(NS$1, {
				zh: zh$2,
				en: en$2
			}), "ui-deliverables: dictionaries");
			ctx.slots.inject("conversation.chat.turnTail", () => ctx.slots.register({
				name: "conversation.chat.turnTail",
				id: "@deepseek-ai/dsh-client-ui-deliverables",
				locale: NS$1,
				children: { "deliverables.file.actions": {
					kind: "list",
					scope: "session"
				} },
				inject: () => ({
					hooks: {
						changesDiff: diffs.state,
						presentedOpen: opener.state,
						presentedHost: opener.host,
						changesSummary: summaries.state,
						showCodeDiff: ctx.configForms.developerTools.enabled
					},
					loadChangesDiff: (sessionId, seq, index) => diffs.load(sessionId, seq, index),
					reloadPresentedHost: () => opener.loadHost(),
					rejectFile: (absolutePath) => {
						ctx.get("workbenchReview")?.rejectPath(absolutePath);
					},
					loadChangesSummary: (sessionId, seq) => summaries.load(sessionId, seq),
					openPresented: (sessionId, seq, index, action, application) => opener.open(sessionId, seq, index, action, application),
					openChanged: (sessionId, seq, index, action, application) => opener.openChanged(sessionId, seq, index, action, application),
					openChangesReview: (coordinates, index) => {
						ctx.sidebarRight.openResource(changesReviewAddress(coordinates), { params: { index } });
					}
				})
			}, DeliverablesTail));
			ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({
				name: "tool.call.toolview",
				key: "present",
				locale: NS$1
			}, PresentRow));
			const t = ctx.locale.bind(NS$1);
			ctx.effect(() => ctx.sidebarRightTabs.register(changesReviewDefinition(t)), "ui-deliverables: changes-review type");
			ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
				name: "sidebar.right.pane.tab",
				key: CHANGES_REVIEW_ID,
				locale: NS$1,
				store: createReviewStore(),
				children: { "deliverables.review.file.actions": {
					kind: "list",
					scope: "session"
				} },
				inject: () => ({
					hooks: {
						changesSummary: summaries.state,
						changesDiff: diffs.state,
						presentedOpen: opener.state,
						presentedHost: opener.host
					},
					loadChangesSummary: (sessionId, seq) => summaries.load(sessionId, seq),
					loadChangesDiff: (sessionId, seq, index) => diffs.load(sessionId, seq, index),
					reloadPresentedHost: () => opener.loadHost(),
					openChanged: (sessionId, seq, index, action, application) => opener.openChanged(sessionId, seq, index, action, application)
				})
			}, ReviewTab)), "ui-deliverables: changes-review body");
			ctx.provide("chatFileMentions", { forClosing(owner) {
				const paths = selectProducedFiles(owner);
				const presented = presentedForClosing(owner);
				if (paths === null && presented.length === 0) return void 0;
				return producedFileMentions([...new Set([...paths ?? [], ...presented.map((file) => file.path)])], owner.openFile, (path) => t("presented.previewButton", { name: path }));
			} });
		}
		//#endregion
		//#region ../../api/customizations-controller/lib/typert.remote-client.js
		let _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_parameter_0$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_parameter_0$schema$value ??= object({
			"id": string().readonly(),
			"serverName": string().readonly(),
			"transport": union([literal("stdio"), literal("streamable-http")]).readonly(),
			"command": string().readonly().optional(),
			"args": array(string()).readonly().optional(),
			"env": record(string(), string()).readonly().readonly().optional(),
			"cwd": string().readonly().optional(),
			"url": string().readonly().optional(),
			"headers": record(string(), string()).readonly().readonly().optional(),
			"enabled": boolean().readonly()
		});
		let _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_result$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_result$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_result$schema$value ??= _void();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_balance_result$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_balance_result$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_balance_result$schema$value ??= object({
			"state": union([
				literal("failed"),
				literal("ready"),
				literal("no-key")
			]).readonly(),
			"currency": string().readonly().optional(),
			"total": string().readonly().optional(),
			"granted": string().readonly().optional(),
			"toppedUp": string().readonly().optional()
		});
		let _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_parameter_0$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_parameter_0$schema$value ??= string();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_result$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_result$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_result$schema$value ??= _void();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_0$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_0$schema$value ??= string();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_1$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_1$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_1$schema$value ??= boolean();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_result$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_result$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_result$schema$value ??= _void();
		let _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_parameter_0$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_parameter_0$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_parameter_0$schema$value ??= union([_undefined(), intersection(string(), unknown())]);
		let _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_result$schema$value;
		const _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_result$schema = () => _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_result$schema$value ??= object({
			"skillsAvailable": boolean().readonly(),
			"presets": array(string()).readonly(),
			"skills": array(object({
				"name": string().readonly(),
				"description": string().readonly(),
				"whenToUse": string().readonly().optional(),
				"path": string().readonly().optional(),
				"source": string().readonly(),
				"provider": string().readonly(),
				"modelInvocable": boolean().readonly(),
				"userInvocable": boolean().readonly(),
				"presets": array(string()).readonly()
			})).readonly(),
			"skillsTruncated": boolean().readonly(),
			"mcpServers": array(object({
				"entryId": string().readonly(),
				"serverName": string().readonly(),
				"transport": union([literal("stdio"), literal("streamable-http")]).readonly(),
				"target": string().readonly(),
				"enabled": boolean().readonly(),
				"fiberPhase": union([
					literal(null),
					literal("failed"),
					literal("pending"),
					literal("loading"),
					literal("active"),
					literal("unloading")
				]).readonly(),
				"tools": array(object({
					"name": string().readonly(),
					"description": string().readonly()
				})).readonly(),
				"manageable": boolean().readonly(),
				"origin": union([
					literal("profile"),
					literal("panel"),
					literal("project")
				]).readonly(),
				"managedId": string().readonly().optional()
			})).readonly(),
			"rules": array(object({
				"name": string().readonly(),
				"path": string().readonly(),
				"scope": union([literal("project"), literal("user")]).readonly(),
				"bytes": number().readonly()
			})).readonly(),
			"rulesTruncated": boolean().readonly(),
			"usage": object({
				"instructionBytes": number().readonly(),
				"catalogBytes": number().readonly(),
				"estimatedTokens": number().readonly(),
				"budgetTokens": number().readonly()
			}).readonly()
		});
		const TYPERT_REMOTE = {
			package: "@deepseek-ai/dsh-api-customizations-controller",
			descriptors: [
				{
					id: "@deepseek-ai/dsh-api-customizations-controller#customizations/addMcpServer",
					service: "customizations",
					namespace: "customizations",
					method: "addMcpServer",
					invocation: { kind: "direct" },
					parameters: [{
						name: "server",
						wire: "server",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-customizations-controller/types#ManagedMcpServer",
							create: _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/addMcpServer:result",
						create: _deepseek_ai_dsh_api_customizations_controller_customizations_addMcpServer_result$schema
					},
					sourceLocation: {
						"file": "packages/api/customizations-controller/src/index.ts",
						"line": 290,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-customizations-controller#customizations/balance",
					service: "customizations",
					namespace: "customizations",
					method: "balance",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-customizations-controller/types#CustomizationBalance",
						create: _deepseek_ai_dsh_api_customizations_controller_customizations_balance_result$schema
					},
					sourceLocation: {
						"file": "packages/api/customizations-controller/src/index.ts",
						"line": 341,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-customizations-controller#customizations/removeMcpServer",
					service: "customizations",
					namespace: "customizations",
					method: "removeMcpServer",
					invocation: { kind: "direct" },
					parameters: [{
						name: "id",
						wire: "id",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/removeMcpServer:id",
							create: _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/removeMcpServer:result",
						create: _deepseek_ai_dsh_api_customizations_controller_customizations_removeMcpServer_result$schema
					},
					sourceLocation: {
						"file": "packages/api/customizations-controller/src/index.ts",
						"line": 310,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-customizations-controller#customizations/setManagedMcpServerEnabled",
					service: "customizations",
					namespace: "customizations",
					method: "setManagedMcpServerEnabled",
					invocation: { kind: "direct" },
					parameters: [{
						name: "id",
						wire: "id",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/setManagedMcpServerEnabled:id",
							create: _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_0$schema
						}
					}, {
						name: "enabled",
						wire: "enabled",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/setManagedMcpServerEnabled:enabled",
							create: _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_parameter_1$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-customizations-controller#customizations/setManagedMcpServerEnabled:result",
						create: _deepseek_ai_dsh_api_customizations_controller_customizations_setManagedMcpServerEnabled_result$schema
					},
					sourceLocation: {
						"file": "packages/api/customizations-controller/src/index.ts",
						"line": 324,
						"column": 9
					}
				},
				{
					id: "@deepseek-ai/dsh-api-customizations-controller#customizations/snapshot",
					service: "customizations",
					namespace: "customizations",
					method: "snapshot",
					invocation: { kind: "direct" },
					parameters: [{
						name: "sessionId",
						wire: "sessionId",
						source: "json",
						acceptsUndefined: true,
						codec: {
							mode: "strict",
							typeSymbol: "@deepseek-ai/dsh-session/types#SessionId",
							create: _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@deepseek-ai/dsh-api-customizations-controller/types#CustomizationsSnapshot",
						create: _deepseek_ai_dsh_api_customizations_controller_customizations_snapshot_result$schema
					},
					sourceLocation: {
						"file": "packages/api/customizations-controller/src/index.ts",
						"line": 385,
						"column": 9
					}
				}
			]
		};
		//#endregion
		//#region ../ui-settings-customizations/src/client/search.ts
		/** Query matching shared by the Customizations views. */
		/**
		* Whether any of one item's searchable fields contains the query.
		* @param query - the raw search-field value; blank matches everything.
		* @param fields - the item's searchable text, in display order.
		* @returns whether the item stays visible for this query.
		*/
		function matches(query, fields) {
			const needle = query.trim().toLowerCase();
			if (needle === "") return true;
			return fields.some((field) => field !== void 0 && field.toLowerCase().includes(needle));
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-settings-customizations/src/client/CustomizationsSection.module.css.mjs
		const css$2 = ".zFT48W_section{max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:12px;display:flex}.zFT48W_heading{margin:0;font-size:18px;font-weight:600}.zFT48W_intro{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px;line-height:20px}.zFT48W_controls,.zFT48W_listHeader{flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;display:flex}.zFT48W_search{flex:220px;min-width:0}.zFT48W_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;font-size:13px;line-height:20px;display:flex}.zFT48W_failure p{margin:0}.zFT48W_statusWithDot{align-items:center;gap:6px;display:inline-flex}.zFT48W_status{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px;line-height:20px}.zFT48W_summary{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.zFT48W_list{flex-direction:column;gap:8px;margin:0;padding:0;list-style:none;display:flex}.zFT48W_view{flex-direction:column;gap:10px;display:flex}.zFT48W_card{border-radius:var(--dsw-radius-xl);border:.5px solid var(--dsw-alias-settings-card-stroke);background:var(--dsw-alias-settings-card-fill);flex-direction:column;gap:6px;padding:12px 14px;display:flex}.zFT48W_cardHead{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.zFT48W_cardTitle{margin:0;font-size:14px;font-weight:500;line-height:20px}.zFT48W_cardTags{flex-wrap:wrap;align-items:center;gap:6px;margin-left:auto;display:inline-flex}.zFT48W_cardDescription{color:var(--dsw-alias-label-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:0;font-size:13px;line-height:19px;display:-webkit-box;overflow:hidden}.zFT48W_cardMeta{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;align-items:center;gap:8px;font-size:11px;line-height:16px;display:flex}.zFT48W_mono{font-family:var(--ds-font-family-code);word-break:break-all}.zFT48W_disclosure{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:6px;padding:2px 0;font-size:12px;display:inline-flex}.zFT48W_disclosure:hover{color:var(--dsw-alias-label-primary)}.zFT48W_toolList{border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1);flex-direction:column;gap:6px;margin:4px 0 0;padding:8px 10px;list-style:none;display:flex}.zFT48W_tool{flex-direction:column;gap:1px;display:flex}.zFT48W_toolName{font-family:var(--ds-font-family-code);color:var(--dsw-alias-label-primary);font-size:12px;line-height:17px}.zFT48W_toolDescription{color:var(--dsw-alias-label-tertiary);-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:12px;line-height:17px;display:-webkit-box;overflow:hidden}.zFT48W_skeleton{flex-direction:column;gap:8px;display:flex}.zFT48W_skeletonCard{border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-skeleton);height:72px}.zFT48W_usage{border-radius:var(--dsw-radius-xl);border:.5px solid var(--dsw-alias-settings-card-stroke);background:var(--dsw-alias-settings-card-fill);flex-direction:column;gap:8px;padding:12px 14px;display:flex}.zFT48W_usageHead{flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:12px;display:flex}.zFT48W_usageTitle{font-size:13px;font-weight:500;line-height:20px}.zFT48W_usageBar{corner-shape:round;background:var(--dsw-alias-bg-layer-1);border-radius:999px;height:6px;display:flex;overflow:hidden}.zFT48W_usageRules{background:var(--dsw-alias-state-business-primary)}.zFT48W_usageSkills{background:var(--dsw-alias-brand-primary)}.zFT48W_usageLegend{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;align-items:center;gap:10px;font-size:11px;line-height:16px;display:flex}.zFT48W_usageNote{color:var(--dsw-alias-label-tertiary)}";
		const tagId$2 = "@deepseek-ai/dsh-workbench/CustomizationsSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var CustomizationsSection_module_css_default = {
			"card": "zFT48W_card",
			"cardDescription": "zFT48W_cardDescription",
			"cardHead": "zFT48W_cardHead",
			"cardMeta": "zFT48W_cardMeta",
			"cardTags": "zFT48W_cardTags",
			"cardTitle": "zFT48W_cardTitle",
			"controls": "zFT48W_controls",
			"disclosure": "zFT48W_disclosure",
			"failure": "zFT48W_failure",
			"heading": "zFT48W_heading",
			"intro": "zFT48W_intro",
			"list": "zFT48W_list",
			"listHeader": "zFT48W_listHeader",
			"mono": "zFT48W_mono",
			"search": "zFT48W_search",
			"section": "zFT48W_section",
			"skeleton": "zFT48W_skeleton",
			"skeletonCard": "zFT48W_skeletonCard",
			"status": "zFT48W_status",
			"statusWithDot": "zFT48W_statusWithDot",
			"summary": "zFT48W_summary",
			"tool": "zFT48W_tool",
			"toolDescription": "zFT48W_toolDescription",
			"toolList": "zFT48W_toolList",
			"toolName": "zFT48W_toolName",
			"usage": "zFT48W_usage",
			"usageBar": "zFT48W_usageBar",
			"usageHead": "zFT48W_usageHead",
			"usageLegend": "zFT48W_usageLegend",
			"usageNote": "zFT48W_usageNote",
			"usageRules": "zFT48W_usageRules",
			"usageSkills": "zFT48W_usageSkills",
			"usageTitle": "zFT48W_usageTitle",
			"view": "zFT48W_view"
		};
		//#endregion
		//#region ../ui-settings-customizations/src/client/McpServersList.tsx
		/** The MCP servers view of the Customizations page. */
		/** Localized count of one server's registered tools; a row with none never reaches here. */
		function toolCount(count, t) {
			return count === 1 ? t("mcpToolCount") : t("mcpToolsCount", { count });
		}
		/**
		* Derive one row's status line.
		*
		* The MCP client publishes no connection state, so a running row with no
		* registered tools is reported as possibly unreachable rather than connected,
		* and a row that is still retrying in the background reads as its own phase.
		*/
		function statusLine(server, t) {
			if (!server.enabled) return {
				state: "idle",
				text: t("mcpStatusDisabled")
			};
			if (server.fiberPhase === "failed") return {
				state: "error",
				text: t("mcpStatusFailed")
			};
			if (server.fiberPhase === "loading" || server.fiberPhase === "pending") return {
				state: "ongoing",
				text: t("mcpStatusLoading")
			};
			if (server.tools.length === 0) return {
				state: "warning",
				text: t("mcpStatusEmpty")
			};
			return {
				state: "done",
				text: toolCount(server.tools.length, t)
			};
		}
		/** A blank panel-managed server the add form starts from. */
		function emptyServer() {
			return {
				id: "",
				serverName: "",
				transport: "stdio",
				command: "",
				args: [],
				enabled: true
			};
		}
		/** What one row says about its last enablement write. */
		function writeText(server, t, write) {
			if (write === "applied") return t("mcpToggleApplied");
			if (write === "restart") return t("mcpToggleRestart");
			if (write === "error") return t("mcpToggleFailed");
			if (!server.manageable) return t("mcpToggleLocked");
			return "";
		}
		/**
		* Render the MCP server rows with their registered tools.
		* @param props.t - the section's translate seat.
		* @param props.snapshot - the Host inventory this view filters.
		* @returns the search row, the server cards, or the empty state.
		*/
		function McpServersList({ t, snapshot, setEnabled, addServer, removeServer, setManagedEnabled }) {
			const [query, setQuery] = (0, react.useState)("");
			const [writes, setWrites] = (0, react.useState)({});
			const [form, setForm] = (0, react.useState)();
			const [formError, setFormError] = (0, react.useState)();
			const [expanded, setExpanded] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const servers = snapshot.mcpServers.filter((server) => matches(query, [
				server.serverName,
				server.target,
				server.transport,
				...server.tools.map((tool) => tool.name)
			]));
			const cards = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: CustomizationsSection_module_css_default.list,
				children: servers.map((server) => {
					const line = statusLine(server, t);
					const open = expanded.has(server.entryId);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
						className: CustomizationsSection_module_css_default.card,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardHead,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
									className: CustomizationsSection_module_css_default.cardTitle,
									children: server.serverName
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: CustomizationsSection_module_css_default.cardTags,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: server.enabled ? "success" : "neutral",
											children: server.enabled ? t("mcpEnabled") : t("mcpDisabled")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: "outline",
											children: server.transport === "stdio" ? t("mcpTransportStdio") : t("mcpTransportHttp")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: "quiet",
											children: server.origin === "panel" ? t("originPanel") : server.origin === "project" ? t("originProject") : t("originProfile")
										}),
										server.managedId !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => {
												removeServer(server.managedId ?? "").then((outcome) => {
													if (!outcome.ok) setWrites((previous) => ({
														...previous,
														[server.entryId]: "error"
													}));
												});
											},
											children: t("deleteServer")
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardMeta,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: server.transport === "stdio" ? t("mcpTargetCommand") : t("mcpTargetEndpoint") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.mono,
									children: server.target
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardMeta,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: writeText(server, t, writes[server.entryId]) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Switch, {
									checked: server.enabled,
									disabled: !server.manageable || writes[server.entryId] === "busy",
									label: t("mcpToggle", { name: server.serverName }),
									title: server.manageable ? void 0 : t("mcpToggleLocked"),
									onChange: (next) => {
										setWrites((previous) => ({
											...previous,
											[server.entryId]: "busy"
										}));
										(server.origin === "panel" && server.managedId !== void 0 ? setManagedEnabled(server.managedId, next) : setEnabled(server.entryId, next)).then((outcome) => {
											setWrites((previous) => ({
												...previous,
												[server.entryId]: outcome.ok ? outcome.application === "restart-required" ? "restart" : "applied" : "error"
											}));
										}, () => {
											setWrites((previous) => ({
												...previous,
												[server.entryId]: "error"
											}));
										});
									}
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardMeta,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: CustomizationsSection_module_css_default.statusWithDot,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, {
										state: line.state,
										size: 8
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: line.text })]
								}), server.tools.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: CustomizationsSection_module_css_default.disclosure,
									"aria-expanded": open,
									onClick: () => {
										setExpanded((previous) => {
											const next = new Set(previous);
											if (open) next.delete(server.entryId);
											else next.add(server.entryId);
											return next;
										});
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 12 }), open ? t("hideTools") : t("showTools")]
								})]
							}),
							open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: CustomizationsSection_module_css_default.toolList,
								"aria-label": t("toolListLabel"),
								children: server.tools.map((tool) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									className: CustomizationsSection_module_css_default.tool,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: CustomizationsSection_module_css_default.toolName,
										children: tool.name
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: CustomizationsSection_module_css_default.toolDescription,
										children: tool.description
									})]
								}, tool.name))
							})
						]
					}, server.entryId);
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: CustomizationsSection_module_css_default.view,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.listHeader,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								className: CustomizationsSection_module_css_default.search,
								type: "search",
								icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 16 }),
								value: query,
								placeholder: t("searchMcp"),
								"aria-label": t("searchMcp"),
								onChange: (event) => {
									setQuery(event.target.value);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: CustomizationsSection_module_css_default.summary,
								children: t("mcpCount", { count: servers.length })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									setForm(emptyServer());
									setFormError(void 0);
								},
								children: t("addOpen")
							})
						]
					}),
					form !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.card,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: form.serverName,
								placeholder: t("addNamePlaceholder"),
								"aria-label": t("addName"),
								onChange: (event) => {
									setForm({
										...form,
										serverName: event.target.value,
										id: event.target.value
									});
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Checkbox, {
								checked: form.transport === "stdio",
								label: t("addStdio"),
								onChange: (next) => {
									setForm({
										...form,
										transport: next ? "stdio" : "streamable-http"
									});
								}
							}),
							form.transport === "stdio" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: form.command ?? "",
								placeholder: t("addCommandPlaceholder"),
								"aria-label": t("addCommand"),
								onChange: (event) => {
									setForm({
										...form,
										command: event.target.value
									});
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: (form.args ?? []).join(" "),
								placeholder: t("addArgsPlaceholder"),
								"aria-label": t("addArgs"),
								onChange: (event) => {
									setForm({
										...form,
										args: event.target.value.split(" ").filter(Boolean)
									});
								}
							})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: form.url ?? "",
								placeholder: t("addUrlPlaceholder"),
								"aria-label": t("addUrl"),
								onChange: (event) => {
									setForm({
										...form,
										url: event.target.value
									});
								}
							}),
							formError !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: CustomizationsSection_module_css_default.status,
								role: "alert",
								children: formError
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardTags,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									size: "sm",
									onClick: () => {
										addServer({
											...form,
											id: form.serverName,
											enabled: true
										}).then((outcome) => {
											if (outcome.ok) setForm(void 0);
											else setFormError(t("addFailed"));
										});
									},
									children: t("addSave")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										setForm(void 0);
									},
									children: t("addCancel")
								})]
							})
						]
					}),
					servers.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: CustomizationsSection_module_css_default.status,
						children: snapshot.mcpServers.length === 0 ? t("emptyMcp") : t("emptySearch")
					}) : cards
				]
			});
		}
		//#endregion
		//#region ../ui-settings-customizations/src/client/RulesList.tsx
		/** The instruction-chain view of the Customizations page. */
		/**
		* Render the instruction files this workspace's agents load.
		* @param props.t - the section's translate seat.
		* @param props.snapshot - the Host inventory this view filters.
		* @returns the search row, the file cards, or the empty state.
		*/
		function RulesList({ t, snapshot }) {
			const [query, setQuery] = (0, react.useState)("");
			const rules = snapshot.rules.filter((rule) => matches(query, [
				rule.name,
				rule.path,
				rule.scope
			]));
			const summary = snapshot.rulesTruncated ? `${t("rulesCount", { count: rules.length })} · ${t("truncated", { count: snapshot.rules.length })}` : t("rulesCount", { count: rules.length });
			const cards = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: CustomizationsSection_module_css_default.list,
				children: rules.map((rule) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: CustomizationsSection_module_css_default.card,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.cardHead,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							className: CustomizationsSection_module_css_default.cardTitle,
							children: rule.name
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: CustomizationsSection_module_css_default.cardTags,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
								tone: rule.scope === "user" ? "info" : "neutral",
								children: rule.scope === "user" ? t("ruleUser") : t("ruleProject")
							})
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.cardMeta,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: CustomizationsSection_module_css_default.mono,
							children: rule.path
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: (0, _deepseek_ai_dsh_client_ui_primitives.fileSizeText)(rule.bytes) })]
					})]
				}, rule.path))
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: CustomizationsSection_module_css_default.view,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: CustomizationsSection_module_css_default.listHeader,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
						className: CustomizationsSection_module_css_default.search,
						type: "search",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 16 }),
						value: query,
						placeholder: t("searchRules"),
						"aria-label": t("searchRules"),
						onChange: (event) => {
							setQuery(event.target.value);
						}
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: CustomizationsSection_module_css_default.summary,
						children: summary
					})]
				}), rules.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: CustomizationsSection_module_css_default.status,
					children: t("emptyRules")
				}) : cards]
			});
		}
		//#endregion
		//#region ../ui-settings-customizations/src/client/SkillsList.tsx
		/** The Skills view of the Customizations page. */
		/**
		* Discovery roots as the skill registry names them, mapped to dictionary keys.
		* A source outside this table is shown verbatim instead of being dropped.
		*/
		const SOURCE_KEYS = {
			"project-dsh": "sourceProjectDsh",
			"project-agents": "sourceProjectAgents",
			custom: "sourceCustom",
			"user-dsh": "sourceUserDsh",
			"user-agents": "sourceUserAgents",
			bundled: "sourceBundled",
			runtime: "sourceRuntime"
		};
		/** Localized name of one skill's discovery root. */
		function sourceLabel(source, t) {
			const key = SOURCE_KEYS[source];
			return key === void 0 ? source : t(key);
		}
		/**
		* Render the merged skill catalog.
		* @param props.t - the section's translate seat.
		* @param props.snapshot - the Host inventory this view filters.
		* @returns the search row, the skill cards, or the empty state.
		*/
		function SkillsList({ t, snapshot }) {
			const [query, setQuery] = (0, react.useState)("");
			const skills = snapshot.skills.filter((skill) => matches(query, [
				skill.name,
				skill.description,
				skill.whenToUse,
				skill.path,
				skill.source,
				...skill.presets
			]));
			if (!snapshot.skillsAvailable) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: CustomizationsSection_module_css_default.status,
				children: t("skillsUnavailable")
			});
			const summary = snapshot.skillsTruncated ? `${t("skillsCount", { count: skills.length })} · ${t("truncated", { count: snapshot.skills.length })}` : t("skillsCount", { count: skills.length });
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: CustomizationsSection_module_css_default.view,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: CustomizationsSection_module_css_default.listHeader,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
						className: CustomizationsSection_module_css_default.search,
						type: "search",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 16 }),
						value: query,
						placeholder: t("searchSkills"),
						"aria-label": t("searchSkills"),
						onChange: (event) => {
							setQuery(event.target.value);
						}
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: CustomizationsSection_module_css_default.summary,
						children: summary
					})]
				}), skills.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: CustomizationsSection_module_css_default.status,
					children: snapshot.skills.length === 0 ? t("emptySkills") : t("emptySearch")
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
					className: CustomizationsSection_module_css_default.list,
					children: skills.map((skill) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
						className: CustomizationsSection_module_css_default.card,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardHead,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
									className: CustomizationsSection_module_css_default.cardTitle,
									children: skill.name
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: CustomizationsSection_module_css_default.cardTags,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: "neutral",
											children: sourceLabel(skill.source, t)
										}),
										skill.modelInvocable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: "quiet",
											children: t("modelTag")
										}),
										skill.userInvocable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tag, {
											tone: "quiet",
											children: t("userTag")
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: CustomizationsSection_module_css_default.cardDescription,
								children: skill.description
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.cardMeta,
								children: [skill.presets.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: `${t("presetsLabel")}: ${skill.presets.join(", ")}` }), skill.path !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.mono,
									children: skill.path
								})]
							})
						]
					}, `${skill.name}:${skill.path ?? ""}`))
				})]
			});
		}
		//#endregion
		//#region ../ui-settings-customizations/src/client/CustomizationsSection.tsx
		/** Customizations settings section: this deployment's Skills, MCP servers, and instruction files. */
		/** Placeholder cards the loading skeleton lays out. */
		const SKELETON_CARDS = [
			0,
			1,
			2
		];
		/** What one balance answer says, as one localized line. */
		function balanceText(balance, t) {
			if (balance.state === "no-key") return t("balanceNoKey");
			if (balance.state === "failed" || balance.total === void 0) return t("balanceFailed");
			const amount = t("balanceAmount", {
				amount: balance.total,
				currency: balance.currency ?? ""
			});
			if (balance.toppedUp === void 0 && balance.granted === void 0) return amount;
			return `${amount} · ${t("balanceBreakdown", {
				toppedUp: balance.toppedUp ?? "—",
				granted: balance.granted ?? "—"
			})}`;
		}
		/** Share of the budget one measured part occupies, as a CSS width. */
		function share(part, total, usedPercent) {
			if (total <= 0) return "0%";
			return `${String(part / total * usedPercent)}%`;
		}
		/**
		* Render the Customizations page: one inventory read, three views over it, and
		* the estimated budget the customizations occupy.
		* @param props - the renderer-bound runtime, locale, and injected Host face.
		* @returns the section content.
		*/
		function CustomizationsSection({ t, list, setEnabled, addServer, removeServer, setManagedEnabled, readBalance, useMainSessionId }) {
			const tabsId = (0, react.useId)();
			const [view, setView] = (0, react.useState)({ status: "loading" });
			const [active, setActive] = (0, react.useState)("skills");
			const sessionId = useMainSessionId((value) => value);
			const read = (0, react.useCallback)(() => {
				setView({ status: "loading" });
				list(sessionId).then((snapshot) => {
					setView({
						status: "ready",
						snapshot
					});
				}, () => {
					setView({ status: "error" });
				});
			}, [list, sessionId]);
			(0, react.useEffect)(() => {
				read();
			}, [read]);
			const [balance, setBalance] = (0, react.useState)();
			const loadBalance = (0, react.useCallback)(() => {
				readBalance().then(setBalance, () => {
					setBalance({ state: "failed" });
				});
			}, [readBalance]);
			(0, react.useEffect)(() => {
				loadBalance();
			}, [loadBalance]);
			const snapshot = view.status === "ready" ? view.snapshot : void 0;
			const tabs = [
				{
					value: "skills",
					label: t("tabWithCount", {
						label: t("tabSkills"),
						count: snapshot?.skills.length ?? 0
					}),
					id: `${tabsId}-tab-skills`,
					panelId: `${tabsId}-panel-skills`
				},
				{
					value: "mcp",
					label: t("tabWithCount", {
						label: t("tabMcp"),
						count: snapshot?.mcpServers.length ?? 0
					}),
					id: `${tabsId}-tab-mcp`,
					panelId: `${tabsId}-panel-mcp`
				},
				{
					value: "rules",
					label: t("tabWithCount", {
						label: t("tabRules"),
						count: snapshot?.rules.length ?? 0
					}),
					id: `${tabsId}-tab-rules`,
					panelId: `${tabsId}-panel-rules`
				}
			];
			const usage = snapshot?.usage;
			const measured = usage === void 0 ? 0 : usage.instructionBytes + usage.catalogBytes;
			const usedPercent = usage === void 0 || usage.budgetTokens <= 0 ? 0 : Math.min(100, usage.estimatedTokens / usage.budgetTokens * 100);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: CustomizationsSection_module_css_default.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						className: CustomizationsSection_module_css_default.heading,
						children: t("title")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: CustomizationsSection_module_css_default.intro,
						children: t("subtitle")
					}),
					usage !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.usage,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.usageHead,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.usageTitle,
									children: t("usageTitle")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.summary,
									children: t("usageAvailable", { percent: Math.round((100 - usedPercent) * 10) / 10 })
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.usageBar,
								role: "img",
								"aria-label": t("usageUsed", {
									used: usage.estimatedTokens.toLocaleString(),
									budget: usage.budgetTokens.toLocaleString()
								}),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.usageRules,
									style: { width: share(usage.instructionBytes, measured, usedPercent) }
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: CustomizationsSection_module_css_default.usageSkills,
									style: { width: share(usage.catalogBytes, measured, usedPercent) }
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: CustomizationsSection_module_css_default.usageLegend,
								children: [
									balance !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: CustomizationsSection_module_css_default.statusWithDot,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: `${t("balanceTitle")}: ${balanceText(balance, t)}` }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											variant: "ghost",
											size: "sm",
											onClick: loadBalance,
											children: t("balanceRefresh")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: `${t("usageRulesLabel")} ${(0, _deepseek_ai_dsh_client_ui_primitives.fileSizeText)(usage.instructionBytes)}` }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: `${t("usageSkillsLabel")} ${(0, _deepseek_ai_dsh_client_ui_primitives.fileSizeText)(usage.catalogBytes)}` }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: CustomizationsSection_module_css_default.usageNote,
										children: t("usageNote")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.controls,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SegmentedTabs, {
							items: tabs,
							value: active,
							onChange: setActive,
							label: t("tabsLabel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							size: "sm",
							icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineRegular, { size: 14 }),
							disabled: view.status === "loading",
							onClick: read,
							children: t("refresh")
						})]
					}),
					view.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: CustomizationsSection_module_css_default.skeleton,
						role: "status",
						"aria-label": t("loading"),
						children: SKELETON_CARDS.map((card) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: CustomizationsSection_module_css_default.skeletonCard }, card))
					}),
					view.status === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: CustomizationsSection_module_css_default.failure,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: t("error")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							size: "sm",
							onClick: read,
							children: t("retry")
						})]
					}),
					snapshot !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							id: `${tabsId}-panel-skills`,
							role: "tabpanel",
							"aria-labelledby": `${tabsId}-tab-skills`,
							hidden: active !== "skills",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SkillsList, {
								t,
								snapshot
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							id: `${tabsId}-panel-mcp`,
							role: "tabpanel",
							"aria-labelledby": `${tabsId}-tab-mcp`,
							hidden: active !== "mcp",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(McpServersList, {
								t,
								snapshot,
								setEnabled,
								addServer: async (server) => {
									const outcome = await addServer(server);
									if (outcome.ok) read();
									return outcome;
								},
								removeServer: async (id) => {
									const outcome = await removeServer(id);
									if (outcome.ok) read();
									return outcome;
								},
								setManagedEnabled: async (id, enabled) => {
									const outcome = await setManagedEnabled(id, enabled);
									if (outcome.ok) read();
									return outcome;
								}
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							id: `${tabsId}-panel-rules`,
							role: "tabpanel",
							"aria-labelledby": `${tabsId}-tab-rules`,
							hidden: active !== "rules",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RulesList, {
								t,
								snapshot
							})
						})
					] })
				]
			});
		}
		//#endregion
		//#region ../ui-settings-customizations/src/client/locales.ts
		/** Copy dictionaries for the Customizations Settings section. */
		/** Simplified Chinese dictionary and key source of truth. */
		const zh$1 = {
			nav: "个性化配置",
			title: "个性化配置",
			subtitle: "查看本部署提供的技能（Skills）与 MCP 服务器。",
			tabsLabel: "个性化配置分区",
			tabSkills: "技能",
			tabMcp: "MCP 服务器",
			tabWithCount: "{label}（{count}）",
			searchSkills: "搜索技能",
			searchMcp: "搜索 MCP 服务器",
			searchRules: "搜索指令文件",
			refresh: "刷新",
			loading: "正在读取个性化配置…",
			error: "暂时无法读取个性化配置。",
			retry: "重试",
			emptySkills: "本部署没有可用的技能。",
			skillsUnavailable: "本部署未挂载技能注册表。",
			emptyMcp: "尚未配置 MCP 服务器。",
			emptySearch: "没有匹配项。",
			skillsCount: "{count} 个技能",
			mcpCount: "{count} 个服务器",
			truncated: "仅显示前 {count} 项。",
			sourceProjectDsh: "项目 .dsh",
			sourceProjectAgents: "项目 .agents",
			sourceCustom: "自定义目录",
			sourceUserDsh: "用户 .dsh",
			sourceUserAgents: "用户 .agents",
			sourceBundled: "内置",
			sourceRuntime: "运行时",
			modelTag: "模型可加载",
			userTag: "可手动选择",
			presetsLabel: "预设",
			tabRules: "规则",
			balanceTitle: "DeepSeek API 余额",
			balanceAmount: "{amount} {currency}",
			balanceBreakdown: "充值 {toppedUp} · 赠送 {granted}",
			balanceNoKey: "未配置 DeepSeek API key。",
			balanceFailed: "暂时无法读取余额。",
			balanceRefresh: "刷新余额",
			usageTitle: "个性化配置预算",
			usageAvailable: "剩余 {percent}%",
			usageUsed: "约 {used} / {budget} tokens",
			usageRulesLabel: "规则",
			usageSkillsLabel: "技能",
			usageNote: "估算值：按规则文件字节数与技能目录文本计算。",
			rulesCount: "{count} 个文件",
			ruleUser: "用户级",
			ruleProject: "项目级",
			emptyRules: "本工作区没有适用的指令文件。",
			mcpEnabled: "已启用",
			mcpDisabled: "已停用",
			mcpToolsCount: "{count} 个工具",
			mcpToolCount: "1 个工具",
			mcpStatusEmpty: "没有注册工具，服务器可能无法连接",
			mcpStatusLoading: "正在连接",
			mcpStatusFailed: "启动失败",
			mcpStatusDisabled: "未运行",
			mcpTransportStdio: "本地进程",
			mcpTransportHttp: "HTTP 端点",
			mcpTargetCommand: "命令",
			mcpTargetEndpoint: "端点",
			addOpen: "添加 MCP 服务器",
			addName: "名称",
			addNamePlaceholder: "laravel-boost",
			addStdio: "本地进程（stdio）",
			addCommand: "命令",
			addCommandPlaceholder: "php",
			addArgs: "参数",
			addArgsPlaceholder: "artisan boost:mcp",
			addUrl: "端点",
			addUrlPlaceholder: "https://example.com/mcp",
			addSave: "添加",
			addCancel: "取消",
			addFailed: "无法添加此服务器",
			deleteServer: "删除",
			deleteFailed: "无法删除此服务器",
			originPanel: "面板",
			originProfile: "配置",
			originProject: "工作区",
			mcpToggle: "启用或停用 {name}",
			mcpToggleApplied: "已应用",
			mcpToggleRestart: "需要重启后生效",
			mcpToggleFailed: "无法更改此服务器",
			mcpToggleLocked: "当前 profile 无法寻址该行",
			showTools: "显示工具",
			hideTools: "收起工具",
			toolListLabel: "此服务器的工具"
		};
		/** English dictionary checked against the Chinese key set. */
		const en$1 = {
			nav: "Customizations",
			title: "Customizations",
			subtitle: "Skills and MCP servers this deployment makes available.",
			tabsLabel: "Customization sections",
			tabSkills: "Skills",
			tabMcp: "MCP servers",
			tabWithCount: "{label} ({count})",
			searchSkills: "Search skills",
			searchMcp: "Search MCP servers",
			searchRules: "Search instruction files",
			refresh: "Refresh",
			loading: "Reading customizations…",
			error: "Customizations are temporarily unavailable.",
			retry: "Retry",
			emptySkills: "No skills are available in this deployment.",
			skillsUnavailable: "This deployment mounts no skill registry.",
			emptyMcp: "No MCP servers are configured.",
			emptySearch: "No matching items.",
			skillsCount: "{count} skills",
			mcpCount: "{count} servers",
			truncated: "Only the first {count} are shown.",
			sourceProjectDsh: "Project .dsh",
			sourceProjectAgents: "Project .agents",
			sourceCustom: "Custom directory",
			sourceUserDsh: "User .dsh",
			sourceUserAgents: "User .agents",
			sourceBundled: "Built-in",
			sourceRuntime: "Runtime",
			modelTag: "Model can load",
			userTag: "You can pick",
			presetsLabel: "Presets",
			tabRules: "Rules",
			balanceTitle: "DeepSeek API balance",
			balanceAmount: "{amount} {currency}",
			balanceBreakdown: "Topped up {toppedUp} · Granted {granted}",
			balanceNoKey: "No DeepSeek API key is configured.",
			balanceFailed: "The balance could not be read.",
			balanceRefresh: "Refresh balance",
			usageTitle: "Customization budget",
			usageAvailable: "{percent}% available",
			usageUsed: "about {used} / {budget} tokens",
			usageRulesLabel: "Rules",
			usageSkillsLabel: "Skills",
			usageNote: "Estimated from instruction-file bytes and catalog text.",
			rulesCount: "{count} files",
			ruleUser: "User",
			ruleProject: "Project",
			emptyRules: "No instruction files apply to this workspace.",
			mcpEnabled: "Enabled",
			mcpDisabled: "Disabled",
			mcpToolsCount: "{count} tools",
			mcpToolCount: "1 tool",
			mcpStatusEmpty: "No tools are registered; the server may be unreachable",
			mcpStatusLoading: "Connecting",
			mcpStatusFailed: "Failed to start",
			mcpStatusDisabled: "Not running",
			mcpTransportStdio: "Local process",
			mcpTransportHttp: "HTTP endpoint",
			mcpTargetCommand: "Command",
			mcpTargetEndpoint: "Endpoint",
			addOpen: "Add MCP server",
			addName: "Name",
			addNamePlaceholder: "laravel-boost",
			addStdio: "Local process (stdio)",
			addCommand: "Command",
			addCommandPlaceholder: "php",
			addArgs: "Arguments",
			addArgsPlaceholder: "artisan boost:mcp",
			addUrl: "Endpoint",
			addUrlPlaceholder: "https://example.com/mcp",
			addSave: "Add",
			addCancel: "Cancel",
			addFailed: "Could not add this server",
			deleteServer: "Delete",
			deleteFailed: "Could not delete this server",
			originPanel: "Panel",
			originProfile: "Profile",
			originProject: "Workspace",
			mcpToggle: "Enable or disable {name}",
			mcpToggleApplied: "Applied",
			mcpToggleRestart: "Restart required",
			mcpToggleFailed: "Could not change this server",
			mcpToggleLocked: "This profile cannot address the row",
			showTools: "Show tools",
			hideTools: "Hide tools",
			toolListLabel: "Tools from this server"
		};
		//#endregion
		//#region ../ui-settings-customizations/src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.customizations";
		/** Services required by the Settings registration and the Remotes the pane writes through. */
		const inject$2 = [
			"slots",
			"locale",
			"uiSession",
			"remote",
			"remote.pluginManager"
		];
		/**
		* Contribute the Customizations page to the Settings navigation.
		* @param ctx - the browser plugin context.
		*/
		function apply$2(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh: zh$1,
				en: en$1
			}), "ui-settings-customizations: dictionaries");
			const t = ctx.locale.bind(NS);
			let mounting;
			const ensureRemote = async () => {
				if (ctx.get("remote.customizations") !== void 0) return;
				mounting ??= (async () => {
					try {
						await ctx.remote.$mount(TYPERT_REMOTE);
					} catch (error) {
						if (ctx.get("remote.customizations") === void 0) throw error;
					} finally {
						mounting = void 0;
					}
				})();
				await mounting;
			};
			const customizationsService = () => {
				const service = ctx.get("remote.customizations");
				if (service === void 0) throw new Error("customizations: remote namespace is unavailable");
				return service;
			};
			const list = async (sessionId) => {
				await ensureRemote();
				const result = await customizationsService().snapshot(sessionId);
				if (!result.ok) throw new Error(`customizations.snapshot failed: ${result.error.code}: ${result.error.message}`);
				return result.value;
			};
			const setEnabled = async (entryId, enabled) => {
				const result = await ctx.remote.pluginManager.setPluginEnabled(entryId, enabled);
				if (!result.ok) return {
					ok: false,
					message: result.error.code
				};
				const failure = result.value.error;
				if (failure !== void 0) return {
					ok: false,
					message: `${failure.code}: ${failure.diagnostic ?? ""}`
				};
				if (result.value.application === "failed" || result.value.application === "cancelled") return {
					ok: false,
					message: result.value.application
				};
				return {
					ok: true,
					application: result.value.application
				};
			};
			const write = async (call) => {
				await ensureRemote();
				const result = await call();
				return result.ok ? {
					ok: true,
					application: "applied"
				} : {
					ok: false,
					message: result.error?.code ?? "gateway/internal"
				};
			};
			const addServer = (server) => write(() => customizationsService().addMcpServer(server));
			const removeServer = (id) => write(() => customizationsService().removeMcpServer(id));
			const setManagedEnabled = (id, enabled) => write(() => customizationsService().setManagedMcpServerEnabled(id, enabled));
			const readBalance = async () => {
				await ensureRemote();
				const result = await customizationsService().balance();
				if (!result.ok) throw new Error(`customizations.balance failed: ${result.error.code}`);
				return result.value;
			};
			const injected = () => ({
				hooks: { mainSessionId: {
					getSnapshot: () => ctx.uiSession.adapter.current.getSnapshot().key,
					subscribe: (listener) => ctx.uiSession.adapter.current.subscribe(listener)
				} },
				list,
				setEnabled,
				addServer,
				removeServer,
				setManagedEnabled,
				readBalance
			});
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "customizations",
				order: 12,
				label: () => t("nav"),
				locale: NS,
				inject: injected
			}, CustomizationsSection));
		}
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/TerminalRailIcon.tsx
		/** The prompt glyph's edge when a caller asks for none. */
		const DEFAULT_SIZE = 16;
		/**
		* Render the terminal prompt at the rail's requested edge.
		* @param props - the requested edge in pixels and an optional placement class.
		* @returns the glyph element.
		*/
		function TerminalRailIcon({ size = DEFAULT_SIZE, className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				className,
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				strokeWidth: 1.2,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "1.6",
						y: "2.6",
						width: "12.8",
						height: "10.8",
						rx: "2.2",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M4.4 6.2L6.6 8L4.4 9.8",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M7.6 10H11.2",
						stroke: "currentColor"
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-sidebar-terminal/src/client/TerminalGuide.module.css.mjs
		const css$1 = ".nQxy2G_entry{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsl-guide-entry-radius);background:var(--dsw-alias-bg-layer-1);align-items:center;gap:14px;width:100%;min-height:56px;padding:14px 20px;display:flex;position:relative;overflow:hidden}.nQxy2G_main{border-radius:0;width:100%;height:100%;position:absolute;inset:0}.nQxy2G_main:focus-visible{outline-offset:-2px}.nQxy2G_icon{width:26px;height:26px;color:var(--dsw-alias-label-secondary);pointer-events:none;flex:none;justify-content:center;align-items:center;display:flex;position:relative}.nQxy2G_text{pointer-events:none;flex-direction:column;flex:1;gap:3px;min-width:0;display:flex;position:relative}.nQxy2G_titleRow{align-items:center;gap:4px;min-width:0;display:flex}.nQxy2G_title{color:var(--dsw-alias-label-primary);white-space:nowrap;text-overflow:ellipsis;font-size:14px;line-height:1.4;overflow:hidden}.nQxy2G_description{color:var(--dsw-alias-label-tertiary);white-space:nowrap;text-overflow:ellipsis;font-size:11px;line-height:1.4;overflow:hidden}.nQxy2G_trigger{border-radius:4px;flex:none;width:20px;height:20px;padding:0}.nQxy2G_trigger svg{width:14px;height:14px;color:var(--dsw-alias-label-tertiary)}.nQxy2G_menu{pointer-events:auto;flex:none;display:flex}.nQxy2G_shortcut{pointer-events:none;position:relative}";
		const tagId$1 = "@deepseek-ai/dsh-workbench/TerminalGuide.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var TerminalGuide_module_css_default = {
			"description": "nQxy2G_description",
			"entry": "nQxy2G_entry",
			"icon": "nQxy2G_icon",
			"main": "nQxy2G_main",
			"menu": "nQxy2G_menu",
			"shortcut": "nQxy2G_shortcut",
			"text": "nQxy2G_text",
			"title": "nQxy2G_title",
			"titleRow": "nQxy2G_titleRow",
			"trigger": "nQxy2G_trigger"
		};
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/TerminalGuide.tsx
		/** Shell launch menu owned by the terminal provider's guide entry. */
		/**
		* Open the remembered shell from the card or choose another shell from its menu.
		* The card displays its effective shortcut; the shell menu sits beside the title.
		* @param props - guide copy, enclosing tab actions and cancellable discovery.
		* @returns separate launch and menu buttons within one guide card.
		*/
		function TerminalGuide({ title, description, kind, useTabInfo, loadShells, selectShell, t, useShortcuts }) {
			const shortcut = useShortcuts((entries) => entries.find((entry) => entry.id === "terminal.new"));
			const { tab } = useTabInfo();
			const [open, setOpen] = (0, react.useState)(false);
			const [attempt, setAttempt] = (0, react.useState)(0);
			const [state, setState] = (0, react.useState)({ phase: "loading" });
			(0, react.useEffect)(() => {
				if (!open) return;
				const lifetime = new AbortController();
				loadShells(lifetime.signal).then((choices) => {
					if (!lifetime.signal.aborted) setState({
						phase: "ready",
						choices
					});
				}, (error) => {
					if (!lifetime.signal.aborted) setState({
						phase: "failed",
						message: error instanceof Error ? error.message : String(error)
					});
				});
				return () => {
					lifetime.abort();
				};
			}, [
				open,
				attempt,
				loadShells
			]);
			const items = state.phase === "ready" ? state.choices.shells.map((shell) => ({
				id: shell.path,
				label: shell.name
			})) : state.phase === "loading" ? [{
				id: "loading",
				label: t("shellLoading"),
				disabled: true
			}] : [{
				id: "error",
				label: t("failed", { message: state.message }),
				disabled: true
			}, {
				id: "retry",
				label: t("retry")
			}];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TerminalGuide_module_css_default.entry,
				"data-sidebar-right-guide-entry": kind,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						className: TerminalGuide_module_css_default.main,
						"aria-label": description === void 0 ? title : `${title} ${description}`,
						"aria-keyshortcuts": shortcut?.aria,
						onClick: () => {
							tab.actions.openTab("terminal", { replaceTab: true });
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: TerminalGuide_module_css_default.icon,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.PluginArtworkTerminal, { size: description === void 0 ? 22 : 26 })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: TerminalGuide_module_css_default.text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: TerminalGuide_module_css_default.titleRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TerminalGuide_module_css_default.title,
								"aria-hidden": "true",
								children: title
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
								open,
								portal: true,
								autoFocus: true,
								align: "end",
								className: TerminalGuide_module_css_default.menu,
								items: items.length === 0 ? [{
									id: "empty",
									label: t("shellEmpty"),
									disabled: true
								}] : items,
								selectedId: state.phase === "ready" ? state.choices.selectedShell : void 0,
								onClose: () => {
									setOpen(false);
								},
								onSelect: (path) => {
									if (state.phase === "failed") {
										setState({ phase: "loading" });
										setAttempt((value) => value + 1);
										return;
									}
									selectShell(path);
									setOpen(false);
									tab.actions.openTab("terminal", {
										replaceTab: true,
										params: { shellPath: path }
									});
								},
								anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									className: TerminalGuide_module_css_default.trigger,
									"aria-label": t("shell"),
									"aria-haspopup": "menu",
									"aria-expanded": open,
									onClick: () => {
										setState({ phase: "loading" });
										setOpen((value) => !value);
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, {})
								})
							})]
						}), description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TerminalGuide_module_css_default.description,
							"aria-hidden": "true",
							children: description
						})]
					}),
					shortcut !== void 0 && shortcut.keys.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.ShortcutKeys, {
						keys: shortcut.keys,
						className: TerminalGuide_module_css_default.shortcut
					})
				]
			});
		}
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/LazyTerminalBody.tsx
		/** Load xterm only after a terminal body is mounted. */
		const LoadedTerminalBody = (0, react.lazy)(async () => ({ default: (await require.async("./client.terminal.js")).TerminalBody }));
		/**
		* Suspend while the package-local terminal chunk arrives.
		* @param props - Terminal body props supplied by the sidebar slot.
		* @returns the deferred terminal renderer.
		*/
		function LazyTerminalBody(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LoadedTerminalBody, { ...props })
			});
		}
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/TerminalIcon.tsx
		/**
		* Render the tab title's terminal prompt in the surrounding text color.
		* @returns a decorative sixteen-pixel line glyph.
		*/
		function TerminalIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M3 4L7 8L3 12",
					stroke: "currentColor"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M9 12H13",
					stroke: "currentColor"
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/emmanuel/dev/deepseek-harness/packages/client/ui-sidebar-terminal/src/client/TerminalTitle.module.css.mjs
		const css = ".TZl0Ua_title{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.TZl0Ua_name{width:120px;min-width:48px;max-width:100%;color:inherit;font:inherit;background:var(--dsw-alias-bg-l1);border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);outline:none;padding:0 4px}";
		const tagId = "@deepseek-ai/dsh-workbench/TerminalTitle.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-workbench";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var TerminalTitle_module_css_default = {
			"name": "TZl0Ua_name",
			"title": "TZl0Ua_title"
		};
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/TerminalTitle.tsx
		/** Live terminal names in docked and floating tab chrome. */
		/**
		* Render the terminal name, editable in place on double-click.
		* @param props - sidebar occurrence, terminal model and localized copy.
		* @returns the terminal icon and current name or its editor.
		*/
		function TerminalTitle({ useTabInfo, useTerminal, view, t }) {
			const { tab } = useTabInfo();
			const title = useTerminal(tab.id, (state) => state?.info?.title ?? state?.title) ?? tab.title;
			const [editing, setEditing] = (0, react.useState)(false);
			const input = (0, react.useRef)(null);
			const label = (0, react.useRef)(null);
			const cancelled = (0, react.useRef)(false);
			(0, react.useLayoutEffect)(() => {
				if (editing) return;
				const chip = label.current?.closest("[data-dockkit-tab], [data-dockkit-float-grip]");
				const rename = (event) => {
					event.stopPropagation();
					cancelled.current = false;
					setEditing(true);
				};
				chip?.addEventListener("dblclick", rename);
				return () => {
					chip?.removeEventListener("dblclick", rename);
				};
			}, [editing]);
			(0, react.useLayoutEffect)(() => {
				if (!editing) return;
				input.current?.focus();
				input.current?.select();
			}, [editing]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TerminalIcon, {}), editing ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				ref: input,
				className: TerminalTitle_module_css_default.name,
				defaultValue: title,
				maxLength: 120,
				"aria-label": t("rename"),
				onPointerDown: (event) => {
					event.stopPropagation();
				},
				onClick: (event) => {
					event.stopPropagation();
				},
				onDoubleClick: (event) => {
					event.stopPropagation();
				},
				onBlur: (event) => {
					setEditing(false);
					const next = event.currentTarget.value.trim();
					if (!cancelled.current && next !== "" && next !== title) view(tab.id).rename(next);
				},
				onKeyDown: (event) => {
					event.stopPropagation();
					if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
					if (event.key === "Escape") {
						cancelled.current = true;
						event.currentTarget.blur();
					} else if (event.key === "Enter") event.currentTarget.blur();
				}
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				ref: label,
				className: TerminalTitle_module_css_default.title,
				children: title
			})] });
		}
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/locales.ts
		/** Simplified Chinese terminal copy. */
		const zh = {
			"shortcut.noSession": "请先选择会话",
			recoveryFailed: "恢复终端失败：{message}",
			retryRecovery: "重试恢复终端",
			shell: "选择 Shell",
			shellLoading: "正在读取 Shell…",
			shellEmpty: "没有可用的 Shell",
			description: "在会话工作区运行命令",
			title: "终端",
			new: "新建终端",
			loading: "正在读取终端环境…",
			creating: "正在启动…",
			connecting: "正在连接…",
			disconnected: "连接已断开。",
			reconnect: "重新连接",
			readonly: "此页面当前只读。",
			control: "接管输入",
			closed: "终端已关闭。",
			exited: "进程已退出（{code}）",
			failed: "终端错误：{message}",
			rename: "终端名称",
			unavailable: "不可用",
			retry: "重试",
			cleanupFailed: "终端「{title}」未能结束：{message}",
			missingTerminal: "此终端已不存在，请新建终端。",
			inputFull: "输入缓冲区已满，请重新连接后重试。",
			attachmentEnded: "终端连接已结束，请重新连接。",
			invalidOutput: "终端画面传输异常，请重新连接。",
			terminalLimit: "终端数量已达上限，请关闭不用的终端后重试。已退出的终端也计入数量。"
		};
		/** English terminal copy. */
		const en = {
			"shortcut.noSession": "Select a session first",
			recoveryFailed: "Terminal recovery failed: {message}",
			retryRecovery: "Retry terminal recovery",
			shell: "Choose shell",
			shellLoading: "Loading shells…",
			shellEmpty: "No shells available",
			description: "Run commands in the Session workspace",
			title: "Terminal",
			new: "New terminal",
			loading: "Reading terminal environment…",
			creating: "Starting…",
			connecting: "Connecting…",
			disconnected: "Disconnected.",
			reconnect: "Reconnect",
			readonly: "This view is read-only.",
			control: "Take control",
			closed: "Terminal closed.",
			exited: "Process exited ({code})",
			failed: "Terminal error: {message}",
			rename: "Terminal name",
			unavailable: "Unavailable",
			retry: "Retry",
			cleanupFailed: "Terminal “{title}” could not be ended: {message}",
			missingTerminal: "This terminal no longer exists. Open a new terminal.",
			inputFull: "The input buffer is full. Reconnect and try again.",
			attachmentEnded: "The terminal connection ended. Reconnect to continue.",
			invalidOutput: "The terminal screen could not be received. Reconnect to recover it.",
			terminalLimit: "The terminal limit has been reached. Close unused terminals and try again. Exited terminals also count toward the limit."
		};
		//#endregion
		//#region ../ui-sidebar-terminal/src/client/index.ts
		/** Services needed by the terminal's two sidebar seats. */
		const inject$1 = [
			"slots",
			"locale",
			"sidebarRight",
			"sidebarRightTabs",
			"webTerminals",
			"theme",
			"shortcuts"
		];
		/**
		* Register the terminal type, observable views and background process cleanup.
		* @param ctx - Client root Context with sidebar and terminal services.
		*/
		function apply$1(ctx) {
			ctx.effect(() => {
				const sync = () => {
					ctx.webTerminals.retainTabs(ctx.sidebarRight.openTabs.getSnapshot().filter((tab) => tab.kind === "terminal"));
				};
				const unsubscribe = ctx.sidebarRight.openTabs.subscribe(sync);
				sync();
				return () => {
					unsubscribe();
					ctx.webTerminals.retainTabs([]);
				};
			}, "ui-sidebar-terminal.window-holds");
			const target = (sessionId, key) => ctx.sidebarRight.tabDomain.occurrence(sessionId, { id: key }).navigation.getSnapshot().params;
			const terminalId = (sessionId, key) => {
				const params = target(sessionId, key);
				return params !== void 0 && "terminalId" in params ? params.terminalId : void 0;
			};
			const view = (sessionId, key) => {
				const params = target(sessionId, key);
				const contentId = ctx.sidebarRight.tabDomain.occurrence(sessionId, { id: key }).navigation.getSnapshot().address;
				return ctx.webTerminals.view(sessionId, key, contentId, terminalId(sessionId, key), params !== void 0 && "shellPath" in params ? params.shellPath : void 0);
			};
			const namespace = "sidebarTerminal";
			const id = "@deepseek-ai/dsh-client-ui-sidebar-terminal";
			const t = ctx.locale.bind(namespace);
			ctx.effect(() => ctx.shortcuts.register({
				id: "terminal.new",
				label: () => t("new"),
				aliases: ["new terminal", "shell"],
				defaults: {
					"desktop:macos": {
						code: "Backquote",
						modifiers: ["control"]
					},
					"desktop:windows": {
						code: "Backquote",
						modifiers: ["control"]
					},
					"desktop:linux": {
						code: "Backquote",
						modifiers: ["control"]
					},
					"web:macos": {
						code: "Backquote",
						modifiers: ["control"]
					},
					"web:windows": {
						code: "Backquote",
						modifiers: ["control"]
					}
				},
				regions: [
					"page",
					"editable",
					"terminal"
				],
				modals: [],
				resolve: ({ target: element }) => {
					const target = ctx.sidebarRight.commandTarget(element);
					if (target === void 0) return {
						status: "blocked",
						reason: t("shortcut.noSession")
					};
					return {
						status: "handled",
						run: () => {
							ctx.sidebarRight.openTabFromTarget("terminal", target);
						}
					};
				}
			}), "ui-sidebar-terminal: shortcut");
			ctx.effect(() => ctx.locale.register(namespace, {
				zh,
				en
			}), "ui-sidebar-terminal.copy");
			ctx.effect(() => ctx.sidebarRightTabs.register({
				id,
				kind: "terminal",
				multiple: true,
				priority: "builtin",
				title: () => t("title"),
				guide: [{
					id: "new",
					order: 20,
					title: () => t("new"),
					description: () => t("description"),
					icon: _deepseek_ai_dsh_client_ui_primitives.PluginArtworkTerminal
				}]
			}), "ui-sidebar-terminal.type");
			ctx.effect(() => ctx.sidebarRight.registerCloseHandler("terminal", (sessionId, tab) => {
				ctx.webTerminals.close(sessionId, tab.id, tab.contentId, terminalId(sessionId, tab.id));
			}), "ui-sidebar-terminal.close");
			const inject = (sessionId) => ({
				view: (key) => view(sessionId, key),
				keyedHooks: { terminal: (key) => view(sessionId, key).state }
			});
			const theme = {
				getSnapshot: () => ctx.theme.getTheme(),
				subscribe: (listener) => ctx.on("theme/change", listener)
			};
			ctx.effect(() => ctx.slots.inject("sidebar.right.tab.guide.entry", () => ctx.slots.register({
				name: "sidebar.right.tab.guide.entry",
				key: id,
				locale: namespace,
				inject: (sessionId) => ({
					hooks: { shortcuts: ctx.shortcuts.catalog },
					loadShells: (signal) => ctx.webTerminals.launchShells(sessionId, signal),
					selectShell: (path) => {
						ctx.webTerminals.selectShell(path);
					}
				})
			}, TerminalGuide)), "ui-sidebar-terminal.guide");
			ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
				name: "sidebar.right.pane.tab",
				key: id,
				locale: namespace,
				inject: (sessionId) => ({
					...inject(sessionId),
					hooks: { theme }
				})
			}, LazyTerminalBody)), "ui-sidebar-terminal.body");
			ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab.title", () => ctx.slots.register({
				name: "sidebar.right.pane.tab.title",
				key: id,
				locale: namespace,
				inject
			}, TerminalTitle)), "ui-sidebar-terminal.title");
			ctx.effect(() => ctx.slots.inject("rightrail", () => ctx.slots.register({
				name: "rightrail",
				id: "terminal",
				order: 40,
				label: () => t("title"),
				locale: namespace
			}, TerminalRailIcon)), "ui-sidebar-terminal.rail");
		}
		//#endregion
		//#region lib/types/client/index.js
		/** Every service the merged surfaces read, deduplicated. */
		const inject = [...new Set([
			...inject$6,
			...inject$5,
			...inject$4,
			...inject$3,
			...inject$2,
			...inject$1
		])];
		/**
		* Mount every IDE surface on one fiber.
		* @param ctx - the browser plugin context.
		*/
		function apply(ctx) {
			apply$2(ctx);
			apply$3(ctx);
			apply$6(ctx);
			apply$5(ctx);
			apply$4(ctx);
			apply$1(ctx);
			ctx.effect(() => ctx.shortcuts.register({
				id: "workbench.terminalDock",
				label: () => "Terminal at the bottom",
				aliases: ["dock terminal"],
				defaults: {
					"desktop:macos": {
						code: "KeyJ",
						modifiers: ["primary"]
					},
					"desktop:windows": {
						code: "KeyJ",
						modifiers: ["primary"]
					},
					"desktop:linux": {
						code: "KeyJ",
						modifiers: ["primary"]
					},
					"web:macos": {
						code: "KeyJ",
						modifiers: ["primary", "alt"]
					},
					"web:windows": {
						code: "KeyJ",
						modifiers: ["primary", "alt"]
					}
				},
				regions: [
					"page",
					"editable",
					"terminal"
				],
				modals: [],
				resolve: ({ target }) => {
					const commandTarget = ctx.sidebarRight.commandTarget(target);
					if (commandTarget === void 0) return {
						status: "blocked",
						reason: "Open a session first"
					};
					return {
						status: "handled",
						run: () => {
							ctx.sidebarRight.openTabFromTarget("terminal", commandTarget);
							const active = ctx.sidebarRight.active();
							if (active === void 0) return;
							const width = Math.max(360, Math.round(window.innerWidth * .45));
							ctx.sidebarRight.float(active.id, {
								x: window.innerWidth - width - 40,
								y: window.innerHeight - 300,
								width,
								height: 280
							});
						}
					};
				}
			}), "workbench: terminal dock");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map