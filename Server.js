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
        id : 1,
        Email : 'althoffajar1@gmail.com',
        Username : 'Test'
    },
    {
        id : 2,
        Email : 'althoffajar3@gmail.com',
        Username : 'Test2'
    }
]//lists of posts

Web.get('/listOfPosts', authenticate, (request, response) => {
    response.json(listOfPosts.filter(post => post.Username === request.User.name))
})//Gets or returns the post

Web.post('/signIn', (request, response) =>{
    //Authenticate User
    
    const Username = request.body.Username
    const User = {name : Username}

    const token = JWRequire.sign(User, 
        process.env.ACCESS_TOKEN_SECRET)
    response.json({token: token})
})

function authenticate (request, response, next){
    //Recieves the token and verifies if its the right token, then returns the user to the posts
    const Header = request.headers['authorization']
    const token = Header && Header.split(' ')[1]
    if (token == null) return response.sendStatus(401) //sendStatus

    JWRequire.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, User) => {
        if(error) return response.sendStatus(403)
        request.User=User
        next()
    })
}

Web.listen(3000)