class LocalStorageService {

  accessTokenKey = 'access_token';

  static setToken(tokenObj) {
    localStorage.setItem(this.accessTokenKey, tokenObj.access_token);
    //  localStorage.setItem('refresh_token', tokenObj.refresh_token);
  }

  static getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  // static getRefreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }

  static clearToken() {
    localStorage.removeItem(this.accessTokenKey);
  //  localStorage.removeItem('refresh_token');
  }
}

export default LocalStorageService;

