from pydantic import BaseModel
from typing import List
import requests
from queries.pool import pool
import ast
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

class NationalParkOut(NationalPark):
    id: str


    
class NationalParkAPIQueries:
    def seeding_all_national_parks(self) -> List[NationalPark]:
        res = requests.get('https://developer.nps.gov/api/v1/parks?limit=469&api_key=sddc5G1qLchZwcSUwLr1dA2NTiaXvMs5yrOS41jE')
        data = res.json()
        real_data = data['data']
        new_data = []
        all_images = []
        list_activities = []
        phone_number = "No phone number found"
        address = {}
        for entry in real_data:
            for index in range(len(entry["images"])):
                all_images.append(entry["images"][index]["url"])
            for index in range(len(entry["activities"])):
                list_activities.append(entry["activities"][index]["name"])
            if len(entry["contacts"]["phoneNumbers"]) != 0:
                phone_number = entry["contacts"]["phoneNumbers"][0]["phoneNumber"]
            if len(entry["addresses"]) != 0:
                address = entry["addresses"][0]
            national_park = NationalPark(
                fullName=entry["fullName"],
                activities= list_activities,
                description=entry["description"],
                phoneNumber=phone_number,
                emailAddresses=entry["contacts"]["emailAddresses"][0]["emailAddress"],
                addresses= address,
                images=all_images,
                parkCode=entry["parkCode"]
            )
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute (
                        """
                        INSERT INTO nationalparks
                        (fullName, activities, description, phoneNumber, emailAddresses, addresses, images, parkCode)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            str(national_park.fullName),
                            str(national_park.activities),
                            str(national_park.description),
                            str(national_park.phoneNumber),
                            str(national_park.emailAddresses),
                            str(national_park.addresses),
                            str(national_park.images),
                            str(national_park.parkCode)
                        ]
                    )

            new_data.append(national_park)
            all_images = []
            list_activities = []
            phone_number = "No phone number found"
            address = {}

        return new_data


    def get_one_national_park(self, park_code: str) -> NationalParkOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, fullName, activities, description, phoneNumber, emailAddresses, addresses, images, parkCode
                    FROM nationalparks
                    WHERE parkCode = %s;
                    """,
                    [park_code]
                )
                record = result.fetchone()
                if record:
                    return NationalParkOut(
                        id= record[0],
                        fullName= record[1],
                        activities= ast.literal_eval(record[2]),
                        description= record[3],
                        phoneNumber= record[4],
                        emailAddresses= record[5],
                        addresses= ast.literal_eval(record[6]),
                        images= ast.literal_eval(record[7]),
                        parkCode= record[8]
                    )


    def list_all_national_parks(self) -> List[NationalParkOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, fullName, activities, description, phoneNumber, emailAddresses, addresses, images, parkCode
                        FROM nationalparks;
                        """

                    )
                    result = db.fetchall()
                    return [
                        NationalParkOut(
                            id= record[0],
                            fullName= record[1],
                            activities= ast.literal_eval(record[2]),
                            description= record[3],
                            phoneNumber= record[4],
                            emailAddresses= record[5],
                            addresses= ast.literal_eval(record[6]),
                            images= ast.literal_eval(record[7]),
                            parkCode= record[8]
                        )
                        for record in result
                    ]