import cvApi from "../apis/cv.api";

class CvService {
  async add(data: ICv) {
    return await cvApi.add(data);
  }

  async getAll() {
    return await cvApi.getAll();
  }

  async delete(id: number) {
    return await cvApi.delete(id);
  }
}

export default new CvService();
