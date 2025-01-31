const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator')


module.exports.getCoordinates = async(req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {address} = req.query;
    // console.log(address);
    

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        // console.log(coordinates);
        
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message : 'Coordinate not found'})
    }
}


module.exports.getDistanceTime = async (req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {origin,destination} = req.query;

    try {
        const distanceTime = await mapsService.getDistanceTime(origin,destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({message : 'Route not found'})

    }
}

   
module.exports.getAutoCompleteSuggestions = async(req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {input} = req.query;

    try {
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions)
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internam serve error"})
        
    }

}