import axios from "axios";
import EnvManager from '../config/envManager';
import LocalStorageService from "./localStorage.service";

const backend = axios.create({
    baseURL: EnvManager.BACKEND_URL,
});

const postLoginUser = async ({ email, password}) => {
    try {
        const body = { email, password};
        const response = await backend.post('/auth/login', body);
        return response?.data; 
    }
    catch (error) {
        return null;
    }
};

export {
    postLoginUser
};