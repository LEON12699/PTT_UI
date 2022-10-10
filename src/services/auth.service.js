import axios from 'axios';
import { fResponse } from '../utils/formatResponse';
import EnvManager from '../config/envManager';
import LocalStorageService from './localStorage.service';

const backend = axios.create({
  baseURL: EnvManager.BACKEND_URL,
});



const postLoginUser = async ({ email, password }) => {
  try {
    const body = { email, password };
    const response = await backend.post('/auth/login', body);
    const { data } = response;
    if (data?.access_token && data?.user) {
      LocalStorageService.setToken(data);
    }
    return fResponse(response);
  } catch (error) {
    return null;
  }
};

export { postLoginUser };
