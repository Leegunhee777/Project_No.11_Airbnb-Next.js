import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import RegisterRoomCheckStep from './RegisterRoomCheckStep';

import RegisterRoomSubmitFooter from './RegisterRoomSubmitFooter';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector(state => state.registerRoom);

  //숙소 유형이 활성화 됐는지
  const isBuildingTypeActiced = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } =
      registerRoom;
    if (
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      isSetUpForGuest === null
    ) {
      return false;
    }
    return true;
  }, []);

  //숙소 종류가 활성화 됐는지
  const isRoomTypeActived = useMemo(() => {
    const {
      maximumGuestCount,
      bedroomCount,
      bedCount,
      bedList,
      publicBedList,
    } = registerRoom;
    if (
      !isBuildingTypeActiced ||
      !maximumGuestCount ||
      !bedroomCount ||
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  //욕실 항목이 활성화됐는지
  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  //위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;

    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  //편의 시설이 활성화됐는지
  const isAmentitiesActived = useMemo(() => {
    const { amentities } = registerRoom;

    if (!isLocationActived || isEmpty(amentities)) {
      return false;
    }
    return true;
  }, []);

  //편의공간 활성화됐는지
  const isConveniencesActived = useMemo(() => {
    const { conveniences } = registerRoom;

    if (!isAmentitiesActived || isEmpty(conveniences)) {
      return false;
    }
    return true;
  }, []);

  //사진 항목이 다 채워져있는지
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConveniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  //숙소 설명이 다 채워져있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActived || !description) {
      return false;
    }
    return true;
  }, []);

  //숙소 제목이 다 채워져있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  //숙소 요금이 채워져있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) {
      return false;
    }
    return true;
  }, []);

  //예약날짜가 다 채워져있는지
  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  //진행중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActiced) {
      return 'building';
    }
    if (!isRoomTypeActived) {
      return 'bedrooms';
    }
    if (!isBathroomActived) {
      return 'bathroom';
    }
    if (!isLocationActived) {
      return 'location';
    }
    if (!isAmentitiesActived) {
      return 'amentities';
    }
    if (!isConveniencesActived) {
      return 'conveniences';
    }
    if (!isPhotoActived) {
      return 'photo';
    }
    if (!isDescriptionActived) {
      return 'description';
    }
    if (!isTitleActived) {
      return 'title';
    }
    if (!isPriceActived) {
      return 'price';
    }
    if (!isDateActived) {
      return 'date';
    }
    return '';
  }, []);
  //유효한 값을 가지고있다면 체크리스트
  //유효한가지고있지 않은 스텝은 해당 결로로 이동유도
  //유효한 데이터를 가지고있지 않은 스텝 이후는 모두 disabled처리
  console.log(`/room/register/${stepInProgress}`);
  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActiced}
          inProgress={stepInProgress === 'building'}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === 'bedrooms'}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === 'bathroom'}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === 'location'}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amentities"
          disabled={!isAmentitiesActived}
          inProgress={stepInProgress === 'amentities'}
        />
        <RegisterRoomCheckStep
          step="편의 공간"
          href="/room/register/conveniences"
          disabled={!isConveniencesActived}
          inProgress={stepInProgress === 'conveniences'}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === 'photo'}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === 'description'}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === 'title'}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActived}
          inProgress={stepInProgress === 'price'}
        />
        <RegisterRoomCheckStep
          step="예약날짜"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === 'date'}
        />
      </ul>
      {/* {isDateActived 가 유효하다면 이전스텝들도 모두 유효한값을 가지고있다는 말, 체인형식으로 값의유효가 설정되어있으니} */}
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          isValid={true}
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomChecklist;
