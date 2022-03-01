import {readFileSync, writeFileSync} from 'fs'
import {StoredUserType} from '../../types/user'

//회원가입관련

//유저 리스트 데이터 불러오기
const getList = () => {
  const usersBuffer = readFileSync('data/users.json')
  const usersString = usersBuffer.toString()
  if (!usersString) {
    return []
  }
  const users: StoredUserType[] = JSON.parse(usersString)
  return users
}

//email의 유저가 있는지 확인하기
const exist = ({email}: {email: string}) => {
  const users = getList()
  return users.some((user) => user.email === email)
}

//유저리스트 저장하기
const write = async (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users))
}

//로그인관련

//로그인으로 들어온 email에 대한 유저 불러오기
const find = ({email, id}: {email?: string; id?: number}) => {
  const users = getList()
  return users.find((user) => user.email === email || user.id === id)
}

export default {getList, exist, write, find}
