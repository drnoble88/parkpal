from fastapi import APIRouter, Depends, Response
from queries.trips import TripIn,TripOut,Error, TripsRespository
from typing import Union, List
from authenticator import authenticator

router = APIRouter()

@router.post("/api/trips", response_model = TripOut)
def create_trip(
    trip: TripIn,
    repo: TripsRespository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    return repo.create(trip)

@router.get("api/trip/{trips_id}", response_model = TripOut)
def get_one_trip(
    trip_id,
    repo: TripsRespository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    return repo.get_one(trip_id)


@router.get("/api/trips", response_model = List[TripOut])
def get_all_trips(
    repo: TripsRespository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    return repo.get_all()
