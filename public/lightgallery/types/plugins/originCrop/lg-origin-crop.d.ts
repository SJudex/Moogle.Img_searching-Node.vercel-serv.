import { LightGallery } from '../../lightgallery';
import { OriginCropSettings } from './lg-origin-crop-settings';
/**
 * Zoom-from-origin flights from cropped thumbnails. A grid tile cropped
 * with `object-fit: cover` (or `background-size: cover`) shows a window of
 * the image, and the built-in flight squashes the whole image into the
 * tile. With this plugin the window grows from the tile at a uniform
 * scale while two boxes around the slides crop the rest of the image,
 * revealed as the flight lands; the close flies back the same way. The
 * plugin reads the thumbnail's computed fit and position, so no markup is
 * needed. Thumbnails the built-in flight lands exactly keep it.
 *
 * The core's flight is untouched: the plugin replaces the flight's
 * transform through `getOriginTransform` and follows each of the core's
 * flight steps with the crop, in the same task.
 */
export default class OriginCrop {
    core: LightGallery;
    settings: OriginCropSettings;
    private outerBox?;
    private innerBox?;
    private flight?;
    private closing;
    private stageMoved;
    private observer?;
    private flipGrace?;
    private restoreCore?;
    constructor(instance: LightGallery);
    init(): void;
    destroy(): void;
    /**
     * Takes over the core's flight hooks: the flight's transform, and the
     * dummy that flies in place of the loading image.
     */
    private patchCore;
    /**
     * The flight from (or back to) a trigger, when the built-in flight
     * cannot land it exactly: a cropped thumbnail, one letterboxed in its
     * box, or a background thumbnail. Undefined otherwise, and the core
     * flies as it always does.
     */
    private getFlight;
    /**
     * The opening flight, whose transform the core has just asked for. For
     * a cropped thumbnail the stage crops to the thumbnail before anything
     * shows (the gallery is still transparent), then follows the slide.
     */
    private onBeforeOpen;
    /**
     * Follows the opening slide with the stage. Mutation records are
     * delivered at the end of the task that made them, before the browser
     * renders, so the stage moves in the same frame as each of the core's
     * steps: when the core flips the slide to rest, the stage opens with it
     * on the slide's duration and easing; when the core settles the flight,
     * the stage lets go.
     */
    private followOpen;
    private onBeforeClose;
    /**
     * The closing flight, whose transform the core has just asked for. The
     * core puts the slide on it right after, in the same task; once it has,
     * the stage follows on the slide's duration and easing: onto the
     * thumbnail's box for a cropped thumbnail, else back to rest if an
     * opening flight left it cropped.
     */
    private followClose;
    private onAfterClose;
    private getSlideTransition;
    /**
     * Crops the stage: both boxes hide their overflow and take their
     * transforms, instantly or on a transition.
     */
    private setStage;
    /** Lets go of the crop: the boxes are inert again. */
    private resetStage;
    private stopFollowing;
    private wrapStage;
    private unwrapStage;
}
