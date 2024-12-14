const userModel = require('../database/models/usermodel');


module.exports.createUser = async({
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }

    try{
        return await userModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password
        })
    }catch(err){
        console.error('Error in createUser:', err);
        throw err;     
    }

}