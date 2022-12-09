import axios from 'axios';
import EnvManager from '../config/envManager';
import { requestAuthInterceptor, responseAuthInterceptorError } from './interceptors/auth.interceptor';
import { fResponse } from '../utils/formatResponse';

const USER_PATH = '/attractions';

const backend = axios.create({
  baseURL: EnvManager.BACKEND_URL,
});

// interceptor to add bearer token to request
backend.interceptors.request.use(requestAuthInterceptor);
// interceptor to handle 401 error
backend.interceptors.response.use((response) => response, responseAuthInterceptorError);

const postAttraction = async ({
  name,
  latitude,
  longitude,
  shortDescription,
  longDescription = '',
  cantonName,
  images,
  coverImage,
}) => {
  try {
    const body = {
      name,
      latitude,
      longitude,
      short_description: shortDescription,
      long_description: longDescription,
      cantonName,
      images,
      cover_image: coverImage[0],
    };
    const bodyFormData = new FormData()
    Object.keys(body).forEach(key => {
      bodyFormData.append(key, body[key])
    })

    const response = await backend.post(`${USER_PATH}`, bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

export { postAttraction };
