const service = require("./users.service");
const argon2 = require("argon2");
const asyncBoundaryError = require("../errors/asyncBoundaryError")
const hashPw = require("../utils/hashPw")
const validator = require("validator")

function hasData(req,res,next) {
    if (req.body.data) {
        res.locals.data = req.body.data;
        return next();
    };
    next ({
        status: 400,
        message: "body must have data property"
    });
}

function passwordIsValid (req,res,next) {
    const password = req.body.data.password;
    if ( password.length >=8 ) return next();
    return next({
        status: 400,
        message: "invalid password"
    });
}


function user_nameIsValid (req, res, next) {
    const {user_name} = req.body.data;
    if  (validator.isEmail(user_name)) return next()
    if (validator.isEmpty(user_name) || isNaN(user_name))
    return next({
        status: 400,
        message: "invalid username"
    }) 
    if(!isNaN(user_name)) return next()
}

let userLoggingIn;
const postUserLoggingIn = (req, res) => {
    userLoggingIn = req.body.data
    res.status(201).json({})
}


const readUserLoggingIn = async (req, res, next) => {
    const { user_name, password } = userLoggingIn;
    const users = await service.list();
    const foundUser = users.find((user, idx) => user.user_name == user_name);
    if (foundUser) {
        const { id, user_name, first_name, sur_name } = foundUser
        const matchedPw = await argon2.verify(foundUser.password, password)
        if (matchedPw) {
            const newUser = {
                id : id,
                user_name: user_name,
                first_name: first_name,
                sur_name: sur_name
            }
            return res.json({data:newUser})
        } else return next({
            status:404,
            message: `invalid password`   
        })
    } else return next({
        status:404,
        // message: `userName is not found: ${req.params.userName}`
        message: `notfound username`
    }) 
}


const create = async (req, res, next) => {
    const rawNewUser = req.body.data;
    rawNewUser.password = res.locals.pwHashed;
    const hashedNewUser = await service.create(rawNewUser)
    const { id, user_name, first_name, sur_name } = hashedNewUser
    const userReturned = {
        id : id,
        user_name: user_name,
        first_name: first_name,
        sur_name: sur_name
    }
    return res.status(201).json({data: userReturned})
}


const listUsers = async (req, res, next) => {
    const users = await service.list();
    const newUsers = []
    users.forEach((user,idx) => {
        const {id, user_name, first_name, sur_name, birthday} = user
        newUser = {
            id: id,
            user_name: user_name,
            first_name: first_name,
            sur_name: sur_name,
        }
        newUsers.push(newUser)
    })
    return res.json({data: newUsers})
}
module.exports = {
    postUserLoggingIn: [ hasData, user_nameIsValid, passwordIsValid, asyncBoundaryError(postUserLoggingIn)],
    readUserLoggingIn: [ asyncBoundaryError(readUserLoggingIn)],
    create: [hasData, user_nameIsValid, passwordIsValid, hashPw, asyncBoundaryError(create)],
    listUsers: [asyncBoundaryError(listUsers)]
}