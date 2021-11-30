const argon2 = require('argon2');

const hashPw = async (req, res, next) => {
    const pw = req.body.data.password;
    try {
        res.locals.pwHashed = await argon2.hash(pw, {type: argon2.argon2id})
        next()
    } catch(err) {
        return next({
            status: 400,
            message: `hashing failed` 
        })
    }
}

module.exports = hashPw