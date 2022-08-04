// React Component for individual hotels from results
import Link from 'next/link';
import styles from '../../../styles/searchResultsPage.module.css';

/* 
returns the HTML elements, displaying the information of each hotel, link to allow the hotel to be selected

@param {Object} hotel - hotel is the data corresponding to one hotel retrieved from the API
@returns - HTML to be displayed
*/

function hotelElem({ hotels, searchDetails, price }) {
  let hotel = {}
  hotels.forEach(element => {
    if (element.id == price.id) {
      hotel= element;
    }
  });
  // console.log(hotel, hotel.id)

  // Price but no hotel in static API
  if (!hotel.id) return <></>;

  return (
    <><div className='col-12 col-md-6 col-lg-4'>
        <div className={styles.hotelCard+ " card text-left"}>
        
          <img 
            className={styles.hotelPicture + " card-img-top"} 
            src={hotel.image_details.prefix + hotel.default_image_index + hotel.image_details.suffix} 
            alt="Failed to Load" 
            onError={({currentTarget}) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://via.placeholder.com/400x200.png?text=Image+Unavailable";
            }}
            data-testid='image'
          />
          
          <div className={styles.hotelBody+" card-body"}>
            
            

            <div className={styles.hotelContent}>
              <h4 className='card-title' id={styles.hotelName} data-testid='hotelName'>{hotel.name}</h4>
              <div className='card-text' data-testid='hotelAddr'>{hotel.address}</div>
              <div className='card-text' data-testid='rating'>Rated {hotel.trustyou.score.overall}/100</div>
            </div>

            {/* link to hotel details page with relevant hotelId */}
            <div className={styles.buttonPrice+' card-text'}>
              <span className='card-text'>
                Rooms from SGD {price.lowest_converted_price}
              </span>
              <Link href={{
                pathname: "/hotelDetails",
                query: {
                  hotelId: hotel.id,
                  destination:searchDetails.destination,
                  checkInDate: searchDetails.checkInDate,
                  checkOutDate: searchDetails.checkOutDate,
                  rooms: searchDetails.rooms,
                  adults: searchDetails.adults,
                  children: searchDetails.children,
                  guestQuery: searchDetails.guestQuery
                }
              }}>
                <a className={styles.selectButton+ " btn btn-outline-primary btn-lg"} data-testid='selectButton'>Select</a>
              </Link>
            </div>
            
          </div>

        </div>
      </div>
    </>
  );
}
  
export default hotelElem

