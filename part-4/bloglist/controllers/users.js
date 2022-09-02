const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, passwordHash } = req.body
    
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    if (passwordHash.length < 3) {
        return res.status(400).json({
            error: 'password must be at least 3 characters.'
        })
    }

    const saltRounds = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(passwordHash, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash: hashedPassword
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { 
        url: 1, title: 1, author: 1, id: 1
    })
    res.json(users)
})

module.exports = usersRouter