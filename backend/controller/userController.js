const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


// @desc Register user
// @route /api/users
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Enter all data.');
    }

    // Check if user exist, if so, then return status 400
    const userExist = await User.findOne({ email });
    if(userExist){
        res.status(400);
        throw new Error('User already exists');
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
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

}

// @desc Login user
// @route /api/user/login
const loginUser = (req, res) => {
    res.send({ message: 'Login Route'});
}

module.exports = {
    registerUser,
    loginUser
}