/**
 * Typed per-plugin state slices. Framework layers hold these
 * in their own reactivity; the shapes and transitions live here so plugin
 * behavior matches across frameworks.
 */
import { type ZoomPan } from './zoom-math';
export interface ZoomSlice {
    scale: number;
    pan: ZoomPan;
    zoomed: boolean;
}
export declare const initialZoomSlice: ZoomSlice;
/** Per-slide rotate/flip state (rotate plugin). */
export interface RotateSlice {
    /** Rotation in degrees (multiples of 90, may run negative). */
    rotate: number;
    /** 1 or -1. */
    flipHorizontal: number;
    /** 1 or -1. */
    flipVertical: number;
}
export declare const initialRotateSlice: RotateSlice;
export declare function rotateLeft(slice: RotateSlice): RotateSlice;
export declare function rotateRight(slice: RotateSlice): RotateSlice;
export declare function flipHorizontal(slice: RotateSlice): RotateSlice;
export declare function flipVertical(slice: RotateSlice): RotateSlice;
/** Whether the slice's rotation swaps the image's visual axes (90°/270°). */
export declare function isOrientationSwapped(slice: RotateSlice): boolean;
/**
 * Scale that refits a rotated image into its stage. At 90°/270° the
 * image's rendered width runs vertically (and vice versa), so the fit is
 * computed against the swapped axes; capped at 1 — rotation never
 * upscales. At 0°/180° (and with degenerate dimensions) the image already
 * fits the way it was laid out: scale 1.
 */
export declare function getRotateFitScale(imageWidth: number, imageHeight: number, stageWidth: number, stageHeight: number, slice: RotateSlice): number;
/**
 * CSS transform for a rotate slice (2.x `applyStyles`), with the fit
 * scale folded into the same transform so rotate + refit animate as one
 * motion. `fitScale` defaults to 1 (the 2.x output, byte-identical).
 */
export declare function getRotateTransform(slice: RotateSlice, fitScale?: number): string;
/**
 * Visual footprint of an image sitting inside the rotate wrapper.
 * Layout offsets ignore CSS transforms, so pan-bounds math fed by
 * them sees the unrotated box: at 90°/270° the rendered width runs
 * along the layout height (and vice versa), and the folded-in fit
 * scale shrinks both axes. `transform` is the wrapper's inline style
 * (`getRotateTransform` output); absent or unparseable input reads
 * as unrotated.
 */
export declare function getRotatedVisualSize(width: number, height: number, transform: string | null | undefined): {
    width: number;
    height: number;
};
/** Autoplay run-state (autoplay plugin). */
export interface AutoplaySlice {
    running: boolean;
    pausedOnDrag: boolean;
    pausedOnSlideChange: boolean;
}
export declare const initialAutoplaySlice: AutoplaySlice;
/**
 * Class the zoom plugin's actual-size button carries for a zoom state.
 * The button swaps its glyph by swapping its class (2.x behaviour): the
 * `zoomIn` class while the slide sits at scale 1, the `zoomOut` class
 * once it is zoomed. The button renders both zoom icons and the CSS
 * shows the one matching the live class.
 */
export declare function getActualSizeButtonClass(icons: {
    zoomIn: string;
    zoomOut: string;
}, zoomed: boolean): string;
/** Commit a zoom change; scale 1 always recenters (2.x behavior). */
export declare function applyZoom(_slice: ZoomSlice, scale: number, pan: ZoomPan, maxScale: number, infiniteZoom: boolean): ZoomSlice;
