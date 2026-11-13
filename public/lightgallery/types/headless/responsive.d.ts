/**
 * Responsive image selection + decode gating (plan: responsive loading).
 *
 * The browser already picks a candidate natively when the runtimes render
 * `<picture>`/`srcset` — these helpers exist for the places that need the
 * DECISION as data: preload warming at the right resolution, tooling, and
 * the framework image-component recipes. The algorithm mirrors the HTML
 * spec's srcset selection closely enough to be deterministic and
 * unit-testable: parse candidates, derive the slot width from `sizes`,
 * scale by DPR, pick the smallest candidate that covers the target
 * (falling back to the largest available).
 */
import type { GalleryItem, ImageSources } from './items';
export interface SrcsetCandidate {
    url: string;
    /** Width descriptor (`640w`) in px, if given. */
    width?: number;
    /** Density descriptor (`2x`), if given; bare candidates read as 1x. */
    density?: number;
}
export interface Viewport {
    width: number;
    height: number;
    /** devicePixelRatio; defaults to 1. */
    dpr?: number;
}
/** Parse a `srcset` attribute string into candidates. Malformed entries
 * are skipped rather than thrown — item data is author-provided. */
export declare function parseSrcset(srcset: string | undefined): SrcsetCandidate[];
/**
 * Effective slot width (px) from a `sizes` attribute for a viewport.
 * Supports the common authored forms deterministically: comma-separated
 * `(min-width: Npx) <len>` / `(max-width: Npx) <len>` clauses with a
 * bare `<len>` default, where `<len>` is `px` or `vw`. The first
 * matching clause wins (spec order). Unsupported conditions are skipped;
 * no match falls back to the full viewport width (`100vw`, the spec
 * default).
 */
export declare function resolveSizes(sizes: string | undefined, viewportWidth: number): number;
/** Whether a `<source media>` condition matches the viewport. Same
 * deterministic subset as {@link resolveSizes}: min/max-width in px;
 * unsupported conditions read as NOT matching. Absent media matches. */
export declare function matchesMedia(media: string | undefined, viewport: Viewport): boolean;
export interface ResolvedImageSource {
    src: string;
    /** Intrinsic width (px) when the winning candidate declared one. */
    width?: number;
    /** The `<source>` entry that won, when selection went through
     * `sources` (picture semantics) rather than the item srcset. */
    source?: ImageSources;
}
/**
 * Deterministically resolve which image URL a viewport displays for an
 * item, mirroring picture/srcset semantics: the first matching
 * `sources[]` entry wins (spec order), then the item-level
 * `srcset`/`sizes`, then plain `src`. Returns null for items with no
 * image source at all.
 */
export declare function resolveImageSource(item: Pick<GalleryItem, 'src' | 'srcset' | 'sizes' | 'sources'>, viewport: Viewport): ResolvedImageSource | null;
/**
 * The width "actual size" zoom refers to. `img.naturalWidth` LIES under
 * `srcset`/`sizes`: w-descriptor selection density-corrects the
 * intrinsic size to roughly the layout slot — on phones that collapses
 * the actual-size scale to ~1 and kills double-tap/pinch zoom. The
 * resolution order mirrors what the item DECLARES before trusting the
 * element: explicit `width` (2.x `data-width`), the largest candidate
 * the srcset ladder can serve (first matching `sources[]` entry per
 * picture semantics, else the item srcset), the `lgSize` natural dims,
 * and only then the reported natural width. The declared tiers are what
 * make optimizer components (next/image, NuxtImg, NgOptimizedImage) —
 * which manage their own srcset — zoomable to full resolution.
 */
export declare function getActualSizeWidth(item: Pick<GalleryItem, 'width' | 'srcset' | 'sources' | 'lgSize'>, viewport: Viewport, naturalWidth: number): number;
/**
 * How long a slide waits on `img.decode()` before completing anyway —
 * the gate must never strand a slide on a browser that rejects or
 * stalls decode (huge images evict decoded data; some UAs reject on
 * detached nodes).
 */
export declare const DECODE_TIMEOUT_MS = 500;
/**
 * Decode gate: resolve when the image is safe to paint — after
 * `decode()` settles (success OR rejection; rejection still means the
 * data arrived) or after the timeout, whichever is first. Browsers
 * without `decode()` resolve immediately (the load event already
 * fired). Never rejects.
 */
export declare function awaitDecode(img: {
    decode?: () => Promise<void>;
}, timeoutMs?: number): Promise<void>;
