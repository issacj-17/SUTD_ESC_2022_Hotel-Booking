// React Component for individual hotels from results
import Link from 'next/link';
import styles from '../../styles/searchResultsPage.module.css';

/* 
returns the HTML elements, displaying the information of each hotel, link to allow the hotel to be selected

@param {Object} hotel - hotel is the data corresponding to one hotel retrieved from the API
@returns - HTML to be displayed
*/

function hotelElem({ hotel,searchDetails }) {
  console.log(searchDetails)
    return (
      <>
        <div className={styles.hotelElemDiv}>
          <p className={styles.hotelName}>{hotel.name}</p>

          {/* link to hotel details page with relevant hotelId */}
          <Link href={{
            pathname: "/hotelDetails",
            query: {hotelId: hotel.id,searchDetails:JSON.stringify(searchDetails)}
          }}>
            <a className={styles.selectButton}>Select</a>
          </Link>

        </div>
        
      </>
    );
}
  
export default hotelElem

