let mongoose = require('mongoose')
let express = require('express')

let router = express.Router();
let user = require('../models/user-schema');

router.route('/create').post((req, res, next) => {
    user.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res, next) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/edit/:id').get((req, res, next) => {
    user.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/update').post((req, res, next) => {
    var filter = { username: req.body.username };
    user.findOneAndUpdate( filter, {
        $set:{
        fullname: req.body.fullname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip}
    }, { strict: false}, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;
