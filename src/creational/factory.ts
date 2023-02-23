/**
 * The Transport class declares the factory method deliveryCost.
 */
abstract class Transport {
    abstract deliveryCost(distance: number): number;
}

/**
 * Transport's subclasses provide concrete implementations of deliveryCost.
 */
class BikeTransport extends Transport {
    public deliveryCost(distance: number): number {
        return distance * 2;
    }
}

class CarTransport extends Transport {
    public deliveryCost(distance: number): number {
        return distance * 25;
    }
}

class LogisticsFactory {
    private transport: Transport;
    public transportCost: number;

    constructor(distance: number, packageWeight: number) {
        if (packageWeight > 10) {
            this.transport = new CarTransport();
        } else {
            this.transport = new BikeTransport();
        }

        this.transportCost = this.transport.deliveryCost(distance);
    }
}

export class FactoryDemo {
    constructor() {
        console.warn('FactoryDemo');
        const transport1 = new LogisticsFactory(100, 8);
        const transport2 = new LogisticsFactory(100, 11);
        console.log(transport1);
        console.log(transport2);
    }
}
