const rideModel = require('../database/models/ride.model');
const mapService = require("../services/maps.service")



async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error("Pickup and Destination both are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup,destination);
    const distance = distanceTime.distance.value / 1000; // Convert to km
    const duration = distanceTime.duration.value / 60; // Convert to minutes

    // Base fare for each vehicle type
    const baseFares = {
        motorcycle: 20,
        auto: 30, 
        car: 40
    };

    // Per km rate for each vehicle type
    const perKmRates = {
        motorcycle: 12,
        auto: 15,
        car: 20
    };

    // Per minute rate for each vehicle type
    const perMinuteRates = {
        motorcycle: 1,
        auto: 1.5,
        car: 2
    };

    // Calculate fares for each vehicle type
    const fares = {
        motorcycle: Math.round(baseFares.motorcycle + (distance * perKmRates.motorcycle) + (duration * perMinuteRates.motorcycle)),
        auto: Math.round(baseFares.auto + (distance * perKmRates.auto) + (duration * perMinuteRates.auto)),
        car: Math.round(baseFares.car + (distance * perKmRates.car) + (duration * perMinuteRates.car))
    };

    return fares;

}


module.exports.getFare = getFare

function getOtp(num) {
    let otp = '';
    for(let i = 0; i < num; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}




module.exports.createRide = async({user,pickup,destination,vehicleType}) => {

    if(!user || !destination || !pickup || !vehicleType){
        throw new Error("All the fields are required");
    }


    const fare =await getFare(pickup,destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare : fare[vehicleType]
    })


    return ride;

}



module.exports.conformRide = async({rideId,captain}) => {
     if(!rideId){
        throw new Error("RideId is required");
     }

     await rideModel.findOneAndUpdate({
        _id:rideId
     },{
        status:'accepted',
        captain:captain._id
     })


     const ride = await rideModel.findOne({_id : rideId}).populate('user').populate('captain').select('+otp');

     if(!ride){
        throw new Error("Ride not found");
     }


     return ride;
}