/**
 * Builder interface defines all possible ways to configure a product.
 */
interface Builder {
    setCarType(type: string);
    setSeats(seats: number);
    setEngine(engine: string);
    setTransmission(transmission: string);
}

/**
 * Concrete builders implement steps defined in the common interface.
 */
class CarBuilder implements Builder {
    private type: string;
    private seats: number;
    private engine: string;
    private transmission: string;

    public setCarType(type: string) {
        this.type = type;
    }

    public setSeats(seats: number): void {
        this.seats = seats;
    }

    public setEngine(engine: string): void {
        this.engine = engine;
    }

    public setTransmission(transmission: string): void {
        this.transmission = transmission;
    }

    public getResult(): Car {
        return new Car(this.type, this.seats, this.engine, this.transmission);
    }
}

/**
 * Car is a product class.
 */
class Car {
    private readonly carType: string;
    private readonly seats: number;
    private readonly engine: string;
    private readonly transmission: string;

    constructor(carType: string, seats: number, engine: string, transmission: string) {
        this.carType = carType;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
    }

    public getCarType() {
        return this.carType;
    }

    public getSeats(): number {
        return this.seats;
    }

    public getEngine() {
        return this.engine;
    }

    public getTransmission() {
        return this.transmission;
    }
}

/**
 * Unlike other creational patterns, Builder can construct unrelated products,
 * which don't have the common interface.
 *
 * In this case we build a user manual for a car, using the same steps as we
 * built a car. This allows to produce manuals for specific car models,
 * configured with different features.
 */
class CarManualBuilder implements Builder {
    private type: string;
    private seats: number;
    private engine: string;
    private transmission: string;

    public setCarType(type) {
        this.type = type;
    }

    public setSeats(seats) {
        this.seats = seats;
    }

    public setEngine(engine) {
        this.engine = engine;
    }

    public setTransmission(transmission) {
        this.transmission = transmission;
    }

    public getResult(): Manual {
        return new Manual(this.type, this.seats, this.engine, this.transmission);
    }
}

/**
 * Car manual is another product. Note that it does not have the same ancestor
 * as a Car. They are not related.
 */
class Manual {
    private readonly carType: string;
    private readonly seats: number;
    private readonly engine: string;
    private readonly transmission: string;

    constructor(carType: string, seats: number, engine: string, transmission: string) {
        this.carType = carType;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
    }

    public getInfo() {
        let info = '';
        info += 'Type of car: ' + this.carType + '\n';
        info += 'Count of seats: ' + this.seats + '\n';
        info += 'Transmission: ' + this.transmission + '\n';

        return info;
    }
}

/**
 * Director defines the order of building steps. It works with a builder object
 * through common Builder interface. Therefore it may not know what product is
 * being built.
 */
class Director {
    public constructSportsCar(builder: Builder) {
        builder.setCarType('SPORTS_CAR');
        builder.setSeats(2);
        builder.setEngine('Electric');
        builder.setTransmission('SEMI_AUTOMATIC');
    }

    public constructCityCar(builder: Builder) {
        builder.setCarType('CITY_CAR');
        builder.setSeats(4);
        builder.setEngine('Gas');
        builder.setTransmission('AUTOMATIC');
    }

    public constructSUV(builder: Builder) {
        builder.setCarType('SUV');
        builder.setSeats(5);
        builder.setEngine('Diesel');
        builder.setTransmission('MANUAL');
    }
}

export class BuilderDemo {
    constructor() {
        console.warn('BuilderDemo');
        const director = new Director();
        const carBuilder = new CarBuilder();
        const manualBuilder = new CarManualBuilder();

        director.constructSUV(carBuilder);
        const car = carBuilder.getResult();
        console.log(`${car.getCarType()} car built with ${car.getSeats()} seats.`);

        director.constructSportsCar(manualBuilder);
        const carManual = manualBuilder.getResult();
        console.log('Car manual built:', carManual.getInfo());
    }
}
