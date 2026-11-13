import { ShareSettings } from './lg-share-settings';
import { LightGallery } from '../../lightgallery';
export default class Share {
    core: LightGallery;
    settings: ShareSettings;
    private shareOptions;
    private listening;
    constructor(instance: LightGallery);
    init(): void;
    private getShareListHtml;
    /**
     * True when the button should try the OS share sheet first. The
     * dropdown stays rendered as the automatic fallback (a `canShare`
     * veto or share failure at click time falls back to the menu).
     */
    private prefersNativeShare;
    setLgShareMarkup(): void;
    /**
     * Open state lives on the outer element, which outlives a close, so an
     * open dropdown would still be open on the next open. While open, the
     * dropdown dismisses like the More options menu: on a press anywhere
     * outside it, on Escape (the gallery stays open) and when focus tabs
     * out of it.
     */
    private setDropdownOpen;
    private listenOutside;
    private readonly onDocumentPointerDown;
    private readonly onDocumentKeydown;
    private onAfterSlide;
    private getShareListItemHTML;
    private getDefaultShareOptions;
    destroy(): void;
}
