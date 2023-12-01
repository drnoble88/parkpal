from pydantic import BaseModel
from typing import List
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

    def get_one_national_park(self, park_code: str) -> NationalParkOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, fullName, activities, description,
                      phoneNumber, emailAddresses, addresses, images, parkCode
                    FROM nationalparks
                    WHERE parkCode = %s;
                    """,
                    [park_code]
                )
                record = result.fetchone()
                if record:
                    return NationalParkOut(
                        id=record[0],
                        fullName=record[1],
                        activities=ast.literal_eval(record[2]),
                        description=record[3],
                        phoneNumber=record[4],
                        emailAddresses=record[5],
                        addresses=ast.literal_eval(record[6]),
                        images=ast.literal_eval(record[7]),
                        parkCode=record[8]
                    )

    def list_all_national_parks(self) -> List[NationalParkOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                        """
                        SELECT id, fullName, activities, description,
                        phoneNumber, emailAddresses, addresses, images,
                        parkCode
                        FROM nationalparks;
                        """

                    )
                result = db.fetchall()
                return [
                        NationalParkOut(
                            id=record[0],
                            fullName=record[1],
                            activities=ast.literal_eval(record[2]),
                            description=record[3],
                            phoneNumber=record[4],
                            emailAddresses=record[5],
                            addresses=ast.literal_eval(record[6]),
                            images=ast.literal_eval(record[7]),
                            parkCode=record[8]
                        )
                        for record in result
                    ]
