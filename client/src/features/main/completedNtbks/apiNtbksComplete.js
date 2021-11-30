import { apiCalls } from "../../../utils/api/api";

const { API_BASE_URL, fetchJson} = apiCalls
const headers = new Headers()
headers.append("Content-Type", "application/json");

export const createObj = async (urlSuffix, newObj, signal) => {
    const url = `${API_BASE_URL}/${urlSuffix}`;
    const create = {
        method: "POST",
        headers,
        signal,
        body: JSON.stringify({data: newObj})
    };
    return await fetchJson(url,create);
}


export const listObjs = async (urlSuffix, signal) => {
    const url = `${API_BASE_URL}/${urlSuffix}`;
    const get = {
        headers,
        signal,
    };
    return await fetchJson(url,get)
}


export const dltObj = async (urlSuffix, signal) => {
    //We need the id of deleted Obj
    const url = `${API_BASE_URL}/${urlSuffix}`;
    const destroy = {
        method: "DELETE",
        headers,
    };
    return await fetchJson(url,destroy);
}


export const updateObj = async(urlSuffix, objUpdated, signal) => {
    const url = `${API_BASE_URL}/${urlSuffix}`;
    const update = {
        method: "PUT",
        headers,
        signal,
        body: JSON.stringify({data: objUpdated})
    };  
    return await fetchJson(url,update);      
}