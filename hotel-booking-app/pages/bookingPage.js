import Head from 'next/head'
import Router,{useRouter} from 'next/router'

const bookingPage = () => {
  //Using Router to receive unpack props received using Router(Next.js module)
  const router = useRouter() //Initialise a router
  //Use the initialised router to unpack the props
  const {
      query: {hotelName}
  } = router
  //Assign the all the values retrieved from the query to a prop (not sure why this step exist) haha
  const props = {hotelName} 

  return (
    <div>
        <Head>
            <title>Booking Page</title>
        </Head>
        <h1>Booking Page, payment details, Selected room details....!</h1>
        <p>The Hotel Named {props.hotelName} has been succesfully retrieved</p>
    </div>
  )
}

export default bookingPage