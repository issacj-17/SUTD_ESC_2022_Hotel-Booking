import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import hotelDetails , {getServerSideProps} from '../../pages/hotelDetails/index'


describe('Test for HotelDetails Page', () => {

    beforeEach(() =>{
        fetch.resetMocks()
    })

    it("Checks getServerSideProps fetches correctly", async ()=>{
        fetch.mockResponseOnce(JSON.stringify({id:123}))
        fetch.mockResponseOnce(JSON.stringify({id:124}))
        const response = await getServerSideProps({
            query: {
                hotelId:'diH7',
                destination: 'RsBU' ,
                checkInDate: '2022-09-14',
                checkOutDate: '2022-09-22',
                rooms: '2',
                adults: '2',
                children: '1',
            }
        })
    
        expect(response.props.hotelDetailData).toEqual({id:123})
        expect(response.props.roomDetailData).toEqual({id:124})
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7`)
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=RsBU&checkin=2022-09-14&checkout=2022-09-22&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests=3|3`)
    })

    it("Checks getServerSideProps catches error and returns null", async ()=>{
        fetch.mockReject();
        const response = await getServerSideProps({
            query: {
                hotelId:'diH7',
                destination: 'RsBU' ,
                checkInDate: '2022-09-14',
                checkOutDate: '2022-09-22',
                rooms: '2',
                adults: '2',
                children: '1',
                
            }
        })
    
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7`)
        expect(fetch).toHaveBeenCalledWith(`https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=RsBU&checkin=2022-09-14&checkout=2022-09-22&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests=3|3`)
        expect(response.props.hotelDetailData).toEqual(null)
        expect(response.props.roomDetailData).toEqual(null)
    })

    
   

})

