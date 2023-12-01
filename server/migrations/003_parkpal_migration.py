steps = [
    [
        """
        ALTER TABLE appointments RENAME TO trips;
        """,
        """
        DROP TABLE trips;
        """
    ]
]
