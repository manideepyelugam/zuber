const mongoose = require('mongoose');


const connectToDB = () => {
    mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log('db connected');  
    }).catch((e) => {
        console.log(e,'error');
        
    })
}


module.exports = connectToDB