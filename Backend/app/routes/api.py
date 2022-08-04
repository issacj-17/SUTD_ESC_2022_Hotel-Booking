from urllib import response
from fastapi import APIRouter, Body, Depends, HTTPException, Response
import requests

router = APIRouter()

# @router.get("/hotels")
# async def get_hotels(destination: str):
#     res = requests.get(f"https://hotelapi.loyalty.dev/api/hotels?destination_id={destination}")
#     return res.json()

@router.get("/hotels")
def get_hotels(destination: str):
    response = requests.get(f"https://hotelapi.loyalty.dev/api/hotels", params={'destination_id':destination})
    return response.json()

@router.get("/hotels/prices")
def get_hotels(hotelId: str, destination: str, checkInDate: str, checkOutDate: str, guestString: str):
    response = requests.get(f"https://hotelapi.loyalty.dev/api/hotels/{hotelId}/price", params={'destination_id':destination, 'checkin':checkInDate, 'checkout':checkOutDate, 'lang':'en_US', 'currency':'SGD', 'landing_page': '', 'partner_id': 1, 'country_code': 'SG', 'guests': guestString})
    return response.json()

@router.get("/prices")
def get_hotels(destination: str, checkInDate: str, checkOutDate: str, guestString: str):
    print("reached request")
    response = requests.get(f"https://hotelapi.loyalty.dev/api/hotels/prices", params={'destination_id':destination, 'checkin':checkInDate, 'checkout':checkOutDate, 'lang':'en_US', 'currency':'SGD', 'landing_page': '', 'partner_id': 1, 'country_code': 'SG', 'guests': guestString})
    print(response.status_code)
    return response.json()



