import { UserLoggingIn } from "./LoginForm";
import { apiCalls } from "../../../utils/api/api";
const { API_BASE_URL, fetchJson} = apiCalls
const headers = new Headers()
headers.append("Content-Type", "application/json");

export const createUser = async(newUser, signal) => {
    const url = `${API_BASE_URL}/users`;
    console.log(newUser)
    const create = {
        method: "POST",
        headers,
        signal,
        body: JSON.stringify({data: newUser})
    };
    return await fetchJson(url,create);
}

export const listUsers = async(signal) => {
    const url = `${API_BASE_URL}/users`;
    const get = {
        headers,
        signal,
    };
    return await fetchJson(url,get);
}

export const postUserLoggingIn = async (userLoggingIn, signal) => {
    const LOGIN_URL = `${API_BASE_URL}/users/login/${userLoggingIn.user_name}`;
    const create = {
        method: "POST",
        headers,
        signal,
        body: JSON.stringify({data: userLoggingIn})
    };
    return await fetchJson(LOGIN_URL ,create);    
}

export const readUserLoggingIn = async(userLoggingIn, signal) => {
    const LOGIN_URL = `${API_BASE_URL}/users/login/${userLoggingIn.user_name}`;
    const get = {
        headers,
        signal,
    };
    return await fetchJson(LOGIN_URL,get);    
}