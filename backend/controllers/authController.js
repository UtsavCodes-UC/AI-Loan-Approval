const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json({message: "User registered"});
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(400).json({message: "User not found!"});
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched) return res.status(400).json({message: "Invalid Password"});

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    res.json({token});
}