
import React from 'react'
import styles from '../../../styles/displayHotelDetails.module.css'
import {MapContainer,TileLayer,Marker} from "react-leaflet"
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

L.Icon.Default.imagePath='images/';


export default function mapDisplay({latitude,longitude}) {
  console.log(latitude,longitude)
  const position = [latitude,longitude]
  
  if(latitude===null || longitude===null){
    return null;
  }
  return (
    <div className=" col" data-testid="MapContainer">
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{width:'auto' ,height:'300px'}}>
      <TileLayer data-testId="TileLayer" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
      contributors'/>
      <Marker position={position} data-testid="Marker"></Marker>
    </MapContainer>
    </div>
    
    ) 
}
