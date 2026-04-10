from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    model = Column(String, index=True)
    year = Column(Integer)
    price_per_day = Column(Float)
    car_type = Column(String, index=True)  # SUV, Sedan, Sports, Hatchback, etc.
    location = Column(String, index=True)
    is_available = Column(Boolean, default=True)
    status = Column(String, default="Available")  # Available / Booked / Maintenance
    image_url = Column(String, default="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop")
