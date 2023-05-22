from fastapi import APIRouter, Depends
from queries.national_parks import NationalPark, NationalParkAPIQueries
from typing import List

router = APIRouter()


@router.get("/api/nationalparks", response_model=List[NationalPark])
def get_all_national_parks(
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.get_all_national_parks()    
