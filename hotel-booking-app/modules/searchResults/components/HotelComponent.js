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
            
            
            
          <h4 className='card-title' id={styles.hotelName} data-testid='hotelName'>{hotel.name}</h4>
            <div className={styles.hotelContent}>
              <div className='card-text' id={styles.hotelAddr} data-testi d='hotelAddr'>{hotel.address}</div>
              <div className='card-text' id={styles.hotelRating} data-testid='rating'>Rated {hotel.trustyou.score.overall}/100</div>
              
            </div>
            <div className='card-text' id={styles.priceData}>
              <span id={styles.priceText}>SGD </span><span id={styles.priceValue}>{price.lowest_converted_price}</span>
              

              {/* link to hotel details page with relevant hotelId */}
              <span className={styles.buttonPrice+' card-text'}>
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
              </span>

            </div>

            
            
            
          </div>

        </div>
      </div>
    </>
  );
}
  
export default hotelElem

