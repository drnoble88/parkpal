from pydantic import BaseModel
from typing import List
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    national_park_name: str
    start_date: date
    end_date: date
    activities: str


class TripOut(TripIn):
    id: str
    account_id: str


class TripsRepository:
    def create(self, trip: TripIn, account_id: int) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO trips
                        (national_park_name, start_date, end_date, activities,\
                            accounts_id)
                        VALUES
                        (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        trip.national_park_name,
                        trip.start_date,
                        trip.end_date,
                        trip.activities,
                        account_id
                    ]
                )
                id = result.fetchone()[0]
                return TripOut(
                    id=id,
                    account_id=account_id,
                    national_park_name=trip.national_park_name,
                    start_date=trip.start_date,
                    end_date=trip.end_date,
                    activities=trip.activities
                )

    def get_one(self, trip_id: int) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, national_park_name, start_date, end_date,\
                    activities, accounts_id
                    FROM trips
                    WHERE id = %s;
                    """,
                    [
                        trip_id
                    ]
                )
                records = result.fetchone()
                return TripOut(
                    id=records[0],
                    account_id=records[5],
                    national_park_name=records[1],
                    start_date=records[2],
                    end_date=records[3],
                    activities=records[4]
                )

    def get_all(self, account_id: int) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, national_park_name, start_date, end_date,\
                        activities, accounts_id
                    FROM trips
                    WHERE accounts_id = %s
                    ORDER BY start_date;
                    """,
                    [account_id]
                )
                result = db.fetchall()
                return [
                    TripOut(
                        id=record[0],
                        account_id=record[5],
                        national_park_name=record[1],
                        start_date=record[2],
                        end_date=record[3],
                        activities=record[4]
                    )
                    for record in result
                ]

    def update_trip(self, trip_id: int,
                    trip: TripIn, account_id: int) -> TripOut:
        print("trip IN", trip)
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE trips
                    SET national_park_name = %s
                    , start_date = %s
                    , end_date = %s
                    , activities = %s
                    WHERE id = %s
                    """,
                    [
                        trip.national_park_name,
                        trip.start_date,
                        trip.end_date,
                        trip.activities,
                        trip_id
                    ]
                )
                return TripOut(
                    id=trip_id,
                    account_id=account_id,
                    national_park_name=trip.national_park_name,
                    start_date=trip.start_date,
                    end_date=trip.end_date,
                    activities=trip.activities
                )

    def delete_one_trip(self, trip_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM trips
                    WHERE id = %s
                    """,
                    [trip_id]
                )
            return True
