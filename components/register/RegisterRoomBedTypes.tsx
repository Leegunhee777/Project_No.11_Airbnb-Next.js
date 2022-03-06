import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {bedTypes} from '../../lib/staticData'
import palette from '../../styles/palette'
import {BedType} from '../../types/room'
import Button from '../common/Button'
import Counter from '../common/Counter'
import ValidateSelector from '../common/ValidateSelector'
import {useDispatch} from 'react-redux'
import {registerRoomActions} from '../../store/registerRoom'
const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-selector-wrapper {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
`

interface IProps {
  bedroom: {id: number; beds: {type: BedType; count: number}[]}
}

const RegisterRoomBedTypes: React.FC<IProps> = ({bedroom}) => {
  const dispatch = useDispatch()
  const initialBedOptions = bedroom.beds.map((bed) => bed.type)

  const [opened, setOpened] = useState(false)
  //선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] =
    useState<BedType[]>(initialBedOptions)

  //남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType))
  }, [activedBedOptions, bedroom])

  //침대 개수 총합
  const totalBedsCount = useMemo(() => {
    let total = 0
    bedroom.beds.forEach((bed) => {
      total += bed.count
    })
    return total
  }, [bedroom])

  //침실 유형 열고 닫기
  const toggleOpened = () => setOpened(!opened)

  //침실 침대 개수 변경시
  const onChangeBedTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    )
  }

  //침대 종류 텍스트
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`)
    return texts.join(',')
  }, [bedroom])

  return (
    <Container>
      <div className='register-room-bed-type-top'>
        <div className='register-room-bed-type-bedroom-texts'>
          <p className='register-room-bed-type-bedroom'>{bedroom.id}번 침실</p>
          <p className='register-room-bed-type-bedroom-counts'>
            침대 총 {totalBedsCount} 개<br />
            {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened} styleType='register' color='white'>
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>
      {opened && (
        <div className='register-room-bed-type-selector-wrapper'>
          <ValidateSelector
            type='register'
            options={lastBedOptions}
            defaultValue={'다른 침대 추가'}
            value='다른 침대 추가'
            disabledOptions={['다른 침대 추가']}
            onChange={(e) =>
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}

      {opened && (
        <div className='register-room-bed-type-selector-wrapper'>
          {activedBedOptions.map((type) => (
            <div className='register-room-bed-type-counter' key={type}>
              <Counter
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => {
                  onChangeBedTypeCount(value, type)
                }}
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

export default RegisterRoomBedTypes
