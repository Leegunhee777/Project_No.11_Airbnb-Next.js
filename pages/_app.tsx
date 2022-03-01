import App, {AppContext, AppInitialProps, AppProps} from 'next/app'
import Header from '../components/Header'
import GlobalStyle from '../styles/GlobalStyle'
import {wrapper} from '../store'
import {cookieStringToObject} from '../lib/utils'
import axios from '../lib/networkApi'
import {getMyInfoAPI} from '../lib/networkApi/auth'
import {userAction} from '../store/user'
const app = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id='root-modal' />
    </>
  )
}
// //'next-redux-wrapper'덕분에 AppContext에서 store를 사용할수있다.
//아래의 코드를 통해, 새로고침되어 user관련 state가 날아가도
//(isLogged 가 false이고 && 브라우저에 저장된 토큰이 있다면) getMyInfoAPI를 통해 유저의 정보를 받아와
//로그인상태를 유지시킬수있다.
app.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async (context: AppContext): Promise<AppInitialProps> => {
      const appInitialProps = await App.getInitialProps(context)
      //cookie는 문자열로 되어있기 때문에 다른값또한 함께 문자열로 포함되어있다.
      //그래서 쿠키문자열에서 access_token 의값만을 빼내보도록하겠다.
      const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)

      const {isLogged} = store.getState().user
      try {
        if (!isLogged && cookieObject.access_token) {
          //해당 acess_token을 axios, api 요청시 헤더와 함께 보내는 설정을해보겠다.
          //이렇게 해줘야 서버쪽 me.ts 쪽에서 req.headers.cookie로 해당 access_token값에 접근할수있음
          axios.defaults.headers.common['cookie'] = cookieObject.access_token
          const {data} = await getMyInfoAPI()
          store.dispatch(userAction.setLoggedUser(data))
        }
      } catch (e) {
        console.log(e)
      }
      return {...appInitialProps}
    }
)

export default wrapper.withRedux(app)
