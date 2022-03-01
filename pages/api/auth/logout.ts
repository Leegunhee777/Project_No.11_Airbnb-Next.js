import {NextApiRequest, NextApiResponse} from 'next'

//우리가 로그인, 회원가입시 셋팅한 쿠키 access_token은 httpOnly 속성을 가지고있기때문에,
//프론트에서 javaScript를 이용하여 제거할수없다.
//고로 로그아웃 api를 만들어 access_token을 제거하도록 하겠다.
//로그인과 회원가입시 셋팅한 쿠키에 expires를 설정하여 만료일을정했다.
//만료일이 지나게되면 쿠키는 자동으로 삭제가된다.
//아래의 코드는 만료일을 변경해서 쿠키가 삭제되도록 하는 코드이다.
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //로그아웃하기
    if (req.method === 'DELETE') {
      res.setHeader(
        'Set-Cookie',
        'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
      )
      res.statusCode = 204
      return res.end()
    }
  } catch (e) {
    console.log(e)
    return res.send(e)
  }
  res.statusCode = 405
  return res.end()
}
