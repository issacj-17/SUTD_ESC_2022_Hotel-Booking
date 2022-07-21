import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import styles from '../../../styles/displayHotelDetails.module.css'
import Router,{useRouter} from 'next/router' //Used to pass Props between pages

export default function roomDetails({Room,searchDetails}) {
    
    const roomType = Room.roomNormalizedDescription;
    const price = Room.lowest_price;
    const imagesUrl = Room.images;

    
    
    //Using Router to receive unpack props received using Router(Next.js module)
    const router = useRouter() //Initialise a router
    //Use the initialised router to unpack the props
    const {
        query: {/*fill in with whatever attributes you expecting*/}
    } = router
    //Assign the all the values retrieved from the query to a prop (not sure why this step exist) haha
    /*
    const props = {fill in with whatever attributes you expecting} 
    */

    //To handle passing of selected room type to checkout page
    function sendProps(){
        Router.push({
        pathname:"/bookingPage",
        query: {
            roomType,
            price,
            hotelId:searchDetails.hotelId,
            destination: searchDetails.destination,
            checkInDate: searchDetails.checkInDate,
            checkOutDate: searchDetails.checkOutDate,
            rooms: searchDetails.rooms,
            adults: searchDetails.adults,
            children: searchDetails.children
            }
        })
    }
  return (
        <div className={styles.card+' row w-80'}>
            
            <div className='col'>
                
                    <h4>{roomType}</h4>
                    <Carousel className={styles.roomImage}>
                        {
                            imagesUrl.map((object) => {return(
                                <Carousel.Item>
                                    <img className={styles.roomImage} src={object.url} alt={"https://sharewell.eu/wp-content/themes/applounge/assets/images/no-image/No-Image-Found-400x264.png"}></img>
                                </Carousel.Item>
                            )})
                        }
                    </Carousel>
                
            </div>
            <div className='col'>
                <p>Price of {roomType} is : {price}</p>

                <button type="button fixed-bottom" class="btn btn-outline-primary align-self-end" onClick={()=>sendProps()}>Select</button>            
            </div>
            
        </div>
  )
}


