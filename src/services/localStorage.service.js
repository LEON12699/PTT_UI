
class LocalStorageService {
  static accessTokenKey = 'access_token';
  
  static userKey = 'user';
  
  static setToken(tokenObj) {
    localStorage.setItem(this.accessTokenKey, tokenObj.access_token);
   // localStorage.setItem(this.userKey, JSON.stringify(tokenObj?.user));
  }

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(key) {
    return localStorage.removeItem(key);
  }

  static getAccessToken() {
    return this.getItem(this.accessTokenKey);
  }

  // static getUser() {
  //   return this.getItem(this.userKey);
  // }

  // static getRefreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }


  static async removeAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  //  localStorage.removeItem('refresh_token');
  }

  // static async removeUser() {
  //   localStorage.removeItem(this.userKey);
  // //  localStorage.removeItem('refresh_token');
  // }
}

export default LocalStorageService;

