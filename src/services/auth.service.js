import axios from 'axios';
import { fResponse } from '../utils/formatResponse';
import EnvManager from '../config/envManager';

const AUTH_PATH = '/auth';

const backend = axios.create({
  baseURL: EnvManager.BACKEND_URL,
});


const postLoginUser = async ({ email, password }) => {
  try {
    const body = { email, password };
    const response = await backend.post(`${AUTH_PATH}/login`, body);
    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

export { postLoginUser };
