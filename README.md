# Get-Layers-Label-Colors-using-CEP
<img width="558" alt="image" src="https://user-images.githubusercontent.com/66829812/187047432-0e4d8301-81bb-4741-9528-b3049d83ec2d.png">

_Note: This is for CEP panels. I am not using ExtendScript here.
If you want to use ExtendScript, you might want to check out this code by [stibinator](https://github.com/stibinator/AEScripts/blob/master/ScriptUI%20Panels/simplify%20duik%20icons.jsx#L283)._

_Now works on both macOS and windows._

### Usage
call the function:
```
getLabelsInfo(); 
```

### return
returns an object with two arrays, "colors" and "names".
Both arrays are sorted using the label ID.

Example:
```js
{
	colors: (17) ["", "B53838", "E4D84c", "A9CBC7", "E5BCC9", "A9A9CA", "E7C19E", "B3C7B3", "677dE0", "4aA44c", "8E2c9A", "E8920D", "7F452a", "F46dD6", "3dA2A5", "A89677", "1E401E"]
	names: (17) ["", "Red", "Yellow", "Aqua", "Pink", "Lavender", "Peach", "Sea Foam", "Blue", "Green", "Purple", "Orange", "Brown", "Fuchsia", "Cyan", "Sandstone", "Dark Green"]
}
```



# What and Why
Label colors in Ae Preferences look like this:
```
["Label Preference Color Section 5"]
	"Label Color ID 2 # 1" = FFB5"88"
	"Label Color ID 2 # 10" = FF8E","9A
	"Label Color ID 2 # 11" = FFE8920D
	"Label Color ID 2 # 12" = FF7F"E*"
	"Label Color ID 2 # 13" = FFF4"m"D6
	"Label Color ID 2 # 14" = FF"="A2A5
	"Label Color ID 2 # 15" = FFA896"w"
	"Label Color ID 2 # 16" = FF1E"@"1E
	"Label Color ID 2 # 2" = FFE4D8"L"
	"Label Color ID 2 # 3" = FFA9CBC7
	"Label Color ID 2 # 4" = FFE5BCC9
	"Label Color ID 2 # 5" = FFA9A9CA
	"Label Color ID 2 # 6" = FFE7C19E
	"Label Color ID 2 # 7" = FFB3C7B3
	"Label Color ID 2 # 8" = FF"g}"E0
	"Label Color ID 2 # 9" = FF"J"A4"L"
```

After a lot of google searches, I found a comment by RenderTom pointing out that the values are a weird mix of ASCII and hex. (The parts inside the quotation marks are ASCII). **This repository finds the preference file, reads it, finds that section, and converts each value into propper hex.**



The first element is empty because there is no label for the number 0, but that's okay since the `layer.label` [attribute](https://ae-scripting.docsforadobe.dev/layers/layer.html#layer-label) in ExtendScript returns an index that matches that convention.

### requirements
requires  [using nodejs as part of your project](https://www.davidebarranca.com/2015/12/html-panel-tips-19-cc2015-1-cep6-1-node-js-fixes/).

### limitations
- Will not work on After-Effects beta. If you want it to work, make sure the path to the preferences file says "After-Effects (Beta)" instad of "After-Effects".
- Will only work in English After-Effects because the preferences file name is language based (can be fixed by getting the file with the suffix "general.txt")
If you do, feel free to contirbute to this repo with solutions.


# Support
If this helped you [consider buying one of my tools](https://www.goodboy.ninja/) or sharing this elsewhere where people might need it.

Good Boy Ninja


.
.
.

_related keywords that may have brought you here:
Label Color ID 2,  .getPrefAsString(), RGB-HEX-ASCII , after effects getprefasstring label, Scripting: Retrieving Label Color from Preferences,Reading the label colors from preferences file, Get Label colors from Pref , ExtendScript, JavaScript, Labels_

