/**
 * Slide windowing and preload math, ported from 2.x
 * `getItemsToBeInsertedToDom` / `preload` (`src/lightgallery.ts`). Pure
 * index arithmetic — the framework layer maps the returned indexes to
 * mounted slide components.
 */
/**
 * Which slide indexes should be mounted for a given current/previous index.
 *
 * Mirrors 2.x behavior: at least 3 items (capped at the gallery length),
 * the window centered around `index` biased by which half of the gallery it
 * falls in, plus the far-end slide at the edges when `loop` is on, plus the
 * previous slide so an outgoing transition can finish.
 */
export declare function getSlideIndexesInDom(index: number, prevIndex: number, slidesCount: number, numberOfItems?: number, loop?: boolean): number[];
/**
 * Slide-pool policy (virtualization): the mounted-slide window
 * from `getSlideIndexesInDom`, plus any protected indexes that must never
 * be recycled while they hold live state — a zoomed slide keeps its
 * transform/gesture session, so recycling it would drop the user's zoom.
 * Protected indexes outside the gallery bounds are ignored.
 */
export declare function getSlidePoolIndexes(options: {
    index: number;
    prevIndex: number;
    slidesCount: number;
    poolSize?: number;
    loop?: boolean;
    protectedIndexes?: readonly number[];
}): number[];
/**
 * Indexes to preload around `index` once the current slide has finished
 * loading: up to `preload` slides forward and backward, clamped at the
 * gallery bounds (no wrap-around — 2.x parity).
 */
export declare function getPreloadIndexes(index: number, preload: number, slidesCount: number): number[];
