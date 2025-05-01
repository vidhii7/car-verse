
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Car, fetchCarById } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const carId = parseInt(id || "0");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Fetch car data
  const { data: car, isLoading, error } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    enabled: !!carId,
  });

  // Set selected image when car data is loaded
  useEffect(() => {
    if (car?.images && car.images.length > 0) {
      setSelectedImage(car.images[0]);
    }
  }, [car]);

  // Group features by category
  const groupedFeatures = car?.carFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof car.carFeatures>);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container py-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Handle error state or car not found
  if (error || !car) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container py-8">
          <h1 className="text-2xl font-bold text-red-500">Car not found</h1>
          <p className="mt-2">The car you're looking for doesn't exist or couldn't be loaded.</p>
          <Button onClick={() => navigate("/cars")} className="mt-4">
            Back to Cars
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="container py-8 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-muted-foreground">
              {car.variant_code} • {car.engine_type}
            </p>
          </div>
          
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="text-lg font-semibold px-3 py-1">
              {car.year}
            </Badge>
            <Badge className="bg-primary text-white text-lg font-semibold px-3 py-1">
              ${car.price.toLocaleString()}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main image */}
          <div className="col-span-2 overflow-hidden rounded-lg border">
            <img 
              src={selectedImage} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              style={{ maxHeight: "500px" }}
            />
          </div>
          
          {/* Specifications and color options */}
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold mb-4">Key Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Horsepower</p>
                  <p className="font-medium">{car.carSpecifications.horsepower} HP</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Torque</p>
                  <p className="font-medium">{car.carSpecifications.torque} Nm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{car.carSpecifications.transmission_type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Top Speed</p>
                  <p className="font-medium">{car.carSpecifications.top_speed} km/h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">0-100 km/h</p>
                  <p className="font-medium">{car.carSpecifications.acceleration_0_100_kmph} sec</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{car.mileage} MPG</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold mb-4">Available Colors</h2>
              <div className="flex flex-wrap gap-3">
                {Object.entries(car.colors).map(([name, hexCode]) => (
                  <div key={name} className="text-center">
                    <div 
                      className="h-8 w-8 rounded-full border shadow-sm mx-auto"
                      style={{ backgroundColor: hexCode }}
                      title={name}
                    />
                    <p className="text-xs mt-1">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Image thumbnails */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {car.images.map((image, index) => (
              <div 
                key={index} 
                className={`car-detail-thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${car.brand} ${car.model} - View ${index + 1}`} 
                  className="h-20 w-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Detailed information tabs */}
        <Tabs defaultValue="features" className="mt-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 mb-6">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="animate-slide-in">
            {groupedFeatures && Object.entries(groupedFeatures).map(([category, features]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <div key={feature.feature_id} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm">{feature.name}</p>
                    </div>
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="specifications" className="animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Engine & Performance</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">Engine Type</p>
                    <p className="text-sm">{car.engine_type}</p>
                    
                    <p className="text-sm text-muted-foreground">Displacement</p>
                    <p className="text-sm">{car.carSpecifications.engine_displacement} cc</p>
                    
                    <p className="text-sm text-muted-foreground">Cylinders</p>
                    <p className="text-sm">{car.carSpecifications.cylinders}</p>
                    
                    <p className="text-sm text-muted-foreground">Valves Per Cylinder</p>
                    <p className="text-sm">{car.carSpecifications.valves_per_cylinder}</p>
                    
                    <p className="text-sm text-muted-foreground">Max Power</p>
                    <p className="text-sm">{car.carSpecifications.horsepower} HP</p>
                    
                    <p className="text-sm text-muted-foreground">Max Torque</p>
                    <p className="text-sm">{car.carSpecifications.torque} Nm</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Transmission</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">Transmission Type</p>
                    <p className="text-sm">{car.carSpecifications.transmission_type}</p>
                    
                    <p className="text-sm text-muted-foreground">Drive Train</p>
                    <p className="text-sm">{car.carSpecifications.drive_train}</p>
                    
                    <p className="text-sm text-muted-foreground">Gearbox</p>
                    <p className="text-sm">{car.carSpecifications.gearbox}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Performance</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">Top Speed</p>
                    <p className="text-sm">{car.carSpecifications.top_speed} km/h</p>
                    
                    <p className="text-sm text-muted-foreground">Acceleration (0-100 km/h)</p>
                    <p className="text-sm">{car.carSpecifications.acceleration_0_100_kmph} sec</p>
                    
                    <p className="text-sm text-muted-foreground">Fuel Efficiency (City)</p>
                    <p className="text-sm">{car.carSpecifications.fuel_efficiency_city} km/l</p>
                    
                    <p className="text-sm text-muted-foreground">Fuel Efficiency (Highway)</p>
                    <p className="text-sm">{car.carSpecifications.fuel_efficiency_highway} km/l</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Capacity</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">Fuel Tank Capacity</p>
                    <p className="text-sm">{car.carSpecifications.fuel_tank_capacity} liters</p>
                    
                    <p className="text-sm text-muted-foreground">Boot Space</p>
                    <p className="text-sm">{car.carSpecifications.boot_space} liters</p>
                    
                    <p className="text-sm text-muted-foreground">Emission Norm</p>
                    <p className="text-sm">{car.emission_norm}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dimensions" className="animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Exterior Dimensions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Length</p>
                    <p className="font-medium">{car.carDimensions.length} mm</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Width</p>
                    <p className="font-medium">{car.carDimensions.width} mm</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Height</p>
                    <p className="font-medium">{car.carDimensions.height} mm</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Wheelbase</p>
                    <p className="font-medium">{car.carDimensions.wheelbase} mm</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Ground Clearance & Weight</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Ground Clearance</p>
                    <p className="font-medium">{car.carDimensions.ground_clearance} mm</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Curb Weight</p>
                    <p className="font-medium">{car.carDimensions.curb_weight} kg</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Body Type</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Body Style</p>
                    <p className="font-medium capitalize">{car.body_type}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Variant Type</p>
                    <p className="font-medium capitalize">{car.variant_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CarDetails;
