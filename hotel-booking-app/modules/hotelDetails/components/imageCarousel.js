import Carousel from 'react-bootstrap/Carousel';
import styles from '../../../styles/displayHotelDetails.module.css'

function imageCarousel({listOfImagesUrl}) {
  // console.log(listOfImagesUrl)
  return (
    <Carousel variant="dark">
      {listOfImagesUrl.map((listOfUrl,index) => {
            return (
              
                <Carousel.Item>
                
                <div className={styles.hotelImageBox} data-testId="hotelImageBox">
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col'>
                          <img
                          className={styles.hotelImage_0} 
                          id="0"
                          src={listOfUrl[0]}
                          alt={`${index}`}
                          />
                        </div>
                        
                        <div className='col'>
                        <div className='row'>
                          <img
                          className={styles.hotelImage_1} 
                          id="1"
                          src={listOfUrl[1]}
                          alt={`${index+1}`}
                          />
                        </div>
                        <div className='row'>
                        <img
                          className={styles.hotelImage_2} 
                          id="2"
                          src={listOfUrl[2]}
                          alt={`${index+2}`}
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
                          />
                        </div>
                        <div className='row'>   
                          <img
                          className={styles.hotelImage_4} 
                          id="4"
                          src={listOfUrl[4]}
                          alt={`${index+4}`}
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