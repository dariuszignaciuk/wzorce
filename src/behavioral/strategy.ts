/**
 * Common interface for all strategies.
 */
interface PayStrategy {
    pay(paymentAmount: number): boolean;
    collectPaymentDetails(): void;
}

/**
 * Concrete strategy. Implements PayPal payment method.
 */
class PayByPayPal implements PayStrategy {
    private signedIn: boolean;

    public collectPaymentDetails(): void {
        console.log("Checking user's email...");
        console.log('Checking password...');
        console.log('Data verification has been successful.');
        this.signedIn = true;
    }

    public pay(paymentAmount: number): boolean {
        if (this.signedIn) {
            console.log('Paying ' + paymentAmount + ' using PayPal.');
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Concrete strategy. Implements credit card payment method.
 */
class PayByCreditCard implements PayStrategy {
    private card: number;

    constructor(card: number) {
        this.card = card;
    }

    public collectPaymentDetails(): void {
        console.log('Checking the card number...');
        console.log("Checking the card expiration date 'mm/yy'...");
        console.log('Checking the CVV code...');
    }

    public pay(paymentAmount: number): boolean {
        if (this.card) {
            console.log('Paying ' + paymentAmount + ' using Credit Card ' + this.card);
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Order class. Doesn't know the concrete payment method (strategy) user has
 * picked. It uses common strategy interface to delegate collecting payment data
 * to strategy object.
 */
class Order {
    public processOrder(strategy: PayStrategy): void {
        strategy.collectPaymentDetails();
        strategy.pay(20);
    }
}

/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
export class StrategyDemo {
    constructor() {
        console.warn('StrategyDemo');
        const order = new Order();
        console.log('Client: Strategy is set to normal PayByPayPal:');
        order.processOrder(new PayByPayPal());

        console.log('\nClient: Strategy is set to normal PayByCreditCard:');
        order.processOrder(new PayByCreditCard(564689843213));
    }
}
