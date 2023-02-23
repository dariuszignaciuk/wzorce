/**
 * The component interface defines operations that can be altered by
 * decorators.
 */
interface Car {
    price: number;
    getPrice(): number;
}

/**
 * Concrete components provide default implementations of the operations.
 */
class BasicCar implements Car {
    public price = 1000;

    public getPrice(): number {
        return this.price;
    }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class CarDecorator implements Car {
    public price: number;
    private wrappee: Car;

    constructor(wrappee: Car) {
        this.wrappee = wrappee;
    }

    /*
     * The base decorator simply delegates all work to the wrapped component.
     * Extra behaviors can be added in concrete decorators.
     */
    public getPrice(): number {
        return this.wrappee.getPrice();
    }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class AirbagDecorator extends CarDecorator {
    public getPrice(): number {
        return super.getPrice() + 100;
    }
}

class ElectricWindowsDecorator extends CarDecorator {
    public getPrice(): number {
        return super.getPrice() + 200;
    }
}

/**
 * Client code can support both simple components and decorated
 */
export class DecoratorDemo {
    constructor() {
        console.warn('DecoratorDemo');
        const basicCar = new BasicCar();
        console.log('Basic car price:', basicCar.getPrice());

        const withAirbag = new AirbagDecorator(basicCar);
        console.log('With airbag price:', withAirbag.getPrice());

        const fullOption = new ElectricWindowsDecorator(new AirbagDecorator(basicCar));
        console.log('Full option price:', fullOption.getPrice());
    }
}
