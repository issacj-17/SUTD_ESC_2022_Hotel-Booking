//Nav Bar Component

import Link from 'next/link' //this is how to route in next.js instead of <a></a>
import navStyle from '../../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyle.nav}>
        <ul>
            <li>
                <Link href='/pages'>Home/Search</Link>
            </li>
            <li>
                <Link href={{
                    pathname: "/searchResults",
                    query: {destId: "WD0M"}
                }}>
                    Search Results
                </Link>
            </li>
            <li>
                <Link href='/hotelDetails'>Hotel Details</Link>
            </li>
            <li>
                <Link href='/pages/bookingPage'>Booking Page</Link>
            </li>
        </ul>
    </nav>

    )
}

export default Nav