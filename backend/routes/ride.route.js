const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const {body,query} = require('express-validator');
const rideController = require('../contollers/ride.controller')

router.post('/create',authMiddleware.authUser,
    body('pickuploc').isString().isLength({min : 3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address")
    ,body('vehicleType').isString().isIn(['motorcycle', 'auto', 'car']).withMessage("Invalid vehicle type"),
    rideController.createRIde
)


router.get('/get-fare',authMiddleware.authUser,
    query('pickuploc').isString().isLength({min:3}).withMessage("Invalid Pickup Location"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid Destination Location"),
    rideController.getFare
)


router.post('/conform',authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.conformRide
)
 


module.exports = router;