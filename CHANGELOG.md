# Change Log

# 0.3.0

### Added
- Light theme

### Modified
- UI background/foreground colors now come from palette files
- Palette files specify output theme's "name" property and "type" property
- Color interpolator only processes values starting with '#' (won't try to
interpolate "name" or "type", which aren't colors)

### Notes
- Background and foreground colors around the UI have changed very slightly as a
side effect of switching to interpolated values instead of the hardcoded
constants from before

# 0.2.0

### Added
- Red-Green colorblind accessible theme

### Modified
- Themes are now built from template


# 0.1.0

### Added
- Initial theming for UI
- Initial highlighting for source code
  - Tuned for TypeScript, SCSS, and HTML

### Notes
- Compatibility (unthoroughly) checked for:
  - C++
  - PHP
  - Python
  - Markdown
- Git and diff theming is not present