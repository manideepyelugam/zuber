const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require("express");
const connectToDB = require('./database/db_connection');
const userRoute = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoute = require('./routes/captain.route');
const mapsRoute = require('./routes/maps.routes');
const rideRoute = require('./routes/ride.route');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())



app.get('/',(req,res) => {
    res.send("hello")
})

app.use('/user',userRoute);

app.use('/captain',captainRoute)

app.use('/maps',mapsRoute)

app.use('/ride',rideRoute);

connectToDB();

module.exports = app