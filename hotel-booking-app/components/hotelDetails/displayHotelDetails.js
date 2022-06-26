//Pass in a props object (essentially the hotel_detail object)

const hotelDetails = (props) => {
    const hotelName = props.hotel.hotelName;
    const description = props.hotel.description;
    const location = props.hotel.location;
    const roomType = props.hotel.roomType;
    console.log(hotelName,description,location,roomType)

    return (
        <div>
            <h1>{hotelName}</h1>
            <h2>{description}</h2>
            <h3>{location}</h3>
            <p>{roomType}</p>
        </div>
    );
}

export default hotelDetails