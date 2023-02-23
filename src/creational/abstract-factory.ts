/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface Button {
    click();
}
interface Checkbox {
    select();
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class WindowsFactory implements GUIFactory {
    public createButton(): Button {
        return new WindowsButton();
    }

    public createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public createButton(): Button {
        return new MacButton();
    }

    public createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WindowsButton implements Button {
    public click() {
        console.log('Clicked on element');
    }
}

class WindowsCheckbox implements Checkbox {
    public select() {
        console.log('Selected some value');
    }
}

class MacButton implements Button {
    public click() {
        console.log('%cPlease insert a coin to activate button', 'color: yellow;');
    }
}

class MacCheckbox implements Checkbox {
    public select() {
        console.log('%cPlease insert a coin to activate checkbox', 'color: yellow;');
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: GUIFactory and Button/Checkbox. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
export class AbstractFactoryDemo {
    private factory: GUIFactory;
    private tooMuchMoneyOnBankAccount = false;

    constructor() {
        console.warn('AbstractFactoryDemo');
        if (this.tooMuchMoneyOnBankAccount) {
            this.factory = new MacFactory();
        } else {
            this.factory = new WindowsFactory();
        }

        this.onButtonClick();
        this.onCheckboxSelect();
    }

    onButtonClick() {
        const button = this.factory.createButton();
        button.click();
    }

    onCheckboxSelect() {
        const checkbox = this.factory.createCheckbox();
        checkbox.select();
    }
}
