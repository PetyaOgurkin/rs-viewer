const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();

router.post('/login',
    [
        check('login', 'invalid login').trim().exists(),
        check('password', 'invalid password').trim().exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'invalid data'
                })
            }

            const { login, password } = req.body

            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: 'this user does not exists' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'invalid password' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'server error' })
        }
    })

router.post('/verify',
    [
        check('token', 'invalid token').exists(),
        check('userId', 'invalid userId').exists()
    ],
    (req, res) => {

        jwt.verify(req.body.token, config.get('jwtSecret'), (err, decoded) => {

            if (err) {
                return res.status(400).json({ message: 'invalid token' })
            }

            if (decoded.userId !== req.body.userId) {
                return res.json({ message: 'invalid userId' })
            }
            return res.json({ token: req.body.token, userId: req.body.userId })

        });
    })

module.exports = router