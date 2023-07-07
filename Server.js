//tester: console.log("Buna!")
// Download RESt Client extension

//Do the following to run
// $ npm run devStart
// > nodemon Server.js

const cons = require('consolidate')
const { configDotenv } = require('dotenv')
const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const Web = express()

require('dotenv').config()
Web.use(express.json())

const JWRequire = require('jsonwebtoken')

const listOfPosts = [
    {
        Id : 1,
        Email : 'althoffajar1@gmail.com',
        Username : 'Test'
    }
]//lists of posts

Web.get('/listOfPosts', (request, response) => {
    response.json(listOfPosts)
})//Gets or returns the post

Web.post('/signIn', (request, response) =>{
    //Authenticate User
    
    const Username = request.body.Username
    const User = {name : Username}

    const token = JWRequire.sign(User, 
        process.env.ACCESS_TOKEN_SECRET)
    response.json({token: token})
})

Web.listen(3000)