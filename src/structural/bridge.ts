/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    public togglePower(): void {
        this.device.isEnabled = !this.device.isEnabled;
    }

    public volumeDown() {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    public volumeUp() {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    public logStatus() {
        this.device.logStatus();
    }
}

/**
 * You can extend the Abstraction without changing the Implementation classes.
 */
class AdvancedRemoteControl extends RemoteControl {
    public mute() {
        this.device.setVolume(0);
    }
}

/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different.
 */
interface Device {
    isEnabled: boolean;
    getVolume(): number;
    setVolume(percent: number): void;
    logStatus(): void;
}

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
class TV implements Device {
    public isEnabled = false;
    private volume = 0;

    public getVolume(): number {
        return this.volume;
    }
    public setVolume(percent: number) {
        if (this.volume > 100) {
            this.volume = 100;
        } else if (this.volume < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    public logStatus() {
        console.log('------------------------------------');
        console.log("| I'm tv.");
        console.log("| I'm " + (this.isEnabled ? 'enabled' : 'disabled'));
        console.log('| Current volume is ' + this.volume + '%');
    }
}

class Radio implements Device {
    public isEnabled = false;
    private volume = 0;

    public getVolume(): number {
        return this.volume;
    }
    public setVolume(percent: number) {
        if (!this.isEnabled) {
            this.isEnabled = true;
        }
        if (this.volume > 100) {
            this.volume = 100;
        } else if (this.volume < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    public logStatus() {
        console.log('------------------------------------');
        console.log("| I'm radio.");
        console.log("| I'm " + (this.isEnabled ? 'enabled' : 'disabled'));
        console.log('| Current volume is ' + this.volume + '%');
    }
}

/**
 * Except for the initialization phase, where an Abstraction object gets linked
 * with a specific Implementation object, the client code should only depend on
 * the Abstraction class. This way the client code can support any abstraction-
 * implementation combination.
 */
export class BridgeDemo {
    constructor() {
        console.warn('BridgeDemo');
        this.testBasicRemote(new TV());
        this.testBasicRemote(new Radio());

        this.testAdvancedRemote(new TV());
        this.testAdvancedRemote(new Radio());
    }

    public testBasicRemote(device: Device) {
        const basicRemote = new RemoteControl(device);
        basicRemote.togglePower();
        basicRemote.volumeUp();
        basicRemote.logStatus();
    }

    public testAdvancedRemote(device: Device) {
        const advancedRemote = new AdvancedRemoteControl(device);
        advancedRemote.togglePower();
        advancedRemote.volumeUp();
        advancedRemote.mute();
        advancedRemote.logStatus();
    }
}
