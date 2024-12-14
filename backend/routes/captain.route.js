const express = require('express')
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../contollers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstName').isLength({min:3}).withMessage("Min length should be 3"),
    body('password').isLength({min:6}).withMessage("Password should contain minimum of 6 letters"),
    body('vehicle.color').isLength({min:3}).withMessage("Color should contain minimum of 3 letters"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate should contain minimum of 3 letters"),
    body("vehicle.capacity").isLength({min:1}).withMessage("Capacity must be 1 or greated than 1"),
    body("vehicle.vehicleType").isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle type")
],
   captainController.registerCaptain
)


router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage("Password should contain minimum of 6 letters"),
],

captainController.loginCaptain
)


router.get("/profile",authCaptain,captainController.captainProfile)

router.get('/logout',authCaptain,captainController.logoutCaptain)


module.exports = router;