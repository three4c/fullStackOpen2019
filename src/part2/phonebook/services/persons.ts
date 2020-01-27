import axios from 'axios';
const baseUrl = '/persons';

interface PersonProps {
  items: {
    name: string;
    number: string;
    id: number;
  }[];
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newObject: any) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = (id: number, newObject: any) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const del = (id: number) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: del
};
