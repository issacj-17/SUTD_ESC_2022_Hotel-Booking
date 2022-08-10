import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import hotelDetails , {getServerSideProps} from '../../pages/hotelDetails/index'

jest.setTimeout(40000);
describe('Test for HotelDetails Page', () => {

    beforeEach(() =>{
        fetch.resetMocks()
    })

    const hotelDetailData = {
        id: 'h3z1',
        imageCount: 27,
        latitude: 1.29904345,
        longitude: 103.85033995,
        name: 'Hotel Bencoolen',
        address: '47 Bencoolen Street',
        address1: '47 Bencoolen Street',
        rating: 2,
        trustyou: {
          id: null,
          score: {
            overall: 64,
            kaligo_overall: 3.2,
            solo: null,
            couple: null,
            family: null,
            business: null
          }
        },
        categories: {},
        amenities_ratings: [],
        description: "<p><b>Property Location</b> <br />With a stay at Hotel Bencoolen in Singapore (City Hall), you'll be minutes from Maghain Aboth Synagogue and National Museum of Singapore.  This hotel is close to Chinatown Heritage Center and National Orchid Garden.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 84 air-conditioned rooms featuring refrigerators and LCD televisions. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms have shower/tub combinations and hair dryers. Conveniences include safes and desks, and housekeeping is provided daily.</p><p><b>Amenities</b> <br />Be sure to enjoy recreational amenities, including an outdoor pool, a spa tub, and a fitness center.</p><p><b>Dining</b> <br />Satisfy your appetite at a coffee shop/café serving guests of Hotel Bencoolen.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include express check-in, a 24-hour front desk, and an elevator (lift).</p>",
        amenities: {
          airConditioning: true,
          continentalBreakfast: true,
          dataPorts: true,
          dryCleaning: true,
          hairDryer: true,
          meetingRooms: true,
          outdoorPool: true,
          roomService: true,
          safe: true,
          tVInRoom: true
        },
        original_metadata: { name: null, city: 'Singapore', state: null, country: 'SG' },
        image_details: {
          suffix: '.jpg',
          count: 27,
          prefix: 'https://d2ey9sqrvkqdfs.cloudfront.net/h3z1/'
        },
        hires_image_index: '0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,26',
        number_of_images: 16,
        default_image_index: 1,
        imgix_url: 'https://kaligo-web-old.imgix.net',
        cloudflare_image_url: 'https://www.kaligo-staging.xyz/images/old'
      }
      const searchData = {
        hotelId: 'h3z1',
        destination: 'RsBU',
        checkInDate: '2022-09-20',
        checkOutDate: '2022-09-25',
        rooms: '1',
        adults: '2',
        children: '0',
        guestQuery: '2'
      }

    it("Renders hotelDetail Page Successfully", async ()=>{
        render(<hotelDetails hotelDetailData={hotelDetailData} searchDetails={searchData} ></hotelDetails>)
        fetch.mockResponse(JSON.stringify({
            "searchCompleted": null,
            "completed": true,
            "status": null,
            "currency": null,
            "rooms": [
                {
                    "key": "er-A7F4A002A7576DEA10E593C19AE7153E-D89B948BE0306D00F1804F7D6142F558",
                    "roomDescription": null,
                    "roomNormalizedDescription": "Deluxe Twin Room",
                    "type": "200687195",
                    "free_cancellation": false,
                    "roomAdditionalInfo": {
                        "breakfastInfo": "hotel_detail_room_only",
                        "displayFields": {
                            "special_check_in_instructions": null,
                            "check_in_instructions": null,
                            "know_before_you_go": null,
                            "fees_optional": null,
                            "fees_mandatory": null,
                            "kaligo_service_fee": 77.53,
                            "hotel_fees": [],
                            "surcharges": [
                                {
                                    "type": "TaxAndServiceFee",
                                    "amount": 85.55
                                }
                            ]
                        }
                    },
                    "description": "Deluxe Twin Room",
                    "long_description": "<p><strong>2 Twin Beds</strong></p><p>194 sq feet </p><br/><p><b>Internet</b> - Free WiFi </p><p><b>Entertainment</b> - LCD television </p><p><b>Sleep</b> - Blackout drapes/curtains and bed sheets </p><p><b>Bathroom</b> - Private bathroom, slippers, and a bathtub or shower with a hydromassage showerhead</p><p><b>Practical</b> - Safe, phone, and iron/ironing board (on request)</p><p><b>Comfort</b> - Air conditioning and daily housekeeping</p><p><b>Need to Know</b> - No cribs (infant beds) available</p><p>Non-Smoking</p><p>Connecting/adjoining rooms can be requested, subject to availability </p>",
                    "images": [
                        {
                            "url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/a606e53c_b.jpg",
                            "high_resolution_url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/a606e53c_z.jpg",
                            "hero_image": true
                        },
                        {
                            "url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/96b233ae_b.jpg",
                            "high_resolution_url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/96b233ae_z.jpg",
                            "hero_image": false
                        },
                        {
                            "url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/dc8b605e_b.jpg",
                            "high_resolution_url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/dc8b605e_z.jpg",
                            "hero_image": false
                        },
                        {
                            "url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/e565a7e5_b.jpg",
                            "high_resolution_url": "https://i.travelapi.com/hotels/9000000/8230000/8225000/8224996/e565a7e5_z.jpg",
                            "hero_image": false
                        }
                    ],
                    "amenities": [
                        "Air conditioning",
                        "Towels provided",
                        "Bedsheets provided",
                        "Window screens",
                        "Electrical adapters/chargers",
                        "Toothbrush and toothpaste available",
                        "Daily housekeeping",
                        "Phone",
                        "Free local calls",
                        "Private bathroom",
                        "Free toiletries",
                        "Hair dryer",
                        "In-room safe",
                        "Iron/ironing board (on request)",
                        "Blackout drapes/curtains",
                        "Slippers",
                        "Free WiFi",
                        "LCD TV",
                        "Television",
                        "Bathtub or shower",
                        "Connecting/adjoining rooms available",
                        "No cribs (infant beds)",
                        "Hydromassage showerhead",
                        "Non-Smoking"
                    ],
                    "price_type": "single",
                    "max_cash_payment": 646.38,
                    "coverted_max_cash_payment": 897.93,
                    "points": 22425,
                    "bonuses": 0,
                    "lowest_price": 646.38,
                    "price": 897.93,
                    "converted_price": 897.93,
                    "lowest_converted_price": 897.93,
                    "chargeableRate": 646.38,
                    "market_rates": [
                        {
                            "supplier": "expedia",
                            "rate": 790.2288709775
                        }
                    ]
                }
            ]
        }))

        const nameOfHotel = await screen.findByTestId('displayComponent', {},{timeout:25000, interval:1000});
        await expect(nameOfHotel).toBeInTheDocument();
        // await expect(nameOfHotel).toHaveTextContent(`Hotel Bencoolen`);
    })

    it("Checks getServerSideProps fetches correctly", async ()=>{
        fetch.mockResponseOnce(JSON.stringify({id:123}))
        const response = await getServerSideProps({
            query: {
                hotelId:'diH7',
                destination: 'RsBU' ,
                checkInDate: '2022-09-14',
                checkOutDate: '2022-09-22',
                rooms: '1',
                adults: '2',
                children: '0',
            }
        })
    
        expect(response.props.hotelDetailData).toEqual({id:123})
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7`)
    })

    it("Checks getServerSideProps catches error and returns null", async ()=>{
        fetch.mockReject();
        const response = await getServerSideProps({
            query: {
                hotelId:'diH7',
                destination: 'RsBU' ,
                checkInDate: '2022-09-14',
                checkOutDate: '2022-09-22',
                rooms: '1',
                adults: '2',
                children: '0',
                
            }
        })
    
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7`)
        expect(response.props.hotelDetailData).toEqual(null)
    })

    
    
   

})

