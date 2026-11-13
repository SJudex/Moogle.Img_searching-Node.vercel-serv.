/**
 * License key check shared by every package. The key never limits a
 * feature; it only decides which console message, if any, the gallery
 * logs. `checkLicenseKey` is pure; the page-wide key and the once-per-page
 * bookkeeping are module state, and the runtime does the logging.
 */
/** The temporary key; also the default `licenseKey`. */
export declare const TESTING_LICENSE_KEY = "0000-0000-000-0000";
/** Every lightGallery 3 key starts with this; v1 and v2 keys don't. */
export declare const LICENSE_KEY_PREFIX = "LIG";
export interface LicenseNotice {
    level: 'error' | 'warn';
    message: string;
}
/**
 * The console notice for a license key, or `null` for a lightGallery 3
 * key. An empty key is an error; the testing key and keys from v1 or v2
 * (no `LIG` prefix) are warnings.
 */
export declare function checkLicenseKey(licenseKey: string | undefined): LicenseNotice | null;
/**
 * Set the license key once for every gallery on the page. Call it before
 * creating galleries; a gallery's own `licenseKey` still wins.
 */
export declare function setLicenseKey(licenseKey: string): void;
/**
 * The key a gallery runs with: its own `licenseKey`, or the page-wide key
 * when it has none (or only the testing default).
 */
export declare function resolveLicenseKey(instanceKey: string | undefined): string;
/**
 * The notice a new gallery should log, or `null`. Each message is logged
 * once per page, however many galleries share the key.
 */
export declare function takeLicenseNotice(instanceKey: string | undefined): LicenseNotice | null;
