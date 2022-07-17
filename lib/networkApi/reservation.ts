import axios from './index';

type MakeReservationAPIBody = {
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

//숙소 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) => {
  return axios.post('/api/reservations', body);
};
