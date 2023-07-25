const User = require("../models/User");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secret = require('../jwt/secret');

class UserService {
    create = async (req, res) => {
        const user = req.body;
    
        // validações
        if (!user) {
            res.sendStatus(400);
            return;
        }
    
        if (user.email.length < 12 || !user.email.includes('@')) {
            res.sendStatus(400);
            return;
        }
    
        if (user.password.length < 8) {
            res.sendStatus(400);
            return;
        }
    
        if (user.name.length < 5) {
            res.sendStatus(400);
            return;
        }

        if (await this.existsWithEmail(user.email)) {
            res.status(400);
            res.json({error: 'Usuário já cadastrado'});
            return;
        }
    
        // cadastro no banco
        try {
            const { password } = user;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            user.password = hash;

            const newUser = new User(user);
            await newUser.save();
            res.json({email: user.email});
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    existsWithEmail = async (email) => {
        try {
            const user = await User.findOne({email});
            if (user) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            console.log(err);
        }
    }

    auth = async (req, res) => {
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const MONTH = 30 * 24 * 60 * 60;

                    jwt.sign({email}, secret, {expiresIn: MONTH}, (err, token) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.json({token});
                        }
                    });

                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    delete = async (req, res) => {
        const { email } = req.params;

        try {
            await User.deleteOne({email});
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = new UserService();