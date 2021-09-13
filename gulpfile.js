var gulp = require('gulp');
var fs = require('fs');
var mustache = require('mustache');

function getColorFromHex(colorHex) {
    // Convert from #RRGGBB... to decimal values [R, G, B, ...]
    channels = [];
    for (var i = 0; i < 4; i++) {
        if ((i * 2) >= colorHex.length - 1) { break; }
        channels.push(parseInt(colorHex.substr(1 + (i * 2),2), 16));
    }
    return channels;
}

function getHexFromColor(color) {
    // Convert from [R, G, B, ...] to hex #RRGGBB...
    var out = "#";
    color.forEach(currChn => {
        var currHex = currChn.toString(16);
        out += (currHex.length < 2 ? "0" : "") + currHex;
    });
    return out;
}

function scaleColorHex(color, target, percent) {
    // Blend color to target
    var channels = getColorFromHex(color);
    for (var i = 0; i < 3; i++) {
        channels[i] = (((channels[i] - target[i]) * percent | 0) + target[i]);
    }
    return getHexFromColor(channels);
}

function build(done) {
    // Define color variants here
    var palettes = ["standard", "colorblind", "miami", "light-standard"];
    var templateContent = fs.readFileSync("src/_template.json").toString();
    var shades = [75, 67, 50, 33, 25];
    var base;
    palettes.forEach(currPalette => {
        // Parse current palette
        var paletteData = JSON.parse(fs.readFileSync(`src/${currPalette}.json`));
        // Get the base color if it exists, or use default if it doesn't.
        if (paletteData["base"] !== undefined) {
            base = getColorFromHex(paletteData["base"]);
        } else {
            // Use default base depending on whether theme is light or dark.
            if (paletteData["type"] == "light") {
                base = getColorFromHex("#FFFFFF");
            } else {
                base = getColorFromHex("#000000");
            }
        }
        // If "l" and/or "v" exist, interpolate between them to make the different tints.
        ["l", "v"].forEach(tint => {
            var neutral = getColorFromHex(paletteData["n"]);
            if (paletteData[tint] !== undefined) {
                for (var i = 1; i < 4; i++) {
                    var tintName = tint + i.toString();
                    if (paletteData[tintName] === undefined) {
                        paletteData[tintName] = scaleColorHex(paletteData[tint], neutral, i/3);
                    }
                }
            }
        });
        // Generate special v4 tint if we were using "v" and "l" to generate the tints.
        if ((paletteData["v4"] === undefined) && (paletteData["v"] !== undefined) && (paletteData["l"] !== undefined)) {
            paletteData["v4"] = scaleColorHex(paletteData["v"], getColorFromHex(paletteData["l"]), 3/4);
        }
        // Create the different shades of each color. Detect which keys are
        // colors by checking if the first character of the value is '#'.
        var toShade = Object.keys(paletteData).filter(key => paletteData[key].charAt(0) == "#");
        toShade.forEach(hue => {
            shades.forEach(currShade => {
                var keyName = hue + "-" + currShade;
                // Don't overwrite existing values (allows you to specify something
                // explicitly in the palette file)
                if (paletteData[keyName] === undefined) {
                    paletteData[keyName] = scaleColorHex(paletteData[hue], base, currShade / 100);
                }
            })
        })
        // Create "negative space" color
        if (paletteData["negative"] === undefined) {
            if (paletteData["type"] == "light") {
                paletteData["negative"] = paletteData["b-75"];
            } else {
                paletteData["negative"] = getHexFromColor(base);
            }
        }
        // Render template with palette
        var outContent = mustache.render(templateContent, paletteData);
        // Create the result file
        fs.writeFileSync(`themes/astronomy-${currPalette}-color-theme.json`, outContent);
    });
    done();
};

function watch() {
    gulp.series(build)();
    gulp.watch('src/**/*.json', build);
};

exports.default = build;
exports.watch = watch;