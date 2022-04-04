const { 
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        return res.staus(400).json({
            error: 'Missing required launch data',
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNan(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if (!existsLaunchWithId(launchId)){
        return res.status(404).json({
            error: 'Launch not found',
        });
    } else {
        const aborted = abortLaunchById(launchId);
        return res.status(200).json(aborted);
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}