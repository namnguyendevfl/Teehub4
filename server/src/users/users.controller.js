const service = require("./users.service");
const argon2 = require("argon2");
const asyncBoundaryError = require("../errors/asyncBoundaryError")

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


let userLoggingIn;
const postUserLoggingIn = (req, res) => {
    userLoggingIn = req.body.data
    res.status(201).json({})
}



// userLoggingIn = {
//     user_name : 8134202585,
//     password: "supperkid990"
// }
const readUserLoggingIn = async (req, res, next) => {
    const { user_name, password } = userLoggingIn;
    const users = await service.list();
    const foundUser = users.find((user, idx) => user.user_name == user_name);
    if (foundUser) {
        const matchedPw = await argon2.verify(foundUser.password, password)
        if (matchedPw) {
            const newUser = {
                id : foundUser.id,
                user_name: foundUser.user_name,
            }
            return res.json({data:newUser})
        } else return next({
            status:404,
            message: `wrong password`   
        })
    } else return next({
        status:404,
        message: `userId is not found: ${req.params.userName}`
    }) 
}





module.exports = {
    postUserLoggingIn: [ hasData, asyncBoundaryError(postUserLoggingIn)],
    readUserLoggingIn: [ asyncBoundaryError(readUserLoggingIn)],
}