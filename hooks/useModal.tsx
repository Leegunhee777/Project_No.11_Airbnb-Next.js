import React, {useRef, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
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
  }
`

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const openModal = () => {
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  interface Iprops {
    children: React.ReactNode
  }

  const ModalPortal: React.FC<Iprops> = ({children}) => {
    const ref = useRef<Element | null>()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      if (document) {
        const dom = document.querySelector('#root-modal')
        ref.current = dom
      }
    }, [])
    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div
            className='modal-background'
            role='presentation'
            onClick={closeModal}
          />
          {children}
        </Container>,
        ref.current
      )
    }
    return null
  }

  return {
    openModal,
    closeModal,
    ModalPortal,
  }
}

//이제 다른곳에서 useModal을 사용하여 모달을 열고 닫는 함수와,모달내부 콘텐츠를 표시해줄 컴포넌트를 불러올수있다.
export default useModal
