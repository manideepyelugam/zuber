const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator')
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket.js');
const rideModel = require('../database/models/ride.model.js');

module.exports.createRIde = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {destination,pickuploc,vehicleType} = req.body;
    try {
        const ride = await rideService.createRide({
            user:req.user._id,
            pickup : pickuploc,
            destination : destination,
            vehicleType : vehicleType
        });

        res.status(200).json(ride);

        try {

            ride.otp = ''

            const pickupCoordinates = await mapService.getAddressCoordinate(pickuploc);
            // console.log(pickupCoordinates);
            
            const captainInLocation = await mapService.getCaptainInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,5);
    
            const rideWithUser = await rideModel.findOne({_id : ride._id}).populate('user')
            // console.log(rideWithUser);
            
    
            captainInLocation.forEach(captain => {
                sendMessageToSocketId(captain.socketId,{
                    event:'new-ride',
                    data : rideWithUser
                })
            
            })        
            
        } catch (error) {
            console.error('Error in side effects:', error.message);

        }

    } catch (error) {
        return res.status(400).json({message : error.message})
    }
}



module.exports.getFare = async(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {pickuploc,destination} = req.query;

    try {
        const fare = await rideService.getFare(pickuploc,destination);
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



module.exports.conformRide = async(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {rideId} = req.body;

    try {
        const ride = await rideService.conformRide({rideId , captain : req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-conformed',
            data:ride
        })

        return res.status(200).json(ride);
        
    } catch (error) {
        return res.status(500).json({message:error.message})

    }
}