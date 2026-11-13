import { LightGallerySettings } from './lg-settings';
import { LightGallery } from './lightgallery';
declare function lightGallery(el: HTMLElement, options?: LightGallerySettings): LightGallery;
declare namespace lightGallery {
    var setLicenseKey: typeof import("./headless/index").setLicenseKey;
}
export default lightGallery;
export type { LightGallery };
export type { LgIconName, LgIcons } from './lg-icons';
export type { LightGallerySettings } from './lg-settings';
export type { GalleryItem } from './lg-utils';
export type { AfterAppendSlideEventDetail, AfterAppendSubHtmlDetail, AfterCloseDetail, AfterOpenDetail, AfterSlideDetail, BeforeCloseDetail, BeforeNextSlideDetail, BeforeOpenDetail, BeforePrevSlideDetail, BeforeSlideDetail, ContainerResizeDetail, DragEndDetail, DragMoveDetail, DragStartDetail, FlipHorizontalDetail, FlipVerticalDetail, HasVideoDetail, InitDetail, PosterClickDetail, RotateLeftDetail, RotateRightDetail, SlideItemLoadDetail, } from './lg-events';
