/**
 * Math for the origin crop plugin: zoom-from-origin flights from cropped
 * thumbnails. A grid tile cropped with `object-fit: cover` (or
 * `background-size: cover`) shows only a window of the image. The plugin
 * grows that window from the tile at a uniform scale while two boxes
 * around the slides crop the rest of the image, revealed as the flight
 * lands. Pure rect arithmetic: the plugin measures the DOM and passes
 * plain numbers in. The core flight (`origin.ts`) never imports this.
 */
import { type ImageSize, type RectLike } from './origin';
/** A region of an image as fractions of its width and height (0..1). */
export interface FractionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** The whole image: the window of an uncropped thumbnail. */
export declare const WHOLE_IMAGE: FractionRect;
/** Whether a region covers the whole image (within rounding). */
export declare function isWholeImage(rect: FractionRect): boolean;
/**
 * How a trigger paints its thumbnail file into its box: the CSS
 * `object-fit` of an `<img>`, or the `background-size` keyword of an
 * element with a background image.
 */
export type ThumbFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
/**
 * One axis of a CSS `object-position`/`background-position`: a share of
 * the free space (the box minus the painted image) plus a px offset.
 */
export interface CssPositionAxis {
    percent: number;
    px: number;
}
export interface CssPosition {
    x: CssPositionAxis;
    y: CssPositionAxis;
}
/** The CSS default, `50% 50%`. */
export declare const CSS_POSITION_CENTER: CssPosition;
/**
 * Parse a computed `object-position` or `background-position` value
 * (`"50% 50%"`, `"10px 20px"`, `"calc(100% - 10px) 0%"`, keywords).
 * Unparseable values fall back to the centre. Only the first layer of a
 * multi-layer background is read.
 */
export declare function parseCssPosition(value: string | undefined): CssPosition;
/** Parse a computed `object-fit` value; the CSS default is `fill`. */
export declare function parseObjectFit(value: string | undefined): ThumbFit;
/**
 * Parse a computed `background-size` value into the fit it paints like:
 * `cover` and `contain` as themselves, `auto` as `none` (natural size),
 * `100% 100%` as `fill`. Explicit lengths cannot be modelled and return
 * undefined. Only the first layer of a multi-layer background is read.
 */
export declare function parseBackgroundFit(value: string | undefined): ThumbFit | undefined;
/** The first URL of a computed `background-image` value, if any. */
export declare function parseCssUrl(value: string | undefined): string | undefined;
export interface OriginWindowInput {
    /** Rendered box of the trigger (thumbnail img or background element), viewport px. */
    box: RectLike;
    /** The full image; only its aspect ratio matters. */
    imageSize: ImageSize;
    /**
     * Natural size of the thumbnail file when known (an `<img>`'s
     * `naturalWidth`/`naturalHeight`). A file with a different aspect ratio
     * than the image is taken as a centred crop of it. Unknown (a background
     * image, an unloaded img) assumes the image's own aspect ratio.
     */
    thumbSize?: ImageSize;
    /** How the file is painted into the box. Defaults to `fill`. */
    fit?: ThumbFit;
    /** Where the painted file sits in the box. Defaults to the centre. */
    position?: CssPosition;
}
export interface OriginWindow {
    /**
     * The part of the trigger box that shows thumbnail pixels, viewport px:
     * the box itself unless the file is letterboxed inside it.
     */
    rect: RectLike;
    /** The part of the image visible in `rect`, as fractions of the image. */
    window: FractionRect;
    /**
     * The part of the image the thumbnail file covers, as fractions: the
     * whole image unless the file is pre-cropped. Sizes the flight's
     * dummy, which shows the file, so its pixels land where they belong.
     */
    region: FractionRect;
}
/**
 * Where a thumbnail's visible pixels sit in the full image. Models the CSS
 * fit and position of the file inside its box, and a pre-cropped file as a
 * centred crop of the image.
 */
export declare function getOriginWindow(input: OriginWindowInput): OriginWindow;
export interface OriginCropFlightInput {
    /**
     * The part of the trigger showing thumbnail pixels
     * ({@link OriginWindow.rect}), viewport px.
     */
    triggerRect: RectLike;
    /** Bounding rect of the gallery outer element, viewport coordinates. */
    containerRect: RectLike;
    /** Media container top offset (toolbar height), px. */
    top: number;
    /** Media container bottom offset (caption + thumb strip height), px. */
    bottom: number;
    /** Final displayed image size (see `fitImageSize`). */
    imageSize: ImageSize;
    /** The part of the image the trigger shows ({@link OriginWindow.window}). */
    window: FractionRect;
}
export interface OriginCropFlight {
    /**
     * The slide's transform: the window lands on the trigger, at a uniform
     * scale, inside the translated stage boxes.
     */
    transform: string;
    /** The outer stage box: its bottom-right corner on the trigger's. */
    outer: string;
    /** The inner stage box: its top-left corner on the trigger's. */
    inner: string;
}
/**
 * The start of a flight from a cropped thumbnail (and the end of the flight
 * back to it). Two stage-sized, overflow-hidden boxes wrap the slides: the
 * outer one translates so that its bottom-right corner sits on the
 * trigger's, the inner one so that its top-left corner sits on the
 * trigger's, and their intersection is exactly the trigger's box. As both
 * transition back to rest with the slide, the crop's edges move linearly on
 * screen out to the whole stage, and only transforms animate.
 */
export declare function getOriginCropFlight(input: OriginCropFlightInput): OriginCropFlight;
