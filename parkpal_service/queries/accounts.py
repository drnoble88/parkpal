from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    username: str
    fullname: str
    email: str
    password: str


class AccountOut(AccountIn):
    id: str


class AccountOutWithPassword(AccountOut):
    hashed_password:str

class Account(BaseModel):
    id: str
    username: str
    fullname: str
    email: str
    hashed_password: str


class AccountQueries:
    # region properties
    
    def get(self, email: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute (
                    """
                    SELECT id, username, fullname, email, hashed_password
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [
                        email
                    ]
                )
                records = result.fetchone()
                print(records)
                return Account(
                    id= records[0],
                    username = records[1],
                    fullname = records[2],
                    email = records[3],
                    hashed_password = records[4]
                )
        

    def create(self, info: AccountIn, hashed_password:str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute (
                    """
                    INSERT INTO accounts
                    (username, fullname, email, hashed_password)
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.fullname,
                        info.email,
                        hashed_password
                    ]
                )
                id = result.fetchone()[0]
                return Account(
                    id= id,
                    username = info.username,
                    fullname = info.fullname,
                    email = info.email,
                    hashed_password = hashed_password
                )
                # old_data = info.dict()
                # old_data["hashed_password"] = hashed_password
                # print(old_data)
                # return AccountOutWithPassword(id=id, **old_data)
