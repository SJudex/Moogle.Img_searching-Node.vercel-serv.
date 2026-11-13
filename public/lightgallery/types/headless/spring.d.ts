/**
 * Gesture-release physics: momentum projection and a damped-spring
 * stepper. Releases compute where momentum would land (`project`),
 * clamp that into bounds, and animate there with a spring seeded by the
 * live release velocity — velocity stays continuous across the
 * finger-lift boundary, which is most of what native feel is.
 *
 * The stepper advances the standard damped harmonic oscillator by its
 * closed-form solution over each frame, so step size never affects the
 * trajectory and the state (position + velocity) can re-seed a new
 * spring at any interruption point.
 */
export interface SpringState {
    position: number;
    /** px per ms (same unit as the windowed gesture velocity). */
    velocity: number;
}
export interface SpringConfig {
    /** 1 = never overshoot; < 1 overshoots and returns. */
    dampingRatio?: number;
    /** Rad/s — higher settles faster. */
    naturalFrequency?: number;
}
/** Settling toward an in-bounds target: no overshoot. */
export declare const SPRING_SETTLE_DAMPING = 1;
/** Settling against a clamped bound: one soft bounce. */
export declare const SPRING_BOUNCE_DAMPING = 0.82;
export declare const SPRING_NATURAL_FREQUENCY = 12;
/**
 * Momentum projection: how far a release keeps traveling when it loses
 * `1 - decelerationRate` of its velocity every millisecond (the classic
 * scroll-view constant; 0.995 ≈ half a percent per ms).
 */
export declare const DECELERATION_RATE = 0.995;
export declare function project(velocity: number, decelerationRate?: number): number;
/**
 * Advance a spring toward `target` by `dtMs`, exactly (closed form with
 * the current state as initial conditions).
 */
export declare function stepSpring(state: SpringState, target: number, dtMs: number, { dampingRatio, naturalFrequency, }?: SpringConfig): SpringState;
/** Whether a spring is close enough to stop animating. */
export declare function isSpringSettled(state: SpringState, target: number, restDelta?: number, restVelocity?: number): boolean;
