import React from 'react'
import styled from 'styled-components'
import palette from '../../styles/palette'

const Container = styled.div<{iconExist: boolean}>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({iconExist}) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`
//이런식으로 Input의 공통컴포넌트에 interface를 이렇게만 사용하게되면 무슨 문제가생기냐??
// interface Iprops {
//   icon?: JSX.Element
// }
//=> 만들어진 InputComponent를 import 하여 사용할때 , input태그에서 기본적으로 당연하게 사용되는
//placeholder, type등...은 사용할수없게된다 why?? 너가 만든 InputComponent는
//props로 icon만 받을수있게 해놓았으니까 그럼 일반적으로 input 태그에서 사용하는 props
//들을 나의 Input 컴포넌트의 props로도 받고 싶은데 어케하지???
//<사용하는곳>
// <Input placeholder='이메일주소' type='email' icon={<MailIcon />} />
//개선된결과 =>
//아래처럼 interface를 extends하여 사용하면 일반적으로 input태그에서 사용하는 props을 수용할수있게됨
interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element
}
const Input: React.FC<Iprops> = ({icon, ...props}) => {
  return (
    // icon은 undeifined일수도있기 때문에 !!를 하지아노거 icon만 할당할경우 'undefined' 형식은 'boolean' 형식에 할당할 수 없습니다.라는 에러가뜬다.
    //허나 !!를 사용하여, props로 넘어온 icon element를 boolean 값으로 사용하기 위해 앞에 !! 를 붙인것이다.
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className='input-icon-wrapper'>{icon}</div>
    </Container>
  )
}
export default React.memo(Input)
