/**
 * The Command interface declares a method for executing a command.
 */
interface Command {
    execute(): void;
}

/**
 * Commands can delegate more complex operations to other objects,
 * called "receivers."
 */
class CopyCommand implements Command {
    constructor(private clipboard: Clipboard) {}

    public execute(): void {
        this.clipboard.writeMemory('     >This is some copied code from StackOverflow<      ');
    }
}

class PasteCommand implements Command {
    constructor(private clipboard: Clipboard) {}

    public execute(): string {
        return this.clipboard.readMemory();
    }
}

/**
 * The clipboard class has actual text editing operations. It plays
 * the role of a receiver: all commands end up delegating
 * execution to the editor's methods.
 */
class Clipboard {
    private clipboardMemory: string;

    public writeMemory(text) {
        this.clipboardMemory = text;
    }

    public readMemory() {
        return this.clipboardMemory.trim();
    }
}

/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
class Invoker {
    /**
     * Initialize commands.
     */
    constructor(private copy: CopyCommand, private paste: PasteCommand) {}

    /**
     * The Invoker does not depend on concrete command or receiver classes. The
     * Invoker passes a request to a receiver indirectly, by executing a
     * command.
     */
    public writeProductionCode(): void {
        this.copy.execute();

        console.log('Browsing web while pretending to work...');

        console.log('Finished code: ', this.paste.execute());
    }
}

export class CommandDemo {
    constructor() {
        const clipboard = new Clipboard();
        const invoker = new Invoker(new CopyCommand(clipboard), new PasteCommand(clipboard));

        invoker.writeProductionCode();
    }
}
