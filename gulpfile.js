var gulp = require('gulp');
var fs = require('fs');
var mustache = require('mustache');

function scaleColorHex(color, percent) {
    // Convert from #RRGGBB to decimal values and scale
    var channels = [];
    for (var i = 0; i < 3; i++) {
        channels.push((parseInt(color.substr(1 + (i * 2),2), 16)) * percent | 0);
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

gulp.task("build", function() {
    // Define color variants here
    var palettes = ["standard", "colorblind"];
    var templateContent = fs.readFileSync("src/_template.json").toString();
    var shades = [75, 67, 50, 33, 25];
    palettes.forEach(currPalette => {
        // Parse current palette
        var paletteData = JSON.parse(fs.readFileSync(`src/${currPalette}.json`));
        // Create the different shades of each color
        var toShade = Object.keys(paletteData);
        toShade.forEach(hue => {
            shades.forEach(currShade => {
                var keyName = hue + "-" + currShade;
                // Don't overwrite existing values (allows you to specify something
                // explicitly in the palette file)
                if (paletteData[keyName] === undefined) {
                    paletteData[keyName] = scaleColorHex(paletteData[hue], currShade / 100);
                }
            })
        })
        // Render template with palette
        var outContent = mustache.render(templateContent, paletteData);
        // Create the result file
        fs.writeFileSync(`themes/astronomy-${currPalette}-color-theme.json`, outContent);
    })
});

gulp.task("default", ["build"], function() {
    gulp.watch('src/**/*.json', build);
});
