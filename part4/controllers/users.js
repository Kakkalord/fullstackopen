const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/api/users', async (request, response) => {
    // create a new user from the request
    const { username, password, name } = request.body
    
    // hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const newUser = new User({
            username,
            passwordHash,
            name
        })

    // save user to DB
    await newUser.save()
    return response.status(201).json(newUser)

})

userRouter.get('/api/users', async (request, response) => {
    // get all users from db
    const allUsers = await Users
        .find({}, { username: 1, name: 1, id: 1 })
        .populate('blogs')

    return response.status(200).json(allUsers)
})

module.exports = usersRouter