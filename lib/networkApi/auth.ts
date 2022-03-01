import axios from './index'
import {UserType} from '../../types/user'
//회원가입 body
interface SignUpAPIBody {
  email: string
  firstname: string
  lastname: string
  password: string
  birthday: string
}

//회원가입 api
export const signupAPI = (body: SignUpAPIBody) => {
  return axios.post<UserType>('/api/auth/signup', body)
}

//로그인 api
export const loginAPI = (body: {email: string; password: string}) => {
  return axios.post<UserType>('/api/auth/login', body)
}

//쿠키의 access_token 의 유저 정보 받아오는 api
export const getMyInfoAPI = () => {
  return axios.get<UserType>('/api/auth/me')
}

//로그아웃 api
export const logoutAPI = () => {
  return axios.delete('/api/auth/logout')
}
