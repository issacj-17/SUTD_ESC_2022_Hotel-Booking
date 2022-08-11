import Head from 'next/head';
import HotelElem from '../modules/searchResults/components/HotelComponent';
import styles from '../styles/searchResultsPage.module.css';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';


/* 
returns the HTML elements, mapping each hotel in hotels to a HotelElem, and other UI

@param {Object} props - hotels is an array of Object containing hotel information from the API,
                        destID is the destination ID of the current search
@returns - HTML to be displayed
*/
async function fetcher(url) {
  let response = await fetch(url);
  return await response.json();
}



function searchResults ({ hotels, searchDetails }) {

  const [numShown, setNumShown] = useState(12);

  searchDetails.guestQuery = getGuestReqString(searchDetails.rooms, parseInt(searchDetails.adults)+parseInt(searchDetails.children));


  const { data,error } = useSWR(`http://localhost:8000/api/prices?destination=${searchDetails.destination}&checkInDate=${searchDetails.checkInDate}&checkOutDate=${searchDetails.checkOutDate}&guests=${searchDetails.guestQuery}`, fetcher, {refreshInterval: 1000})
  
  
  if(error){
    console.log(error)
    return <h1>Error in fetching Data</h1>
  }
  if(!data || data.hotels.length==0){
    console.log("Revalidating")
    console.log(data)
    return <h3 className={styles.resultsHeader} data-testid="header">Loading Results</h3>;
  }


  data.hotelsSlice = data.hotels.slice(0,numShown)
  console.log(data)
  


  return (
    <div className={styles.page}>
        <Head>
            <title>Search Results</title>
        </Head>

        <h3 className={styles.resultsHeader} data-testid="header">Search Results</h3>

        {/* iterate through hotels, creating a HotelElem component for each hotel */}
        <div className='container'>
          <div className='row g-3'>
            {data.hotelsSlice.map((hotelDisplayed) => {
              return (
                // React component imported
                <HotelElem hotels={hotels} searchDetails={searchDetails} key={hotelDisplayed.id} price={hotelDisplayed}></HotelElem>
              );
            })}
          </div>
        </div>

        <button onClick={() => {setNumShown(numShown + 9)}} className={styles.selectButton+ " btn btn-outline-primary btn-lg"} id={styles.loadButton}>   Load More   </button>
    </div>
  );
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

  // fetch all hotels for destination from static API
  let data;
  try {
    data = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination}`).then((response) => {
      if (response.ok) return response.json();
      throw new Error("Unable to fetch");
    });
  } catch (error) {data = null;}
  

  // return data as prop
  return {
    props: {
      hotels: data,
      searchDetails: searchDetails
    },
  };
}


export function getGuestReqString(rooms, guests) {
  let res = `${guests}`;
  for (let i=1; i<rooms; i++) {
    res += "|" + guests;
  }
  return res;
}

