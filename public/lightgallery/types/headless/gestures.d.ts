/**
 * Gesture math, ported from the 2.x touch/drag implementation
 * (`touchMove`/`touchEnd` in `src/lightgallery.ts`) as pure functions. The
 * framework layer owns pointer events and writes the returned transforms
 * straight to the DOM (never through framework state — one render per
 * gesture, not per move); every *decision* lives here so swipe feel is
 * identical across frameworks.
 */
import type { ResolvedGalleryDirection } from './settings';
export type SwipeAxis = 'horizontal' | 'vertical';
/**
 * Minimum travel (px) before a drag commits to an axis. Tuned from the
 * 2.x 15px to ~10 (UIPanGestureRecognizer territory): drags answer a
 * touch sooner without axis flip-flop — the commit is still sticky.
 */
export declare const SWIPE_AXIS_THRESHOLD = 10;
/**
 * Flick support: a release faster than this (px/ms, windowed — see
 * `velocity.ts`) navigates even below `swipeThreshold`. Default per the
 * gesture-physics teardown: windowed readings run higher than the old
 * whole-gesture averages, so this gate and windowed measurement ship as
 * one change. Public setting: `flickVelocity`.
 */
export declare const FLICK_VELOCITY = 0.5;
/** Minimum travel (px) for a flick, so taps never navigate. */
export declare const FLICK_MIN_DISTANCE = 20;
/** Vertical travel (px) beyond which the drag hides the UI chrome — 2.x. */
export declare const VERTICAL_CLOSE_THRESHOLD = 100;
/**
 * Drag-to-close verdict: the momentum-projected travel must pass this
 * fraction of the viewport height — a small fast downward flick closes,
 * a large slow drag released while returning does not.
 */
export declare const VERTICAL_CLOSE_RATIO = 0.4;
/**
 * Minimum actual travel (px) before the projected close arms. Momentum
 * may extend a real drag, never replace one: a grazed tap releases with
 * a fast final instant, and projection alone would read it as a close
 * flick.
 */
export declare const VERTICAL_CLOSE_MIN_DRAG = 40;
/**
 * Rubber-band friction past the first/last slide (no loop): the drag
 * keeps moving at this fraction of the finger instead of the 2.x
 * un-resisted 1:1 travel — you feel that there is nothing further.
 */
export declare const SLIDE_EDGE_FRICTION = 0.35;
/**
 * Horizontal drag delta with rubber-banding past the gallery ends.
 * `hasPrev`/`hasNext` reflect whether a slide exists in that direction
 * (loop counts); the release spring returns the frictioned distance.
 */
export declare function getEdgeFrictionedDelta(deltaX: number, hasPrev: boolean, hasNext: boolean, direction?: ResolvedGalleryDirection): number;
/** Decide (once) which axis a drag follows; sticky after the first commit. */
export declare function getSwipeAxis(deltaX: number, deltaY: number, current: SwipeAxis | undefined): SwipeAxis | undefined;
export interface HorizontalDragTransforms {
    current: string;
    prev: string;
    next: string;
}
/**
 * Follow-the-finger transforms for the current slide and its neighbors
 * (2.x `touchMove` horizontal branch, including the shrinking gutter).
 */
export declare function getHorizontalDragTransforms(deltaX: number, slideWidth: number, direction?: ResolvedGalleryDirection): HorizontalDragTransforms;
export interface VerticalDragEffects {
    /** Backdrop opacity fading out with the drag. */
    backdropOpacity: number;
    /** Transform for the current slide (translate + shrink). */
    transform: string;
    /** True once the UI chrome should hide (past the close threshold). */
    hideUi: boolean;
}
/** Drag-to-close visuals (2.x `touchMove` vertical branch). */
export declare function getVerticalDragEffects(deltaY: number, viewportWidth: number, viewportHeight: number): VerticalDragEffects;
export type SwipeReleaseVerdict = 'next' | 'prev' | 'stay';
export interface SwipeReleaseInput {
    deltaX: number;
    /** Release velocity, px/ms signed (windowed — see `velocity.ts`). */
    velocityX: number;
    /** `swipeThreshold` setting (px). */
    threshold: number;
    /** `flickVelocity` setting (px/ms). */
    flickVelocity?: number;
    /**
     * Slide width (px). When given, a release whose momentum-projected
     * travel crosses the midpoint also navigates — a firm half-hearted
     * swipe keeps going where a hesitant one snaps back.
     */
    viewportWidth?: number;
    /** Resolved gallery direction; in `'rtl'` the verdict mirrors. */
    direction?: ResolvedGalleryDirection;
}
/**
 * Horizontal release decision: past `swipeThreshold`, or a quick flick →
 * navigate (negative delta = next, 2.x parity); otherwise snap back.
 * The flick counts only when the release velocity points the same way
 * as the drag — reversing direction just before lifting is a cancel,
 * not a flick.
 */
export declare function getSwipeReleaseVerdict({ deltaX, velocityX, threshold, flickVelocity, viewportWidth, direction, }: SwipeReleaseInput): SwipeReleaseVerdict;
/**
 * Vertical release decision: close when the momentum-projected travel
 * passes {@link VERTICAL_CLOSE_RATIO} of the viewport in the drag's own
 * direction (a release moving back toward rest never closes), and the
 * finger actually travelled {@link VERTICAL_CLOSE_MIN_DRAG}.
 */
export declare function shouldCloseOnVerticalDrag(deltaY: number, velocityY: number, viewportHeight: number, options: {
    closable: boolean;
    swipeToClose: boolean;
}): boolean;
/**
 * Which slide navigation a release verdict maps to, honoring the 2.x touch
 * loop rule: galleries with fewer than 3 slides never wrap from touch.
 */
export declare function resolveSwipeTarget(verdict: SwipeReleaseVerdict, currentIndex: number, slidesCount: number, loop: boolean): number | null;
/** One live pointer, for multi-pointer consumers (zoom plugin). */
export interface PointerRecord {
    id: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
}
/** Add or update a pointer record, returning a new array. */
export declare function upsertPointer(pointers: readonly PointerRecord[], record: PointerRecord): PointerRecord[];
/** Remove a pointer record by id, returning a new array. */
export declare function removePointer(pointers: readonly PointerRecord[], id: number): PointerRecord[];
