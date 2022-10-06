const User = require('../models/user');

const jwt = require('jsonwebtoken');

const userCtrl = {};

userCtrl.signUp = async (req, res) => {
    const { email, password } = req.body;
    const user = new User({email, password});
    await user.save();

    const token = jwt.sign({_id: user._id}, 'secretKey');

    res.status(200).json({
        status: 'Signed up',
        token: token
    });
};

userCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user) {
        if (user.password === password) {

            const token = jwt.sign({_id: user._id}, 'secretKey');

            res.status(200).json({
                status: 'Signed in',
                token: token
            });
        }
        else {
            res.status(401).json({status: 'Wrong password'});
        }
    }
    else {
        res.status(401).json({status: 'Email doesn\'t exist'});
    }
};

userCtrl.getTasks = (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        }
    ]);
};

userCtrl.verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token !== null){
            const payload = jwt.verify(token, 'secretKey');
            if (payload) {
                req.userId = payload._id;
                next();
            }
            else {
                res.status(401).json({status: 'Unauthorized request'});
            }
        }
        else {
            res.status(401).json({status: 'Unauthorized request'});
        }
    }
    else {
        res.status(401).json({status: 'Unauthorized request'});
    }
};

module.exports = userCtrl;