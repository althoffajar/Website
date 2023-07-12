/* Basic Login 
Download the following: 
$npm i passport passport-local express-session express-flash
*/

const express = require('express')
const Web = express()
const bcrypt = require('bcrypt')
const passport = require('passport')

const Passport_Initialize = require('./PassportFile')

const ListOfUser = []

Web.set('view-engine','ejs')
Web.use(express.urlencoded({extended: false}))

Web.get('/', (request, response) =>{
    response.render('Index.ejs', {username : 'Althof'})
})

Web.get('/Signin', (request, response) =>{
    response.render('Signin.ejs')
})

Web.get('/Signup', (request, response) =>{
    response.render('Signup.ejs')
})

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
*/