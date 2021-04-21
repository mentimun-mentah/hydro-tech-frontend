import Head from 'next/head'
import Layout from 'components/Layout'
import 'antd/dist/antd.css'

const App = ({ Component, pageProps }) => {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx, router }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default App
