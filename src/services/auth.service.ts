import AuthAPI from "../apis/auth.api";
import jwt_decode from 'jwt-decode';

class AuthService {
  async login(email: string, password: string) {
    const response: any = await AuthAPI.login(email, password);

    if (response.data.success) {
      this.setToken(response.data.data.token);
      return true;
    }
    return false;
  }

  async getToken() {
    const token = localStorage.getItem("token") ?? "";
    return token === "" ? null : token;
  }

  async setToken(token: string) {
    localStorage.setItem("token", token);
  }

  async getUserInfo(){
    const token: any = await this.getToken();
    const decoded: any = token ? jwt_decode(token) : undefined;
    return decoded;
  }
}

export default new AuthService();
