import styles from '../../styles/displayHotelDetails.module.css'
import Link from 'next/link' //this is how to route in next.js instead of <a></a>
import Router,{useRouter} from 'next/router' //Used to pass Props between pages
//Pass in a props object (essentially the hotel_detail object)

const hotelDetails = (props) => {
    //Unpack Props received from previous page
    const hotelName = props.hotelMore.name;
    const description = props.hotel.description;
    const location = props.hotel.location;
    const roomType = props.hotel.roomType;
    console.log(props.hotelMore.description)
    
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
                    <p>{description}</p>
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

//Big ass question:
//If you are passing in props from 

//Retrieving data from
// export async function getStaticProps(){} --> This fetches data only ONCE, at build time, in dev mode works perfectly fine, each time u refresh it rebuilds?
//Wheras, getServerSideProps() is called upon every REQ, each time the user refreshes the page
//Returns a Json 

//For customised datafetching based on user selected hotel : See https://stackoverflow.com/questions/69058259/how-to-access-route-parameter-inside-getserversideprops-in-next-js
export async function getServerSideProps(context){
    const {req, res,query} = context
    console.log(query)
    // const response = await fetch("https://hotelapi.loyalty.dev/api/hotels/diH7")
    // const data = await response.json()

    // if (!data){
    //     return {
    //         notFound: true
    //     }
    // }
    return {
        props: {
            details: "data"
        }
    }
}

export default hotelDetails