import React, {useState} from 'react'
import styled from 'styled-components'
import AirbnbLogoIcon from '../public/static/svg/logo.svg'
import AirbnbLogoTextIcon from '../public/static/svg/logo_text.svg'
import HamburgerIcon from '../public/static/svg/header/hambuger.svg'
import Link from 'next/link'
import palette from '../styles/palette'
//방식 2 에서 사용하는 코드
// import ModalPortal from './MordalPortal'
import useModal from '../hooks/useModal'
import SignUpModal from './auth/SignUpModal'
import {useSelector} from '../store'
import {useDispatch} from 'react-redux'
import {authActions} from '../store/auth'
import AuthModal from './auth/AuthModal'
import {userAction} from '../store/user'

//yarn add react-outside-click-handler
//yarn add @types/react-outside-click-handler -D
import OutsideClickHandler from 'react-outside-click-handler'
import {logoutAPI} from '../lib/networkApi/auth'
import HeaderAuths from './HeaderAuths'
import HeaderUserProfile from './HeaderUserProfile'
const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
  //헤더 로그인 회원가입 버튼
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    // react-outside-click-handler div
  }

  //react-outside-click-handler를 사용하게 되면 내부적으로 <div>태그로 감싸게되는데,
  //이 <div>태그에 직접 className을 넣는것이 안되기 때문에,
  //css 형제 연산자를 이용하여 .header-logo-wrapper의 형제 div에 접근하는방식으로 스타일을 주었습니다.
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
  //방식1 )컴포넌트내부에서 modal을 생성하는 방식1일때 필요한 코드
  /* .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    .modal-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 11;
    }
    .modal-contents {
      width: 400px;
      height: 400px;
      background-color: white;
      z-index: 12;
    }
  } */
`

const Header: React.FC = () => {
  // 방식1과 방식2)에서 사용하는 코드
  // const [modalOpened, setModalOpened] = useState(false)
  const dispatch = useDispatch()
  const {openModal, ModalPortal, closeModal} = useModal()
  const isLogged = useSelector((state) => state.user.isLogged)

  //유저 메뉴 열고 , 닫힘 여부
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false)

  //로그아웃하기
  const logout = async () => {
    try {
      await logoutAPI()
      dispatch(userAction.initUser())
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Container>
      <Link href='/'>
        <div className='header-logo-wrapper'>
          <AirbnbLogoIcon className='header-logo' />
          <AirbnbLogoTextIcon />
        </div>
      </Link>
      {!isLogged && <HeaderAuths />}
      {isLogged && <HeaderUserProfile />}
      {/* 방식1 ). 방식이 아래와같은 방식으로 modal을 띄울수있으나 , 만약 모달을 여러곳에서 띄워야한다면, 재사용적 측면에서 사용하는 곳마다 만들어져야한다는 점에서 재사용성이 떨어지는 방식이다. 
        그래서 방식 2가 만들어졌으나, 방식2도 번거로운점이 존재한다 그래서 hooks에서 useModal.tsx를 만든다.
      */}
      {/* {modalOpened && (
        <div className='modal-wrapper'>
          <div
            className='modal-background'
            role='presentation'
            onClick={() => setModalOpened(false)}
          />
          <div className='modal-contents' />
        </div>
      )} */}

      {/* //방식2). 아래의 방식이 재사용성을 고려한 방식, __app에 dialog를 위한 Dom을 root를 만들어둔다 
      한데 방식2도 모달컨트롤을 위해 부모컴포넌트위치에 state상태를 하나 만들어야하고,ModalPortal에 props로
      함수를 전달하는일이 매우번거롭다. hooks폴더내에 커스텀훅스를 만들어 이런 번거로운일을 줄여보겠다.
      {modalOpened && (
        <ModalPortal closePortal={() => setModalOpened(false)}>
          <SignUpModal />
        </ModalPortal>
      )}
          */}
    </Container>
  )
}

//방식 1=> 방식 2=> hooks 로 진화하는 과정을 잘봐라
//hooks 를 사용하면 , 모달을 열고, 닫고, 컨테츠를 띄우는 것은 한줄로 할수있다. 번거로운 작업을 여러곳에서 사용가능케한다.
export default Header
