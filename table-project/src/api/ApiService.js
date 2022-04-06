import axios from 'axios';

class ApiService {
  constructor() {
    const service = axios.create({
        baseURL:"http://localhost:3006/",
    });
    this.service = service;
  }

  get(path) {
    return this.service.get(path);
  }

  post(path, data) {
    return this.service.post(path, data);
  }

  delete(path) {
    return this.service.delete(path);
  }

  update(path, data) {
    return this.service.put(path, data);
  }
}

export default new ApiService;