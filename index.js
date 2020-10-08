const SECRET_KEY = "#$BenGay"

//var crypto = require('crypto');
const jwt = require("jsonwebtoken");

class UserValidator{
    constructor(hashFromUser, username){
        this.hashFromUser = hashFromUser
        this.username = username
    }

    validateToken(err, req, next){
        var token = jwt.sign(this.username, SECRET_KEY);
        if(token === this.hashFromUser){
            return next()
        }else{
            return err
        }
    }
}

const validateUser = (err, req, res, next) => {
    var cookies = req.headers.cookie.split('; ');
    let parsedCookies = {};
    cookies.forEach(rawCookie=>{
        const parsedCookie = rawCookie.split('=');
         parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    var userValidator = new UserValidator(parsedCookies['token'], parsedCookies['username'])
    return userValidator.validateToken(err, next)
}

module.exports = {
    validateUser
}