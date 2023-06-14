steps = [
    [
        """
        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY NOT NULL,
            national_park_name VARCHAR(50) NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            activities TEXT NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE appointments;
        """
    ],
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL,
            fullname VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            hashed_password VARCHAR(50) NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE accounts;
        """
    ]
]
