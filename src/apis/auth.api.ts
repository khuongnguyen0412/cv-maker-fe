import axios from "axios";
import { endPoint } from "./constants";

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
