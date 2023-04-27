import cvApi from "../apis/cv.api";

class CvService {
  async add(data: ICv) {
    return await cvApi.add(data);
  }
}

export default new CvService();
