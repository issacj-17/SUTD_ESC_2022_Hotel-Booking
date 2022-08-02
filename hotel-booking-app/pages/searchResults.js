import Head from 'next/head';
import HotelElem from '../modules/searchResults/components/HotelComponent';
import styles from '../styles/searchResultsPage.module.css';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';


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

  searchDetails.guestQuery = getGuestReqString(searchDetails.rooms, searchDetails.adults+searchDetails.children)


  const { data } = useSWR(`http://localhost:8000/api/prices?destination=${searchDetails.destination}&checkInDate=${searchDetails.checkInDate}&checkOutDate=${searchDetails.checkOutDate}&guestString=${searchDetails.guestQuery}`, fetcher, {refreshInterval: 200})
  //
  if(!data || data.hotels.length===0){
    console.log("Revalidating")
    return <h1>Loading...</h1>; 
  } else if(data.hotels.length!=0) {
    console.log(data.hotels.length);
  }


  // const button = () => {setSize(size+1)}
  
  console.log(data)
  // if (data.hotels.length!=10){
  //   setSize(size+1);
  // }
  // if (!data.completed) setSize(size+1);
  // console.log(data)

  return (
    <div className={styles.page}>
        <Head>
            <title>Search Results</title>
        </Head>

        <h3 className={styles.resultsHeader} data-testid="header">Search Results for {searchDetails.destination}</h3>

        {/* iterate through hotels, creating a HotelElem component for each hotel */}
        <div className='container'><div className='row g-3'>
          {hotels.map((hotelDis) => {
            return (
              // React component imported
              <HotelElem hotel={hotelDis} searchDetails={searchDetails} key={hotelDis.id} prices={data.hotels}></HotelElem>
            );
          })}
        </div></div>
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
  
  // begin fetching from prices API

  // const responsePrice = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination}&checkin=${checkInDate}&checkout=${checkOutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${getGuestReqString(rooms, adults+children)}&partner_id=1`);
  // const prices = await responsePrice.json();

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

