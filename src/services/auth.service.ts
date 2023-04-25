import AuthAPI from "../apis/auth.api";

class AuthService {
  async login(email: string, password: string) {
    const response: any = await AuthAPI.login(email, password);
    
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
      return true;
    }
    return false;
  }
}

export default new AuthService();
