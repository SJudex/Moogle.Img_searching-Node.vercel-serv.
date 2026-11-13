import { LightGallery } from '../../lightgallery';
import { AutoplaySettings } from './lg-autoplay-settings';
/**
 * Creates the autoplay plugin.
 * @param {object} element - lightGallery element
 */
export default class Autoplay {
    core: LightGallery;
    settings: AutoplaySettings;
    /** True while the slideshow runs (counting down, or waiting for the slide on screen to load). */
    running: boolean;
    fromAuto: boolean;
    pausedOnTouchDrag: boolean;
    pausedOnSlideChange: boolean;
    private timer;
    private progressTimer;
    /** Index the countdown waits on; the slide has not loaded yet. */
    private waitingFor;
    private startedFromLoad;
    constructor(instance: LightGallery);
    init(): void;
    private cycleDuration;
    /**
     * Restart the progress bar from zero. Two-phase: the bar must paint at
     * width 0 before `lg-start` lands, or a bar that was already full
     * renders full again instead of animating.
     */
    private showProgressBar;
    private resetProgressBar;
    private controls;
    private isSlideLoaded;
    private clearTimer;
    /**
     * Arm the countdown for the slide at `index`. A slide that is still
     * loading holds the countdown (and the progress bar at zero) until its
     * slideItemLoad arrives, so a slow connection never skips past images
     * the viewer has not seen.
     */
    private schedule;
    private countdown;
    private advance;
    startAutoPlay(): void;
    stopAutoPlay(): void;
    closeGallery(): void;
    destroy(): void;
}
