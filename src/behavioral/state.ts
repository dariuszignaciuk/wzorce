/**
 * The AudioPlayer class acts as a context. It also maintains a
 * reference to an instance of one of the state classes that
 * represents the current state of the audio player.
 */
class AudioPlayer {
    /**
     * A reference to the current state of the Context.
     */
    private state: State;

    private playing = false;

    constructor() {
        this.state = new ReadyState(this);
    }

    public changeState(state: State): void {
        this.state = state;
    }

    public setPlaying(playing: boolean): void {
        this.playing = playing;
    }

    public lockPlayer(): void {
        this.state.onLock();
    }

    public startPlayback(): void {
        this.state.onPlay();
    }

    public nextTrack(): void {
        this.state.onNext();
    }
}

/**
 * Common interface for all states.
 */
abstract class State {
    protected player: AudioPlayer;

    /**
     * Context passes itself through the state constructor. This may help a
     * state to fetch some useful context data if needed.
     */
    constructor(context: AudioPlayer) {
        this.player = context;
    }

    public abstract onLock(): void;
    public abstract onPlay(): void;
    public abstract onNext(): void;
}

/**
 * Concrete States implement various behaviors, associated with a state of the Context.
 */
class LockedState extends State {
    constructor(player: AudioPlayer) {
        super(player);
        this.player.setPlaying(false);
    }

    public onLock(): void {
        console.log('Already Locked');
    }

    public onPlay(): void {
        this.player.changeState(new PlayingState(this.player));
        console.log('Playing pumped up kicks');
    }

    public onNext(): void {
        console.log("Can't do that in LockedState");
    }
}

class ReadyState extends State {
    constructor(player: AudioPlayer) {
        super(player);
    }

    public onLock(): void {
        this.player.changeState(new LockedState(this.player));
        console.log('Locked.');
    }

    public onPlay(): void {
        this.player.changeState(new PlayingState(this.player));
        console.log('Playing pumped up kicks');
    }

    public onNext(): void {
        console.log("Can't do that in ReadyState");
    }
}

class PlayingState extends State {
    constructor(player: AudioPlayer) {
        super(player);
        this.player.setPlaying(false);
    }

    public onLock(): void {
        this.player.changeState(new LockedState(this.player));
        console.log('Locked.');
    }

    public onPlay(): void {
        this.player.changeState(new ReadyState(this.player));
        console.log('Paused.');
    }

    public onNext(): void {
        console.log('Playing next song');
    }
}

export class StateDemo {
    constructor() {
        console.warn('StateDemo');
        const player = new AudioPlayer();

        console.log('\nClick nextTrack:');
        player.nextTrack();

        console.log('\nClick startPlayback:');
        player.startPlayback();

        console.log('\nClick startPlayback:');
        player.startPlayback();

        console.log('\nClick startPlayback:');
        player.startPlayback();

        console.log('\nClick nextTrack: ');
        player.nextTrack();

        console.log('\nClick lockPlayer: ');
        player.lockPlayer();

        console.log('\nClick nextTrack: ');
        player.nextTrack();
    }
}
