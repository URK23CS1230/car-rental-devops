from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Car Rental - Car Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─── Pydantic Schemas ──────────────────────────────────────────────────────────

class CarCreate(BaseModel):
    brand: str
    model: str
    year: int
    price_per_day: float
    car_type: str
    location: str
    status: Optional[str] = "Available"
    image_url: Optional[str] = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop"

class CarResponse(CarCreate):
    id: int
    is_available: bool

    class Config:
        from_attributes = True

# ─── Seed Data ─────────────────────────────────────────────────────────────────

SEED_CARS = [
    {"brand": "Tesla", "model": "Model S Plaid", "year": 2024, "price_per_day": 190, "car_type": "Sedan", "location": "New York", "status": "Available", "image_url": "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop"},
    {"brand": "Porsche", "model": "911 Turbo S", "year": 2023, "price_per_day": 385, "car_type": "Sports", "location": "Los Angeles", "status": "Available", "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop"},
    {"brand": "Mercedes", "model": "G63 AMG", "year": 2024, "price_per_day": 420, "car_type": "SUV", "location": "Miami", "status": "Available", "image_url": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop"},
    {"brand": "Lamborghini", "model": "Urus Performante", "year": 2024, "price_per_day": 850, "car_type": "SUV", "location": "Miami", "status": "Available", "image_url": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop"},
    {"brand": "BMW", "model": "M8 Competition", "year": 2023, "price_per_day": 300, "car_type": "Sports", "location": "New York", "status": "Available", "image_url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop"},
    {"brand": "Audi", "model": "RS e-tron GT", "year": 2023, "price_per_day": 240, "car_type": "Sedan", "location": "Los Angeles", "status": "Available", "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop"},
    {"brand": "Ferrari", "model": "Roma Spider", "year": 2024, "price_per_day": 950, "car_type": "Sports", "location": "Miami", "status": "Available", "image_url": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop"},
    {"brand": "Range Rover", "model": "Sport SVR", "year": 2023, "price_per_day": 310, "car_type": "SUV", "location": "Chicago", "status": "Available", "image_url": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop"},
    {"brand": "Rolls-Royce", "model": "Ghost", "year": 2023, "price_per_day": 1200, "car_type": "Sedan", "location": "New York", "status": "Available", "image_url": "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop"},
    {"brand": "McLaren", "model": "720S Spider", "year": 2023, "price_per_day": 780, "car_type": "Sports", "location": "Los Angeles", "status": "Booked", "image_url": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop"},
    {"brand": "Bentley", "model": "Continental GT", "year": 2024, "price_per_day": 680, "car_type": "Sports", "location": "Chicago", "status": "Available", "image_url": "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop"},
    {"brand": "Aston Martin", "model": "DBX707", "year": 2024, "price_per_day": 590, "car_type": "SUV", "location": "Miami", "status": "Available", "image_url": "https://images.unsplash.com/photo-1562141961-b8a7b2d79b65?w=800&auto=format&fit=crop"},
    {"brand": "Maserati", "model": "GranTurismo", "year": 2023, "price_per_day": 450, "car_type": "Sports", "location": "New York", "status": "Maintenance", "image_url": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop"},
    {"brand": "Porsche", "model": "Cayenne Turbo GT", "year": 2024, "price_per_day": 290, "car_type": "SUV", "location": "Los Angeles", "status": "Available", "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop"},
    {"brand": "Mercedes", "model": "EQS 580", "year": 2024, "price_per_day": 230, "car_type": "Sedan", "location": "Chicago", "status": "Available", "image_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop"},
]

@app.on_event("startup")
async def seed_database():
    db = database.SessionLocal()
    try:
        count = db.query(models.Car).count()
        if count == 0:
            for car_data in SEED_CARS:
                is_available = car_data["status"] == "Available"
                db_car = models.Car(**car_data, is_available=is_available)
                db.add(db_car)
            db.commit()
            print(f"✅ Seeded {len(SEED_CARS)} cars into the database.")
        else:
            print(f"ℹ️ Database already has {count} cars. Skipping seed.")
    finally:
        db.close()

# ─── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    return {"status": "UP"}

@app.post("/cars", response_model=CarResponse)
def add_car(car: CarCreate, db: Session = Depends(get_db)):
    db_car = models.Car(**car.dict(), is_available=(car.status == "Available"))
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

@app.get("/cars", response_model=List[CarResponse])
def get_cars(
    car_type: Optional[str] = None,
    location: Optional[str] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Car)
    if car_type:
        query = query.filter(models.Car.car_type == car_type)
    if location:
        query = query.filter(models.Car.location == location)
    if max_price is not None:
        query = query.filter(models.Car.price_per_day <= max_price)
    return query.all()

@app.get("/cars/{car_id}", response_model=CarResponse)
def get_car(car_id: int, db: Session = Depends(get_db)):
    db_car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@app.put("/cars/{car_id}/status")
def update_status(car_id: int, status: str, db: Session = Depends(get_db)):
    db_car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    db_car.status = status
    db_car.is_available = (status == "Available")
    db.commit()
    return {"message": "Status updated"}

@app.delete("/cars/{car_id}")
def delete_car(car_id: int, db: Session = Depends(get_db)):
    db_car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    db.delete(db_car)
    db.commit()
    return {"message": "Car deleted"}
