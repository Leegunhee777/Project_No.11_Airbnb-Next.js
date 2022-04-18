import React, { useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import Counter from '../common/Counter';
import { getNumber } from '../../lib/utils';
import ValidateSelector from '../common/ValidateSelector';
import { bedroomCountList } from '../../lib/staticData';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import { BedType } from '../../types/room';
import RegisterRoomBedList from './RegisterRoomBedList';
import RefisterRoomFooter from './RegisterRoomFooter';
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
    max-width: 400px;
    word-break: keep-all;
  }
  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }
  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }
  .register-room-bed-type-list-wrapper {
    width: 548px;
  }
  .register-room-bedroom {
    width: 100%;
    padding: 28px 0;
    border-top: 1px solid ${palette.gray_dd};
    &:last-child {
      border-bottom: 1px solid ${palette.gray_dd};
    }
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom-texts {
    margin-bottom: 28px;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
`;

const RegisterRoomBedrooms: React.FC = () => {
  const maximumGuestCount = useSelector(
    state => state.registerRoom.maximumGuestCount
  );
  const bedroomCount = useSelector(state => state.registerRoom.bedroomCount);
  const bedCount = useSelector(state => state.registerRoom.bedCount);
  const bedList = useSelector(state => state.registerRoom.bedList);
  const publicbedList = useSelector(state => state.registerRoom.publicBedList);

  const dispatch = useDispatch();

  //최대 숙박 인원 변경시
  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };
  //침실 개수 변경시
  const onChangeBedroomCount = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0)
    );
  };
  //침대 개수 변경시
  const onChangeBedCount = (value: number) => {
    dispatch(registerRoomActions.setBedCount(value));
  };

  const isEqualBedCountAndBedList = (
    bedCount: number,
    publicbedCount: { type: BedType; count: number }[],
    bedList: { id: number; beds: { type: BedType; count: number }[] }[]
  ) => {
    let bedListTotalCount = 0;
    bedList?.forEach(obj => {
      obj?.beds?.forEach(innerObj => (bedListTotalCount += innerObj.count));
    });

    publicbedCount?.forEach(obj => {
      bedListTotalCount += obj.count;
    });

    return bedCount === bedListTotalCount;
  };

  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="register-room-step-info ">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요
      </p>
      <div className="register-room-maximum-guest-count-wrapper ">
        <Counter
          label="최대숙박인원"
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <ValidateSelector
          type="register"
          value={`침실 ${bedroomCount}개`}
          onChange={onChangeBedroomCount}
          label="게스트가 사용할수 있는 침실은 몇개인가요?"
          options={bedroomCountList}
          isValid={!!bedroomCount}
        />
      </div>
      <div className="register-room-bed-count-wrapper">
        <Counter label="침대" value={bedCount} onChange={onChangeBedCount} />
        {!isEqualBedCountAndBedList(bedCount, publicbedList, bedList) && (
          <p
            className="register-room-bed-type-info"
            style={{ color: palette.davidson_orange }}
          >
            위에서 지정하신 침대의 총갯수와 아래에서 지정하신 침대유형의
            침대개수가 맞지 않습니다.
          </p>
        )}
      </div>
      <h4>침대유형</h4>
      <p className="register-room-bed-type-info">
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할수 있습니다
      </p>
      {/* <div className='register-room-bed-type-list-wrapper'>
        {bedList.map((bedroom) => (
          <div key={bedroom.id} className='register-room-bedroom'>
            <div className='register-room-bed-type-top'>
              <div className='register-room-bed-type-bedroom-texts'>
                <p className='register-room-bed-type-bedroom'>
                  {bedroom.id}번 침실
                </p>
                <p className='register-room-bed-type-bedroom'>침대 0개</p>
              </div>
              <Button styleType='register' color='white'>
                침대 추가하기
              </Button>
            </div>
          </div>
        ))}
      </div> */}
      <RegisterRoomBedList bedList={bedList} />
      <RefisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isValid={
          !!bedroomCount &&
          isEqualBedCountAndBedList(bedCount, publicbedList, bedList)
        }
      />
    </Container>
  );
};

export default RegisterRoomBedrooms;
