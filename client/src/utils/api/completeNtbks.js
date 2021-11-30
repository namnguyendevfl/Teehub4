import { apiCalls } from "./api";

const { API_BASE_URL, fetchJson} = apiCalls
const headers = new Headers()
headers.append("Content-Type", "application/json");

export const createObjInCompletedNtbks = async(newObject, option, signal) => {
    const suffix = () => {
        switch (option) {
            case "chapters": return `/${newObject.ntbk_id}`
            case "topics": return `/${newObject.ntbk_id}/${newObject.chapter_id}`
            default: return null
        } 
    }
    const url = `${API_BASE_URL}/${option}/${newObject.user_id}${suffix()}`;
    const create = {
        method: "POST",
        headers,
        signal,
        body: JSON.stringify({data: newObject})
    };
    return await fetchJson(url,create);
}


export const listObjsInCompletedNtbks = async(rootObjSelected, option, signal) => {
    const suffix = () => {
        switch (option) {
            case "chapters": return `/${rootObjSelected.id}`
            case "topics": return `/${rootObjSelected.ntbk_id}/${rootObjSelected.id}`
            default: return null
        } 
    }    
    const url = `${API_BASE_URL}/${option}/${rootObjSelected.user_id}${suffix()}`;
    const get = {
        headers,
        signal,
    };
    return await fetchJson(url,get)
    // const chapters = await fetchJson(url,get)
    // if (chapters) chaps.saveChaps(chapters)
    // return chapters;
}

// export const dltObjInCompletedNtbks = async(objSelected) => {
//     const url = `${API_BASE_URL}/chapters/${chap.user_id}/${chap.ntbk_id}/${chap.chapter_id}`;
//     const destroy = {
//         method: "DELETE",
//         headers,
//     };  
//     return await fetchJson(url,destroy);      
// }

// export const updateObjInCompletedNtbks = async(objUpdated) => {
//     const url = `${API_BASE_URL}/chapters/${updatedChap.user_id}/${updatedChap.ntbk_id}/${updatedChap.chapter_id}`;
//     const update = {
//         method: "PUT",
//         headers,
//         // // signal,
//         body: JSON.stringify({data: updatedChap})
//     };  
//     return await fetchJson(url,update);      
// }