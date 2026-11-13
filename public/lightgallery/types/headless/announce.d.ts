/**
 * Slide-change announcement formatting for the shared `aria-live` region.
 * All four runtimes build their announcer text through this helper so the
 * wording (and its localization surface, `strings.slideAnnouncement`) stays
 * identical everywhere.
 */
export interface SlideAnnouncementOptions {
    /** `strings.slideAnnouncement` template with `{index}`/`{total}` slots. */
    template: string;
    /** 1-based position of the shown slide. */
    index: number;
    /** Total slide count. */
    total: number;
    /** Plain-text caption of the shown slide, if any. */
    caption?: string;
}
/**
 * Build the text announced on a slide change: the filled template, then the
 * caption (comma-separated) when one exists. Whitespace in the caption is
 * collapsed so multi-line/rich captions read as one sentence.
 */
export declare function formatSlideAnnouncement(options: SlideAnnouncementOptions): string;
