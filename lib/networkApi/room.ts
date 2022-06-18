import axios from './index';
import { RegisterRoomState } from '../../types/room';

//숙소 등록하기
export const registerRoomAPI = (
  body: RegisterRoomState & { hostId: number }
) => {
  return axios.post('/api/rooms', body);
};
