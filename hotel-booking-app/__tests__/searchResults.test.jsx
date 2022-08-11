import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import SearchResults, {getServerSideProps} from '../pages/searchResults';
import HotelComponent from '../modules/searchResults/components/HotelComponent';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
jest.setTimeout(20000);

describe('Search Results', () => {
  // Clear fetch API history
  beforeEach(() => fetchMock.resetMocks())

  // Sample Data
  const expectedSearchDetails = {
    destination:"RsBU",
    checkInDate:"2022-09-20",
    checkOutDate:"2022-09-25",
    rooms:"1",
    adults:"2",
    children:"0"
  };
  const expectedHotels = [{id:"050G",imageCount:52,name:"The Forest by Wangz",address:"145A Moulmein Road",rating:4.0,image_details:{suffix:".jpg",count:52,prefix:"https://d2ey9sqrvkqdfs.cloudfront.net/050G/"},default_image_index:1,trustyou:{id:"dede9a48-2f7c-49ae-9bd0-942a40e245e7",score:{overall:94,kaligo_overall:4.7,solo:null,couple:94,family:93,business:null}}}];
  const expectedPrice = {
    "id": "050G",
    "searchRank": 0.93,
    "price_type": "multi",
    "max_cash_payment": 646.38,
    "coverted_max_cash_payment": 897.93,
    "points": 22425,
    "bonuses": 0,
    "lowest_price": 646.38,
    "price": 897.93,
    "converted_price": 897.93,
    "lowest_converted_price": 897.93,
    "market_rates": [
        {
            "supplier": "expedia",
            "rate": 790.2288709775
        }
    ]
}



  // Test Main Page
  test("should render Search Results properly", async () => {
    render(<SearchResults hotels={expectedHotels} searchDetails={expectedSearchDetails}/>);
    fetchMock.mockResponse(JSON.stringify({
      "searchCompleted": null,
      "completed": true,
      "status": null,
      "currency": "SGD",
      "hotels": [
        {
            "id": "050G",
            "searchRank": 0.93,
            "price_type": "multi",
            "max_cash_payment": 646.38,
            "coverted_max_cash_payment": 897.93,
            "points": 22425,
            "bonuses": 0,
            "lowest_price": 646.38,
            "price": 897.93,
            "converted_price": 897.93,
            "lowest_converted_price": 897.93,
            "market_rates": [
                {
                    "supplier": "expedia",
                    "rate": 790.2288709775
                }
            ]
        }
      ]
  }));
    // Heading of page
    const header = await screen.findByText('Search Results', {},{timeout:15000, interval:1000});
    await expect(header).toBeInTheDocument();
  });



  // Test HotelComponent
  test('should render a HotelComponent properly', () => {
    render(<HotelComponent hotels={expectedHotels} searchDetails={expectedSearchDetails} price={expectedPrice}/>);

    // Image
    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `${expectedHotels[0].image_details.prefix}${expectedHotels[0].default_image_index}${expectedHotels[0].image_details.suffix}`)

    // Name
    const name = screen.getByTestId('hotelName');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(`${expectedHotels[0].name}`);

    // Address
    const addr = screen.getByTestId('hotelAddr');
    expect(addr).toBeInTheDocument();
    expect(addr).toHaveTextContent(`${expectedHotels[0].address}`);

    // Rating
    const rating = screen.getByTestId('rating');
    expect(rating).toBeInTheDocument();
    expect(rating).toHaveTextContent(`Rated ${expectedHotels[0].trustyou.score.overall}/100`)
    
    // Button
    const button = screen.getByTestId('selectButton');
    expect(button).toBeInTheDocument();
    // TODO: test router
  });



  // Test ServersideProps
  test('should check whether getServerSideProps returns correct props when data is returned', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({test:"Hotel Data"}));
    
    const serverSideProps = await getServerSideProps({query: {
      destination:"WD0M",
      checkInDate:"2011-11-11",
      checkOutDate:"2012-12-12",
      rooms:"1",
      adults:"2",
      children:"1"
    }});

    expect(serverSideProps).toEqual({
      props: {
        hotels: {test:"Hotel Data"},
        searchDetails: {
          destination:"WD0M",
          checkInDate:"2011-11-11",
          checkOutDate:"2012-12-12",
          rooms:"1",
          adults:"2",
          children:"1"
        }
      }
    });

    expect(fetchMock).toHaveBeenCalledWith("https://hotelapi.loyalty.dev/api/hotels?destination_id=WD0M");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    });


  test('should check whether getServerSideProps can handle the API call failing', async () => {
    fetchMock.mockReject();
    
    const serverSideProps = await getServerSideProps({query: {
      destination:"WD0M",
      checkInDate:"2011-11-11",
      checkOutDate:"2012-12-12",
      rooms:"1",
      adults:"2",
      children:"1"
    }});

    expect(serverSideProps).toEqual({
      props: {
        hotels: null,
        searchDetails: {
          destination:"WD0M",
          checkInDate:"2011-11-11",
          checkOutDate:"2012-12-12",
          rooms:"1",
          adults:"2",
          children:"1"
        }
      }
    });

    expect(fetchMock).toHaveBeenCalledWith("https://hotelapi.loyalty.dev/api/hotels?destination_id=WD0M");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});



