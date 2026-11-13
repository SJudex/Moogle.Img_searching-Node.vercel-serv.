/**
 * Video URL detection and embed-URL builders, ported from 2.x
 * `utils.isVideo` (`src/lg-utils.ts`) and `lg-video-utils.ts` as pure
 * functions. The video plugin renders the returned URLs; nothing here
 * touches the DOM.
 */
export interface VideoInfo {
    /** RegExp match parts: `[match, videoId, urlParams?]`. */
    youtube?: string[];
    vimeo?: string[];
    /** RegExp match parts; index 4 is the media id. */
    wistia?: string[];
    html5?: boolean;
}
export type PlayerParams = Record<string, string | number | boolean> | boolean;
/** Detect the video provider for a src URL (2.x `utils.isVideo`). */
export declare function getVideoInfo(src: string | undefined, hasHtml5Video: boolean): VideoInfo | undefined;
/** Serialize params as a query string (2.x `param`). */
export declare function param(obj: Record<string, string | number | boolean>): string;
/** Parse `?a=b&c=d` into an object (2.x `paramsToObject`). */
export declare function paramsToObject(url: string): Record<string, string>;
export declare function isYouTubeNoCookie(url: string): boolean;
/**
 * YouTube embed URL. Precedence (2.x parity): defaults < settings < params
 * already present on the slide URL. The privacy-enhanced
 * `youtube-nocookie.com` host is the default; pass `preferNoCookie: false`
 * (the `youTubeNoCookie` setting) to revert to `youtube.com`. A slide URL
 * that already names the nocookie host always keeps it.
 */
export declare function getYouTubeEmbedUrl(videoInfo: VideoInfo, playerParamsSettings: PlayerParams, srcUrl: string, preferNoCookie?: boolean): string | undefined;
/**
 * YouTube's public thumbnail endpoint for a detected video — the one
 * provider poster that needs no API call. (Vimeo/Wistia poster endpoints
 * require a fetch/auth, so their facades rely on the item's own
 * poster/thumb — see getFacadePoster.)
 */
export declare function getYouTubePosterUrl(videoInfo: VideoInfo | undefined): string | undefined;
/**
 * Poster for a provider-video facade (lite embed): the explicit item
 * poster wins, then the YouTube thumbnail endpoint (when enabled), then
 * the item's grid thumb — for Vimeo galleries the vimeoThumbnail plugin
 * rewrites `thumb` to the oEmbed thumbnail, which feeds this chain.
 * HTML5 slides never get a synthesized poster (unchanged 2.x behavior);
 * a provider slide with no resolvable poster returns undefined and keeps
 * the eager-iframe path.
 */
export declare function getFacadePoster(item: {
    poster?: string;
    thumb?: string;
}, videoInfo: VideoInfo | undefined, loadYouTubePoster: boolean): string | undefined;
/**
 * Provider player-API script URLs, loaded on demand at first play (the
 * vanilla runtime's control paths need them; the framework bindings drive
 * players via postMessage and load nothing).
 */
export declare const VIMEO_PLAYER_SCRIPT_URL = "https://player.vimeo.com/api/player.js";
export declare const WISTIA_PLAYER_SCRIPT_URL = "https://fast.wistia.com/assets/external/E-v1.js";
/**
 * Vimeo embed URL, including the private-video hash handling (2.x
 * `getVimeoURLParams`).
 */
export declare function getVimeoEmbedUrl(videoInfo: VideoInfo, playerParamsSettings: PlayerParams): string | undefined;
/** Wistia embed URL. */
export declare function getWistiaEmbedUrl(videoInfo: VideoInfo, playerParamsSettings: PlayerParams): string | undefined;
