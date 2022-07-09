import { RoomType } from './room';
import { UserType } from './user';

// 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};

//공통적으로 사용하는 reduxState
export type CommonState = {
  checkValidateMode: boolean;
};

//Home 메인화면 검색 redux State
export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
  //영아
  infantsCount: number;
};

//숙소 redux State
export type RoomState = {
  rooms: RoomType[];
  detail: RoomType | null;
};
