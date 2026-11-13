export interface ToolbarOverflowOptions {
    /** Id of the More options button; the menu id derives from it. */
    id: string;
    /** Accessible name of the More options button and its menu. */
    label: string;
}
/**
 * Keeps the toolbar on one row: measures it, hides the buttons that do
 * not fit (`data-lg-overflow`) and lists them in a "More options" menu
 * whose items trigger the hidden buttons, so every plugin's handlers keep
 * working unchanged.
 */
export declare class ToolbarOverflow {
    private readonly toolbar;
    private readonly options;
    private readonly more;
    private menu;
    private frame;
    private movedSignature;
    private readonly widths;
    private readonly resizeObserver?;
    private readonly mutationObserver?;
    constructor(toolbar: HTMLElement, options: ToolbarOverflowOptions);
    /** Re-measure the row and move buttons in or out of the menu. */
    update(): void;
    /** Close the menu; optionally hand focus back to the More button. */
    close(returnFocus: boolean): void;
    destroy(): void;
    private readonly requestUpdate;
    private readonly onMoreClick;
    private open;
    private renderMenu;
    private items;
    private readonly onMenuKeydown;
    private readonly onDocumentPointerDown;
}
