/**
 * Share link builders + Web Share payload logic for the share plugin. The
 * URL builders are ported from the 2.x `lg-*-share-utils` files as pure
 * functions — the page URL fallback is a parameter instead of
 * `window.location.href`. The Web Share helpers are pure too: the runtime
 * hands in a structural `navigator` so nothing here touches the DOM.
 */
/**
 * Structural slice of a gallery item the share builders read — kept
 * narrow so any runtime's item shape (including the 2.x vanilla one)
 * satisfies it without casts.
 */
export interface ShareItemFields {
    src?: string;
    alt?: string;
    title?: string;
    shareUrl?: string;
    facebookShareUrl?: string;
    tweetText?: string;
    twitterShareUrl?: string;
    pinterestShareUrl?: string;
    pinterestText?: string;
}
export declare function getFacebookShareLink(item: ShareItemFields, currentUrl: string): string;
/**
 * X (formerly Twitter) intent URL. The 2.x `tweetText`/`twitterShareUrl`
 * item fields (and their `data-tweet-text` style attributes) keep working —
 * only the target changed. Unlike the 2.x builder the text is URL-encoded.
 */
export declare function getXShareLink(item: ShareItemFields, currentUrl: string): string;
/** @deprecated Renamed — use {@link getXShareLink} (X intent URL). */
export declare const getTwitterShareLink: typeof getXShareLink;
export declare function getPinterestShareLink(item: ShareItemFields, currentUrl: string): string;
/**
 * Data handed to `navigator.share`. URL-sharing only by design: attaching
 * the image itself would require fetching cross-origin bytes (a proxy),
 * which the share plugin will not do.
 */
export interface SharePayload {
    title?: string;
    text?: string;
    url: string;
}
/**
 * Build the Web Share payload for a slide. The per-item `shareUrl` wins,
 * then the network-specific share URLs, then the page URL; text falls back
 * from the tweet text to the Pinterest description.
 */
export declare function getSharePayload(item: ShareItemFields, currentUrl: string): SharePayload;
/** Structural slice of `navigator` the Web Share decision needs. */
export interface NativeShareNavigator {
    share?: (data: SharePayload) => Promise<void>;
    canShare?: (data: SharePayload) => boolean;
}
/**
 * True when the runtime can hand this payload to the OS share sheet.
 * Feature-detected and never load-bearing: no `navigator.share` (or a
 * `canShare` veto) simply keeps the branded dropdown menu.
 */
export declare function canNativeShare(nav: NativeShareNavigator | undefined | null, payload: SharePayload): boolean;
