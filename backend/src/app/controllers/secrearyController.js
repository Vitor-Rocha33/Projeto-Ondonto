const Secretary = require('../models/secretaryModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const env = require('../../../.env');

// Generate token
function generateToken(params = {}) {
    return jwt.sign(params, env.secret, {
        expiresIn: 300
    });
};

exports.secretary_create = async (req, res) => {
    try {

        const dentistRegister = req.userId;

        const {
            name,
            lastName,
            email,
            CPF,
            telephone,
            date_birth,
            password,
            rg,
        } = req.body

        if (await Secretary.findOne({
                email
            }))
            return res.status(400).send({
                error: 'this email already exist'
            });

        if (await Secretary.findOne({
                CPF
            }))
            return res.status(400).send({
                error: 'This CPF already exist'
            });

        if (await Secretary.findOne({
                rg
            }))
            return res.status(400).send({
                error: 'This rg already exist'
            });

        const createdSecretary = await Secretary.create({
            name,
            lastName,
            email,
            CPF,
            telephone,
            date_birth,
            password,
            rg,
            dentist: dentistRegister
        });

        createdSecretary.password = undefined

        return res.send(createdSecretary);
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: 'Error in create Secretary'
        })

    }
}

exports.secretary_login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const secretary = await Secretary.findOne({
            email
        }).select('+password');

        if (!secretary)
            return res.status(400).send({
                error: 'email not found'
            });
        if (!(await bcrypt.compare(password, secretary.password)))
            return res.status(400).send({
                error: 'Invalid password'
            });

        secretary.password = undefined;

        res.send({
            secretary,
            token: generateToken({
                id: secretary._id
            })
        });

    } catch (err) {
        res.status(400).send({
            error: 'Error in login'
        })
    }
}