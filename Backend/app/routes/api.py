from urllib import response
from fastapi import APIRouter, Body, Depends, HTTPException, Response
import requests
import json
import asyncio

router = APIRouter()

@router.get("/hotels")
async def get_hotels(destination: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://hotelapi.loyalty.dev/api/hotels?destination_id={destination}")
        return res.json()

@router.get("/hotels/prices")
async def get_hotels(hotelId: str, destination: str, checkInDate: str, checkOutDate: str, guestString: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://hotelapi.loyalty.dev/api/hotels/{hotelId}/price?destination_id={destination}&checkin={checkInDate}&checkout={checkOutDate}&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests={guestString}")
        return res.json()

@router.get("/prices")
async def get_hotels(destination: str, checkInDate: str, checkOutDate: str, guestString: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"https://hotelapi.loyalty.dev/api/hotels/prices?destination_id={destination}&checkin={checkInDate}&checkout={checkOutDate}&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests={guestString}")
        return res.json()



