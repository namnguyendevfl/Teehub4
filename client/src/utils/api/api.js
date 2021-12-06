export const apiCalls = {
    API_BASE_URL : process.env.API_BASE_URL || "http://localhost:7999",
    fetchJson: async (url, options) => {
        try {
            const response = await fetch(url, options);
            console.log(response);
            if (response.status === 204) return null;
    
            const payload = await response.json();
            console.log(payload)
            if (payload.error) return Promise.reject({message: payload.error});
    
            return payload.data
        } catch(error) {
            if (error.name !== "AbortError") {
                console.log(error.stack);
                return Promise.reject({message: error.message})
            }
        }
    }
}