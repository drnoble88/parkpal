from fastapi.testclient import TestClient
from queries import national_parks
from main import app
from queries.national_parks import NationalParkAPIQueries

client = TestClient(app)


class FakeNationalParkAPIQueries:
    def get_one_national_park(self, park_code: str):
        return {
                "fullName": "Abraham Lincoln Birthplace National Historical Park",
                "activities": [
                    "Astronomy",
                    "Stargazing",
                    "Food",
                    "Picnicking",
                    "Guided Tours",
                    "Self-Guided Tours - Walking",
                    "Hands-On",
                    "Junior Ranger Program",
                    "Wildlife Watching",
                    "Birdwatching",
                    "Park Film",
                    "Museum Exhibits",
                    "Shopping",
                    "Bookstore and Park Store",
                    "Gift Shop and Souvenirs"
                ],
                "description": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.",
                "phoneNumber": "2703583137",
                "emailAddresses": "ABLI_Administration@nps.gov",
                "addresses": {
                    "postalCode": "42748",
                    "city": "Hodgenville",
                    "stateCode": "KY",
                    "countryCode": "US",
                    "provinceTerritoryCode": "",
                    "line1": "2995 Lincoln Farm Road",
                    "type": "Physical",
                    "line3": "",
                    "line2": ""
                },
                "images": [
                    "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg",
                    "https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg",
                    "https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg",
                    "https://www.nps.gov/common/uploads/structured_data/3C8614D1-1DD8-B71B-0B1AF72CA452B051.jpg"
                ],
                "parkCode": park_code,
                "id": "1"
}

    def list_all_national_parks(self):
        return []


def test_list_all_national_parks():
    # Override the dependency with FakeNationalParkAPIQueries
    app.dependency_overrides[NationalParkAPIQueries] = FakeNationalParkAPIQueries
    # Send a GET request to the /api/nationalparks endpoint
    res = client.get("/api/nationalparks")
    #Assert the respon data 
    data = res.json()
    #Assert the response status code
    assert res.status_code == 200
    #Assert the respon data 
    assert data == []


def test_get_one_national_park():
    app.dependency_overrides[NationalParkAPIQueries] = FakeNationalParkAPIQueries

    res = client.get("/api/nationalparks/abr")
    data = res.json()

    assert res.status_code == 200
    assert data["parkCode"] == "abr"



