# Changelog

All notable changes to this project will be documented in this file.

## [0.0.36] - 2026-04-16

### Fixed
- `risize-*` typo corrected to `resize-*` (no backward compatibility — use the correct class names).

### Added
- `w-full`, `h-full`, `size-full` static presets for 100% width/height.
- `size-{n}` dynamic prefix sets both `width` and `height` simultaneously.
- Typed `useTW()` return: `UseTWReturn` interface replaces `any`.

### Changed
- `TailwindStylesGeneratorType` now returns `Record<string, any>` instead of `any`.
- `hppx` and `wppx` parameters are now properly typed.

## [0.0.35] - 2026-04-15

### Added
- Negative margin syntax: `-mt-4`, `-mx-8`, `-ml-2` now work as expected (same as Tailwind web).
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:` modifiers filter by viewport width (mobile-first). Defaults: `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`. Customizable via `theme.breakpoints` in `TWRNProvider`.
- Aspect ratio presets: `aspect-square` (`1`) and `aspect-video` (`16/9`).
- Style cache: `tw()` results are now memoized per input string. Cache invalidates automatically when mode, dimensions, or theme values change.

### Changed
- `TWRNTheme` and `TWRNContextType` now include optional `breakpoints` field.
- Public types in `types/index.d.ts` updated to match.

### Notes
- All changes are backward compatible. Existing utilities and behavior are unaffected.

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
