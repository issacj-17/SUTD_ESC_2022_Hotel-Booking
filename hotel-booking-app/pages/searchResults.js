import Head from 'next/head';
import HotelElem from '../modules/searchResults/components/HotelComponent';
import styles from '../styles/searchResultsPage.module.css';

/* 
returns the HTML elements, mapping each hotel in hotels to a HotelElem, and other UI

@param {Object} props - hotels is an array of Object containing hotel information from the API,
                        destID is the destination ID of the current search
@returns - HTML to be displayed
*/

function searchResults ({ hotels, prices, searchDetails }) {
  return (
    <div className={styles.page}>
        <Head>
            <title>Search Results</title>
        </Head>

        <h3 className={styles.resultsHeader} data-testid="header">Search Results for {searchDetails.destination}</h3>

        {/* iterate through hotels, creating a HotelElem component for each hotel */}
        {hotels.map((hotelDis) => {
          return (
            // React component imported
            <HotelElem hotel={hotelDis} searchDetails={searchDetails}key={hotelDis.id}></HotelElem>
          );
        })}
    </div>
  )
}

export default searchResults

/* 
Retrieves destId from query in URL, performs an API call with destId,
then returns props to the searchResults function

@param {Object} context - context.query.destId
@returns {Object} props - data is stored in hotels, destID contains the Destination ID
*/

export async function getServerSideProps(context) {
  // object destructuring
  const searchDetails = context.query;
  const { destination,checkInDate,checkOutDate,rooms,adults,children } = searchDetails;
  
  // begin fetching from prices API

  const responsePrice = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination}&checkin=${checkInDate}&checkout=${checkOutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${getGuestReqString(rooms, adults+children)}&partner_id=1`);
  const prices = await responsePrice.json();

  // fetch all hotels for destination from static API
  const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination}`); // WD0M default
  const data = await response.json();
  console.log(prices)

  // return data as prop
  return {
    props: {
      hotels: data,
      prices: prices,
      searchDetails: searchDetails
    },
  };
}


function getGuestReqString(rooms, guests) {
  let res = `${guests}`;
  for (let i=1; i<rooms; i++) {
    res += "|" + guests;
  }
  return res;
}