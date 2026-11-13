/**
 * Icon injection: the gallery's icons are inline SVG strings, built-in
 * defaults (registered by the core and by each plugin, so a plugin's
 * icons ship in its own bundle) merged under the consumer's
 * `settings.icons` overrides. One generic pass over the built structure,
 * every icon button (core and plugins alike) is an empty classed element
 * by the end of `buildStructure`, so a name→selector table covers them
 * all without touching the individual templates.
 *
 * State-pair buttons (maximize/minimize, autoplay play/pause, fullscreen
 * enter/exit) render BOTH icons of the pair; state classes (`lg-inline`,
 * `lg-show-autoplay`, `lg-fullscreen-on`) toggle their visibility in
 * CSS. A consumer override applies only when it answers every name of a
 * pair, a half-provided pair keeps the defaults so no state ends up
 * iconless.
 */
import type { LgIconName } from './headless/index';
export type { LgIconName };
/** SVG markup per icon; omitted names keep the built-in glyph. */
export type LgIcons = Partial<Record<LgIconName, string>>;
/**
 * Inject the gallery's icons into the built structure: per target, the
 * consumer's overrides apply when they answer every name (pairs must be
 * complete), else the registered defaults render. Elements keep their
 * classes and listeners, the icons are prepended children.
 */
export declare function applyCustomIcons(container: HTMLElement, defaults: LgIcons, overrides: LgIcons | undefined): void;
