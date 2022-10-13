// Its technically ECMA script but should coinide --- Note stellarium version 1.x
// https://stellarium.org/doc/1.x/


// There is one annoying thing version 1.x can be installed as an AppImage and snap install however, those dont allow for modification of source
// apt does not have 1.x so it must be custom compiled
// The path on my home pc is: ~/Downloads/stellarium-1.x



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

// https://codereview.stackexchange.com/questions/224931/convert-a-string-like-4h53m12s-to-a-total-number-of-seconds-in-javascript
function durationSeconds(timeExpr)
{
	var units = {'h': 3600, 'm': 60, 's': 1};
	var regex = /(\d+)([hms])/g;

	let seconds = 0;
	var match;
	while ((match = regex.exec(timeExpr))) 
	{
		seconds += parseInt(match[1]) * units[match[2]];
	}

	return seconds;
}


function waitForTime(time, duration = 10)
{
    core.moveToAltAzi(alt=90 , azi=0,duration=1)
    StelMovementMgr.zoomTo(aimFov=199, zoomDuration=1)
    LandscapeMgr.setFlagAtmosphere(false)
    LandscapeMgr.setFlagLandscape(true)
    time_rate = durationSeconds(StelMainScriptAPI.getDeltaT(time)) / duration
    StelMainScriptAPI.setTimeRate(time_rate)
    core.waitFor(time)
    StelMainScriptAPI.setTimeRate(1)
}
// Image function
// Apparently horizontal projection works on dome -- See if this is required as this was not related to the function used
function display_image_tripple(image_path, id)
{
    rotation = [0, 120, 240]
    core.loadSkyImage( id =id+'_0',
		filename = image_path,
	 	// In degrees
        lon = 0,
		lat = 35,
        // angular size in arcmin
		angSize = 2160, // 1/21600 turns = 1 arcmin
		rotation = 0,
		minRes = 2.5,
		maxBright = 5,
		visible = true,
		frame = "AzAlt",
		withAberration = true 
	)
    core.loadSkyImage( id =id+'_1',
		filename = image_path,
	 	// In degrees
        lon = 120,
		lat = 35,
        // angular size in arcmin
		angSize = 2160, // 1/21600 turns = 1 arcmin
		rotation = 0,
		minRes = 2.5,
		maxBright = 5,
		visible = true,
		frame = "AzAlt",
		withAberration = true 
	)
    core.loadSkyImage( id =id+'_2',
		filename = image_path,
	 	// In degrees
        lon = 240,
		lat = 35,
        // angular size in arcmin
		angSize = 2160, // 1/21600 turns = 1 arcmin
		rotation = 0,
		minRes = 2.5,
		maxBright = 5,
		visible = true,
		frame = "AzAlt",
		withAberration = true 
	)
}


// Also useful
// core.setNightMode(true)

// Debug message on screen
// LabelMgr.labelScreen("Hello Universe", 200, 200, true, 20, "#ff0000");

// projection modes:
// ProjectionPerspective
// ProjectionEqualArea
// ProjectionStereographic
// ProjectionFisheye
// ProjectionHammer
// ProjectionCylinder
// ProjectionMercator
// ProjectionOrthographic
// ProjectionSinusoidal
// ProjectionMiller
core.setProjectionMode('ProjectionFisheye')
core.setDiskViewport(true)
core.setGuiVisible(false)

// Software to create profiles: https://fly.elise-ng.net/blog/create-your-own-planetarium-with-stellarium/

// This may also help core.setViewportStretch() default: 0.15 for a setup with 5 projectors with edge blending


core.debug("Starting BortleScale Iteration")
// Show all bortle scale
core.setDate("2008-03-24T22:21:01")
LandscapeMgr.setFlagAtmosphere(true)
LandscapeMgr.setFlagLandscape(true)
StelMovementMgr.zoomTo(aimFov=199, zoomDuration=1)
core.moveToAltAzi(alt=90 , azi=0,duration=1)
iterate_through(core.setBortleScaleIndex, 0, 9, 100, 10)
core.setBortleScaleIndex(0)





core.debug("Starting Moonphase Iteration")
// Show all moon phase 
LandscapeMgr.setFlagAtmosphere(false)
LandscapeMgr.setFlagLandscape(false)

core.setDate("2022-09-25T23:54:00")

core.selectObjectByName("Moon",pointer = false)
core.moveToSelectedObject(duration=1)

StelMovementMgr.zoomTo(aimFov=2.21, zoomDuration=1)
jd = core.getJDay()
for (let h = 0; h <= 14; h++)
{
    core.setJDay(jd + h)
    core.moveToSelectedObject(duration=0)
    core.wait(1)
}
core.setDate("2022-10-09T22:54:00")
core.moveToSelectedObject(duration=0)


// TODO Add video and images with the 3 image function and make 3 video function and whole dome function

// TODO Show the group
// Light pollution presentation : Make phone show different colors of light to show while focused on the milky way with atmosphere on
LandscapeMgr.setFlagAtmosphere(true)
LandscapeMgr.setFlagLandscape(false)

core.moveToRaDec(10.645161849141573, -28.503793265228694, duration=1)
StelMovementMgr.zoomTo(aimFov=235, zoomDuration=1)



// Milkyway function
// Ra: 10.645161849141573
// Dec: -28.503793265228694 
LandscapeMgr.setFlagAtmosphere(false)
LandscapeMgr.setFlagLandscape(false)

core.moveToRaDec(10.645161849141573, -28.503793265228694, duration=1)
StelMovementMgr.zoomTo(aimFov=235, zoomDuration=1)



// Get rid of all images

ScreenImageMgr.deleteAllImages()
core.removeSkyImage(id)