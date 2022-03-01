import React, {useState, useMemo} from 'react'
import styled from 'styled-components'
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg'
import MailIcon from '../../public/static/svg/auth/mail.svg'
import PersonIcon from '../../public/static/svg/auth/person.svg'
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg'
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg'
import Input from '../common/Input'
import palette from '../../styles/palette'
import {dayList, monthList, yearList} from '../../lib/staticData'
import Selector from '../common/Selector'
import ValidateSelector from '../common/ValidateSelector'
import Button from '../common/Button'
import {signupAPI} from '../../lib/networkApi/auth'
import {useDispatch} from 'react-redux'
import {userAction} from '../../store/user'
import ValidateInput from '../common/ValidateInput'
import {commonActions} from '../../store/common'
import PasswordWarning from './PasswordWarning'
import {authActions} from '../../store/auth'

//비밀번호 최소 자릿수
const PASSWORD_MIN_LENGTH = 8

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
  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
    .sign-up-password-input-wrapper {
      svg {
        cursor: pointer;
      }
    }
    /* 완전 노가다성으로 일일히 만들어서 사용할때 쓰던것
     input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    } */
  }
  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`

interface IProps {
  closeModal: () => void
}
const SignUpModal: React.FC<IProps> = ({closeModal}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  //select태그에 대한 default value 때문에  undefined type도 정의해놓은것임
  const [birthYear, setBirthYear] = useState<string | undefined>()
  const [birthDay, setBirthDay] = useState<string | undefined>()
  const [birthMonth, setBirthMonth] = useState<string | undefined>()

  const [passwordFocused, setPasswordFocused] = useState(false)

  //return 쪽에서 아래처럼 변하지 않는 값을 그냥 직접 사용하게되면, 매번새로 생성하게 되어 쓸데없는 리렌더가 발생하게된다.
  // <ValidateSelector
  //   options={monthList}
  //   disabledOptions={['월']}
  //   defaultValue={'월'}
  //   value={birthMonth}
  //   onChange={onChangeBirthMonth}
  //   isValid={!!birthMonth}
  // />
  //변하기 않는 값을 사용하고 싶다면 const를 사용하여 사용해라
  //선택할수 없는 월 option
  const disabledMonths = ['월']
  //선택할수 없는 일 option
  const disabledDays = ['일']
  //선택할수 없는 년 option
  const disabledYears = ['년']

  const onFocusPassword = () => {
    setPasswordFocused(true)
  }

  //기본적으로 password, lastname공백유무와, 비밀번호문자열조합에 lastname과 이메일아이디가 일치하는게 있는지 체크하는함수
  //lastname과 email 포함여부와, password와 lastname공백까지 체크
  //true 를 반환하면 문제가있는 상태임
  const isPasswordHasNameOrEmail = useMemo(() => {
    return (
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0])
    )
  }, [password, lastname, email])

  //비밀번호가 최소 자릿수 이상인지 true면 정상
  const isPasswordOverMinLength = useMemo(() => {
    return !!password && password.length >= PASSWORD_MIN_LENGTH
  }, [password])

  //비밀번호가 숫자나 특수기호를 포함하는지(둘다 false 나와야 true가 반환되는구조임, 최소 둘중하나 조건이상은 만족시켜야된다는것임)
  // 숫자나 기호를 포함하고있는지 확인하는 정규표현식
  //true가 반환되면 정상
  const isPasswordHasNumberOrSymbol = useMemo(() => {
    return (
      (!!password && /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=(`"]/g.test(password)) ||
      (!!password && /[0-9]/g.test(password))
    )
  }, [password])

  //회원가입을 누를떄 유효성 trigger 관리 state
  /* validation check가 있는 방식=> 근데 이방식도 checkValidateMode를 위한 state를 사용하는 컴포넌트 마다 만들어줘야하는 번거로움이있으므로 
    리덕스에 checkValidateMode 값을 만들고 useCheckValidateMode라는 커스텀 훅을 만들어 ,  번거로움을 해결해보고자한다.
  */
  // const [checkValidateMode, setCheckValidateMode] = useState<boolean>(false)

  //이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  //이름 주소 변경시
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value)
  }
  //성 변경시
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value)
  }
  //비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  //비밀번호 토글
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword)
  }

  //월 변경시
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value)
  }
  //일 변경시
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value)
  }
  //월 변경시
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value)
  }

  //회원 가입 폼 입력 값  확인하기
  const validateSignUpForm = () => {
    //인풋 값이 없다면
    if (!email || !lastname || !firstname || !password) {
      console.log(1)
      return false
    }
    //비밀번호가 올바르지 않다면
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    ) {
      return false
    }
    //생년월일 셀릭터 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) {
      return false
    }
    return true
  }
  //회원가입 폼제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //유효성체크
    // setCheckValidateMode(true)
    dispatch(commonActions.setCheckValidateMode(true))

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`
          ).toISOString(),
        }
        const {data} = await signupAPI(signUpBody)
        dispatch(userAction.setLoggedUser(data))
        closeModal()
        //signupAPI 호출되면 서버측 api 코드에의해서
        //application탭의 cookies를 보면 'access_token'이라는 쿠기가 만들어져있다.
      } catch (e) {
        console.log(e)
      }
    }
  }

  //회원가입 모달 => 로그인 모달로 변경하기
  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode('login'))
  }
  React.useEffect(() => {
    return () => {
      dispatch(commonActions.setCheckValidateMode(false))
    }
  }, [])
  return (
    <Container onSubmit={onSubmitSignUp} style={{zIndex: 12}}>
      <CloseXIcon className='mordal-close-x-icon' onClick={closeModal} />
      <div className='input-wrapper'>
        {/* validation check가 없는 일반 Input 방식
         <Input
          placeholder='이메일주소'
          type='email'
          icon={<MailIcon />}
          name='email'
          value={email}
          onChange={onChangeEmail}
        /> */}
        {/* validation check가 있는 방식=> 헌데 이방식도 checkValidateMode를 위한 state를 사용하는 컴포넌트 마다 만들어줘야하는 번거로움이있으므로 
          리덕스에 checkValidateMode 값을 만들고 useCheckValidateMode라는 커스텀 훅을 만들어 ,  번거로움을 해결해보고자한다.
        */}
        <ValidateInput
          placeholder='이메일주소'
          type='email'
          icon={<MailIcon />}
          name='email'
          value={email}
          onChange={onChangeEmail}
          // checkValidateMode={checkValidateMode}
          isValid={!!email}
          errorMessage='이메일이 필요합니다.'
        />
      </div>
      <div className='input-wrapper'>
        {/* <Input
          placeholder='이름(예:길동)'
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        /> */}
        <ValidateInput
          placeholder='이름(예:길동)'
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          // checkValidateMode={checkValidateMode}
          isValid={!!lastname}
          errorMessage='이름을 입력하시오'
        />
      </div>
      <div className='input-wrapper'>
        {/* <Input
          placeholder='성(예: 홍)'
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        /> */}
        <ValidateInput
          placeholder='성(예: 홍)'
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          // checkValidateMode={checkValidateMode}
          isValid={!!firstname}
          errorMessage='성을 입력하세요'
        />
      </div>
      <div className='input-wrapper sign-up-password-input-wrapper'>
        {/* <Input
          placeholder='비밀번호 설정하기'
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        /> */}
        <ValidateInput
          placeholder='비밀번호 설정하기'
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          // checkValidateMode={checkValidateMode}
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            isPasswordHasNumberOrSymbol
          }
          errorMessage='비밀번호를 입력하세요'
          //input에 포커싱되었을때 해당함수발동
          onFocus={onFocusPassword}
        />
        {/* -tip
        input태그에 name='email'과 type='password'속성을 설정하면, 브라우저 자체에서 해당값을 저장할수있다. */}
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={!isPasswordHasNameOrEmail}
            text='비밀번호에 본인 이름이나 이메일 주소를 포함할수 없습니다'
          />
          <PasswordWarning isValid={isPasswordOverMinLength} text='최소 8자' />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text='숫자나 기호를 포함하세요'
          />
        </>
      )}
      <p className='sign-up-birthday-label'>생일</p>
      <p className='sign-up-modal-birthday-info'>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className='sign-up-modal-birthday-selectors'>
        <div className='sign-up-modal-birthday-month-selector'>
          {/* <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue={'월'}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          /> */}
          <ValidateSelector
            options={monthList}
            disabledOptions={disabledMonths}
            defaultValue={'월'}
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className='sign-up-modal-birthday-day-selector'>
          {/* <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue={'일'}
            value={birthDay}
            onChange={onChangeBirthDay}
          /> */}
          <ValidateSelector
            options={dayList}
            disabledOptions={disabledDays}
            defaultValue={'일'}
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className='sign-up-modal-birthday-year-selector'>
          {/* <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue={'년'}
            value={birthYear}
            onChange={onChangeBirthYear}
          /> */}
          <ValidateSelector
            options={yearList}
            disabledOptions={disabledYears}
            defaultValue={'년'}
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className='sign-up-modal-submit-button-wrapper'>
        <Button type='submit'>가입하기</Button>
      </div>
      {/*완전 노가다성으로 일일히 만들어서 사용할때 쓰던것
       <div className='input-wrapper'>
        <input placeholder='이메일주소' type='email' name='email' />
        <MailIcon />
      </div>
      <div className='input-wrapper'>
        <input placeholder='이름(예:길동)' />
        <PersonIcon />
      </div>
      <div className='input-wrapper'>
        <input placeholder='성(예ㅣ홍)' />
        <PersonIcon />
      </div>
      <div className='input-wrapper'>
        <input placeholder='비밀번호 설정하기' type='password' />
        <OpenedEyeIcon />
      </div> */}
      <p>
        이미 에어비엔비 계정이 있나요?
        <span
          className='sign-up-modal-set-login'
          role='presentation'
          onClick={changeToLoginModal}>
          로그인
        </span>
      </p>
    </Container>
  )
}

export default SignUpModal
