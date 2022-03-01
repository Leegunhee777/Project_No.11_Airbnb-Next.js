import {NextApiRequest, NextApiResponse} from 'next'
import Data from '../../../lib/data'
import bcrypt from 'bcryptjs'
import {StoredUserType} from '../../../types/user'
import Jwt from 'jsonwebtoken'
//회원가입로직
// 1. POST인지 확인
// 2. req.body에 필요한 값이 전부 들어있는지 확인
// 3. email이 중복인지 확인
// 4. 패스워드를 암호화한다
// yarn add bcryptjs
// yarn add @types/bcryptjs -D  를이용하여 비밀번호를 암호화한다.
// 5. 유저 정보를 추가한다.
// 6. 추가된 유저의 정보와 token을 전달한다.
//jwt를 사용하기 위해 jsonwebtoken을 설치해보겠다.
//yarn add jsonwebtoken
//yarn add @types/jsonwebtoken
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {email, firstname, lastname, password, birthday} = req.body

    //1.body데이터 확인
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400
      return res.send('필수 데이터가 없습니다.')
    }
    //2.중복확인
    const userExist = Data.user.exist({email})
    if (userExist) {
      res.statusCode = 409
      res.send('이미 가입된 이메일입니다.')
    }
    //3.비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(password, 8)

    //4.유저정보추가
    const users = Data.user.getList()
    let userId
    if (users.length === 0) {
      userId = 1
    } else {
      userId = users[users.length - 1].id + 1
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    }
    Data.user.write([...users, newUser])

    //4.토큰만들기
    //토큰을 만들기 위해서는 암호화할 값과 & secret값이 필요합니다.
    //secret값은 인증에 관련된 값이므로, 안전하게 환경변수에 저장하여 사용하도록 하겠습니다.
    //생성된 jwt토큰을 decoded해보면 String(newUser.id) 정보를 볼수있게됨
    const token = Jwt.sign(String(newUser.id), process.env.JWT_SECRET!)

    //5.만들어진 토큰을 클라이언트측 브라우저의 쿠키에 저장할수 있도록 res의 헤더에 'Set-Cookie'를 설정해야한다.
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; HttpOnly`
    )
    //=> access_token이라는 쿠키명에 토큰을 저장하며 path는 '/',
    //expires로 지금 시간에 3일을 더해 만료일을 정하고,
    //httponly를 사용하여 api 통신에서만 쿠키 값을 불로올수있고, http 이외의 접근은 불가능하도록하였다.

    //6.토큰과 함께 생성된 유저 정보를 전달하도록하겠다, 이때 회원가입된 유저정보를 내려줄때 password는 보안상 전달하지 않도록 하겠다.
    //delete 의피연산자는 optional해야하기때문에 password프로퍼티를 optional하게 맞추기위해,
    //말도안되는 어거지 타입을 만든것이다. delete 를 사용해야하기때문에
    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
      newUser
    delete newUserWithoutPassword.password
    res.statusCode = 200
    return res.send(newUser)
    //참고
    //여기서 타입스크립트의 웃긴게나옴
    // const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = {
    //   id: 123,
    //   email: '123s',
    //   password: '123123',
    // }
    // => 당연히 에러난다 why? newUserWithoutPassword 당연히 에러남
    // {} 아니면 {password: '123123'} 둘중하나의값만 대입가능하다, 타입을 보면알수있듯이 그런데,
    //근데 object를 변수에 담에서 대입하면 에러가 안난닼ㅋㅋㅋㅋㅋㅋ
    // const testObject = {
    //   id: 123,
    //   email: '123s',
    //   password: '123123',
    // }
    // const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
    //   testObject
  }
  res.statusCode = 405
  return res.end()
}
