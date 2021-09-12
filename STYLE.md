# Astronomy Style Guide
This document explains the overall idea behind the colorization. It is meant to
be taken as a *guideline only*, and *not* as a rigid set of laws.

# Palette
Start with a neutral color. This is the color that the text, the background, and
all otherwise "uncolored" elements will be.

Colorization is based on "tint strength" as described below.
- Weak tint is close to the neutral color and not vibrant.
- Strong tint is more vibrant and saturated, but must darken as well.
- Imagine "colored ink" instead of "colored lights", there should be no bright
  neon-like colors high both in value and saturation.

After the neutral color, there are only 2 tints: logic, and value. The two tints
can have any hue, but ideally, the selected hues should be easily discernable
from each other.

It is allowed to blend the color with the background color. For dark themes,
this darkens the result color, and for light themes, this lightens the result
color, but in both cases, it lowers the contrast of the result with respect to
the background.

# Tokens
## What is value?
Tokens are considered "value" when their main purpose is to be assigned
data, or to assist in the description or assignment of data.
- Primitive types, user types, variables, and constants are all good examples
of this.
- Generally, stronger tinting indicates less malleability.
  - Primitive types and strings are strongly tinted.
  - User-defined types are tinted not as strongly as primitives.
  - Object properties are weakly tinted.
  - Plain variables aren't tinted at all.
  - The tinting also takes into account how frequently each kind of element
  will appear in an equation, in an effort to keep equations tinted minimally.

Arithmetic operators are not tinted because they aren't usually notable
delimeters in an equation, unlike parenthesis, brackets, strings, and logical
operators (e.g., `and`, `or`, `&&`, `||`, etc), which *do* tend to separate
an equation into separate sections.
- An exception to this is the increment and decrement operators (e.g.,
`x++`, `--y`, etc), where the `++` and `--` are tinted to distinquish them from
the name of the variable.

## What is logic?
Tokens are considered "logic" when their main purpose is to control the flow
of the program, or to enact an effect, or when the token represents one of a
finite set of enumerable states or values.
- Generally, these end up being language keywords, so `if`, `switch`, `new`, `delete`, `for`, `break`, and `continue` are all good examples.
- Language keywords and delimiters are strongly tinted.
- Finite or discrete state names (e.g., `true`, `false`, `null`, enum values,
etc) are weakly tinted.

## Other considerations
Tint selection is also based on how often the token will appear in an equation.
Equations are intentionally kept as minimally tinted as allowable so that
delimeters stand out the most. Most of the time, equations will only contain
neutral and weak tints, with things like parenthesis and logical operators being
strongly tinted.

Regarding text decorations (bold, italic, underline), there is no guideline
other than italics being used to distinguish between two different ideas sharing
the same tint and tint strength where necessary. Of the three, italics are the
least distracting but still easily noticed, and are therefore being used first.

# GUI
The main consideration with the GUI is to keep it as undistracting as possible,
but without making it hard to use when you *do* need to give it attention. The
source code text has the most contrast, and different sections of the screen
have a clear (but small) delineation, so boundaries are kept and don't blend
together.

Like with source code, the different elements of the UI are colored with the
logic and value tints. Fields you type into are value, fields with finite states
are logic, while some labels and buttons might simply be tinted for aesthetics.
