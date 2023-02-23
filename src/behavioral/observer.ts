/**
 * The base publisher class includes subscription management
 * code and notification methods.
 */
class EventManager {
    private listeners = new Map<string, EventListener[]>();

    constructor(operations: string[]) {
        operations.forEach((operation) => {
            this.listeners.set(operation, []);
        });
    }

    public subscribe(eventType: string, listener: EventListener) {
        const listeners: EventListener[] = this.listeners.get(eventType);
        listeners.push(listener);
    }

    public unsubscribe(eventType: string, listener: EventListener) {
        const listeners: EventListener[] = this.listeners.get(eventType);
        listeners.splice(listeners.indexOf(listener), 1);
    }

    public notify(eventType: string, file: File) {
        const listeners: EventListener[] = this.listeners.get(eventType);

        listeners.forEach((listener) => {
            listener.update(eventType, file);
        });
    }
}

/**
 * The concrete publisher contains real business logic that's
 * interesting for some subscribers. We could derive this class
 * from the base publisher, but that isn't always possible in
 * real life because the concrete publisher might already be a
 * subclass. In this case, you can patch the subscription logic
 * in with composition, as we did here.
 */
class Editor {
    public eventManager: EventManager;
    private file: File;

    constructor() {
        this.eventManager = new EventManager(['open', 'save']);
    }

    public openFile(filePath: string) {
        this.file = new File([''], filePath);
        this.eventManager.notify('open', this.file);
    }

    public saveFile() {
        this.eventManager.notify('save', this.file);
    }
}

/**
 * Here's the subscriber interface.
 */
interface EventListener {
    update(eventType: string, file: File);
}

/**
 * Concrete subscribers react to updates issued by the publisher
 * they are attached to.
 */
class LogOpenListener implements EventListener {
    public update(eventType: string, file: File) {
        console.log('Someone has performed ' + eventType + ' operation with the following file: ' + file.name);
    }
}

class EmailNotificationListener implements EventListener {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public update(eventType: string, file: File) {
        console.log('Email to ' + this.email + ': Someone has performed ' + eventType + ' operation with the following file: ' + file.name);
    }
}

export class ObserverDemo {
    constructor() {
        const editor = new Editor();
        editor.eventManager.subscribe('open', new LogOpenListener());
        editor.eventManager.subscribe('save', new EmailNotificationListener('admin@example.com'));

        setTimeout(() => {
            console.warn('ObserverDemo');
            editor.openFile('test.txt');
            editor.saveFile();
        }, 5000);
    }
}
