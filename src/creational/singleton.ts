/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
    private static instance: Singleton;
    private randomNumber: number;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.randomNumber = Math.random();
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

export class SingletonDemo {
    constructor() {
        console.warn('SingletonDemo');
        const s1 = Singleton.getInstance();
        const s2 = Singleton.getInstance();
        console.log(s1);
        console.log(s2);
    }
}
