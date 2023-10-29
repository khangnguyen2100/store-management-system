import axios from 'axios';
const beesmartAPI = axios.create({
  baseURL: 'https://www.beesmart.io.vn/api',
});
export const getAPI = (url: string) =>
  beesmartAPI.get(url).then(res => res.data);

export const postAPI = async <T>(key: string, newData: T) => {
  console.log('adding new data', newData);
  const response = await beesmartAPI.post(key, { ...newData });
  console.log(response);
  return response?.data;
};
export const patchAPI = async <T>(key: string, id: string, newData: T) => {
  console.log('changing new data', id, newData);
  const response = await beesmartAPI.patch(`${key}/${id}`, { ...newData });
  return response?.data;
};
export const DeleteAPI = async (key: string, id: string) => {
  console.log('deleting data', id);
  const response = await beesmartAPI.delete(`${key}/${id}`);
  return response?.data;
};
