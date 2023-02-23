/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
interface Mediator {
    saveChanges();
}

/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
class Editor implements Mediator {
    private button: Button;
    private textBox: TextBox;

    constructor(button: Button, textBox: TextBox) {
        this.button = button;
        this.button.setMediator(this);
        this.textBox = textBox;
        this.textBox.setMediator(this);
    }

    public saveChanges() {
        const value = this.textBox.getValue();
        console.log(value);
    }
}

/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class Button extends BaseComponent {
    public submitForm() {
        this.mediator.saveChanges();
    }
}

class TextBox extends BaseComponent {
    public getValue(): string {
        return 'Akideo';
    }
}

export class MediatorDemo {
    constructor() {
        console.warn('MediatorDemo');
        const button = new Button();
        const textBox = new TextBox();
        const mediator = new Editor(button, textBox);

        button.submitForm();
    }
}
