import { fireEvent, render, screen } from '@testing-library/react'
import RoomDetail from '../../modules/hotelDetails/components/roomDetails'
import '@testing-library/jest-dom'


describe("Testing for Room",()=>{
    const searchDetails = {
        hotelId:'diH7',
            destination: 'RsBU' ,
            checkInDate: '2022-09-14',
            checkOutDate: '2022-09-22',
            rooms: '1',
            adults: '2',
            children: '0',
    }

    const roomDetailData = {
        "rooms":{"key":"63F2173CE2BF28F8C235F03C6C9363C9","roomDescription":null,"roomNormalizedDescription":"Premier Courtyard","type":"DBT.PE-1","free_cancellation":true,"roomAdditionalInfo":{"breakfastInfo":"hotel_detail_room_only","displayFields":{"special_check_in_instructions":null,"check_in_instructions":null,"know_before_you_go":null,"fees_optional":null,"fees_mandatory":null,"kaligo_service_fee":0,"hotel_fees":[],"surcharges":[{"type":"TaxAndServiceFee","amount":216.8}]}},"description":"PREMIER COURTYARD","images":[{"url":"https://photos.hotelbeds.com/giata/bigger/07/074316/074316a_hb_ro_102.jpg"},{"url":"https://photos.hotelbeds.com/giata/bigger/07/074316/074316a_hb_ro_148.jpg"}],"amenities":["Wheelchair-accessible","Room size (sqm)","Internet access"],"price_type":"single","max_cash_payment":1469.99,"coverted_max_cash_payment":2069.46,"points":5990,"bonuses":0,"lowest_price":1469.99,"price":1500,"converted_price":2069.46,"lowest_converted_price":2069.46,"chargeableRate":1469.99,"market_rates":[{"supplier":"expedia","rate":2069.464710913}]}
    }

    it("Renders Room Detail Component Properly",()=>{
        render(<RoomDetail Room={roomDetailData.rooms} searchDetails={searchDetails}></RoomDetail>);

        const RoomContainer = screen.getByTestId('RoomContainer');
        expect(RoomContainer).toBeInTheDocument();
        const RoomName = screen.getByTestId('RoomName');
        expect(RoomName).toHaveTextContent(`${roomDetailData.rooms.roomNormalizedDescription}`);
        const RoomPictures = screen.getByTestId('RoomPictures');
        expect(RoomPictures).toBeInTheDocument();
        const RoomPrice= screen.getByTestId('RoomPrice');
        expect(RoomPrice).toHaveTextContent(`Price of ${roomDetailData.rooms.roomNormalizedDescription} is : ${roomDetailData.rooms.lowest_price}`);
    })
})