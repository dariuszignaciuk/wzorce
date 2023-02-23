/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        // Returning a handler from here will let us link handlers in a
        // convenient way like this:
        // monkey.setNext(squirrel).setNext(dog);
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Nut') {
            return `Squirrel: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'MeatBall') {
            return `Dog: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

export class ChainOfResponsibilityDemo {
    constructor() {
        console.warn('ChainOfResponsibilityDemo');

        const monkey = new MonkeyHandler();
        const squirrel = new SquirrelHandler();
        const dog = new DogHandler();

        // Client can build various chains using the same components
        monkey.setNext(squirrel).setNext(dog);

        /**
         * The client should be able to send a request to any handler, not just the
         * first one in the chain.
         */
        this.serveFood(squirrel);
    }

    /**
     * The client code is usually suited to work with a single handler. In most
     * cases, it is not even aware that the handler is part of a chain.
     */
    private serveFood(handler: Handler) {
        const foods = ['Nut', 'Banana', 'Cup of coffee'];

        for (const food of foods) {
            const result = handler.handle(food);
            if (result) {
                console.log(`${result}`);
            } else {
                console.log(`${food} was left untouched.`);
            }
        }
    }
}
