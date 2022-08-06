//Nav Bar Component

import Link from 'next/link' //this is how to route in next.js instead of <a></a>
import navStyle from '../../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyle.nav}>
        <ul>
            <li>
                <Link href='/'>Home/Search</Link>
            </li>
            <li>
                <Link href={{
                    pathname: "/searchResults",
                    query: {
                        destination:"wCJo",
                        checkInDate: "2022-08-09",
                        checkOutDate: "2022-08-16",
                        rooms: 1,
                        adults: 2,
                        children: 0
                    }
                }}>
                    Search Results
                </Link>
            </li>
            <li>
                <Link href={{
                    pathname: "/hotelDetails",
                    query: {
                        hotelId: "wCJo",
                        destination:"7q7u",
                        checkInDate: "2022-08-09",
                        checkOutDate: "2022-08-16",
                        rooms: 1,
                        adults: 2,
                        children: 0
                    }
                }}>Hotel Details</Link>
            </li>
            <li>
                <Link href='/bookingPage'>Booking Page</Link>
            </li>
        </ul>
    </nav>

    )
}

export default Nav