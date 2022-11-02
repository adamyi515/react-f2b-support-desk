const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


// @desc Register user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error('All parameters must be entered');
    }

    // Check if user exist, if so, then return status 400
    const userExist = await User.findOne({ email });
    if(userExist){
        res.status(400);
        throw new Error('User already exist');
        
    }

    // If user does not exist, then hash the password and create new user in DB.
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: passwordHashed
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
       
    }

})

// @desc Login user
// @route /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });


    // If the user is found in the DB AND password match.
    if(foundUser && (await bcrypt.compare(password, foundUser.password))){
        res.status(200).json({
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            token: generateToken(foundUser._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }

})

const getMe = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user.id,
        email: req.user.email,
        name: req.user.name
    };
    res.status(200).json(user);
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    registerUser,
    loginUser, 
    getMe
}