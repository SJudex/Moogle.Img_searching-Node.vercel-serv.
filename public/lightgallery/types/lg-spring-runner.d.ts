import { type SpringConfig } from './headless/index';
/**
 * rAF driver for the shared spring math: advances one spring per track
 * each frame and hands the values to the caller's DOM writer. The math
 * (and therefore the feel) lives in @lightgallery/headless; this file
 * only owns scheduling.
 */
export interface SpringTrack extends SpringConfig {
    from: number;
    /** Seed velocity, px/ms, the gesture's windowed release velocity. */
    velocity: number;
    target: number;
}
export declare function runSprings(tracks: SpringTrack[], onFrame: (values: number[]) => void, onDone?: () => void): () => void;
