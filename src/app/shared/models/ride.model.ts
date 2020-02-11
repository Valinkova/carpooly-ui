export interface Ride {
    name: string;
    startDate: string;
    coordinates: Cords[];
    maxPassengers: number;
    price: number;
}
export interface Cords{
    latitude: number;
    longitude: number;
}