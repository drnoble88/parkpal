from fastapi import APIRouter, Depends
from queries.trips import TripIn, TripOut, TripsRepository
from typing import List
from authenticator import authenticator


router = APIRouter()


@router.post("/api/trips", response_model=TripOut)
def create_trip(
    trip: TripIn,
    repo: TripsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    return repo.create(trip, account_data["id"])


@router.get("/api/trips", response_model=List[TripOut])
def get_all_trips(
    repo: TripsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    return repo.get_all(account_data["id"])


@router.get("/api/trip/{trip_id}", response_model=TripOut)
def get_one_trip(
    trip_id,
    repo: TripsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    return repo.get_one(trip_id)


@router.put("/api/trip/{trip_id}", response_model=TripOut)
def update_one_trip(
    trip_id,
    trip: TripIn,
    repo: TripsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    return repo.update_trip(trip_id, trip, account_data["id"])


@router.delete("/api/trip/{trip_id}", response_model=bool)
def delete_one_trip(
    trip_id,
    repo: TripsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    return repo.delete_one_trip(trip_id)
