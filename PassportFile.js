const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
/*
function initialize(passport_input, getUserByUsername) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null){
            return done(null, false, {message: 'username not found'})
        }
    
        try {
            if (await bcrypt.compare(password, user.password))
            {
                return done(null, user)
            }
            else //password did not match
            {
                return done(null, false, {message : 'Details are not correct'})
            }
        } catch (e) {
            console.log(e)
            return done(e)
        }
    }
    passport_input.use(new Passport_Local({usernameField: 'username'},
    authenticateUser))
    passport_input.serializeUser((user, done) => { })
    passport_input.deserializeUser((id, done) => { })
}

module.exports = initialize //export the function
*/