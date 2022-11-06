On Ubuntu 22.04 with a self compiled, I dont really understand whyt but there is an install in usr, ~/.stellarium, and in Downloads. The only easily usable path was in Downloads for some reason. Its important that this gets figured out for windows and recorded.


This is dedicated to script snippets and presentation script for a mobile planetarium utilizing a fish eye lens and a large beamer. 

messing_about.js --> contains random code snippets with comments for what they do, should include all script snippets (and more) found in this repository

KIT_script.ssc --> Script for KIT project related presentation. 
- All settings are assumed to be default for this
- By downloading all star catalogues available one can make it look nicer (should be 9)
- Added the following link to the satellite sources: https://celestrak.org/NORAD/elements/starlink.txt to also show starlink - By selecting all catalogues added by default the sky can be absolutely cluttered (which not too bad) - note all of these will be shown in ligh blue (I assume this color is determined by orbit)




When using windows, it is common that dpi scaling is applied to a 4k monitor (or beamer) this makes the display in stellarium look very grainy, make sure to turn it off (allthough do check it might get the beamer to look a little more focused through oversharpening)


TODO:
- Add functionality to go forward and backward with a list of functions and another marker like in pause - figure out how to interrupt started scripts
