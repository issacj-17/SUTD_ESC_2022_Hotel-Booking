import Head from 'next/head'
import DisplayHotelDetails from '../../modules/hotelDetails/components/displayHotelDetails'
import { useState } from 'react'
import styles from '../../styles/displayHotelDetails.module.css'
import {getGuestReqString} from '../searchResults.js'
import useSWR from 'swr'

//Nested routes, just name ur folder as the routename that you would like,
// In this case, it would be localhost:3000/hotelDetails, then index.js in this folder would be the js script called at ../hotelDetails/
// Any other routes in this folder forexample option1.js would be the route for ../hotelDetails/option1
// Dynamic routing => [optionnumber].js where optionnumber is the var name which can be retreived using a next.js lib called router, 
//You can retrieve using option = router.query.optionnumber, then display this string anywhere
//Next.js will look for any specific pages before looking at the dynamic pages, so if u have option1 and [optionnumber] and u route to ../hotelDetails/option1,
//option1.js will be displayed instead of the dynamic page.

const hotelDetails = ({hotelDetailData,searchDetails,hotelId}) => {
  const {destination,checkInDate,checkOutDate,rooms,adults,children,} = searchDetails;
  const guestString = getGuestReqString(rooms,parseInt(adults)+parseInt(children))
  console.log(guestString)
  const url = `http://localhost:8000/api/hotels/prices?hotelId=${hotelId}&destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guestString}`

  async function fetcher(url) {
    let response = await fetch(url);
    return await response.json();
  }

  const { data ,error} = useSWR(url, fetcher,{refreshInterval:400})
  //
  if (error) {
    return <div>Failed To Load</div>}
  if(!data){
    console.log("Revalidating")
    return <h1>Loading...</h1>; 
  }
  console.log("This is result of SWR")
  console.log(data)
  
  
  return (
    <div data-testid="hotelDetailsPage" style={{margin: '10px'}}>
        <Head>
            <title>Hotel Details</title>
        </Head>

        <DisplayHotelDetails data-testid="displayComponent" selectedHotelData={hotelDetailData} searchDetails={searchDetails} roomData={data}></DisplayHotelDetails>
    </div>
  )
}
export default hotelDetails

export async function getServerSideProps(context){
  //Read hotelId attribute from query string
  
  const searchDetails= context.query //Taking all query and storing it into searchDetails
  const {hotelId,destination,checkInDate,checkOutDate,rooms,adults,children} = searchDetails;
  
  let guest = parseInt(adults)+parseInt(children)
  let guestString = getGuestReqString(rooms,guest)
  try{
    var hotelDetailData = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${hotelId}`).then((response) => {
    if (response.ok){
      return response.json();
      }
      throw new Error("Unable to fetch Hotel Endpoint");
    })
  } catch(err){
     hotelDetailData = null;
  }

  // try{
  //   var roomPrices = await fetch(`http://localhost:8000/api/hotels/prices?hotelId=${hotelId}&destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guestString=${guestString}`).then((response) => {
  //   if (response.ok){
  //     console.log("Price fetched")
  //     return response.json();
  //     }
  //     throw new Error("Unable to fetch Price Endpoint");
  //   })
  // } catch(err){
  //    roomPrices = null;
  // }

  
  
  //console.log(`https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=RsBU&checkin=2022-08-28&checkout=2022-09-01&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests=2`)

  console.log("Fetch Successful!")
  return {
      props: {
          hotelDetailData,
          hotelId,
          searchDetails,
      }
    }
  }