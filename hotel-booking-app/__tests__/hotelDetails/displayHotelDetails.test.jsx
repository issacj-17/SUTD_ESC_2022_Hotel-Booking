import { fireEvent, render, screen } from '@testing-library/react'
import DisplayHotelDetails,{convertToListOfUrl} from '../../modules/hotelDetails/components/displayHotelDetails'
import '@testing-library/jest-dom'

describe('Test for displayHotelDetails',()=>{
    //Props to be passed in to DisplayHotelDetails
    const hotelDetailData = {
        name:"hayden's Hotel",
        description:"<p>Hiii</p>",
        address:"ABC Plaza",
        longitude:90,
        latitude: 90,
        image_details:{"suffix":".jpg","count":56,"prefix":"https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"}
    }
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
        "rooms":[{"key":"63F2173CE2BF28F8C235F03C6C9363C9","roomDescription":null,"roomNormalizedDescription":"Premier Courtyard","type":"DBT.PE-1","free_cancellation":true,"roomAdditionalInfo":{"breakfastInfo":"hotel_detail_room_only","displayFields":{"special_check_in_instructions":null,"check_in_instructions":null,"know_before_you_go":null,"fees_optional":null,"fees_mandatory":null,"kaligo_service_fee":0,"hotel_fees":[],"surcharges":[{"type":"TaxAndServiceFee","amount":216.8}]}},"description":"PREMIER COURTYARD","images":[{"url":"https://photos.hotelbeds.com/giata/bigger/07/074316/074316a_hb_ro_102.jpg"},{"url":"https://photos.hotelbeds.com/giata/bigger/07/074316/074316a_hb_ro_148.jpg"}],"amenities":["Wheelchair-accessible","Room size (sqm)","Internet access"],"price_type":"single","max_cash_payment":1469.99,"coverted_max_cash_payment":2069.46,"points":5990,"bonuses":0,"lowest_price":1469.99,"price":2069.46,"converted_price":2069.46,"lowest_converted_price":2069.46,"chargeableRate":1469.99,"market_rates":[{"supplier":"expedia","rate":2069.464710913}]}]
    }

    it("Renders the Component properly",()=>{
        render(<DisplayHotelDetails selectedHotelData={hotelDetailData} searchDetails={searchDetails} roomData={roomDetailData}>

        </DisplayHotelDetails>)

        //Hotel Name 
        const hotelName =  screen.getByTestId('hotelName');
        expect(hotelName).toBeInTheDocument();
        expect(hotelName).toHaveTextContent("hayden's Hotel")
        
        //HotelImagesBox (Inside Carousel so nonnid test here)

        //Description Box
        const Description = screen.getByTestId('description');
        expect(Description).toBeInTheDocument();
        expect(Description).toHaveTextContent("Hiii")
        
        //Location Box
        const LocationBox = screen.getByTestId("locationBox");
        expect(LocationBox).toBeInTheDocument();
        //Address Name
        const Location = screen.getByTestId('location');
        expect(Location).toBeInTheDocument();
        expect(Location).toHaveTextContent("ABC Plaza")

        //ListOfHotelRoomsBox
        const RoomBox = screen.getByTestId("listOfHotelRoomBox")
        expect(RoomBox).toBeInTheDocument();
        
    }) 

    test("convertToListUrl function works given a count of <5",()=>{
        const result = convertToListOfUrl(2,"ABC",".com");
        expect(result.length).toEqual(1);
        expect(result[0].length).toEqual(5);
        expect(result[0][1]).toEqual("ABC1.com");
        expect(result[0][2]).toEqual("");
    })

    test("convertToListUrl function works given a count of >5/<9",()=>{
        const result = convertToListOfUrl(9,"ABC",".com");
        expect(result.length).toEqual(1);
        expect(result[0].length).toEqual(5);
        expect(result[0][1]).toEqual("ABC1.com");
        expect(result[0][4]).toEqual("ABC4.com");
    })

    test("convertToListUrl function works given a count of >5/<9",()=>{
        const result = convertToListOfUrl(9,"ABC",".com");
        expect(result.length).toEqual(1);
        expect(result[0].length).toEqual(5);
        expect(result[0][1]).toEqual("ABC1.com");
        expect(result[0][4]).toEqual("ABC4.com");
    })

    test("convertToListUrl function works given a count of >10",()=>{
        const result = convertToListOfUrl(17,"ABC",".com");
        expect(result.length).toEqual(3);
        expect(result[2].length).toEqual(5);
        expect(result[1][1]).toEqual("ABC6.com");
        expect(result[2][4]).toEqual("ABC14.com");
    })

    test("convertToListUrl function returns [] given invalid",()=>{
        const result = convertToListOfUrl(null,"ABC",".com");
        expect(result).toEqual([]);
        const result1 = convertToListOfUrl("9","ABC",".com");
        expect(result1).toEqual([]);
    })

})