import {UserType} from './user'

// 유저 redux state
export type UserState = UserType & {
  isLogged: boolean
}

//공통적으로 사용하는 reduxState
export type CommonState = {
  checkValidateMode: boolean
}
