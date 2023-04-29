import templateApi from "../apis/template.api";

class TemplateService {

  async getAll() {
    return await templateApi.getAll();
  }

  async getById(id: number) {
    return await templateApi.getById(id);
  }
}

export default new TemplateService();
