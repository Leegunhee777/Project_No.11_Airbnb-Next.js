import React from 'react';
import styled from 'styled-components';

import NavigationIcon from '../../public/static/svg/register/navihation.svg';
import Button from '../common/Button';
import palette from '../../styles/palette';

import ValidateSelector from '../common/ValidateSelector';
import { countryList } from '../../lib/staticData';
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
  .register-room-location-button-wrapper {
    width: 176px;
    margin-top: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-top: 24px;
  }
`;

const RegisterLocation: React.FC = () => {
  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-stop-info">
        정확한 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button color="dark_cyan" colorReverse={true} icon={<NavigationIcon />}>
          현재 위치 사용
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <ValidateSelector
          type="register"
          options={countryList}
          defaultValue="국가/지역 선택"
          disabledOptions={['국가/지역 선택']}
        />
      </div>
    </Container>
  );
};

export default RegisterLocation;
