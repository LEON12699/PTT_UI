import axios from 'axios';
import { isString } from 'lodash';
import EnvManager from '../config/envManager';
import { requestAuthInterceptor, responseAuthInterceptorError } from './interceptors/auth.interceptor';
import { fResponse } from '../utils/formatResponse';
import { generateFormData } from './utils';

const ATTRACTION_PATH = '/attractions';

const backend = axios.create({
  baseURL: EnvManager.BACKEND_URL,
});

// interceptor to add bearer token to request
backend.interceptors.request.use(requestAuthInterceptor);
// interceptor to handle 401 error
backend.interceptors.response.use((response) => response, responseAuthInterceptorError);

const getAttractions = async ({ filters, order } = {}) => {
  try {
    const params = {
      ...(filters && { filters }),
      ...(order && { order }),
    };
    const response = await backend.get(`${ATTRACTION_PATH}`, { params });
    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

const getAttraction = async (id) => {
  try {
    const response = await backend.get(`${ATTRACTION_PATH}/${id}`);
    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

const removeAttraction = async (id) => {
  try {
    const response = await backend.delete(`${ATTRACTION_PATH}/${id}`);
    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

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
      images: images?.map((image) => image?.file),
      cover_image: coverImage?.file,
    };

    const bodyFormData = generateFormData(body);

    const response = await backend.post(`${ATTRACTION_PATH}`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

const updateImages = async (images, id) => {
  const imageToUpdatedBody = {
    images,
  };

  const ImageBodyFormData = generateFormData(imageToUpdatedBody);

  const { status, data: imagesUpdatedUrls } = await backend.post(
    `${ATTRACTION_PATH}/${id}/addImages`,
    ImageBodyFormData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return status >= 200 && status < 300 ? imagesUpdatedUrls : [];
};

const updateAttraction = async ({
  id,
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
    const imageToUpdated = images.reduce((acc, image) => {
      if (image.file) {
        acc.push(image.file);
      }
      return acc;
    }, []);
    const imagesUrl = images?.filter((image) => isString(image)) || [];
    let newImages = imagesUrl;
    if (imageToUpdated.length) {
      const newImagesUrls = await updateImages(imageToUpdated, id);
      newImages = imagesUrl.concat(newImagesUrls);
    }

    const body = {
      name,
      latitude,
      longitude,
      short_description: shortDescription,
      long_description: longDescription,
      cantonName,
      images: newImages,
      cover_image: isString(coverImage) ? coverImage : coverImage?.file,
    };

    const bodyFormData = generateFormData(body);

    const response = await backend.patch(`${ATTRACTION_PATH}/${id}`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return fResponse(response);
  } catch (error) {
    return fResponse(error.response);
  }
};

export { postAttraction, getAttractions, getAttraction, removeAttraction, updateAttraction };
