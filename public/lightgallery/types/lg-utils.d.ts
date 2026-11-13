import { lgQuery } from './lgQuery';
import { VideoSource } from './plugins/video/types';
import { VideoInfo } from './types';
export interface ImageSize {
    width: number;
    height: number;
}
export interface ImageSources {
    media?: string;
    srcset: string;
    sizes?: string;
    type?: string;
}
export interface GalleryItem {
    /**
     * url of the media
     * @dataAttr data-src
     */
    src?: string;
    /**
     * Source attributes for the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attributes">picture</a> element
     * @dataAttr data-sources
     */
    sources?: ImageSources[];
    /**
     * Thumbnail url
     * @description By default lightGallery uses the image inside gallery selector as thumbnail.
     * But, If you want to use external image for thumbnail,
     * pass the thumbnail url via any data attribute and
     * pass the attribute name via exThumbImage option
     * @example
     * <div id="lightGallery">
     *     <a href="a.jpg" data-external-thumb-image="images/externalThumb.jpg" ><img src="thumb.jpg" /></a>
     * </div>
     *
     * lightGallery(document.getElementById('lightGallery'), {
     *     exThumbImage: 'data-external-thumb-image'
     * })
     * @dataAttr data-*
     */
    thumb?: string;
    /**
     * alt attribute for the image
     * @dataAttr alt
     */
    alt?: string;
    /**
     * Title attribute for the image or video. With the
     * getCaptionFromTitleOrAlt setting, it is used as the caption when
     * subHtml is not set.
     * @dataAttr title
     */
    title?: string;
    /**
     * Title for iframe
     * @dataAttr data-iframe-title
     */
    iframeTitle?: string;
    /**
     * Caption for the slide
     * @description You can either pass the HTML markup or the ID or class name of the element which contains the captions
     * @dataAttr data-sub-html
     */
    subHtml?: string;
    /**
     * url of the file which contain the sub html.
     * @description Note - Does not support Internet Explorer browser
     * @dataAttr data-sub-html-url
     */
    subHtmlUrl?: string;
    /**
     * Video source
     * @dataAttr data-video
     */
    video?: VideoSource;
    /**
     * Poster url
     * @dataAttr data-poster
     */
    poster?: string;
    /**
     * Custom slide name to use in the url when hash plugin is enabled
     * @dataAttr data-slide-name
     */
    slideName?: string;
    /**
     * List of images and viewport's max width separated by comma.
     * @description Ex?: img/1-375.jpg 375, img/1-480.jpg 480, img/1-757.jpg 757.
     * @dataAttr data-responsive
     */
    responsive?: string;
    /**
     * srcset attribute values for the main image
     * @dataAttr data-srcset
     */
    srcset?: string;
    /**
     * srcset sizes attribute for the main image
     * @dataAttr data-sizes
     */
    sizes?: string;
    /**
     * Set true is you want to open your url in an iframe
     * @dataAttr data-iframe
     */
    iframe?: boolean;
    /**
     * Download url for your image/video.
     * @description Pass false if you want to disable the download button.
     * @dataAttr data-download-url
     */
    downloadUrl?: string | boolean;
    /**
     * Name of the file after it is downloaded.
     * @description The HTML value of the download attribute.
     * There are no restrictions on allowed values, and the browser will automatically
     * detect the correct file extension and add it to the file (.img, .pdf, .txt, .html, etc.).
     * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download">More info</a>
     * @dataAttr data-download
     */
    download?: string | boolean;
    /**
     * Actual size of the image in px.
     * @description This is used in zoom plugin to see the actual size of the image when double-tapped on the image.
     * @dataAttr data-width
     */
    width?: string;
    /**
     * Canonical share URL for the native share sheet (Web Share API).
     * @description Specify only if you want a separate URL for the specific
     * slide. Falls back to the network-specific share URLs, then the current
     * browser URL.
     * @dataAttr data-share-url
     */
    shareUrl?: string;
    /**
     * Facebook share URL.
     * @description Specify only if you want to provide separate share URL for the specific slide. By default, current browser URL is taken.
     * @dataAttr data-facebook-share-url
     */
    facebookShareUrl?: string;
    /**
     * Tweet text
     * @dataAttr data-tweet-text
     */
    tweetText?: string;
    /**
     * Twitter share URL.
     * @description Specify only if you want to provide separate share URL for the specific slide. By default, current browser URL will be taken.
     * @dataAttr data-twitter-share-url
     */
    twitterShareUrl?: string;
    /**
     * Pinterest share URL.
     * @description Specify only if you want to provide separate share URL for the specific slide. By default, current browser URL will be taken.
     * Note?: Pinterest requires absolute URL
     * @dataAttr data-pinterest-share-url
     */
    pinterestShareUrl?: string;
    /**
     * Description for Pinterest post.
     * @dataAttr data-pinterest-text
     */
    pinterestText?: string;
    /**
     * Facebook comments body html
     * @description Please refer <a href="https://developers.facebook.com/docs/plugins/comments/#comments-plugin">facebook official documentation</a> for generating the HTML markup
     * @example
     * <div
     *      class="fb-comments"
     *      data-href="https://www.example.com/your-page/#lg=1&slide=0"
     *      data-width="400"
     *      data-numposts="5">
     * </div>
     * @dataAttr data-fb-html
     */
    fbHtml?: string;
    /**
     * Disqus page identifier
     * @description Please refer official <a href="https://help.disqus.com/en/articles/1717084-javascript-configuration-variables">disqus documentation</a> for more info
     * @dataAttr data-disqus-identifier
     */
    disqusIdentifier?: string;
    /**
     * Disqus page url
     * @description Please refer official <a href="https://help.disqus.com/en/articles/1717084-javascript-configuration-variables">disqus documentation</a> for more info
     * @dataAttr data-disqus-url
     */
    disqusUrl?: string;
    /**
     * Original size of the media as `"WIDTH-HEIGHT"`, for example `1600-1067`.
     * @description Drives the zoom-from-origin opening and closing animation
     * and the size of video slides. In a gallery built from markup it is read
     * from the item element. In dynamic mode set it on the item and pass the
     * element the slide should grow out of as the second argument of
     * `openGallery`; a `data-lg-size` attribute on that element still wins.
     * @dataAttr data-lg-size
     */
    lgSize?: string;
    __slideVideoInfo?: VideoInfo;
    [key: string]: any;
}
export declare function convertToData(attr: string): string;
declare const utils: {
    /**
     * Fetches HTML content from a given URL and inserts it into a specified element.
     *
     * @param url - The URL to fetch the HTML content from.
     * @param element - The DOM element (jQuery object) to insert the HTML content into.
     * @param insertMethod - The method to insert the HTML ('append' or 'replace').
     */
    fetchCaptionFromUrl(url: string, element: lgQuery, insertMethod: 'append' | 'replace'): void;
    /**
     * Fit the media's original size into the container. The size comes from
     * the element's `data-lg-size` attribute, then the item's `lgSize`
     * field, then `defaultLgSize`. Used for the zoom-from-origin animation.
     */
    getSize(el: HTMLElement, container: lgQuery, spacing?: number, defaultLgSize?: string, itemLgSize?: string): ImageSize | undefined;
    /**
     * @desc Get transform value based on the imageSize. Used for ZoomFromOrigin option
     * @param {jQuery Element}
     * @returns {String} Transform CSS string
     */
    getTransform(el: HTMLElement, container: lgQuery, top: number, bottom: number, imageSize?: ImageSize): string | undefined;
    getIframeMarkup(iframeWidth: string, iframeHeight: string, iframeMaxWidth: string, iframeMaxHeight: string, src?: string, iframeTitle?: string): string;
    getImgMarkup(index: number, src: string, altAttr: string, srcset?: string, sizes?: string, sources?: ImageSources[]): string;
    getResponsiveSrc(srcItms: string[]): string;
    isImageLoaded(img: HTMLImageElement): boolean;
    getVideoPosterMarkup(_poster: string, dummyImg: string | HTMLElement, videoContStyle: string, playVideoString: string, _isVideo?: VideoInfo): string;
    getFocusableElements(container: HTMLElement): NodeListOf<Element>;
    /**
     * @desc Create dynamic elements array from gallery items when dynamic option is false
     * It helps to avoid frequent DOM interaction
     * and avoid multiple checks for dynamic elments
     *
     * @returns {Array} dynamicEl
     */
    getDynamicOptions(items: any, extraProps: string[], getCaptionFromTitleOrAlt: boolean, exThumbImage: string): GalleryItem[];
    isMobile(): boolean;
    /**
     * @desc Check the given src is video
     * @param {String} src
     * @return {Object} video type
     * Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     *
     * @todo - this information can be moved to dynamicEl to avoid frequent calls
     */
    isVideo(src: string, isHTML5VIdeo: boolean, index: number): VideoInfo | undefined;
};
export default utils;
