import Carousel from 'react-bootstrap/Carousel';
import styles from '../../../styles/displayHotelDetails.module.css'

function imageCarousel({listOfImagesUrl}) {
  // console.log(listOfImagesUrl)
  return (
    <Carousel variant="dark">
      {listOfImagesUrl.map((listOfUrl,index) => {
            return (
              
                <Carousel.Item key={index}>
                
                <div className={styles.hotelImageBox} data-testid="hotelImageBox">
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col'>
                          <img
                          className={styles.hotelImage_0} 
                          id="0"
                          src={listOfUrl[0]}
                          alt={`${index}`}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/400x600.png?text=Image+Unavailable";
                          }}
                          />
                        </div>
                        
                        <div className='col'>
                        <div className='row'>
                          <img
                          className={styles.hotelImage_1} 
                          id="1"
                          src={listOfUrl[1]}
                          alt={`${index+1}`}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/300x200.png?text=Image+Unavailable";
                          }}
                          />
                        </div>
                        <div className='row'>
                        <img
                          className={styles.hotelImage_2} 
                          id="2"
                          src={listOfUrl[2]}
                          alt={`${index+2}`}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/300x200.png?text=Image+Unavailable";
                          }}
                          />
                        </div>
                        </div>
                        <div className='col'>
                        <div className='row'>
                          <img
                          className={styles.hotelImage_3} 
                          id="3"
                          src={listOfUrl[3]}
                          alt={`${index+3}`}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/300x200.png?text=Image+Unavailable";
                          }}
                          />
                        </div>
                        <div className='row'>   
                          <img
                          className={styles.hotelImage_4} 
                          id="4"
                          src={listOfUrl[4]}
                          alt={`${index+4}`}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/300x200.png?text=Image+Unavailable";
                          }}
                          />
                        </div>
                        </div>
                        
                      </div>  
                    </div>
                  </div>  
              
              </Carousel.Item>
            );
        })}
    </Carousel>
  );
}

export default imageCarousel;