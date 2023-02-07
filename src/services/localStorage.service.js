
class LocalStorageService {
  static accessTokenKey = 'access_token';
  
  static userKey = 'user';

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(key) {
    return localStorage.removeItem(key);
  }

  
  static setToken(token) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  static setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }


  static getAccessToken() {
    return this.getItem(this.accessTokenKey);
  }

  static getUser() {
    if (this.getItem(this.userKey)){
      return JSON.parse(this.getItem(this.userKey));
    }
    return null;
  }

  // static getRefreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }


  static async removeAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }

  static async removeUser() {
    localStorage.removeItem(this.userKey);
  }
}

export default LocalStorageService;

