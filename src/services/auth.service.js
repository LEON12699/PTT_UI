import axios from 'axios';
import { fResponse } from '../utils/formatResponse';
import EnvManager from '../config/envManager';

const backend = axios.create({
  baseURL: EnvManager.BACKEND_URL,
});



const postLoginUser = async ({ email, password }) => {
  try {
    const body = { email, password };
    const response = await backend.post('/auth/login', body);
    return fResponse(response);
  } catch (error) {
    return null;
  }
};

export { postLoginUser };
