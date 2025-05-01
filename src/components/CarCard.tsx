
import { Link } from "react-router-dom";
import { Car } from "@/services/api";
import { Badge } from "@/components/ui/badge";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Link to={`/cars/${car.car_id}`} className="car-card group animate-scale-in">
      <div className="car-card-image-container">
        <img 
          src={car.images[0]} 
          alt={`${car.brand} ${car.model}`}
          className="car-card-image"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
          <Badge variant="outline" className="font-medium">
            {car.year}
          </Badge>
        </div>
        
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <p>{car.engine_type}</p>
          <p>${car.price.toLocaleString()}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {car.carSpecifications.horsepower} HP
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm font-medium">
              {car.mileage} MPG
            </span>
          </div>
          
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            {car.body_type}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
