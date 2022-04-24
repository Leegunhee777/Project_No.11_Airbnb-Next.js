import React from 'react';
import styled from 'styled-components';

import NavigationIcon from '../../public/static/svg/register/navihation.svg';
import Button from '../common/Button';
import palette from '../../styles/palette';

import ValidateSelector from '../common/ValidateSelector';
import { countryList } from '../../lib/staticData';
import ValidateInput from '../common/ValidateInput';

import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../store/registerRoom';
import { useSelector } from '../../store';

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
  const country = useSelector(state => state.registerRoom.country);
  const city = useSelector(state => state.registerRoom.city);
  const district = useSelector(state => state.registerRoom.district);
  const streetAddress = useSelector(state => state.registerRoom.streetAddress);
  const detailAddress = useSelector(state => state.registerRoom.detailAddress);
  const postcode = useSelector(state => state.registerRoom.postcode);

  const dispatch = useDispatch();

  //나라 변경시
  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };
  // 시/도 변경시
  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };
  // 시/군/구 변경시
  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };
  // 도로명주소 변경시
  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };
  // 동호수 변경시
  const onChangeDetailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value));
  };
  // 우편번호 변경시
  const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(e.target.value));
  };

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
        {/* { defaultValue와  value를 함께 쓰고싶으면 value 초깃값 undefinded면 가능해짐} */}
        <ValidateSelector
          type="register"
          defaultValue={'국가/지역 선택'}
          disabledOptions={['국가/지역 선택']}
          options={countryList}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <ValidateInput label="시/도" value={city} onChange={onChangeCity} />
        <ValidateInput
          label="시/군/도"
          value={district}
          onChange={onChangeDistrict}
        />
      </div>
      <div className="register-room-location-street-address">
        <ValidateInput
          label="도로명주소"
          value={streetAddress}
          onChange={onChangeStreetAddress}
        />
      </div>
      <div className="register-room-location-detail-address">
        <ValidateInput
          label="동호수(선택사항)"
          value={detailAddress}
          onChange={onChangeDetailAddress}
        />
      </div>
      <div className="register-room-location-postcode">
        <ValidateInput
          label="우편번호"
          value={postcode}
          onChange={onChangePostcode}
        />
      </div>
    </Container>
  );
};

export default RegisterLocation;
