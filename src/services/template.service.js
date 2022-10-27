import axios from "axios";
import EnvManager from '../config/envManager';

const backend = axios.create({
    baseURL: EnvManager.BACKEND_URL,
});



const getUserPermissions = async () => {
    try {
        const response = await backend.get('/user/permissions');
        return response?.data;
    }
    catch (error) {
        return null;
    }
};

export {
    getUserPermissions,
};