var gulp = require('gulp');
var fs = require('fs');
var mustache = require('mustache');

function scaleColorHex(color, percent, invert) {
    // Convert from #RRGGBB to decimal values and scale
    var target;
    if (invert) {
        target = 255;
    } else {
        target = 0;
    }
    var channels = [];
    for (var i = 0; i < 3; i++) {
        channels.push(((parseInt(color.substr(1 + (i * 2),2), 16) - target) * percent | 0) + target);
    }
    // Convert scaled values back to two-digit hex notation
    var out = "#";
    channels.forEach(currChn => {
        var currHex = currChn.toString(16);
        if (currHex.length < 2) {
            currHex = "0" + currHex;
        }
        out += currHex;
    });
    // Tack on any remainder (alpha channel)
    out += color.substr(7);
    return out;
}

function build(done) {
    // Define color variants here
    var palettes = ["standard", "colorblind", "miami", "light-standard"];
    var templateContent = fs.readFileSync("src/_template.json").toString();
    var shades = [75, 67, 50, 33, 25];
    palettes.forEach(currPalette => {
        // Parse current palette
        var paletteData = JSON.parse(fs.readFileSync(`src/${currPalette}.json`));
        // Create the different shades of each color. Detect which keys are
        // colors by checking if the first character of the value is '#'.
        var toShade = Object.keys(paletteData).filter(key => paletteData[key].charAt(0) == "#");
        toShade.forEach(hue => {
            shades.forEach(currShade => {
                var keyName = hue + "-" + currShade;
                // Don't overwrite existing values (allows you to specify something
                // explicitly in the palette file)
                if (paletteData[keyName] === undefined) {
                    paletteData[keyName] = scaleColorHex(paletteData[hue], currShade / 100, paletteData["type"] == "light");
                }
            })
        })
        // Create "negative space" color
        if (paletteData["negative"] === undefined) {
            if (paletteData["type"] == "light") {
                paletteData["negative"] = paletteData["b-75"];
            } else {
                paletteData["negative"] = "#000000";
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