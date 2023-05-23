from fastapi import APIRouter, Depends
from queries.national_parks import NationalPark, NationalParkAPIQueries, NationalParkOut
from typing import List

router = APIRouter()


@router.get("/api/seednationalparks", response_model=List[NationalPark])
def seeding_all_national_parks(
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.seeding_all_national_parks()    

@router.get("/api/nationalparks/{park_code}", response_model=NationalParkOut)
def get_one_national_park(
    park_code,
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.get_one_national_park(park_code)    

@router.get("/api/nationalparks", response_model=List[NationalParkOut])
def list_all_national_parks(
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.list_all_national_parks()    
from fastapi import APIRouter, Depends
from queries.national_parks import NationalPark, NationalParkAPIQueries, NationalParkOut
from typing import List

router = APIRouter()


@router.get("/api/seednationalparks", response_model=List[NationalPark])
def seeding_all_national_parks(
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.seeding_all_national_parks()    

@router.get("/api/nationalparks/{park_code}", response_model=NationalParkOut)
def get_one_national_park(
    park_code,
    repo: NationalParkAPIQueries = Depends(),
): 
    return repo.get_one_national_park(park_code)    
