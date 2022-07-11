import styles from '../../../styles/displayHotelDetails.module.css'
import Link from 'next/link' //this is how to route in next.js instead of <a></a>
import Router,{useRouter} from 'next/router' //Used to pass Props between pages
//Pass in a props object (essentially the hotel_detail object)

const hotelDetailsComp = (props) => {
    //Unpack Props received from previous page
    const hotelName = props.selectedHotelData.name;
    const description =  props.selectedHotelData.description;
    const location = props.selectedHotelData.address;
    const roomType = props.roomData.rooms[0].roomNormalizedDescription;
    const price = props.roomData.rooms[0].lowest_price;
    const img_url = props.roomData.rooms[0].images[0].url;
    const searchDetails = props.searchDetails;
    
    
    
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
            hotelName,
            description,
            location,
            roomType,
            price
            }
        })
    }

    return (
        <div>
            <h1 className={styles.hotelName}>Name of Hotel : {hotelName} , this is from API call</h1>
            <div className={styles.body}>
                <div className={styles.card}>
                    <h1>Description</h1>
                    {description}
                </div>
                <div className={styles.card}>
                    <h1>{roomType}</h1>
                    
                    <img className={styles.roomImage} src={img_url}></img>
                    <p>Price of {roomType} is : {price}</p>
                    <a onClick={() => sendProps()}>Select</a>
                    
                </div>
                <div className={styles.card}>
                    <h1>Location</h1>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
}
export default hotelDetailsComp