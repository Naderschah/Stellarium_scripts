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

function durationSeconds(timeExpr)
{
    hours = (timeExpr.split("h")[0]);
    minutes = (timeExpr.split("h")[1].split("m")[0]);
    seconds = (timeExpr.split("h")[1].split("m")[1].split("s")[0]);
	
    total = hours * 3600 + minutes * 60 + seconds;
	return total;
}

// Get time difference (does not consider days)
function waitForTime(time, duration, change_cond = true)
{
    core.moveToAltAzi(alt=90 , azi=0,duration=1);
    StelMovementMgr.zoomTo(aimFov=199, zoomDuration=1);
    if (change_cond)
    {
        LandscapeMgr.setFlagAtmosphere(false);
        LandscapeMgr.setFlagLandscape(true);
    }
    time_rate = durationSeconds(core.getDeltaT(time)) / duration;
    core.setTimeRate(time_rate);
    core.waitFor(time);
    core.setTimeRate(1);
}
// Image function
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


//TODO: Finish tripple image shower : Not required yet, issue is _1 _2 videos dont play and rotation needs to be added
function displayVideo_tripple(video_path, id,length,width,wp_width,wp_height)
{   
    if(length === undefined) {
        length = false;
     }
    if(width === undefined) {
        width = 0.2;
     }
     if(wp_width === undefined) {
        wp_width = 3840;
     }
     if(wp_height === undefined) {
        length = 2160;
     }
    id_0 = id +'_0'
    id_1 = id +'_1'
    id_2 = id +'_2'
    core.loadVideo( filename=video_path,
                    id =id_0,
                    x = wp_width/2*(1-width),
                    y = wp_height*1/6)
    core.loadVideo( filename=video_path,
                    id =id_1,
                    x = wp_width/3*(1-width),
                    y = wp_height*5/6)
    core.loadVideo( filename=video_path,
                    id =id_2,
                    x = wp_width*2/3*(1-width),
                    y = wp_height*5/6)
    
    // Get aspect ratio to maintain
    _width=StelVideoMgr.getVideoResolution(id_0).width
    _height=StelVideoMgr.getVideoResolution(id_0).height
    aspect_ratio = _height/_width
    core.resizeVideo(id_0, width =width, height = aspect_ratio*width)
    core.resizeVideo(id_1, width =width, height = aspect_ratio*width)
    core.resizeVideo( id_2, width =width, height = aspect_ratio*width)
    // Get length to play
    if (length == false)
    {
        length = core.getVideoDuration(id_0)
    }
    length=5
    core.wait(length)
    core.stopVideo(id_0)
    core.stopVideo(id_1)
    core.stopVideo(id_2)
}
core.moveToAltAzi(alt=90 , azi=0,duration=1)
displayVideo_tripple(video_path='movies/lichtvervuiling_stad_1.mp4', id='trials')



//Whole dome video
function displayVideo_dome(video_path, id,length)
{   
    if(length === undefined) {
        length = false;
     }
    core.loadVideo( filename=video_path,
                    id =id,
                    x = 0,
                    y = 0,)
    //resize to full view port
    core.resizeVideo(id = id, width = 1, height = 1)
    // Get length to play
    if (length == false)
    {
        length = core.getVideoDuration(id = id)
    }
    core.wait(length)
    core.stopVideo(id = id)
}




// Make everything red
// core.setNightMode(true)

// Debug message on screen
// LabelMgr.labelScreen("Hello Universe", 200, 200, true, 20, "#ff0000");


// Overhead

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
// It takes a second for the ground to change
core.wait(1)
core.setDate("2022-09-25T23:54:00")

core.selectObjectByName("Moon",pointer = false)
core.moveToSelectedObject(duration=1)

StelMovementMgr.zoomTo(aimFov=2.21, zoomDuration=1)
jd = core.getJDay()
for (h = 0; h <= 14; h++)
{
    core.setJDay(jd + h)
    core.moveToSelectedObject(duration=0)
    core.wait(1)
}
core.setDate("2022-10-09T22:54:00")
core.moveToSelectedObject(duration=0)


// TODO Show the group
// Light pollution presentation : Make phone show different colors of light to show while focused on the milky way, atmosphere has to be off as the sun will interfere
LandscapeMgr.setFlagAtmosphere(false)
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


// Sample images
// planetarium/Bensersiel_EAST_IMG_6442.jpg

display_image_tripple("planetarium/Bensersiel_EAST_IMG_6442.jpg", "Bensersiel_EAST_IMG_6442")


// Get rid of all images

ScreenImageMgr.deleteAllImages()
core.removeSkyImage(id)