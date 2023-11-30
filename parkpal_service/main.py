from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< HEAD:sample_service/main.py
import datetime
=======
from authenticator import authenticator
from routers import accounts, trips, national_parks
>>>>>>> main:parkpal_service/main.py

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD:sample_service/main.py

@app.get("/api/date-details")
def date_details():
    now = datetime.datetime.now()
    return {
        "date_details": {
            "year": now.year,
            "month": now.month,
            "day": now.day,
            "hour": now.hour,
            "min": now.minute,
            "tz": str(now.astimezone().tzinfo),
        }
    }
=======
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(trips.router)
app.include_router(national_parks.router)
>>>>>>> main:parkpal_service/main.py
