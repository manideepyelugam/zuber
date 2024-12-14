const { validationResult } = require('express-validator')
const captainService = require('../services/captain.service')
const captainModel = require('../database/models/captainmodel')
const blackListTokenModel = require("../database/models/blackListToken.model")


module.exports.registerCaptain = async(req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
    }

    const {fullname,email,password,vehicle} = req.body;

    try {
        if (!fullname?.firstName) {
            return res.status(400).json({ message: '`fullname.firstName` is required' });
        }
    
    
        const isEmail = await captainModel.findOne({email});

        if(isEmail){
            return res.status(403).json({message:"Email already exist"})
        }


        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname:fullname.firstName,
            lastname:fullname.lastName,
            email,
            password:hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        })
    
        const token = await captain.generateAuthToken();
        console.log(token);
        

        res.status(201).json({captain,token})

    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ error: 'Email is already registered' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
  
}


module.exports.loginCaptain = async(req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
    }


    const {email,password} = req.body;

    try {

        const captain = await captainModel.findOne({email}).select('+password');
        

        if(!captain){
           return res.status(401).json({message:"Invalid email"})
        }

        const isMatch = await captain.comparePassword(password);

        if(!isMatch){
           return res.status(401).json({message:"Invalid password"})
        }

        const token = captain.generateAuthToken();

        res.status(201).json({captain,token})

        
    } catch (error) {
        
    }
}



module.exports.captainProfile = async(req,res,next) => {
    res.status(201).json({captain:req.captain})
}


module.exports.logoutCaptain = async(req,res,next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({token});

    res.status(200).json({message:"Logged out"})
}