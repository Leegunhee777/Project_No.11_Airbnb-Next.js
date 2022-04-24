import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store/index';

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  checkValidateMode: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
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
  .input-error-message {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ checkValidateMode, isValid }) =>
    checkValidateMode &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ checkValidateMode, isValid }) =>
    checkValidateMode &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  // checkValidateMode?: boolean
  errorMessage?: string;
  label?: string;
}

const ValidateInput: React.FC<IProps> = ({
  label,
  icon,
  // checkValidateMode = false,
  isValid = false,
  errorMessage,
  ...props
}) => {
  const checkValidateMode = useSelector(
    state => state.common.checkValidateMode
  );

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      checkValidateMode={checkValidateMode}
    >
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      <div className="input-icon-wrapper">{icon}</div>
      {checkValidateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default ValidateInput;
