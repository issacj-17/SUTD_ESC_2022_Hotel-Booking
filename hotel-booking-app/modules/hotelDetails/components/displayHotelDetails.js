import styles from '../../../styles/displayHotelDetails.module.css'
import Link from 'next/link' //this is how to route in next.js instead of <a></a>

import Slider from './imageCarousel'
import RoomDetails from './roomDetails'

import dynamic from 'next/dynamic'

const MapDisplay = dynamic(() => import('./mapDisplay'), {
  ssr: false,
})


//Pass in a props object (essentially the hotel_detail object)

const hotelDetailsComp = (props) => {
    //Unpack Props received from previous pages
    const hotelName = props.selectedHotelData.name;
    const description =  props.selectedHotelData.description;
    const location = props.selectedHotelData.address;
    const listOfAvailableRooms = props.roomData.rooms
    
    const searchDetails = props.searchDetails;

    const latitude = props.selectedHotelData.latitude
    const longitude = props.selectedHotelData.longitude
    
    
    //Unpack Image url
    const hotelImageJson = props.selectedHotelData.image_details
    const numOfHotelImages = props.selectedHotelData.image_details.count;
    let listOfHotelImagesUrl = [];
    
    //Method: For loop to obtain extract the imageurl in batches of 5 and pushing them into
    // listOfHotelImagesUrl as a list of 5 Strings, each corresponding to an HotelImageUrl
    for (let i=0; i<numOfHotelImages-(numOfHotelImages%5); i+=5){
        let setOfHotelImagesUrl = [];
        let prefix = hotelImageJson.prefix
        let suffix = hotelImageJson.suffix
        for (let j=i;j<i+5;j++){
            setOfHotelImagesUrl.push(prefix+j+suffix)
        }
        listOfHotelImagesUrl.push(setOfHotelImagesUrl)
    }
   
    
    
    
    

    

    return (
        <div>
            <h1 className={styles.hotelName}>Name of Hotel : {hotelName} , this is from API call</h1>
            
            
            <Slider listOfImagesUrl={ listOfHotelImagesUrl }></Slider>
            <div className='container-fluid'>
                
                <div className='row'>
                    <div className='col'>
                        <div className={styles.card +" card"} id="description">
                            
                            <h1 >Description</h1>
                            <div className='card-body' dangerouslySetInnerHTML={{__html: description}}/>
                            
                        </div>

                    </div>

                    <div className='col-3'> 

                    <div className={styles.locationCard +" card w-100 h-75"}>
                        <div className="card-body">
            
                                <h5 className="card-title">Location</h5>
                                <p className="card-text">{location}</p>
                            <MapDisplay latitude={latitude} longitude={longitude}></MapDisplay>
                            
                            
                        </div>
                    </div>
                    
                    </div>
                </div>
                <div className='row'>
                    <div className={styles.card + ' col w-100'}> 
                    {
                        listOfAvailableRooms.map((room)=>{
                            return(
                                <RoomDetails Room={room}></RoomDetails>
                            )
                        })
                    }
                    
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default hotelDetailsComp