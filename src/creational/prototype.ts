/**
 * The example class that has cloning ability.
 */
class Prototype {
    public primitive: number;
    public nonPrimitive: Date;

    constructor(primitive: number, nonPrimitive: Date) {
        this.primitive = primitive;
        this.nonPrimitive = nonPrimitive;
    }

    public clone(): this {
        const clone = Object.create(this);
        clone.nonPrimitive = Object.create(this.nonPrimitive);

        return clone;
    }
}

export class PrototypeDemo {
    constructor() {
        console.warn('PrototypeDemo');
        const p1 = new Prototype(8, new Date());
        const p2 = p1.clone();

        if (p1.primitive === p2.primitive) {
            console.log('Success: Primitive field values have been carried over to a clone.');
        } else {
            console.log('Error: primitive field values have not been copied.');
        }

        if (p1.nonPrimitive === p2.nonPrimitive) {
            console.log('Error: nonPrimitive was copied with reference');
        } else {
            console.log('Success: nonPrimitive was copied without reference');
        }
    }
}
