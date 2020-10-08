const SECRET_KEY = "#$BenGay"

//var crypto = require('crypto');
const jwt = require("jsonwebtoken");

class UserValidator{
    constructor(hashFromUser, username){
        this.hashFromUser = hashFromUser
        this.username = username
    }

    validateToken(next){
        var token = jwt.sign(this.username, SECRET_KEY);
        if(token === this.hashFromUser){
            return next()
        }else{
            throw new Error()
        }
    }
}

const validateUser = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next();
    }
    var cookies = req.headers.cookie.split('; ');
    let parsedCookies = {};
    cookies.forEach(rawCookie=>{
        let parsedCookie = rawCookie.split('=');
         parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    let userValidator = new UserValidator(parsedCookies['token'], parsedCookies['username'])
    return userValidator.validateToken(next)
}

module.exports = {
    validateUser
}