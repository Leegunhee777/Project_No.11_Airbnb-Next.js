import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

//컴포넌트를 dynamic을 사용하여 서버사이드 렌더링을 하지않고 불러온다.
//컴포넌트 안에서 window를 사용하게 될 예정이기에 dynamic을 사용하여 서버사이드 렌더링을 방지하였다.
//dynamic을 사용하지 않고 import한다면 window is undefined라는 에러를 보게된다.
//서버에서는 window와 document를 사용할수 없기 떄문이다.
const RegisterRoomGeometry = dynamic(
  import('../../../../components/register/RegisterRoomGeometry'),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
