import LocalStorageService from '../services/localStorage.service';

export const authInterceptor = (config) => {
  const token = LocalStorageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};


