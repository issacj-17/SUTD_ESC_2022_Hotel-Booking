import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import SearchResults, {getServerSideProps} from '../pages/searchResults';
import HotelComponent from '../modules/searchResults/components/HotelComponent';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Search Results', () => {
  // Clear fetch API history
  beforeEach(() => fetchMock.resetMocks())

  // Sample Data
  const expectedSearchDetails = {
    destination:"WD0M",
    checkInDate:"2011-11-11",
    checkOutDate:"2012-12-12",
    rooms:"1",
    adults:"2",
    children:"1"
  };
  const expectedHotels = [{id:"050G",imageCount:52,name:"The Forest by Wangz",address:"145A Moulmein Road",rating:4.0,image_details:{suffix:".jpg",count:52,prefix:"https://d2ey9sqrvkqdfs.cloudfront.net/050G/"},default_image_index:1,trustyou:{id:"dede9a48-2f7c-49ae-9bd0-942a40e245e7",score:{overall:94,kaligo_overall:4.7,solo:null,couple:94,family:93,business:null}}}];


  // Test Main Page
  test("should render Search Results properly", () => {
    render(<SearchResults hotels={expectedHotels} searchDetails={expectedSearchDetails}/>);

    // Heading of page
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(`Search Results for ${expectedSearchDetails.destination}`);
  });


  // Test HotelComponent
  test('should render a HotelComponent properly', () => {
    render(<HotelComponent hotel={expectedHotels[0]} searchDetails={expectedSearchDetails}/>);

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



