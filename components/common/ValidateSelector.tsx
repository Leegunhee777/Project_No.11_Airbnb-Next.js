import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import WarningIcon from '../../public/static/svg/common/warning.svg';

const normalSelectorStyle = css`
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
`;

const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/selector/selector_down_arrow.svg');
    background-position: right 14px center;
    background-repeat: no-repeat;
  }
`;
interface SelectorContainerProps {
  isValid: boolean;
  checkValidateMode: boolean;
  //selector의 재사용을 높이기 위해  type을 이용하여 , 다른 style을 적용하였음
  type: 'register' | 'normal';
}
const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && normalSelectorStyle}
  ${({ type }) => type === 'register' && RegisterSelectorStyle}

  select {
    ${({ checkValidateMode, isValid }) => {
      if (checkValidateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}

    &:disabled {
      background-image: url('/static/svg/selector/disabled_register_selector_down_arrow.svg');
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  //아래 속성들은 selector의 응용을위해 추가됨
  label?: string;
  errorMessage?: string;
  type?: 'register' | 'normal';
}
//Props로 ?: 를 사용할경우 해당값이 undefined가될수있다고 하여 타입에러가 발생한다,
//이는 예외처리를 해주어야한다.
//options값이 전달되지 않을수도 있어 .map에서 에러가 나지 않게 기본값으로 []를사용한다.
const ValidateSelector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  //아래 속성들은 selector의 응용을위해 추가됨
  label,
  errorMessage = '옵션을 선택하세요',
  type = 'normal',
  ...props
}) => {
  const checkValidateMode = useSelector(
    state => state.common.checkValidateMode
  );

  return (
    <Container
      isValid={!!isValid}
      checkValidateMode={checkValidateMode}
      type={type}
    >
      <label>
        {label && <span>{label}</span>}
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
      </label>

      {checkValidateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(ValidateSelector);
