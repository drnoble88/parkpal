import requests
from queries.pool import pool
from queries.national_parks import NationalPark


def seeding_all_national_parks():
    api_key = 'sddc5G1qLchZwcSUwLr1dA2NTiaXvMs5yrOS41jE'
    res = requests.get(
        f'https://developer.nps.gov/api/v1/parks?limit=469&api_key={api_key}'
    )
    data = res.json()
    print(data['data'][0]['contacts']['phoneNumbers'])
    real_data = data['data']
    new_data = []
    all_images = []
    list_activities = []
    phone_number = "No phone number found"
    address = {}

    with pool.connection() as conn:
        with conn.cursor() as db:
            db.execute("SELECT parkCode FROM nationalparks;")
            existing_park_codes = {row[0] for row in db.fetchall()}

            for entry in real_data:
                park_code = entry["parkCode"]
                if park_code in existing_park_codes:
                    print(f"Skipping seeding for park code: {park_code}")
                    continue

                for index in range(len(entry["images"])):
                    all_images.append(entry["images"][index]["url"])
                for index in range(len(entry["activities"])):
                    list_activities.append(entry["activities"][index]["name"])
                if len(entry["contacts"]["phoneNumbers"]) != 0:
                    phone_number = (entry["contacts"]["phoneNumbers"]
                                    [0]["phoneNumber"])
                if len(entry["addresses"]) != 0:
                    address = entry["addresses"][0]
                national_park = NationalPark(
                    fullName=entry["fullName"],
                    activities=list_activities,
                    description=entry["description"],
                    phoneNumber=phone_number,
                    emailAddresses=(entry["contacts"]["emailAddresses"]
                                    [0]["emailAddress"]),
                    addresses=address,
                    images=all_images,
                    parkCode=park_code
                )

                db.execute(
                    """
                    INSERT INTO nationalparks
                    (fullName, activities, description, phoneNumber,
                    emailAddresses, addresses, images, parkCode)
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
                print("Seed successful")


seeding_all_national_parks()
