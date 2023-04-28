import cvApi from "../apis/cv.api";

class CvService {
  async add(data: ICv) {
    return await cvApi.add(data);
  }

  async edit(id: number, data: ICv) {
    return await cvApi.edit(id, data);
  }

  async getAll() {
    return await cvApi.getAll();
  }

  async getById(id: number) {
    return await cvApi.getById(id);
  }

  async delete(id: number) {
    return await cvApi.delete(id);
  }

  async generatePDF(id: number) {
    return await cvApi.generatePDF(id);
  }
}

export default new CvService();
