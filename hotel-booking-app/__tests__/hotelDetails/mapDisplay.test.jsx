import { fireEvent, queryByTestId, render, screen } from '@testing-library/react'
import MapDisplay from '../../modules/hotelDetails/components/mapDisplay'
import '@testing-library/jest-dom'

describe("Testing for MapDisplay Component",()=>{
    const latitude = 56;
    const longitude = 70;
    it("Renders the Map Upon Valid Inputs",()=>{
        render(<MapDisplay latitude={latitude} longitude={longitude}/>);
        //Checks that the container containing the react-leaflet components exists
        const MapContainer = screen.getByTestId('MapContainer');
        expect(MapContainer).toBeInTheDocument();
        // const TileLayer = screen.getByTestId('TileLayer');
        // expect(TileLayer).toBeInTheDocument();
        // const Marker = screen.getByTestId('Marker');
        // expect(Marker).toBeInTheDocument();
    })

    it("Returns Null the Map Upon InValid Inputs",()=>{
        const {container} = render(<MapDisplay latitude={null} longitude={null}/>);
        //WorkAround method to check that nth is rendered
        expect(container.childElementCount).toEqual(0);
        // render(<MapDisplay latitude={null} longitude={null}/>)
        // const MapContainer = queryByTestId("MapContainer");
        // expect(MapContainer).toBeNull()
    })
})