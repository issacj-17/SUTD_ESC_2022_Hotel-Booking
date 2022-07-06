//Template Global Layout I took from a vid, can stuff different components inside of here, like navbar and etc...
//Can change as u see fit
import styles from '../../styles/Layout.module.css'
import Nav from './Nav'
// className={styles.*} => div,main will adopt the defined css properties from Home.module.css
// ({children}) => This layout will take in a JSX Component as it wraps around <Component {...pageProps} /> in _app.js
// Then it formats the <Component {...pageProps} /> in a div and main
const Layout = ({children}) => {
  return (
    <>
        <Nav />
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    </>
    
  )
}

export default Layout