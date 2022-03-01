import React, {useState} from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import {useDispatch} from 'react-redux'
import Link from 'next/link'
import HamburgerIcon from '../public/static/svg/header/hambuger.svg'
import {logoutAPI} from '../lib/networkApi/auth'
import {userAction} from '../store/user'
import {useSelector} from '../store'

const HeaderUserProfile: React.FC = () => {
  //유저 메뉴 열고 , 닫힘 여부
  const [isUserMenuOpened, setIsUsermenuOpened] = useState(false)
  // const user = useSelector((state) => state.user) 쓰지 않고 아래처럼 쓴이유가 있다.
  //참고 - useSelector는 비교를 할때 객체의 주소를 비교하게된다 고로,
  //유저정보가 변경되어 user가 변경된다면 객체가 새로 만들어져 user객체를 불러온 컴포넌트는 전부 리렌더링될것이다.
  //useProfileImage와 같이 원시타입으로 사용한다면 쓸데없는 리렌더링을 방지할수있다.
  const userProfileImage = useSelector((state) => state.user.profileImage)

  const dispatch = useDispatch()
  //로그아웃 하기
  const logout = async () => {
    try {
      await logoutAPI()
      dispatch(userAction.initUser())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpened) {
          setIsUsermenuOpened(false)
        }
      }}>
      <button
        className='header-user-profile'
        type='button'
        onClick={() => {
          setIsUsermenuOpened(!isUserMenuOpened)
        }}>
        <HamburgerIcon />
        <img
          src={userProfileImage}
          className='header-user-profile-image'
          alt=''
        />
      </button>
      {isUserMenuOpened && (
        <ul className='header-usermenu'>
          <li>숙소 관리</li>
          <Link href='/room/register/building'>
            <a
              role='presentation'
              onClick={() => {
                setIsUsermenuOpened(false)
              }}>
              <li>숙소 등록하기</li>
            </a>
          </Link>
          <div className='header-usermenu-divider' />
          <li role='presentation' onClick={logout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  )
}

export default HeaderUserProfile
