from pydantic import BaseModel
from typing import List
import requests
# from env.sample import API_KEY


class NationalPark(BaseModel):
    fullName: str
    activities: list
    description: str
    phoneNumber: str
    emailAddresses: str
    addresses: dict
    images: list
    parkCode: str


class NationalParkAPIQueries:
    def get_all_national_parks(self) -> List[NationalPark]:
        res = requests.get('https://developer.nps.gov/api/v1/parks?limit=40&api_key=sddc5G1qLchZwcSUwLr1dA2NTiaXvMs5yrOS41jE')
        data = res.json()
        real_data = data['data']
        new_data = []
        all_images = []
        phone_number = 'No phone number found'
        for entry in real_data:
            for index in range(len(entry["images"])):
                all_images.append(entry["images"][index]["url"])
            if len(entry["contacts"]["phoneNumbers"]) != 0:
                phone_number = entry["contacts"]["phoneNumbers"][0]["phoneNumber"]
            national_park = NationalPark(
                fullName=entry["fullName"],
                activities=entry["activities"],
                description=entry["description"],
                phoneNumber=phone_number,
                emailAddresses=entry["contacts"]["emailAddresses"][0]["emailAddress"],
                addresses=entry["addresses"][0],
                images=all_images,
                parkCode=entry["parkCode"]
            )
            new_data.append(national_park)
            all_images = []
            phone_number = 'No phone number found'
        return new_data
