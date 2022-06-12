import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

import DatePicker from '../common/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const RegisterRoomDate: React.FC = () => {
  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>
      <DatePicker onChange={date => console.log(date)} />
    </Container>
  );
};

export default RegisterRoomDate;
