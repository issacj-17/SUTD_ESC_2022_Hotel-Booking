import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import hotelDetails , {getServerSideProps} from '../../pages/hotelDetails/index'


describe('Test for HotelDetails Page', () => {

    beforeEach(() =>{
        fetch.resetMocks()
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

