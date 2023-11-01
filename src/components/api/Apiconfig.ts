import axios from 'axios';
const beesmartAPI = axios.create({
  baseURL: 'http://admin.beesmart.io.vn/api',
});
export const getAPI = (url: string) =>
  beesmartAPI.get(url).then(res => res.data);
export const postAPI = async <T>(key: string, newData: T) => {
  console.log('adding new data', {
    ten: 'long',
    donVi: 1000,
    giaBan: 100,
    giaVon: 40,
    idDm: 2,
    idLoai: 1,
    idNcc: 5,
    idTh: 1,
    maSp: '213123',
    soLuong: 10,
    idCh: 1,
  });
  const response = await beesmartAPI.post(
    key,
    {
      ten: 'long',
      donVi: 1000,
      giaBan: 100,
      giaVon: 40,
      idDm: 2,
      idLoai: 1,
      idNcc: 5,
      idTh: 1,
      maSp: '213123',
      soLuong: 10,
      idCh: 1,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    },
  );
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
