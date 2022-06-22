import axios from './index';

type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};
//현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return axios.get<GetLocationInfoAPIResponse>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`
  );
};

//구글 장소 검색 한글 일부 입력후 해당 지역에 대한 full Name 완성후 반환가능 api
export const searchPlacesAPI = (keyword: string) => {
  return axios.get<{ description: string; placeId: string }[]>(
    `/api/maps/places?keyword=${keyword}`
  );
};

//placeId로 장소정보 가져오기
export const getPlaceAPI = (placeId: string) => {
  return axios.get<{ location: string; latitude: number; longitude: number }>(
    `/api/maps/places/${placeId}`
  );
};
