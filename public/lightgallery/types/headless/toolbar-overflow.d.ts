/**
 * Toolbar overflow: when the toolbar's icon buttons do not fit on one row
 * beside the counter, the lowest-priority buttons move into a "More
 * options" menu. Pure layout arithmetic over measured widths; each runtime
 * measures its own DOM, applies the result and renders the menu.
 */
/** Priority of a button that never moves into the menu (close). */
export declare const TOOLBAR_PINNED: number;
/** Priority of a button the table does not know (custom plugin buttons). */
export declare const TOOLBAR_DEFAULT_PRIORITY = 20;
/** Overflow priority of a toolbar button from its class names. */
export declare function getToolbarItemPriority(classList: Iterable<string>): number;
export interface ToolbarOverflowItem {
    /** Measured width, px. */
    width: number;
    /** From {@link getToolbarItemPriority}; higher stays longer. */
    priority: number;
}
export interface ToolbarOverflowInput {
    /** Width of the toolbar row, px. */
    available: number;
    /** Width taken by content that never moves (the counter), px. */
    reserved: number;
    /** Width of the More button, px. */
    moreWidth: number;
    /** The toolbar's icon buttons, in DOM order. */
    items: readonly ToolbarOverflowItem[];
}
/**
 * Indices (in DOM order) of the buttons that move into the menu; empty
 * when everything fits, or when the toolbar has no width yet (not laid
 * out). Lowest priority moves first; among equals, the button later in
 * DOM order goes first, which is the one furthest from the close button.
 * The More button's own width is paid as soon as anything moves.
 */
export declare function getToolbarOverflow({ available, reserved, moreWidth, items, }: ToolbarOverflowInput): number[];
/**
 * Whether a click's event path runs through the toolbar. Clicks there are
 * controls, not a tap on the backdrop: Medium zoom closes on the latter
 * only. The path (`event.composedPath()`) still lists a More menu item the
 * click already removed from the document.
 */
export declare function isToolbarEventPath(path: readonly unknown[]): boolean;
/** What the dismissal of a toolbar menu reads from the dismissing press. */
export interface MenuDismissEvent {
    target: unknown;
    preventDefault(): void;
    stopPropagation(): void;
}
/**
 * A press outside an open toolbar menu (the More options menu, the share
 * dropdown) dismisses it. A press on a control passes through, so one
 * click on another toolbar button both dismisses the menu and runs the
 * button. A press on the backdrop around the slide is consumed instead:
 * there the gallery's own tap-to-close and drag would fire, and
 * dismissing a menu must not also close the gallery. Cancelling the
 * pointerdown suppresses the compatibility mouse events the vanilla
 * runtime listens to; stopping it keeps the pointer-driven runtimes'
 * handlers from arming. Returns whether the press was consumed.
 */
export declare function consumeBackdropPress(event: MenuDismissEvent): boolean;
