import axios from "axios";

const endPoint: string = process.env.CV_MAKER_API || "http://127.0.0.1:7001";
const baseApi: string = "api/v1/auth";

class AuthAPI {
  async login(email: string, password: string) {
    return await axios.post(`${endPoint}/${baseApi}/login`, {
      email,
      password,
    });
  }
}

export default new AuthAPI();
