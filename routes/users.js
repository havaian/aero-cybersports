const express = require('express')
const Router = express.Router()
const { mainModule } = require('process')
const { PassThrough } = require('stream')
const User = require('../models/user');

require('dotenv/config')

router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.render('landing')
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/', async (req, res) => {

    // Check if this user already exisits
    let email = await User.findOne({ email: req.body.email })
    let phone = await User.findOne({ phone: req.body.phone })

    if (email || phone) {
        return res.status(400).render('404');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        savedUser = await user.save();
        res.render('return-id', { id: savedUser._id })
    }
});

module.exports = router