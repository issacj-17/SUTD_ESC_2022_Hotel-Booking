// React Component for individual hotels from results
import Link from 'next/link';
import styles from '../../../styles/searchResultsPage.module.css';
/* 
returns the HTML elements, displaying the information of each hotel, link to allow the hotel to be selected

@param {Object} hotel - hotel is the data corresponding to one hotel retrieved from the API
@returns - HTML to be displayed
*/

function hotelElem({ hotel,searchDetails }) {
    return (
      <>
        <div className={styles.hotelCard+ " card text-left"}>
          <div className={styles.hotelBody+" card-body"}>
            
            <img className={styles.hotelPicture} src={hotel.image_details.prefix + "0" + hotel.image_details.suffix} alt="Failed to Load"></img>

            <span className={styles.hotelContent+' card-body'}>
              <h4 id={styles.hotelName}>{hotel.name}</h4>
              <div>{hotel.address}</div>
              <div>Rated {hotel.trustyou.score.overall}/100</div>
              <span className="fa fa-star checked"></span>
            </span>

            {/* link to hotel details page with relevant hotelId */}
            <Link href={{
              pathname: "/hotelDetails",
              query: {
                hotelId: hotel.id,
                destination:searchDetails.destination,
                checkInDate: searchDetails.checkInDate,
                checkOutDate: searchDetails.checkOutDate,
                rooms: searchDetails.rooms,
                adults: searchDetails.adults,
                children: searchDetails.children
              }
            }}>
              <a className={styles.selectButton+ " btn btn-outline-primary btn-lg"}>Select</a>
            </Link>
            
          </div>

        </div>
        
      </>
    );
}
  
export default hotelElem

