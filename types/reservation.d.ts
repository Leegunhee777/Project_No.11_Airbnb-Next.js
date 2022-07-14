//숙소 예약 타입
export type StoredReservation = {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
  createAt: string;
  updateAt: string;
};
