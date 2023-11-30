steps = [
    [
        """
        ALTER TABLE trips
        ADD COLUMN accounts_id INTEGER,
        ADD CONSTRAINT fk_accounts_id
        FOREIGN KEY (accounts_id)
        REFERENCES accounts(id);
        """,
        """
        DROP TABLE trips;
        """
    ]
]
