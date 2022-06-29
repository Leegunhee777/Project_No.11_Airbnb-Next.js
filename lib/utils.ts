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
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    // "token=value"
    const itemString = cookieString?.split(/\s*;\s*/);
    itemString.forEach(pairs => {
      //["token","value"]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.slice(1).join();
    });
  }
  return cookies;
};

//string에서 number만 return 하는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join('');
  if (numbers) {
    return Number(numbers);
  }
  return null;
};

// . Date클래스 안에 있는 녀석은 날짜를 각 설정한 나라에 맞는 방식으로 출력시켜주고 Number클래스 안에 있는 녀석은 숫자를 각 설정한 나라에 맞는 방식으로 출력시켜준다.
// 일단 기본적인 용도는 이 링크에서 확인할 수 있다. 링크와 함수의 이름에서 알 수 있다시피
//toLocaleString은 말 그대로 특정 자료가 들어왔을 때 설정해놓은 지역에서 읽는 형태로 바꿔는 함수이다.
// 우리 주변에 흔한 1,000단위로 끊는 숫자 표기법은 영미문화권에서 쓰는 방식이다. 그리고 이 함수의 기본값은 미국으로 돼있다.
//해서 이런식으로 하면 쉽게 원하는 결과값을 얻을 수 있다.

//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
  //global search for numbers that are NOT 0 to 9 in a string.
  const amountString = input.replace(/[^0-9]/g, '');
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return '';
};

//list 필터링으로 사용하기위한 query string 만들기
//url과 객체를 이용해 url에 쿼리를 붙여주는 함수이다.
//query-string라는 라이브러리 또한 같은 기능을하니 다운받아 사용해도된다.
export const makeQueryString = (
  baseUrl: string,
  queriesObject: Object & { [key: string]: any }
) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);

  if (keys.length === 0) {
    return baseUrl;
  }

  let queryString = `${baseUrl}?`;
  keys.forEach((key, i) => {
    if (queriesObject[key]) {
      queryString += `${keys[i]}=${values[i]}`;
    }
  });
  //마지막 필요없는'&' 제거하기
  return queryString.slice(0, -1);
};
