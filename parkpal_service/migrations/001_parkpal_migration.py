steps = [
    [
        """
        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY NOT NULL,
            national_park_name VARCHAR(50) NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            activites TEXT NOT NULL
        );
        """,
        ## drop the table
        """
        DROP TABLE appointments;
        """
    ]
]




