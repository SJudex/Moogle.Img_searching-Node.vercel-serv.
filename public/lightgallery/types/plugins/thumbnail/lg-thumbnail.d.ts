import { LgQuery } from '../../lgQuery';
import { LightGallery } from '../../lightgallery';
import { GalleryItem } from '../../lg-utils';
interface ThumbDragUtils {
    cords: {
        startX: number;
        endX: number;
    };
    isMoved: boolean;
    newTranslateX: number;
    startTime: Date;
    endTime: Date;
    touchMoveTime: number;
}
interface ThumbnailGalleryItem extends GalleryItem {
    thumb: string;
}
export default class Thumbnail {
    private core;
    private $thumbOuter;
    private $lgThumb;
    private thumbOuterWidth;
    private thumbTotalWidth;
    private translateX;
    private thumbClickable;
    private instantThumb;
    private dragSamples;
    private liveTranslateX;
    private cancelThumbSpring?;
    private renderedThumbWindow?;
    private scrubActive;
    private scrubIndex;
    private scrubSavedSpeed?;
    private settings;
    private $LG;
    constructor(instance: LightGallery, $LG: LgQuery);
    init(): void;
    build(): void;
    setThumbMarkup(): void;
    enableThumbDrag(): void;
    enableThumbSwipe(): void;
    rebuildThumbnails(): void;
    setTranslate(value: number): void;
    private isRtl;
    getPossibleTransformX(left: number): number;
    animateThumb(index: number): void;
    private canScrub;
    /**
     * A scrub session starts on the first actual strip movement and
     * ends when the release glide settles (or the plugin dies). While
     * it runs: slide transitions are visually off (`lg-thumb-scrubbing`
     * CSS), the core's transition timers collapse (`speed` 0) so the
     * landed slide's content loads without the navigation lag, and the
     * strip's own slide-change re-centering stands down.
     */
    private beginScrub;
    private endScrub;
    /** Live translate → slide, on drag frames and glide frames alike. */
    private scrubTo;
    /**
     * Drag-start seam (strip physics): a press mid-glide takes over
     * from the live position, and the velocity window restarts.
     */
    private onThumbDragStart;
    onThumbTouchMove(thumbDragUtils: ThumbDragUtils): ThumbDragUtils;
    onThumbTouchEnd(thumbDragUtils: ThumbDragUtils): ThumbDragUtils;
    getThumbHtml(thumb: string, index: number, alt?: string, activeIndex?: number): HTMLElement;
    /**
     * True when the strip renders only a window of thumbs
     * (virtualization.thumbs).
     */
    private isThumbWindowed;
    /**
     * (Re)build the strip contents. Classic mode appends every thumb once;
     * windowed mode renders the visible range plus overscan with spacers
     * preserving the strip geometry, and re-runs at commit points only
     * (open, slide change, drag release, resize, updateSlides), never per
     * pointer move.
     */
    private renderThumbItems;
    setThumbItemHtml(items: ThumbnailGalleryItem[]): void;
    setAnimateThumbStyles(): void;
    manageActiveClassOnSlideChange(): void;
    toggleThumbBar(): void;
    thumbKeyPress(): void;
    destroy(): void;
}
export {};
