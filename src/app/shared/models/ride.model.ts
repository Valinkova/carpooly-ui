import {Account} from './account.model';

export interface Ride {
    id?: number;
    name: string;
    startDate: string;
    pathCoordinates: Coords[];
    maxPassengers: number;
    price: number;
    driver?: Account;
    passengers?: any[];
}

export interface Coords {
    latitude: number;
    longitude: number;
}

export interface RideFilterRequest {
    coordinates: Coords;
    radiusInKm: number;
}
