const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const { getCoordinates } = require('../contollers/map.controller');
const { getDistanceTime } = require('../contollers/map.controller')
const {getAutoCompleteSuggestions} = require('../contollers/map.controller')
const { query } = require('express-validator')


router.get('/get-coordinates',query('address').isString().isLength({min : 3}),
    authMiddleware.authUser,getCoordinates)

    

router.get("/get-distance-time",
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    getDistanceTime
)
    

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,getAutoCompleteSuggestions

)
module.exports = router;