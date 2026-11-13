/**
 * Justified grid layout for the trigger thumbnails: rows of equal
 * height and varying widths that fill the container edge to edge, the
 * row height staying as close as possible to a target. Pure math —
 * runtimes measure the container, hand in aspect ratios, and position
 * elements from the returned boxes.
 */
export interface JustifiedLayoutOptions {
    /** Aspect ratios (width / height) in item order. */
    ratios: readonly number[];
    /** Content-box width available for rows (px). */
    containerWidth: number;
    /** Row height (px) the algorithm aims for. */
    targetRowHeight?: number;
    /** Gap between items and between rows (px). */
    gap?: number;
    /**
     * Last-row policy: `'justify'` scales the leftover row to fill the
     * width like every other row (clamped by `maxScale`), `'start'`
     * keeps the target height aligned to the reading start, `'hide'`
     * drops the leftover items (their boxes come back zero-sized).
     */
    lastRow?: 'justify' | 'start' | 'hide';
    /**
     * Row-height clamp as a multiple of `targetRowHeight` — a sparse
     * row (single portrait, justified leftovers) never renders taller
     * than `maxScale * targetRowHeight`. Clamped rows align to the
     * reading start instead of filling the width.
     */
    maxScale?: number;
}
export interface JustifiedBox {
    top: number;
    /**
     * Offset from the reading-start edge (logical): the runtime maps
     * it to `left` in LTR and `right` in RTL, the same convention as
     * the thumbnail strip math.
     */
    start: number;
    width: number;
    height: number;
}
export interface JustifiedLayout {
    /**
     * One box per input ratio, in item order — items hidden by
     * `lastRow: 'hide'` come back zero-sized (runtimes hide them).
     */
    boxes: JustifiedBox[];
    /** Total content height including the final row (px). */
    containerHeight: number;
}
export declare function getJustifiedLayout(options: JustifiedLayoutOptions): JustifiedLayout;
/**
 * Reveal policy for laid-out thumbnails: 'image' shows each one as it
 * loads, 'row' shows whole rows top to bottom, a row only once every
 * thumbnail in it (and every row above it) has loaded.
 */
export type JustifiedReveal = 'row' | 'image';
/**
 * Group laid-out boxes into rows by their top offset, in layout order.
 * Hidden boxes (0×0, the 'hide' last-row policy) belong to no row.
 * Returns item indexes per row.
 */
export declare function getJustifiedRows(boxes: JustifiedBox[]): number[][];
/**
 * Which laid-out items may show now, given which have loaded: per
 * image, or per row in reading order (see JustifiedReveal). The result
 * is cumulative — callers reveal every returned item that is not
 * already showing.
 */
export declare function getRevealableItems<T>(rows: T[][], isLoaded: (item: T) => boolean, reveal: JustifiedReveal): T[];
