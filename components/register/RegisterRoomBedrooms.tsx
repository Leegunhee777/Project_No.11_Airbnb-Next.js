import React from 'react'
import styled from 'styled-components'
import palette from '../../styles/palette'
import {useDispatch} from 'react-redux'
import {useSelector} from '../../store'
import {registerRoomActions} from '../../store/registerRoom'
import Counter from '../common/Counter'
import {getNumber} from '../../lib/utils'
import ValidateSelector from '../common/ValidateSelector'
import {bedroomCountList} from '../../lib/staticData'
import Button from '../common/Button'

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
  .rigister-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
    max-width: 400px;
    word-break: keep-all;
  }
  .rigister-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .rigister-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .rigister-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }
  .rigister-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }
  .rigister-room-bed-type-list-wrapper {
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
  .rigister-room-bed-type-bedroom-texts {
    margin-bottom: 28px;
  }
  .rigister-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
`

const RegisterRoomBedrooms: React.FC = () => {
  const maximumGuestCount = useSelector(
    (state) => state.registerRoom.maximumGuestCount
  )
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount)
  const bedCount = useSelector((state) => state.registerRoom.bedCount)
  const bedList = useSelector((state) => state.registerRoom.bedList)

  const dispatch = useDispatch()

  //최대 숙박 인원 변경시
  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value))
  }
  //침실 개수 변경시
  const onChangeBedroomCount = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0)
    )
  }
  //침대 개수 변경시
  const onChangeBedCount = (value: number) => {
    dispatch(registerRoomActions.setBedCount(value))
  }
  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className='rigister-room-step-info '>
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요
      </p>
      <div className='rigister-room-maximum-guest-count-wrapper '>
        <Counter
          label='최대숙박인원'
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className='rigister-room-bedroom-count-wrapper'>
        <ValidateSelector
          type='register'
          value={`침실 ${bedroomCount}개`}
          onChange={onChangeBedroomCount}
          label='게스트가 사용할수 있는 침실은 몇개인가요?'
          options={bedroomCountList}
        />
      </div>
      <div className='rigister-room-bed-count-wrapper'>
        <Counter label='침대' value={bedCount} onChange={onChangeBedCount} />
      </div>
      <h4>침대유형</h4>
      <p className='rigister-room-bed-type-info'>
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할수 있습니다
      </p>
      <div className='rigister-room-bed-type-list-wrapper'>
        {bedList.map((bedroom) => (
          <div key={bedroom.id} className='register-room-bedroom'>
            <div className='register-room-bed-type-top'>
              <div className='rigister-room-bed-type-bedroom-texts'>
                <p className='rigister-room-bed-type-bedroom'>{bedroom.id}번 침실</p>
                <p className='rigister-room-bed-type-bedroom'>침대 0개</p>
              </div>
              <Button styleType='rigister' color='white'>
                침대 추가하기
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default RegisterRoomBedrooms