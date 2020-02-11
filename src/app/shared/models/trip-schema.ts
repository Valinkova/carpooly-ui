export class TripSchema {
    name: string;
    fromCity: string;
    toCity: string;
    price: number;
    capacity: number;
    driver: Driver;
}

export class Driver {
    name: string;
    age: number;
    car: string;
    rank: number;
}
