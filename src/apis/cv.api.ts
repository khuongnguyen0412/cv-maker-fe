import axios from "axios";
import { endPoint } from "./constants";
import authService from "../services/auth.service";

const baseApi: string = "api/v1/cvs";

class CvAPI {
  async add(data: ICv) {
    return await axios.post(`${endPoint}/${baseApi}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await authService.getToken()}`,
      },
    });
  }

  async edit(id: number, data: ICv) {
    return await axios.put(`${endPoint}/${baseApi}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await authService.getToken()}`,
      },
    });
  }

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

  async delete(id: number) {
    return await axios.delete(`${endPoint}/${baseApi}/${id}`, {
      headers: {
        Authorization: `Bearer ${await authService.getToken()}`,
      },
    });
  }
}

export default new CvAPI();
