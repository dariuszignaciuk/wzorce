/**
 * The interface of a remote service.
 */
interface ThirdPartyYouTubeLib {
    listVideos();
}

/* The concrete implementation of a service connector. Methods
 * of this class can request information from YouTube. The speed
 * of the request depends on a user's internet connection as
 * well as YouTube's. The application will slow down if a lot of
 * requests are fired at the same time, even if they all request
 * the same information.
 */
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    public listVideos() {}
}

/**
 * To save some bandwidth, we can cache request results and keep
 * them for some time. But it may be impossible to put such code
 * directly into the service class. For example, it could have
 * been provided as part of a third party library and/or defined
 * as `final`. That's why we put the caching code into a new
 * proxy class which implements the same interface as the
 * service class. It delegates to the service object only when
 * the real requests have to be sent.
 */
class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private service: ThirdPartyYouTubeLib;
    private listCache;

    constructor(service: ThirdPartyYouTubeLib) {
        this.service = service;
    }

    public listVideos() {
        if (!this.listCache) {
            this.listCache = this.service.listVideos();
        }
        return this.listCache;
    }
}

class YouTubeManager {
    private service: ThirdPartyYouTubeLib;

    constructor(service: ThirdPartyYouTubeLib) {
        this.service = service;
    }

    public getVideosList() {
        return this.service.listVideos();
    }
}

/**
 * The application can configure proxies on the fly.
 */
export class ProxyDemo {
    constructor() {
        console.warn('ProxyDemo');
        let manager: YouTubeManager;
        const youTubeService = new ThirdPartyYouTubeClass();
        const youTubeProxy = new CachedYouTubeClass(youTubeService);

        /**
         * We can safely pass a proxy object instead of a real service object
         * since they both implement the same interface.
         */
        if (true) {
            manager = new YouTubeManager(youTubeProxy);
        } else {
            manager = new YouTubeManager(youTubeService);
        }

        manager.getVideosList();
    }
}
