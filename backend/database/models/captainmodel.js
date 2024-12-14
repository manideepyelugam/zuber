const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const captainSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            min:[3,"Firstname must have more than 3 letters"],
            required:true
        },
        lastName:{
            type:String,
            min:[3,"Firstname must have more than 3 letters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        min:[6,"Password should contain atleast 6 letters"]
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            min:[3,"Color should contain minimum of 3 letters"]
        },
        plate:{
            type:String,
            required:true,
            min:[3,"Plate should contain minimum of 3 letters"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be 1 or greated than 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        },
        location:{
            lat:{
                type:Number
            },
            log:{
                type:Number
            }
        }
    }
})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}


captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


captainModel = mongoose.model("captain",captainSchema);

module.exports = captainModel;
