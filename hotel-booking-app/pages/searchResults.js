import Head from 'next/head'
import Link from 'next/link';

const searchResults = () => {
  return (
    <div>
        <Head>
            <title>Search Results</title>
        </Head>
        <h1>Search Results here!</h1>
        <Link href={{
          pathname: "/hotelDetails",
          query: {hotelId:"diH7"}
        }}>
          <a>Click This Shit</a>
        </Link>
    </div>
  )
}

export default searchResults