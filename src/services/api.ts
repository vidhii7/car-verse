
// Car data interface definitions
export interface CarColor {
  [colorName: string]: string;
}

export interface CarFeature {
  name: string;
  value: string;
  category: string;
  feature_id: number;
  car_id: number;
}

export interface CarSpecifications {
  transmission_type: string;
  drive_train: string;
  gearbox: string;
  top_speed: number;
  fuel_efficiency_highway: number;
  cylinders: number;
  engine_displacement: number;
  specifications_id: number;
  acceleration_0_100_kmph: number;
  fuel_efficiency_city: number;
  valves_per_cylinder: number;
  car_id: number;
  horsepower: number;
  torque: number;
  boot_space: number;
  fuel_tank_capacity: number;
  ground_clearance: number;
}

export interface CarDimensions {
  dimensions_id: number;
  car_id: number;
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  ground_clearance: number;
  curb_weight: number;
}

export interface Car {
  updated_at: string;
  created_at: string;
  variant_type: string;
  model: string;
  body_type: string;
  variant_code: string;
  emission_norm: string;
  engine_type: string;
  brand: string;
  brochure_url: string;
  images: string[];
  colors: CarColor;
  carReviews: null;
  carPricingHistory: Array<{
    date: string;
    pricing_id: number;
    car_id: number;
    price: number;
  }>;
  carFeatures: CarFeature[];
  carSpecifications: CarSpecifications;
  carDimensions: CarDimensions;
  mileage: number;
  price: number;
  car_id: number;
  year: number;
}

export interface CarsResponse {
  data: Car[];
  status: string;
  message: string;
}

// Mock image URLs for cars (since no images were provided in the data)
const carImages = {
  "Hyundai-Verna": [
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop"
  ],
  "Toyota-Camry": [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2668&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2672&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2983&auto=format&fit=crop"
  ],
  "BMW-3Series": [
    "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617814076668-11b2aa7c2f8b?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2670&auto=format&fit=crop"
  ],
  "Audi-A4": [
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2609&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2664&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2574&auto=format&fit=crop"
  ]
};

// Mock API function to fetch car data
export const fetchCars = async (): Promise<Car[]> => {
  // Using the provided mock data
  const mockData: CarsResponse = {
    "data": [
      {
        "updated_at": "2025-03-28T17:49:22.393337Z",
        "created_at": "2025-03-28T17:49:22.393337Z",
        "variant_type": "top",
        "model": "Verna",
        "body_type": "sedan",
        "variant_code": "Verna-MPi-EX-2025",
        "emission_norm": "BS6",
        "engine_type": "1.5 l MPi Petrol",
        "brand": "Hyundai",
        "brochure_url": "",
        "images": [],
        "colors": {
          "Atlas White": "#FFFFFF",
          "Fiery Red": "#FF0000",
          "Titan Grey": "#4B4B4B"
        },
        "carReviews": null,
        "carPricingHistory": [
          {
            "date": "2025-03-28T17:49:22.956658Z",
            "pricing_id": 2,
            "car_id": 2,
            "price": 14000
          }
        ],
        "carFeatures": [
          // Features truncated for brevity
          {
            "name": "Projector headlamps",
            "value": "Yes",
            "category": "Exterior - Lighting",
            "feature_id": 86,
            "car_id": 2
          }
        ],
        "carSpecifications": {
          "transmission_type": "6-Speed Manual",
          "drive_train": "Front-Wheel Drive",
          "gearbox": "MT",
          "top_speed": 170,
          "fuel_efficiency_highway": 21.5,
          "cylinders": 4,
          "engine_displacement": 1497,
          "specifications_id": 2,
          "acceleration_0_100_kmph": 10.5,
          "fuel_efficiency_city": 17.5,
          "valves_per_cylinder": 4,
          "car_id": 2,
          "horsepower": 115,
          "torque": 143.8,
          "boot_space": 528,
          "fuel_tank_capacity": 45,
          "ground_clearance": 0
        },
        "carDimensions": {
          "dimensions_id": 2,
          "car_id": 2,
          "length": 4535,
          "width": 1765,
          "height": 1475,
          "wheelbase": 2670,
          "ground_clearance": 165,
          "curb_weight": 1230
        },
        "mileage": 18,
        "price": 14000,
        "car_id": 2,
        "year": 2025
      }
    ],
    "status": "success",
    "message": "Filtered cars retrieved successfully"
  };

  // Create additional car entries for more variety
  const extendedData: Car[] = [
    ...mockData.data,
    {
      ...mockData.data[0],
      car_id: 3,
      brand: "Toyota",
      model: "Camry",
      variant_code: "Camry-Hybrid-SEL-2025",
      price: 29000,
      year: 2025,
      engine_type: "2.5 l Hybrid",
      body_type: "sedan",
      carSpecifications: {
        ...mockData.data[0].carSpecifications,
        car_id: 3,
        horsepower: 208,
        torque: 221,
        transmission_type: "CVT Automatic",
        fuel_efficiency_highway: 39.2,
        fuel_efficiency_city: 41.3
      }
    },
    {
      ...mockData.data[0],
      car_id: 4,
      brand: "BMW",
      model: "3 Series",
      variant_code: "3-Series-330i-2025",
      price: 42000,
      year: 2025,
      engine_type: "2.0 l Turbo",
      body_type: "sedan",
      carSpecifications: {
        ...mockData.data[0].carSpecifications,
        car_id: 4,
        horsepower: 255,
        torque: 295,
        transmission_type: "8-Speed Automatic",
        fuel_efficiency_highway: 34.5,
        fuel_efficiency_city: 26.4
      }
    },
    {
      ...mockData.data[0],
      car_id: 5,
      brand: "Audi",
      model: "A4",
      variant_code: "A4-Premium-Plus-2025",
      price: 45000,
      year: 2025,
      engine_type: "2.0 l TFSI",
      body_type: "sedan",
      carSpecifications: {
        ...mockData.data[0].carSpecifications,
        car_id: 5,
        horsepower: 261,
        torque: 273,
        transmission_type: "7-Speed S tronic",
        fuel_efficiency_highway: 34.1,
        fuel_efficiency_city: 25.7
      }
    }
  ];

  // Add mock images to each car
  return extendedData.map(car => {
    const key = car.brand === "Hyundai" ? "Hyundai-Verna" :
              car.brand === "Toyota" ? "Toyota-Camry" :
              car.brand === "BMW" ? "BMW-3Series" : "Audi-A4";
    
    return {
      ...car,
      images: carImages[key] || []
    };
  });
};

// Function to fetch a single car by ID
export const fetchCarById = async (id: number): Promise<Car | undefined> => {
  const cars = await fetchCars();
  return cars.find(car => car.car_id === id);
};
