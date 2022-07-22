import { fireEvent, render, screen } from '@testing-library/react'
import Slider from '../../modules/hotelDetails/components/imageCarousel'
import '@testing-library/jest-dom'
import {convertToListOfUrl} from '../../modules/hotelDetails/components/displayHotelDetails'
describe("Test for ImageCarousel Component",()=>{
    
    const prefix = "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/";
    const suffix = ".jpg";
    //Positive dataset
    const listOfImagesUrlPositive = convertToListOfUrl(10,prefix,suffix);
    //Negative dataset
    const listOfImagesUrlNegative = convertToListOfUrl(3,prefix,suffix);

    //All img src tag should have a valid url link
    it('Renders properly when given >=5 Images',()=>{
        render(<Slider listOfImagesUrl={listOfImagesUrlPositive}></Slider>);
        const listOfImage = screen.getAllByRole("img")
        let idx = 0;
        listOfImage.forEach((image)=>{
            expect(image).toHaveAttribute('src',`${prefix}${idx}${suffix}`)
            idx++
        })
    })


    //Checking for src tag in all img box, urls that dont exist should be empty ''
    it('Still renders given images when given <5 Images',()=>{
        render(<Slider listOfImagesUrl={listOfImagesUrlNegative}></Slider>);
        const listOfImage = screen.getAllByRole("img")
        let idx = 0;
        listOfImage.forEach((image)=>{
            if(idx<3){
                expect(image).toHaveAttribute('src',`${prefix}${idx}${suffix}`)
                idx++
            } else{
                expect(image).toHaveAttribute('src','');
                idx++
            }
        })
    })

    //Check for the Box containing the carousel
    it('Renders the HotelImageBox for the Carousel Component',()=>{
        render(<Slider listOfImagesUrl={listOfImagesUrlNegative}></Slider>);
        const HotelImageBox = screen.getByTestId("hotelImageBox");
        expect(HotelImageBox).toBeInTheDocument();
    })
})