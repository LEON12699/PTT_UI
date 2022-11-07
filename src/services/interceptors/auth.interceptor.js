import LocalStorageService from '../localStorage.service';

export const requestAuthInterceptor = async (config) => {
  const token = LocalStorageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const responseAuthInterceptorError = (error) => {
  if (error.response.status === 401) {
    LocalStorageService.removeAccessToken();
    LocalStorageService.removeUser();
    window.location.href = '/login';
  }

  return Promise.reject(error);
}

