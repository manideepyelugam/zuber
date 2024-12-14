const captainModel = require('../database/models/captainmodel');


module.exports.createCaptain = async({
    firstname, lastname, email, password,color,plate,capacity,vehicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        console.log(firstname,email,password,color,plate,capacity,vehicleType);
        
        throw new Error("All fields are required");
        
    }

    try{
        return await captainModel.create({
            fullname:{
                firstName:firstname,
                lastName:lastname
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType
            }
        })
    }catch(err){
        console.error('Error in createCaptain:', err);
        throw err;     
    }

}