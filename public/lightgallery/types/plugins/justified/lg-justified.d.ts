import { LgQuery } from '../../lgQuery';
import { LightGallery } from '../../lightgallery';
import { JustifiedSettings } from './lg-justified-settings';
/**
 * lightGallery justified layout: lays the gallery's trigger thumbnails
 * out in rows of equal height and varying widths that fill the
 * container edge to edge. The row math is shared headless code; this
 * plugin measures the container, sources the aspect ratios and writes
 * the geometry.
 *
 * Aspect-ratio sources, in order: the trigger's `data-lg-size`
 * attribute, the thumbnail's `width`/`height` attributes, and finally
 * the loaded image's natural size (one relayout when the last unknown
 * resolves).
 *
 * Triggers stay invisible (stylesheet) until they are positioned; each
 * box then shows as a placeholder and the thumbnails fade in as they
 * load, row by row in reading order or one by one (`justifiedReveal`),
 * so the grid is never seen unorganized. Ship `class="lg-justified"`
 * on the container markup to cover the time before the script runs.
 */
export default class Justified {
    core: LightGallery;
    settings: JustifiedSettings;
    private $LG;
    private triggers;
    private ratios;
    private resizeObserver?;
    private layoutWidth;
    private pendingLoads;
    private rows;
    private loaded;
    private loadWatchers;
    private originalContainerStyle;
    private originalTriggerStyles;
    constructor(instance: LightGallery, $LG: LgQuery);
    init(): void;
    /** Adopt the core's current trigger list into the layout. */
    private collectTriggers;
    /** Best-known aspect ratio per trigger; unknowns resolve on load. */
    private resolveRatios;
    /** Relayout once when the last unknown thumbnail resolves. */
    private watchImageLoad;
    private layout;
    /** Track when the trigger's thumbnail has settled (loaded or failed). */
    private watchLoad;
    /**
     * Fade in what may show now (see `justifiedReveal`). Never re-hides:
     * a relayout regroups the rows, already visible triggers stay.
     */
    private reveal;
    private cancelLoadWatchers;
    closeGallery(): void;
    destroy(): void;
}
