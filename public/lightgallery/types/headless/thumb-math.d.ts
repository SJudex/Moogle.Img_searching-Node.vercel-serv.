/**
 * Thumbnail strip math (2.x `animateThumb`/`getPossibleTransformX`) as pure
 * functions for the thumbnail plugin.
 */
import type { ResolvedGalleryDirection } from './settings';
export type ThumbPagerPosition = 'left' | 'middle' | 'right';
/**
 * Rubber-band a raw strip translate (strip physics): inside the
 * bounds it passes through; beyond an edge the overshoot compresses by
 * the shared edge friction so the strip resists like the slide gestures.
 * The release spring pulls the compressed overshoot back to the bound.
 */
export declare function getElasticThumbTranslate(raw: number, totalWidth: number, stripWidth: number, friction?: number): number;
export declare function getThumbTotalWidth(count: number, thumbWidth: number, thumbMargin: number): number;
/** Clamp a strip translate into `[0, total - visible]` (never negative). */
export declare function clampThumbTranslate(translate: number, totalWidth: number, stripWidth: number): number;
/**
 * The window of thumbnails that must exist in the DOM for a given strip
 * translate (virtualization): the visible range plus `overscan`
 * thumbs on each side, with leading/trailing pad widths so the strip keeps
 * its full scroll geometry while only the window renders.
 */
export interface ThumbWindow {
    /** First rendered thumb index (inclusive). */
    start: number;
    /** Last rendered thumb index (inclusive). */
    end: number;
    /** Spacer width (px) standing in for the thumbs before `start`. */
    leadingPad: number;
    /** Spacer width (px) standing in for the thumbs after `end`. */
    trailingPad: number;
}
/**
 * Compute the rendered thumb window from the strip translate. `overscan`
 * is the number of extra thumbs kept mounted on each side of the visible
 * range ('auto' derives one extra viewport per side — enough that a full
 * flick lands on already-rendered thumbs).
 */
export declare function getThumbWindow(options: {
    translate: number;
    stripWidth: number;
    thumbWidth: number;
    thumbMargin: number;
    count: number;
    overscan?: number | 'auto';
}): ThumbWindow;
/**
 * Window covering a fling's whole flight path: the union of
 * the windows at the start and end translates, so a released strip never
 * glides over unrendered thumbs — the destination is known at release.
 */
export declare function getThumbCorridorWindow(options: {
    from: number;
    to: number;
    stripWidth: number;
    thumbWidth: number;
    thumbMargin: number;
    count: number;
    overscan?: number | 'auto';
}): ThumbWindow;
/**
 * Which slide a live strip translate selects in scrub mode (the strip
 * drives the gallery while it moves). Proportional: the strip's full
 * scroll travel maps onto the full index range, so the FIRST and LAST
 * slides are always reachable — a fixed pager-point inverse cannot
 * reach the ends, because the clamped translate never brings them
 * under the pager slot. For long strips this converges to one index
 * per thumb unit of travel. Translate is the logical strip scalar
 * (RTL-agnostic); elastic overshoot clamps, pinning the ends.
 * Exact inverse: {@link getScrubThumbTranslate}.
 */
export declare function getScrubThumbIndex(translate: number, totalWidth: number, stripWidth: number, count: number): number;
/**
 * Strip translate at which {@link getScrubThumbIndex} resolves exactly
 * `index` — for aligning the strip to the scrubbed slide after the
 * release glide settles. (Not `getActiveThumbTranslate`: that pager
 * alignment is a different map and would re-resolve to a neighboring
 * index near the ends.)
 */
export declare function getScrubThumbTranslate(index: number, totalWidth: number, stripWidth: number, count: number): number;
/**
 * Strip translate that brings the active thumbnail to the pager position
 * (2.x `animateThumb`, including its off-by-one `- 1`).
 */
export declare function getActiveThumbTranslate(index: number, thumbWidth: number, thumbMargin: number, stripWidth: number, totalWidth: number, pagerPosition: ThumbPagerPosition, direction?: ResolvedGalleryDirection): number;
