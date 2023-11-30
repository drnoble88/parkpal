steps = [
    [
        """
        ALTER TABLE accounts
        ALTER COLUMN hashed_password TYPE VARCHAR(1000);
        """,
        """
        DROP TABLE accounts;
        """
    ]
]
