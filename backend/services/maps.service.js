const axios = require('axios');
const captainModel = require('../database/models/captainmodel')

module.exports.getAddressCoordinate = async(address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const res = await axios.get(url);
       
        if(res.data.status === "OK"){
            const location = res.data.results[0].geometry.location;
            return{
                lat : location.lat,
                lng : location.lng
            }
        }else{
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {
        console.log(error);
        throw error
        
    }

}


module.exports.getDistanceTime = async(origin,destination) => {
    if(!origin || !destination){
        throw new Error("Origin and Destination are required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const res = await axios.get(url);
        // console.log(res.data);
        
       
        if(res.data.status === "OK"){
            if (res.data.rows[0].elements[0].status === `ZERO_RESULTS`) {
                throw new Error("No route found");
            }
            
            return res.data.rows[0].elements[0];

        }else{
            throw new Error('Unable to fetch distance and time')
        }
    } catch (error) {
        console.log(error);
        throw error
        
    }
}



module.exports.getAutoCompleteSuggestions = async(input) => {
    if(!input){
        throw new Error ("Query is required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    try {
        const res = await axios.get(url);
        if(res.data.status === 'OK'){
                return res.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
        
    } catch (error) {
        console.log(error);
        throw error
    }

}



module.exports.getCaptainInTheRadius = async(ltd,lng,radius) => {
    const captain = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere : [[ltd,lng],radius/6371 ]
            }
        }
    })

    return captain
}