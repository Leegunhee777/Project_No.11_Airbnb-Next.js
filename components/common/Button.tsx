import React from 'react'
import styled, {css} from 'styled-components'
import palette from '../../styles/palette'

//버튼 색상 구히기 후에 색상이 추가된다면 다른 색을 추가해서 컨트롤해도됨
const getButtonColor = (color: string) => {
  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
      `
    default:
      return css`
        background-color: ${palette.bittersweet};
      `
  }
}
const Container = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  ${(props) => getButtonColor(props.color || '')}
`

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<IProps> = ({children, color, ...props}) => {
  return (
    <Container {...props} color={color}>
      {children}
    </Container>
  )
}

export default React.memo(Button)
