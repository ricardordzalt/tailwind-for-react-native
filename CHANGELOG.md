# Changelog

All notable changes to this project will be documented in this file.

## [0.0.33] - 2026-04-14

### Added
- Documented the new shadow preset system in `README.md`, including:
  - full preset naming (`shadow-{level}` and directional variants)
  - platform behavior (iOS shadow props + Android elevation)
  - color override examples with `shadow-<color>`

### Changed
- Reformatted `src/styles/properties/shadow/index.ts` to keep explicit, declarative property entries while avoiding long unreadable lines.
- Kept a single platform abstraction for `Platform.select(...)` and preserved existing shadow behavior.

## [0.0.26] - 2026-03-28

### Added
- Expanded test coverage with separated unit suites for `useTW`, `styled`, and `TWRNProvider`.
- Added integration suites for:
  - `TWRNProvider + styled`
  - `TWRNProvider + useTW`
- Added broad edge-case coverage (mode changes, platform prefixes, custom styles, invalid utilities, style precedence, conversion helpers).
- Added `types/index.d.ts` as a focused public type surface.

### Changed
- Packaging hardened:
  - explicit `main`, `types`, `exports`, and `files` in `package.json`
  - `prepack` now runs tests and build before publish
  - build now cleans `dist` before compiling
- `styled` now consistently gives priority to `prop.style` (object and array forms).
- Improved theme color resolution in `TWRNProvider`:
  - supports flat color tokens
  - supports mode overrides when `colors.light` / `colors.dark` are objects
- Parser behavior hardened:
  - ignores invalid utilities without crashing
  - warns only in development
  - prevents `NaN` style outputs

### Removed
- Removed legacy/placeholder empty style modules that had no runtime effect.
- Stopped publishing declaration sourcemaps and internal declaration tree.
- Removed `.npmignore` in favor of explicit `files` allowlist.

### Notes
- No intentional runtime breaking changes for normal usage.
- Main behavioral fix: `style` prop precedence in `styled` is now consistent and explicit.
