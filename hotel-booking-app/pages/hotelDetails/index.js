import Head from 'next/head'
import DisplayHotelDetails from '../../components/hotelDetails/displayHotelDetails'
import { useState } from 'react'
import styles from '../../styles/displayHotelDetails.module.css'
import Router from 'next/router'

//Nested routes, just name ur folder as the routename that you would like,
// In this case, it would be localhost:3000/hotelDetails, then index.js in this folder would be the js script called at ../hotelDetails/
// Any other routes in this folder forexample option1.js would be the route for ../hotelDetails/option1
// Dynamic routing => [optionnumber].js where optionnumber is the var name which can be retreived using a next.js lib called router, 
//You can retrieve using option = router.query.optionnumber, then display this string anywhere
//Next.js will look for any specific pages before looking at the dynamic pages, so if u have option1 and [optionnumber] and u route to ../hotelDetails/option1,
//option1.js will be displayed instead of the dynamic page.

const hotelDetails = (props) => {
  //State props
  const [userInput, setUserInput] = useState([{hotelName:"Hotel A", description:"5-Star Hotel Situated in the Heart of the City.", location:"Orchard", roomType:"Single Room"}]) 
  
  const handleChange = (event) => {
    event.preventDefault() //

    setUserInput(event.target.value)
  }

  //Testing API retrieval, works but needa find out why getServerSideProps not working when used in Component
  console.log(props.data)


  return (
    
    <div style={{margin: '10px'}}>
        <Head>
            <title>Hotel Details</title>
        </Head>
        <h1>Hotel Details Page</h1>
        <form>
          <input type='text' onChange={handleChange}></input>
          <button>Submit</button>
        </form>
        
        <DisplayHotelDetails hotel={userInput[0]}></DisplayHotelDetails>
    </div>
  )
}

export async function getServerSideProps(context){
  const {req, res,query} = context
  
  const response = await fetch("https://hotelapi.loyalty.dev/api/hotels/diH7")
  const data = await response.json()

  if (!data){
      return {
          notFound: true
      }
  }
  return {
      props: {
          data
      }
    }
  }
export default hotelDetails