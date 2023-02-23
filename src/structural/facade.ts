/**
 * The Facade class provides a simple interface to the complex logic of one or
 * several subsystems. The Facade delegates the client requests to the
 * appropriate objects within the subsystem. The Facade is also responsible for
 * managing their lifecycle. All of this shields the client from the undesired
 * complexity of the subsystem.
 */
class VideoConverter {
    /**
     * The Facade's methods are convenient shortcuts to the sophisticated
     * functionality of the subsystems. However, clients get only to a fraction
     * of a subsystem's capabilities.
     */
    public convert(fileName: string, destinationFormat: string): File {
        const file = new VideoFile(fileName);
        const sourceCodec = Codec.extract(file);

        return BitrateReader.convert(file, sourceCodec, destinationFormat);
    }
}

class VideoFile {
    public name: string;
    public codecType: string;

    constructor(name: string) {
        this.name = name;
        this.codecType = name.substring(name.indexOf('.') + 1);
    }
}

class Codec {
    public static extract(file: VideoFile) {
        const type = file.codecType;
        if (type === 'mp4') {
            return '.mp4';
        } else {
            return '.ogg';
        }
    }
}

class BitrateReader {
    public static convert(buffer: VideoFile, codec: string, destinationFormat: string): File {
        buffer.codecType = destinationFormat;
        return new File([codec], `${buffer.name.replace(codec, '')}.${buffer.codecType}`);
    }
}

/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 */
export class FacadeDemo {
    constructor() {
        console.warn('FacadeDemo');

        const videoConverter = new VideoConverter();
        const convertedFile = videoConverter.convert('youtubevideo.ogg', 'mp4');

        console.log(convertedFile);
    }
}
