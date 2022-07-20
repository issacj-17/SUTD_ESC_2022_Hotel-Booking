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
                        destination:"RsBU",
                        checkInDate: "2022-07-28",
                        checkOutDate: "2022-07-31",
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
                        hotelId: "050G",
                        destination:"RsBU",
                        checkInDate: "2022-07-28",
                        checkOutDate: "2022-07-31",
                        rooms: 1,
                        adults: 2,
                        children: 0
                    }
                }}>Hotel Details</Link>
            </li>
            <li>
                <Link href='/bookingPage'>Booking Page</Link>
            </li>
            <li>
                <Link href='/userAuth/login'>Login</Link>
            </li>
        </ul>
    </nav>

    )
}

export default Nav