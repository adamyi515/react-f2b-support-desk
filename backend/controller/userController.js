// @desc Register user
// @route /api/users
const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    
    Validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Enter all data.');
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