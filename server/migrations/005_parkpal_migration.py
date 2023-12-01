steps = [
    [
        """
        CREATE TABLE nationalparks (
            id SERIAL PRIMARY KEY NOT NULL,
            fullName VARCHAR(200) NOT NULL,
            activities TEXT NOT NULL,
            description TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            emailAddresses TEXT NOT NULL,
            addresses TEXT NOT NULL,
            images TEXT NOT NULL,
            parkCode TEXT NOT NULL
        );
        """,
        """
        DROP TABLE nationalparks;
        """
    ]
]
