/**
 * Framework-free gallery state machine. React (and later Angular/Vue) wrap
 * this with their own reactivity; every transition lives here so behavior is
 * identical across frameworks and testable without any DOM.
 */
export type SlideDirection = 'next' | 'prev';
export interface GalleryState {
    open: boolean;
    currentIndex: number;
    previousIndex: number;
    slidesCount: number;
    loop: boolean;
    /**
     * True once any slide media has finished loading (or failed) since the
     * gallery opened — 2.x `lGalleryOn`. Distinguishes the first slide
     * (backdrop/zoom entrance, no slide animation) from navigation.
     */
    galleryOn: boolean;
    /**
     * True while a slide transition runs — 2.x `lgBusy`. Navigation actions
     * are ignored until `TRANSITION_END`.
     */
    transitioning: boolean;
    /** Direction of the last navigation; drives prev/next slide classes. */
    slideDirection?: SlideDirection;
    /**
     * Indexes whose slide has settled (`lg-complete`): the media loaded, or
     * failed and shows the error message. An index drops out again when its
     * slide leaves the mounted pool, so a remount shows the loader until the
     * media is back.
     */
    loadedSlides: ReadonlySet<number>;
}
export type GalleryAction = {
    type: 'OPEN';
    index?: number;
} | {
    type: 'CLOSE';
} | {
    type: 'GO_TO';
    index: number;
    direction?: SlideDirection;
} | {
    type: 'NEXT';
} | {
    type: 'PREV';
} | {
    type: 'SET_SLIDES_COUNT';
    count: number;
} | {
    type: 'SET_LOOP';
    loop: boolean;
} | {
    type: 'SLIDE_LOADED';
    index: number;
} | {
    type: 'SLIDE_ERROR';
    index: number;
}
/** The slide left the mounted pool; its media must load again. */
 | {
    type: 'SLIDE_UNLOADED';
    index: number;
} | {
    type: 'TRANSITION_END';
};
export interface CreateGalleryStateOptions {
    slidesCount: number;
    loop?: boolean;
    index?: number;
}
export declare function createGalleryState(options: CreateGalleryStateOptions): GalleryState;
export declare function galleryReducer(state: GalleryState, action: GalleryAction): GalleryState;
