# Change Log

# 0.5.2

### Added
- Additional optional blending options
  - Optionally specify `v` and `l` tints to have the `x1`, `x2`, `x3` tints
    automatically generated from blending with `n`.
  - Optionally specify the `base` color all the interpolated colors blend with.
- Coloring for quick picker (command bar) and tooltips.
- Coloring for links and inline code in Markdown previewer.

# 0.5.1

### Modified
- Increased contrast of tab bar.

# 0.5.0

### Added
- Very basic support for semantic highlighting.
  - Largely redundant because fallback TextMate scopes, but still added some
    ones unique to semantic highlighting.
  - Tested in C++ only so far. 
- Top border highlight for tabs.
- MIT Licensing for source code.

# 0.4.0

### Added
- Highlighting for RegEx strings in TS/JS and Python.

# 0.3.2

### Modified
- "Remote Host" button on status bar adjusted to still be distinct but not stand
out as much.

# 0.3.1

### Modified
- "Negative" color for light themes is now b-75 instead of b, which allows the
activity bar to have better contrast.
- Active tab on activity bar now has the panel BG color, to make it look like
a tab.
- Adjusted inputOption colors to make selected options more visible. (Check the
buttons in the "find" dialog's input box)


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