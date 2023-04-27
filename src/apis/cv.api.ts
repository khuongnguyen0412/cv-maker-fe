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
}

export default new CvAPI();
