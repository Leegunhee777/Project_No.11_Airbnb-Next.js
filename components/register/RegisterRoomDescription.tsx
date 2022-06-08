import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomDescription: React.FC = () => {
  return (
    <Container>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className="register-room-description-wrapper">
        숙소의장점, 특별한 편의 시설(예: 빠른 와이파이 또는 주차 시설)과 주변
        지역의 매력을 소개해주세요.
      </p>
    </Container>
  );
};

export default RegisterRoomDescription;
