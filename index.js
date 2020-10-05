const SECRET_KEY = "#$DarNach"

//var crypto = require('crypto');
const jwt = require("jsonwebtoken");

class UserValidator{
    constructor(hashFromUser, username, groupIds){
        this.hashFromUser = hashFromUser
        this.username = username
        this.groupIds = groupIds
    }

    validateHash(err, next){
        //var hash = crypto.createHash('sha256').update(fullString).digest('base64');
        var token = jwt.sign(this.username, SECRET_KEY);
        if(token === this.hashFromUser){
            return next()
        }else{
            return err
        }
    }
}

const validateUser = (req, err, next) => {
    var cookies = req.headers.cookie.split('; ');
    //var cookies = ['token=eyJhbGciOiJIUzI1NiJ9.ZGFy.dKB9cPk9Xl74eHLKKLQwlXYT4T4ZxORXxKUuIRkdWdE', 'mail=dar', 'groupIds=[]']
    const parsedCookies = {};
    cookies.forEach(rawCookie=>{
        const parsedCookie = rawCookie.split('=');
         parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    var userValidator = new UserValidator(parsedCookies['token'], parsedCookies['mail'], parsedCookies['groupIds'])
    return userValidator.validateHash(err, next)
}

module.exports = {
    validateUser
}

//console.log(validateUser("", "Error", ""))