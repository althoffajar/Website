/* Basic Login 
Download the following: 
$npm i passport passport-local express-session express-flash

// Download RESt Client extension

Do the following to run on bash
$ npm run devStart
> nodemon Server.js
*/

if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

const express = require('express')
const express_flash = require('express-flash')
const express_session = require('express-session')
const Web = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const Passport_Initialize = require('./PassportFile')
const flash = require('express-flash')

Passport_Initialize(
    passport, 
    username => ListOfUser.find(user => user.username === username)),
    id => ListOfUser.find(user => user.id === id)

const ListOfUser = []

Web.set('view-engine','ejs')
Web.use(express.urlencoded({extended: false}))
Web.use(express_flash())
Web.use(express_session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))
Web.use(passport.initialize()) //Web.use(passport.Initialize())
Web.use(passport.session())

Web.get('/', (request, response) =>{
    response.render('Index.ejs', {username : 'Althof'})
})

Web.get('/Signin', (request, response) =>{
    response.render('Signin.ejs')
})

Web.get('/Signup', (request, response) =>{
    response.render('Signup.ejs'/*, passport.authenticate('')*/)
})

Web.post('/Signin', passport.authenticate('local', {
    successRedirect:"/",
    failureRedirect: "/Signin",
    failureFlash : true
}))


Web.post('/Signup', async (request, response) =>{
    try{
        const password_hashed = await bcrypt.hash(request.body.password, 10)
        ListOfUser.push({
            id : Date.now().toString(),
            email: request.body.email,
            username : request.body.username,
            password: password_hashed
        })
        response.redirect('/Signin')
    } 
    catch (e) {
        console.log(e)
        response.redirect('/Signup')
    }
    console.log(ListOfUser)
})

Web.listen(3000)

/*------------For JWT Login-------------------

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
*/