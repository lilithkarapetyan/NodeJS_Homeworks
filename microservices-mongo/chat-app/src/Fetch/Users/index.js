import axios from '../axios'

export const register = async (userData) => {
    try {
        const res = await axios.post("/auth/signup", userData);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e?.response?.data?.message
        };
    }
}


export const login = async (userData) => {
    try {
        const res = await axios.post("/auth/signin", userData);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e?.response?.data?.message
        };
    }
}

export const getUser = async () => {
    try {
        const res = await axios.get("/users");
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e?.response?.data?.message
        };
    }
}

export const updateUser = async (user) => {
    try {
        const res = await axios.put("/users/updateMe", user);
        return res.data;
    }
    catch (e) {
        return {
            data: [],
            error: e?.response?.data?.message
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
            error: e?.response?.data?.message
        };
    }
}

