from fastapi.testclient import TestClient
from queries.trips import TripIn, TripOut, TripsRepository
from main import app
from typing import List
from authenticator import authenticator

client = TestClient(app)


class FakeTripsRepository:
    def get_one(self, trip_id: int):
        return {
            "national_park_name": "string",
            "start_date": "2023-06-06",
            "end_date": "2023-06-06",
            "activities": "string",
            "id": trip_id,
            "account_id": "string"
        }

    def get_all(self, account_id: int):
        return []

    def delete_one_trip(self, trip_id: int) -> bool:
        return True


def fake_get_current_account_data():
    return {"id": "1337"}


def test_get_all():
    # Override the TripsRepository dependency with the FakeTripsRepository
    app.dependency_overrides[TripsRepository] = FakeTripsRepository
    # Override the authenticator.get_current_account_data dependency with fake_get_current_account_data
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    # Send a GET request to the /api/trips endpoint
    res = client.get("/api/trips")
    # Get the response data as JSON
    data = res.json()

    # Assert that the response status code is 200 (OK)
    assert res.status_code == 200
    # Assert that the response data is an empty list
    assert data == []


def test_get_one():
    app.dependency_overrides[TripsRepository] = FakeTripsRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    res = client.get("/api/trip/1")
    data = res.json()

    assert res.status_code == 200
    # Assert that the "id" field in the response data matches the expected value "1"
    assert data["id"] == "1"


def test_delete_trip():
    app.dependency_overrides[TripsRepository] = FakeTripsRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    res = client.delete("/api/trip/1")
    data = res.json()

    assert res.status_code == 200
    assert data is True
