import axios from "axios";
import { endPoint } from "./constants";
import authService from "../services/auth.service";

const baseApi: string = "api/v1/templates";

class TemplateAPI {
  async getAll() {
    return await axios.get(`${endPoint}/${baseApi}`, {
      headers: {
        Authorization: `Bearer ${await authService.getToken()}`,
      },
    });
  }

  async getById(id: number) {
    return await axios.get(`${endPoint}/${baseApi}/${id}`, {
      headers: {
        Authorization: `Bearer ${await authService.getToken()}`,
      },
    });
  }
}

export default new TemplateAPI();
