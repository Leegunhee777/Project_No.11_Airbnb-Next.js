import axios from './index';

//파일 업로드 api
export const uploadFileAPI = (file: FormData) => {
  return axios.post('/api/files/upload', file);
};
