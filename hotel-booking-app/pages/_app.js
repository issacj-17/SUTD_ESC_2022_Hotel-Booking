//Whatever global components you want to appear for all your pages
//You put in here

import Layout from '../common/components/Layout'
import Nav from '../common/components/Nav'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
