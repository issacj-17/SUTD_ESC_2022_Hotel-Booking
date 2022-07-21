from fastapi import APIRouter, Body, Depends, HTTPException, Response

router = APIRouter(prefix="/booking", tags=["Booking"])