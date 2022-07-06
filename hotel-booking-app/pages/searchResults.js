import Head from 'next/head';
import HotelElem from '../components/SearchResults/HotelComponent';
import styles from '../styles/searchResultsPage.module.css';

/* 
returns the HTML elements, mapping each hotel in hotels to a HotelElem, and other UI

@param {Object} props - hotels is an array of Object containing hotel information from the API,
                        destID is the destination ID of the current search
@returns - HTML to be displayed
*/

function searchResults ({ hotels, searchDetails }) {
  

  return (
    <div>
        <Head>
            <title>Search Results</title>
        </Head>

        <h3 className={styles.resultsHeader}>Search Results for {searchDetails.destination}</h3>

        {/* iterate through hotels, creating a HotelElem component for each hotel */}
        {hotels.map((hotelDis) => {
          return (
            // React component imported
            <HotelElem hotel={hotelDis} searchDetails={searchDetails} key={hotelDis.id}></HotelElem>
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
  
  

  // fetch all hotels for destination
  const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination}`); // WD0M default
  const data = await response.json();

  // return data as prop
  return {
    props: {
      hotels: data,
      searchDetails
    },
  };
}
