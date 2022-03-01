import React from 'react'
import {useDispatch} from 'react-redux'
import useModal from '../hooks/useModal'
import {authActions} from '../store/auth'
import AuthModal from './auth/AuthModal'

const HeaderAuths: React.FC = () => {
  const {openModal, ModalPortal, closeModal} = useModal()
  const dispatch = useDispatch()
  return (
    <>
      <div className='header-auth-buttons'>
        <button
          type='button'
          className='header-sign-up-button'
          onClick={() => {
            // 방식 1과 2에서 사용하던코드
            //  setModalOpened(true)
            dispatch(authActions.setAuthMode('signup'))
            openModal()
          }}>
          회원가입
        </button>
        <button
          type='button'
          className='header-login-button'
          onClick={() => {
            dispatch(authActions.setAuthMode('login'))
            openModal()
          }}>
          로그인
        </button>
      </div>
      {/* 최종 hook 방식 */}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  )
}

export default HeaderAuths
