import styles from '../../styles/displayHotelDetails.module.css'
import Link from 'next/link' //this is how to route in next.js instead of <a></a>
import Router,{useRouter} from 'next/router' //Used to pass Props between pages
//Pass in a props object (essentially the hotel_detail object)

const hotelDetails = (props) => {
    //Unpack Props received from previous page
    const hotelName = props.hotelMore.name;
    const description =  props.hotelMore.description;
    const location = props.hotelMore.address;
    const roomType = "Single Room";
    // console.log(props.hotelMore)
    
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
            roomType
            }
        })
        console.log("Props sent!");
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
                    
                    <a onClick={() => sendProps()}>{roomType}</a>
                    
                </div>
                <div className={styles.card}>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
}
export default hotelDetails