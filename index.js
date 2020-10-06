const SECRET_KEY = "#$BenGay"

//var crypto = require('crypto');
const jwt = require("jsonwebtoken");

class UserValidator{
    constructor(hashFromUser, username, groupIds){
        this.hashFromUser = hashFromUser
        this.username = username
        this.groupIds = groupIds
    }

    validateToken(err, next){
        //var hash = crypto.createHash('sha256').update(fullString).digest('base64');
        var token = jwt.sign(this.username, SECRET_KEY);
        if(token === this.hashFromUser){
            return next()
            // return true
        }else{
            return err
        }
    }
}

const validateUser = (err, req, res, next) => {
    var cookies = req.headers.cookie.split('; ');
    // var cookies = ['token=eyJhbGciOiJIUzI1NiJ9.ZGFy.dKB9cPk9Xl74eHLKKLQwlXYT4T4ZxORXxKUuIRkdWdE', 'username=dar', 'groupIds=[]']
    const parsedCookies = {};
    cookies.forEach(rawCookie=>{
        const parsedCookie = rawCookie.split('=');
         parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    var userValidator = new UserValidator(parsedCookies['token'], parsedCookies['username'], parsedCookies['groupIds'])
    return userValidator.validateToken(err, next)
}

module.exports = {
    validateUser
}

//console.log(validateUser("", "Error", ""))