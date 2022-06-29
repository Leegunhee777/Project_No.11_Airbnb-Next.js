import { UserType } from './user';
//침대유형
export type BedType =
  | '다른침대추가'
  | '소파'
  | '에어매트릭스'
  | '요와 이불'
  | '싱글'
  | '더블'
  | '퀸'
  | '이층 침대'
  | '바닥용 에어매트릭스'
  | '유아 침대'
  | '유아용 침대'
  | '해먹'
  | '물침대';

export type StoredRoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;
  latitude: number;
  longitude: number;
  country: string | undefined;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  //hostId 는 숙소의 호스트로 api를 보낼때 body에 userId 를 보낼 예정
  hostId: number;
};

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;
  country: string | undefined;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

//숙소의타입
export type RoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;
  latitude: number;
  longitude: number;
  country: string | undefined;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  host: UserType;
};
