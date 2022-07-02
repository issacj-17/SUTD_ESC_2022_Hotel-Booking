//Whatever global components you want to appear for all your pages
//You put in here

import Layout from '../components/Layout'
import Nav from '../components/Nav'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
