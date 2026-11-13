/**
 * Rolling-window velocity tracking. Release decisions must read the
 * velocity of the gesture's final instant, not its whole-gesture
 * average: a drag that pauses and then flicks reads fast, and a drag
 * that ends resting reads zero. Sessions push a sample per move; the
 * release reads the window ending at the release timestamp.
 */
export interface VelocitySample {
    x: number;
    y: number;
    /** Timestamp in ms (same clock as the release read). */
    t: number;
}
export interface Velocity {
    /** px/ms, signed. */
    x: number;
    y: number;
}
/** How far back a release looks when reading the gesture velocity. */
export declare const VELOCITY_WINDOW_MS = 100;
/**
 * Append a sample, pruning everything older than the window — the
 * buffer stays a handful of entries regardless of gesture length.
 */
export declare function pushVelocitySample(samples: readonly VelocitySample[], sample: VelocitySample, windowMs?: number): VelocitySample[];
/**
 * Velocity (px/ms per axis) over the samples inside the window ending
 * at `releaseTime`. Fewer than two recent samples — the finger rested
 * before lifting — reads as zero, as does sub-pixel drift.
 */
export declare function getWindowedVelocity(samples: readonly VelocitySample[], releaseTime: number, windowMs?: number): Velocity;
