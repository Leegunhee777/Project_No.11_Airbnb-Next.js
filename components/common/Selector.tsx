import React from 'react'
import styled from 'styled-components'
import palette from '../../styles/palette'

const Container = styled.div`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    //backgroundImage할때 path: /static으로 처음 설정해야지
    //../../이런식응로 경로 찾아도 ,url인식안됨
    background-image: url('/static/svg/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[]
  disabledOptions?: string[]
  value?: string
}
//Props로 ?: 를 사용할경우 해당값이 undefined가될수있다고 하여 타입에러가 발생한다,
//이는 예외처리를 해주어야한다.
//options값이 전달되지 않을수도 있어 .map에서 에러가 나지 않게 기본값으로 []를사용한다.
const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  )
}

export default React.memo(Selector)
