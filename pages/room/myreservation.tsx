import { NextPage } from 'next';
import { wrapper } from '../../store';
import { Context } from 'next-redux-wrapper';

import MyReservation from '../../components/management/MyReservation';

const myreservation: NextPage = () => {
  return <MyReservation />;
};

myreservation.getInitialProps = wrapper.getInitialPageProps(
  store => async (context: Context) => {
    try {
      //   if (id) {
      //     const { data } = await getRoomAPI(Number(id as string));
      //     store.dispatch(roomActions.setDetailRoom(data));
      //   }
    } catch (error) {
      console.log(error);
    }
    // console.log(query);
    return {};
  }
);

export default myreservation;
