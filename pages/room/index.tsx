import React from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import RoomMain from '../../components/main/RoomMain';
import { getRoomListAPI } from '../../lib/networkApi/room';
import { roomActions } from '../../store/room';
const index: NextPage = () => {
  return <RoomMain />;
};

// /room?location=근처 추천 장소&latitude=37.4417663&longitude=127.1329219&checkInDate=2022-07-19T00:00:00.000Z&checkOutDate=2022-08-19T00:00:00.000Z&adultCount=2
// 위의형식의 path를 가지고 해당 페이지에 접근하면 serverSide에서 query 변수를 통해
// {
//     location: '',
//     latitude: 0,
//     longitude: 0,
//     checkInDate: null,
//     checkOutDate: null,
//     adultCount: 1,
//     childrenCount: 0,
//     infantsCount: 0
//   }으로 뽑아서 확인할수있음
index.getInitialProps = async ({ store, query }) => {
  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
    latitude,
    longitude,
    limit,
    page = '1',
  } = query;
  try {
    const { data } = await getRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      infantsCount,
      latitude,
      longitude,
      limit: limit || '20',
      page: page || '1',
      //? 한글은 encode해주세요
      location: query.location
        ? encodeURI(query.location as string)
        : undefined,
    });

    store.dispatch(roomActions.setRooms(data));
  } catch (error) {}
  console.log(query);
  return {};
};

export default index;
