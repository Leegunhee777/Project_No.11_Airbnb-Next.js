import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg'
import Button from '../../components/common/Button'
import palette from '../../styles/palette'
import {commonActions} from '../../store/common'
import {useDispatch} from 'react-redux'
const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 10px;
    }
  }
`
interface IProps {
  prevHref?: string
  nextHref?: string
  isValid?: boolean
}

const RefisterRoomFooter: React.FC<IProps> = ({
  prevHref,
  nextHref,
  isValid = false,
}) => {
  const dispatch = useDispatch()
  const onClickNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isValid) {
      //!isValid라면 event.preventDefault()통해 클릭이벤트를 제거하여, 경로가 바뀌지 않게함
      event.preventDefault()
      dispatch(commonActions.setCheckValidateMode(true))
    }
  }
  React.useEffect(() => {
    return () => {
      dispatch(commonActions.setCheckValidateMode(false))
    }
  }, [])
  return (
    <Container>
      <Link href={prevHref || ''}>
        <a className='register-room-footer-back '>
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ''}>
        <a>
          <Button color={'dark_cyan'} onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </Container>
  )
}

export default RefisterRoomFooter
