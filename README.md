# dsh-workbench

**The IDE surface for DeepSeek Harness Desktop, in one plugin.**

`dsh-workbench` composes Source control, the document Editor, the Session trash,
Turn deliverables, and Customizations into a single installable unit. One Loader
row, one client bundle, one set of Remote services — no duplicate registrations,
no per-feature installs.

Version **0.0.1** — first public release.

---

## What it ships

| Surface | What you get |
| --- | --- |
| **Source control** | Changes tree, history graph, staged/unstaged letters, commit box |
| **Editor** | Syntax highlighting, line numbers, git gutter marks, find/replace, rendered Markdown preview, docked split or full-screen, `Cmd+L` reference to the chat |
| **Session trash** | Delete a Session into a reversible trash, restore or purge, retention sweep |
| **Turn deliverables** | The edited-files card beside the conversation |
| **Customizations** | The Customizations settings panel (skills, rules, MCP servers) |
| **Workspace files** | Drag a file into the composer, git-status colours on files and folders |

## Install

Plugins → **Add plugin** → enter:

```
github:EmmanuelMartinez/dsh-workbench#v0.0.1
```

Then quit the application (**Cmd+Q**) and reopen it.

### Requirements

The desktop build this targets (**0.2.1-rc.2**) predates the right icon rail, so
install these two alongside the workbench:

```
github:EmmanuelMartinez/dsh-layout-rail#v1.1.0
github:EmmanuelMartinez/dsh-sidebar-right-rail#v1.0.0
```

They replace only the frame rows that draw and toggle the rail; the workbench
owns every IDE surface.

## Coexistence with the individual plugins

The workbench **does not remove** the five feature packages. If they are already
installed, the workbench's patch disables their Loader rows and mounts itself in
their place; the packages stay on disk and can be re-enabled by disabling the
workbench.

This makes the migration reversible and keeps the individual plugins available
for troubleshooting.

## What it replaces

The patch disables the rows the composed plugins used to occupy:

- `git-panel`, `editor-panel`, `session-manager`, `deliverables-minimal`,
  `customizations-panel`
- the in-box rows they supersede: `git-controller`, `ui-git`,
  `workspace-editor`, `ui-editor`, `ui-deliverables`,
  `ui-settings-customizations`

## Architecture

```
dsh-workbench
├── lib/index.js        one host plugin: starts git, workspaceEditor,
│                       sessionManager, and customizations on one fiber
├── lib/typert.host.js  one merged Typert manifest for those four namespaces
├── lib/client.js       one browser bundle: the five feature clients
└── cordis.patch.yml    disables the rows it supersedes, mounts itself
```

The browser half composes the five feature clients' `apply` functions on a
single Cordis fiber; their slots, dictionaries, and Remote namespaces stay
independent. The node half starts the four services with their documented
defaults and publishes the merged Typert manifest.

## Updating

Plugins do not auto-update. Uninstall the workbench and install the new tag.

Because the workbench is a composed artifact, a change to any composed surface
requires a new workbench release rather than a per-feature update. This is the
deliberate trade for one install.

## Known limitations

- The five composed packages must be present on disk if you migrate from them;
  the workbench's rows replace theirs, and its host half is what runs.
- The docked Editor needs the right-pane rail packages above; without them the
  Editor opens full-screen only.
- Version 0.0.1 targets Desktop **0.2.1-rc.2**; later builds may rename or add
  slots and require a new workbench release.

## License

MIT.
