# Get-Layers-Label-Colors-using-CEP
![image](https://user-images.githubusercontent.com/66829812/164243124-6041a70e-b3a2-4bd2-a5e4-af8fd479a01e.png)
_Note: This is for CEP panels. I am not using ExtendScript here.
If you want to use extendscript, you'll have to modify the code._

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

After a lot of google searches, I found a comment by RenderTom pointing out that the values are a weird mix of ascii and hex. (The parts inside the qutation marks are ascii). **This repository finds the preference file, reads it, finds that section, converts each value into propper hex.**

# return
returns an array of hex codes in the right order (based on the Label Color ID #)

Example: `["", "B53838", "E4D84c", "A9CBC7", "E5BCC9", "A9A9CA", "E7C19E", "B3C7B3", "677dE0", "4a224134224c", "8E2c9A", "E8920D", "7F452a", "F46dD6", "3dA2A5", "A89677", "1E401E"]`

The first element is empty because there is no label of number 0, but that's okay since the `layer.label` [attribute](https://ae-scripting.docsforadobe.dev/layers/layer.html#layer-label) in ExtendScript returns an index that matches that convention.



### requirements:
requires  [using nodejs as part of your project](https://www.davidebarranca.com/2015/12/html-panel-tips-19-cc2015-1-cep6-1-node-js-fixes/).

