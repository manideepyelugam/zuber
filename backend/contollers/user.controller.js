const { validationResult } = require('express-validator')
const userModel = require('../database/models/usermodel')
const userService = require('../services/user.service');
const blackListTokenModel = require('../database/models/blackListToken.model');

module.exports.registerUser = async(req,res,next)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
    }

    const {fullname,email,password} = req.body;

    const hashedPassword = await userModel.hashing(password);

    try {
        const user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword
        })

        if (!user) {
            return res.status(500).json({ error: 'User creation failed' });
        }

        const token = userModel.generateAuthToken;
        res.status(201).json({token,user})
        
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ error: 'Email is already registered' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.loginUser = async(req,res,next) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({message:"Invalid email"})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid password"})
    }

    const token = user.generateAuthToken();
    res.status(200).json({user,token})
}


module.exports.userProfile = async(req,res,next) => {
    res.status(200).json(req.user);
}



module.exports.logoutUser = async(req,res,next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({token});

    res.status(200).json({message:"Logged out"})



}