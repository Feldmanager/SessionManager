const SECRET_KEY = "#$DarNach"

var crypto = require('crypto');


class UserValidator{
    constructor(hashFromUser, mail, groupIds){
        this.hashFromUser = hashFromUser
        this.mail = mail
        this.groupIds = groupIds
    }

    validateHash(err, next){
        var fullString = this.mail + SECRET_KEY
        var hash = crypto.createHash('sha256').update(fullString).digest('base64');
        if(hash === this.hashFromUser){
            return next()
        }else if(hash.substring(0, hash.length - 1) === this.hashFromUser){
            return next()
        }else{
            return err
        }
    }
}

const validateUser = (req, err, next) => {
    var cookies = req.headers.cookie.split('; ');
    //var cookies = ['token=WdZwPf/g6VFUsg5iBvcrT85V1PPntrKKFUWOfX41Rr0=', 'mail=dar', 'groupIds=[]']
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