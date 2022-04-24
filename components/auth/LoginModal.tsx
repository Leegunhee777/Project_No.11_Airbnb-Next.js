import React, { useState } from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Button from '../common/Button';
import ValidateInput from '../common/ValidateInput';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { loginAPI } from '../../lib/networkApi/auth';
import { commonActions } from '../../store/common';
import { userAction } from '../../store/user';
const Container = styled.form`
  width: 568px;
  padding: 32px;
  border: 2px solid red;
  background-color: white;
  z-index: 11;
  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}
const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  //이메인 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  //비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //로그인 모달 => 회원가입 모달로 변경하기
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signup'));
  };

  //로그인 클릭시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(commonActions.setCheckValidateMode(true));
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요');
    } else {
      const loginBody = { email, password };
      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userAction.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };
  React.useEffect(() => {
    return () => {
      dispatch(commonActions.setCheckValidateMode(false));
    };
  }, []);
  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <ValidateInput
          placeholder="이메일주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={email !== ''}
          errorMessage="이메일이 필요합니다"
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <ValidateInput
          placeholder="비밀번호 설정하기"
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          type={isPasswordHided ? 'password' : 'text'}
          value={password}
          onChange={onChangePassword}
          isValid={password !== ''}
          errorMessage="비밀번호를 입력하세요"
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit" color="bittersweet">
          로그인
        </Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?{' '}
        <span
          className="login-modal-set-signup"
          role={'presentation'}
          onClick={changeToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
