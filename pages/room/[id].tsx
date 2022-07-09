import { NextPage } from 'next';
import { getRoomAPI } from '../../lib/networkApi/room';
import { roomActions } from '../../store/room';
import { wrapper } from '../../store';
import { Context } from 'next-redux-wrapper';

import RoomDetail from '../../components/detail/RoomDetail';
const roomDetail: NextPage = () => {
  return <RoomDetail />;
};

roomDetail.getInitialProps = wrapper.getInitialPageProps(
  store => async (context: Context) => {
    const {
      query: { id },
    }: any = context;
    try {
      if (id) {
        const { data } = await getRoomAPI(Number(id as string));
        store.dispatch(roomActions.setDetailRoom(data));
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(query);
    return {};
  }
);

export default roomDetail;
