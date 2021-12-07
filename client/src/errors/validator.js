import {
    isPossiblePhoneNumber,
  } from 'libphonenumber-js'

const validator = require("validator")

const countryCode = [
    { country: "US", code: "+1" },
]

export const signupValidator = (credentials, usersTaken) => {
    const { first_name, sur_name, user_name, password, birthday, day } = credentials
    if (first_name === "" ) return "first name err"
    if (sur_name === "") return  "last name err" 
    if (validator.isEmail(user_name)) {
        const emailFound = usersTaken.find((user,idx) => user == user_name)
        if (emailFound) return "email taken"
    }
    const found = usersTaken.find((user,idx) => Number(user) === Number(user_name))
    if (found) return "phone taken"

    if (!validator.isEmail(user_name)) {
        //Validate a number to be a possuble phone number
        //Right now, working on the US number
        const numberInE164 = `${countryCode[0].code}${user_name}`    
        const found = isPossiblePhoneNumber(numberInE164)
        if (!found)
        return  "username err" 
    }
    if (password === "" || password.length < 8 ) return "password err" 
    if (birthday === undefined && day === null ) return "birthday err" 

}

export const errorIds = (credentials, usersTaken) => {
    let ids = []
    const { first_name, sur_name, user_name, password, birthday } = credentials;
    if (first_name === "" ) ids.push("first_name");
    if (sur_name === "") ids.push("sur_name");
    const foundUser = usersTaken.find((user, idx) => Number(user) === Number(user_name) || user == user_name);
    // if (foundUser) ids.push('user_name_popup')
    if (!validator.isEmail(user_name)) {
        const numberInE164 = `${countryCode[0].code}${user_name}`    
        const found = isPossiblePhoneNumber(numberInE164)
        if (!found || foundUser)
        ids.push('user_name_popup')
    }
    if (password === "" || password.length < 8 ) ids.push('password_popup')
    if (birthday === undefined) ids.push("month", "day", "year", "age_popup")
    return ids
}