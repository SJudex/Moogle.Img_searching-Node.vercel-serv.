import { type Velocity } from '../../headless/index';
import { LgQuery, lgQuery } from '../../lgQuery';
import { LightGallery } from '../../lightgallery';
interface Coords {
    x: number;
    y: number;
}
interface DragAllowedAxises {
    allowX: boolean;
    allowY: boolean;
}
interface ZoomTouchEvent {
    pageX: number;
    touches: {
        pageY: number;
        pageX: number;
    }[];
    pageY: number;
}
interface PossibleCords {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
export default class Zoom {
    private core;
    private settings;
    private $LG;
    private imageReset;
    zoomableTimeout: any;
    positionChanged: boolean;
    zoomInProgress: boolean;
    pageX: number;
    pageY: number;
    scale: number;
    containerRect: ClientRect;
    dragAllowedAxises: DragAllowedAxises;
    top: number;
    left: number;
    scrollTop: number;
    private cancelZoomSpring?;
    constructor(instance: LightGallery, $LG: LgQuery);
    buildTemplates(): void;
    /**
     * @desc Enable zoom option only once the image is completely loaded
     * If zoomFromOrigin is true, Zoom is enabled once the dummy image has been inserted
     *
     * Zoom styles are defined under lg-zoomable CSS class.
     */
    enableZoom(event: CustomEvent): void;
    enableZoomOnSlideItemLoad(): void;
    getDragCords(e: MouseEvent): Coords;
    getSwipeCords(e: TouchEvent): Coords;
    getDragAllowedAxises(scale: number, scaleDiff?: number): DragAllowedAxises;
    setZoomEssentials(): void;
    /**
     * @desc Image zoom
     * Translate the wrap and scale the image to get better user experience
     *
     * @param {String} scale - Zoom decrement/increment value
     */
    zoomImage(scale: number, scaleDiff: number, reposition: boolean, resetToMax: boolean): void;
    resetImageTranslate(index: number): void;
    setZoomImageSize(delay?: number): void;
    /**
     * @desc apply scale3d to image and translate to image wrap
     * @param {style} X,Y and scale
     */
    setZoomStyles(style: {
        x: number;
        y: number;
        scale: number;
    }): void;
    /**
     * @param index - Index of the current slide
     * @param event - event will be available only if the function is called on clicking/taping the imags
     */
    setActualSize(index: number, event?: ZoomTouchEvent): void;
    getNaturalWidth(index: number): number;
    getActualSizeScale(naturalWidth: number, width: number): number;
    getCurrentImageActualSizeScale(): number;
    getPageCords(event?: ZoomTouchEvent): Coords;
    setPageCords(event?: ZoomTouchEvent): void;
    manageActualPixelClassNames(): void;
    beginZoom(scale: number): boolean;
    getScale(scale: number): number;
    init(): void;
    zoomIn(): void;
    resetZoom(index?: number): void;
    /** Stop a running release spring; state stays at its live values. */
    stopZoomSpring(): void;
    /**
     * Any gesture end must leave the image inside its pan bounds: a tap
     * interrupts a settling spring (stopZoomSpring at its touchstart),
     * and if it never turns into a drag nothing else re-clamps, the
     * fused pinch pan can legitimately be far outside mid-settle.
     * Springs home from wherever the interruption stopped it; a no-op
     * when already in bounds (the common tap).
     */
    settleIntoBounds(): void;
    getTouchDistance(e: TouchEvent): number;
    /**
     * Pinch midpoint relative to the stage centre, the focal anchor the
     * whole gesture projects through.
     */
    private getPinchMidPoint;
    /**
     * Clamp a pan into the stage-aware bounds at the given scale,
     * measured from the untransformed layout size (offset dimensions
     * ignore transforms, so this stays correct mid-gesture). Y matches
     * `getPossibleSwipeDragCords`: the vacated components strip belongs
     * to the stage, so the pan-up floor sits where the image's bottom
     * edge meets the SCREEN bottom, not the content box.
     */
    /**
     * Bounds-relevant size of the image: layout offsets swapped and
     * shrunk by the rotate plugin's wrapper transform when present,
     * at 90°/270° the visual width runs along the layout height, and
     * offsets don't see transforms.
     */
    getVisualImageSize($image: HTMLElement, width: number, height: number): {
        width: number;
        height: number;
    };
    clampPinchPan(pan: Coords, scale: number): Coords;
    pinchZoom(): void;
    touchendZoom(startCoords: Coords, endCoords: Coords, allowX: boolean, allowY: boolean, velocity: Velocity): void;
    getZoomSwipeCords(startCoords: Coords, endCoords: Coords, allowX: boolean, allowY: boolean, possibleSwipeCords: PossibleCords): Coords;
    private isBeyondPossibleLeft;
    private isBeyondPossibleRight;
    private isBeyondPossibleTop;
    private isBeyondPossibleBottom;
    isImageSlide(index: number): boolean;
    getPossibleSwipeDragCords(scale?: number): PossibleCords;
    setZoomSwipeStyles(LGel: lgQuery, distance: {
        x: number;
        y: number;
    }): void;
    zoomSwipe(): void;
    zoomDrag(): void;
    closeGallery(): void;
    destroy(): void;
}
export {};
