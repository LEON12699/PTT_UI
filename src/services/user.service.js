import axios from "axios";
import EnvManager from '../config/envManager';
import { requestAuthInterceptor, responseAuthInterceptorError } from './interceptors/auth.interceptor';
import { fResponse } from '../utils/formatResponse';

const USER_PATH = '/users';

const backend = axios.create({
    baseURL: EnvManager.BACKEND_URL,
});


// interceptor to add bearer token to request
backend.interceptors.request.use(requestAuthInterceptor);
// interceptor to handle 401 error
backend.interceptors.response.use((response) => response, responseAuthInterceptorError);

const getUsers = async () => {
    try {
        const response = await backend.get(`${USER_PATH}`)
        return response?.data;
    }
    catch (error) {
        return null;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await backend.delete(`${USER_PATH}/${id}`)
        return fResponse(response);
    }
    catch (error) {
        return fResponse(error.response);
    }
}

const activateUser = async (id) => {
    try {
        const response = await backend.patch(`${USER_PATH}/activate/${id}`)
        return fResponse(response);
    }
    catch (error) {
        return fResponse(error.response);
    }
}

export {
    activateUser,
    deleteUser,
    getUsers,
};