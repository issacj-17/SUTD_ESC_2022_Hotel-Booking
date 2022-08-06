from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import ORJSONResponse
import httpx
import orjson as json

router = APIRouter()

@router.get("/hotels", response_class=ORJSONResponse)
async def get_hotels(destination: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://hotelapi.loyalty.dev/api/hotels", params={'destination_id':destination})
    client.aclose()
    print(res.json())
    return res.json()

@router.get("/hotels/id", response_class=ORJSONResponse)
async def get_hotels(hotelId: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://hotelapi.loyalty.dev/api/hotels/{hotelId}")
    client.aclose()
    print(res.json())
    return res.json()

@router.get("/hotels/prices", response_class=ORJSONResponse)
async def get_hotels_prices(hotelId: str, destination: str, checkInDate: str, checkOutDate: str, guests: str):
    async with httpx.AsyncClient() as client:
        req = httpx.Request("GET", f"https://hotelapi.loyalty.dev/api/hotels/{hotelId}/price", \
                                params={'destination_id': destination, 'checkin': checkInDate, 'checkout': checkOutDate, \
                                        'lang': 'en_US', 'currency': 'SGD', 'partner_id': 16, 'country_code': 'SG',
                                        'guests': guests})
        print(req)
        res = await client.send(req)
        completed = res.json()['completed']
        client.aclose()
        print(res.json())
    return res.json()

@router.get("/prices", response_class=ORJSONResponse)
async def get_prices(destination: str, checkInDate: str, checkOutDate: str, guests: str):
    async with httpx.AsyncClient() as client:
        req = httpx.Request("GET", f"https://hotelapi.loyalty.dev/api/hotels/prices", \
                             params={'destination_id':destination, 'checkin':checkInDate, \
                                     'checkout':checkOutDate, 'lang':'en_US', 'currency':'SGD', \
                                     'landing_page': '', 'partner_id': 16, 'country_code': 'SG', 'guests': guests})
        print(req)
        res = await client.send(req)
        print(res.json()['completed'])
        completed = res.json()['completed']
        client.aclose()
        print(res.json())
    return res.json()