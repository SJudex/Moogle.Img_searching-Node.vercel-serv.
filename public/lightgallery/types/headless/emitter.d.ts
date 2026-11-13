/**
 * Framework-free typed event emitter — the plugin/core event bus shared by
 * every framework runtime. Each framework supplies its own event map type;
 * unknown event names stay usable for plugin-private events.
 */
export interface TypedEmitter<TMap extends object> {
    /** Subscribe; returns the unsubscribe function. */
    on<K extends keyof TMap & string>(name: K, listener: (detail: TMap[K]) => void): () => void;
    on(name: string, listener: (detail: unknown) => void): () => void;
    emit<K extends keyof TMap & string>(name: K, detail: TMap[K]): void;
    emit(name: string, detail?: unknown): void;
}
export declare function createEmitter<TMap extends object>(): TypedEmitter<TMap>;
