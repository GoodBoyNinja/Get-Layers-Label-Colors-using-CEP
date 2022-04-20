// main function
function getLabelColors () {

    // requires nodejs to read the preference file
    const fs = cep_node.require('fs');
    const path = cep_node.require('path');
    const cs = new CSInterface();

    // get the AE version, down to 1 decimal place (that's what the folder names are using)
    var version = cs.getHostEnvironment().appVersion;
    version = version.split(".")[0] + "." + version.split(".")[1];

    // finding the preferences folder
    var userDataFolder = cs.getSystemPath(SystemPath.USER_DATA);
    var prefsFolder = path.isMacOS() ? path.join(userDataFolder, "Adobe", "After Effects", version) : path.join(userDataFolder, "Preferences", "Adobe", "After Effects", version)(userDataFolder, "Preferences");
    var prefsFile = path.join(prefsFolder, `Adobe After Effects ${version} Prefs-indep-general.txt`);

    var prefsFolderExists = fs.existsSync(prefsFolder);
    var prefsFileExists = fs.existsSync(prefsFile);

    if (prefsFolderExists && prefsFileExists) {
        // read the file using nodejs
        var prefs = fs.readFileSync(prefsFile, "utf8");

        // get only the label colors section
        const start = `"Label Color ID 2 # 1"`;
        const startIndex = prefs.indexOf(start);
        const split = prefs.substring(startIndex, prefs.length);
        const section = split.substring(0, split.indexOf('[') - 1);

        // split the section into lines
        var labelSettingsLines = section.split('\n');
        var labelColors = [];

        // loop through each line and...
        for (var i = 0; i < labelSettingsLines.length; i++) {
            const crnt = labelSettingsLines[i];

            // get the id
            var id = crnt.substring(crnt.indexOf('#') + 1);
            id = id.substring(0, id.indexOf('"'));
            id = Number(id);
            console.log(id);

            // get the raw color, as displayed in AE
            var rawColor = crnt.substring(crnt.indexOf('=') + 1).trim();

            // raw color is weird. It's half HEX and half ASCII.
            // the part that's ASCII is inside quotation marks.
            // Let's convert it to hex
            const qStart = rawColor.indexOf('"');
            const qEnd = rawColor.lastIndexOf('"');
            const asciiValue = rawColor.substring(qStart + 1, qEnd);
            const hexTranslated = ascii2hex(asciiValue);

            // replace it and ommit the first two letters
            var hexColor = rawColor.replace('"' + asciiValue + '"', hexTranslated).substring(2);

            // log it if you want to see what's up:
            // console.log(hexColor);

            // push it into the array, with the id as the key
            labelColors[id] = hexColor;
        }


        return labelColors;
    }

    return null;


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
