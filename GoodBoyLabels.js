// main function
function getLabelsInfo() {

    const result = {
        names: Array(17).fill("#000000"),
        colors: Array(17).fill("Black"),
    };

    // requires nodejs to read the preference file
    const fs = cep_node.require('fs');
    const path = cep_node.require('path');
    const cs = new CSInterface();

    // check if macOS or windows
    const osName = cs.getOSInformation().toLowerCase();
    const isMacOS = osName.indexOf('windows') > -1 ? false : true;

    let version = cs.getHostEnvironment().appVersion;
    version = version.split(".")[0] + "." + version.split(".")[1];
    let userDataFolder = cs.getSystemPath(SystemPath.USER_DATA);
    let prefsFolder = isMacOS ? path.join(path.dirname(userDataFolder), "Preferences", "Adobe", "After Effects", version) : path.join(userDataFolder, "Adobe", "After Effects", version);
    let prefsFile = path.join(prefsFolder, `Adobe After Effects ${version} Prefs-indep-general.txt`);

    if (!fs.existsSync(prefsFolder) || !fs.existsSync(prefsFile)) {
        console.warn("Failed to get label colors? Returning fallback result.");
        return result;
    }

    // read the file using nodejs and find the right sections for both label colors and label names
    let prefsTxt = fs.readFileSync(prefsFile, "utf8");
    let hexSection = prefsTxt.substring(prefsTxt.indexOf(`"Label Color ID 2 # 1"`), prefsTxt.length);
    hexSection = hexSection.substring(0, hexSection.indexOf('[') - 1);
    let namesSection = prefsTxt.substring(prefsTxt.indexOf(`"Label Preference Text Section 7"`), prefsTxt.length);
    namesSection = namesSection.substring(namesSection.indexOf('['), namesSection.indexOf(']') + 1);


    // the names section and the hex section are really similar but have small differences. Let's parst them both together and make up for the variations as we go.
    let raw = Array(17).fill().map(i => ({}));
    [hexSection, namesSection].forEach(section => {
        // break to lines
        let isHexSection = section === hexSection;
        let linesSeperator = isHexSection ? '"Label Color ID ' : '"Label Text ID ';
        let lines = section.split(linesSeperator);
        let key = isHexSection ? "value" : "name";

        // read from each line
        lines.forEach(line => {
            let hashIndex = line.indexOf('#');
            let id = Number(line.substring(hashIndex + 1, line.indexOf('"', hashIndex + 1)));
            let value = line.substring(line.indexOf("= ") + 2, line.length).trim();

            // for names, we also want to yeet the quotes
            if (!isHexSection) {
                value = value.replace(/['"]+/g, '');
            }

            raw[id][key] = value; // register value or name in the raw array
        });
    });

    // fix them colors
    for (let i = 0; i < raw.length; i++) {
        let crntInfoSet = raw[i];
        let id = i;
        let rawName = crntInfoSet["name"];
        let rawColor = crntInfoSet["value"];

        // raw color is weird. It's half HEX and half ASCII.
        // the part that's ASCII is inside quotation marks.
        // Let's convert it to hex

        const splits = rawColor.split('"');
        const filteredIndexes = splits.map((s, i) => {
            if (i % 2 !== 0) return i;
        }).filter(i => i);
        splits.forEach((s, i) => {
            if (filteredIndexes.includes(i)) {
                splits[i] = ascii2hex(splits[i]);
            }
        });
        const hexColor = splits.join('').substring(2);

        result.names[id] = rawName;
        result.colors[id] = hexColor;

    }
    return result;

};


// util function to convert ascii to hex
function ascii2hex(str) {
    var arr = [];

    for (var i = 0, l = str.length; i < l; i++) {
        var hex = Number(str.charCodeAt(i)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}
