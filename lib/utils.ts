// "token=value" 형식
// ex)
// access_token=eyJhbGciOiJIUzI1NiJ9.MjY.Px8g3RBo43sWl91sm9hBSo0J96OjY9emBgbw6wh9OK4
// 을 {token:"value"} 로 바꾸는 함수
// ex)아래의 스크링을 넣으면
// _ga=GA1;_gid=GA1.2464;access_token=eyJhbGciOiJIUzI1NiJ9.MjY.Px8g3RBo43sWl91sm9hBSo0J96OjY9emBgbw6wh9OK4
// output이 아래처럼 처리되서나옴
//{
//   _ga: 'GA1',
//   _gid: 'GA1.2464',
//   access_token: 'eyJhbGciOiJIUzI1NiJ9.MjY.Px8g3RBo43sWl91sm9hBSo0J96OjY9emBgbw6wh9OK4'
// }
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: {[key: string]: string} = {}
  if (cookieString) {
    // "token=value"
    const itemString = cookieString?.split(/\s*;\s*/)
    itemString.forEach((pairs) => {
      //["token","value"]
      const pair = pairs.split(/\s*=\s*/)
      cookies[pair[0]] = pair.slice(1).join()
    })
  }
  return cookies
}
