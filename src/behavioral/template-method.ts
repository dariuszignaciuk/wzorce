/**
 * The abstract class defines a template method that contains a
 * skeleton of some algorithm composed of calls, usually to
 * abstract primitive operations. Concrete subclasses implement
 * these operations, but leave the template method itself
 * intact.
 */
abstract class Network {
    userName: string;
    password: string;

    /**
     * Publish the data to whatever network.
     */
    public post(message: string): boolean {
        // Authenticate before posting. Every network uses a different
        // authentication method.
        if (this.logIn(this.userName, this.password)) {
            // Send the post data.
            this.sendData(message);
        }
        return false;
    }

    abstract logIn(userName: string, password: string): boolean;
    abstract sendData(data: string): void;
}

/**
 * Concrete classes have to implement all abstract operations of
 * the base class but they must not override the template method
 * itself.
 */
class Facebook extends Network {
    constructor(userName: string, password: string) {
        super();
        this.userName = userName;
        this.password = password;
    }

    public logIn(userName: string, password: string): boolean {
        console.log('LogIn success on Facebook for account ' + userName);
        return true;
    }

    public sendData(data: string) {
        console.log(`Message: ${data} was posted on Facebook`);
    }
}

class Twitter extends Network {
    constructor(userName: string, password: string) {
        super();
        this.userName = userName;
        this.password = password;
    }

    public logIn(userName: string, password: string): boolean {
        console.log('LogIn success on Twitter: ' + userName);
        return true;
    }

    public sendData(data: string) {
        console.log(`Message: ${data} was posted on Twitter`);
    }
}

export class TemplateMethodDemo {
    constructor() {
        console.warn('TemplateMethodDemo');
        let network: Network;

        if (2 > 1) {
            network = new Facebook('leTounge', 'password');
        } else {
            network = new Twitter('leTounge', 'password');
        }

        network.post('Mornink!');
    }
}
