// Its technically ECMA script but should coinide --- Note stellarium version 1.x
// https://stellarium.org/doc/1.x/

core.debug("Starting Random trial Script")

// Debug message
// LabelMgr.labelScreen("Hello Universe", 200, 200, true, 20, "#ff0000");

// Function to wait until equatorial flag is changed with "."
function pause()
{
    var oldEquator = GridLinesMgr.getFlagEquatorLine();
    var pauseLabel = LabelMgr.labelScreen(">>", 
                                          core.getScreenWidth() - 50,
                                          core.getScreenHeight() - 50);
    while (oldEquator == GridLinesMgr.getFlagEquatorLine())
    {
        core.wait(0.1);
    }
    GridLinesMgr.setFlagEquatorLine(oldEquator);
    LabelMgr.deleteLabel(pauseLabel);
    core.debug("Finished Pause")
    return;
}

function iterate_through(functional, start_val, end_val, steps, time_taken)
{
    var step_size = (end_val - start_val) / steps;
    var current_val = start_val;
    var i = 0;
    while (i < steps)
    {
        functional(current_val);
        core.wait(time_taken / steps);
        current_val += step_size;
        i++;
    }
    return;
}

core.debug("Starting BortleScale Iteration")
// Show all bortle scale
core.setDate("2008-03-24T22:21:01")
iterate_through(core.setBortleScaleIndex, 0, 9, 100, 10)
core.setBortleScaleIndex(0)

core.debug("Starting Moonphase Iteration")
// Show all moon phase TODO: Figure out how to get moon phase
core.setDate("2008-00-24T22:21:01")
function change_dat(val){return "2008-0${val}-24T22:12:01";}
iterate_through(change_dat, 0, 9, 9, 9)


// Make function to show light pollution with images and video

// Light color show different color stars show image remember dome view shit - so move images around

// Milkyway function

// Moon on full up close

// Image function


// Apparently horizontal projection works on dome 
// TODO: Check if I can reimplement StelCore and StelModule draw to allow projection without image editing
function display_image_tripple(image_path)
// Assumes image contains all 3 images arranged can be done through function : create tripplet
{
    rotation = [0, 120, 240]
    core.loadSkyImage( id = "Triplet",
		filename = image_path,
		// In degrees
        lon = 0,
		lat = 45,
        // angular size in arcmin
		angSize = 60, // 1/21600 turns = 1 arcmin
		rotation = 0,
		minRes = 2.5,
		maxBright = 14,
		visible = true,
		frame = "EqJ2000",
		withAberration = true 
	) 	
    
    pause()
    // Delete after paue
    ScreenImageMgr.deleteAllImages 
}

image_path = '/home/felix/Pictures/screenshots/screenshot_20210618_104525.png'


// TODO Figure out how StelFileMgr works cant load any images


"""
Funcitons from StelMainScriptAPI == core
loadVideo

"""