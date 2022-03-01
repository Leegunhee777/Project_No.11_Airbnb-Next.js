//common리듀서는 애플리케이션 전반에 공통으로 사용될 값들을 모아놓을 모듈로 사용하겠다.
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CommonState} from '../types/reduxState'

//초기상태
const initialState: CommonState = {
  checkValidateMode: false,
}

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    //checkValidateMode변경하기
    setCheckValidateMode(state, action: PayloadAction<boolean>) {
      state.checkValidateMode = action.payload
    },
  },
})

export const commonActions = {...common.actions}
export default common
