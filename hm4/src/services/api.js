import axios from 'axios';
const API = `https://680fc8ae27f2fdac240f60df.mockapi.io`;

const service = {
  get: (endpoint) => axios.get(API + `/${endpoint}`).then(({ data }) => data),
  delete: (endpoint, id) =>
    axios.delete(API + `/${endpoint}` + `/${id}`).then(({ data }) => data),
  put: (endpoint, id, obj) =>
    axios.put(API + `/${endpoint}` + `/${id}`, obj).then(({ data }) => data),
  post: (endpoint, obj) =>
    axios.post(API + `/${endpoint}`, obj).then(({ data }) => data),
};

export default service;