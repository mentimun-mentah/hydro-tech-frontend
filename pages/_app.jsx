import { Provider } from 'react-redux'

import Head from 'next/head'
import Layout from 'components/Layout'
import withReduxStore from 'lib/with-redux-store'

import 'antd/dist/antd.css'
import 'swiper/swiper.min.css'
import 'react-quill/dist/quill.snow.css'
import 'swiper/components/navigation/navigation.min.css'
import 'antd-button-color/dist/css/style.css'
import 'suneditor/dist/css/suneditor.min.css'
import 'react-summernote/dist/react-summernote.css'

const App = ({ Component, pageProps, store }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>HYDRO X TECH</title>
        <link rel="icon" href="/static/images/logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="HYDRO x TECH" />
        <link rel="stylesheet" href="/static/css/global.css" />
        <link rel="stylesheet" href="/static/css/utility.css" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>

      <style jsx global>{`
        .rc-number-lg, .rc-number-lg input {
          height: 38px;
          font-size: 16px;
        }
      `}</style>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
}

export default withReduxStore(App)
