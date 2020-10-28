import axios from '../axios'

export const register = async (userData) => {
    try {
        const res = await axios.post("/v1/users/register", userData);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e.message
        };
    }
}


export const login = async (userData) => {
    try {
        const res = await axios.post("/v1/users/login", userData);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e.message
        };
    }
}

export const getUser = async () => {
    try {
        const res = await axios.get("/v1/users");
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e.message
        };
    }
}

export const updateUser = async (user) => {
    try {
        const res = await axios.put("/v1/users/update", user);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e.message
        };
    }
}
export const logOutUser = async (user) => {
    try {   
        const res = await axios.get("/v1/users/logout");
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e.message
        };
    }
}

