export interface CommentStrings {
    toggleComments: string;
}
export interface CommentSettings {
    /**
     * Enable comment box
     */
    commentBox: boolean;
    /**
     * Enable Facebook comment box
     */
    fbComments: boolean;
    /**
     * Enable Disqus comment box
     */
    disqusComments: boolean;
    /**
     * Disqus comment config
     */
    disqusConfig: {
        title?: string;
        language: string;
    };
    /**
     * Facebook comments default markup
     */
    commentsMarkup: string;
    /**
     * Custom translation strings for aria-labels
     * @deprecated Set these labels on the core `strings` object instead,
     * every user-facing string lives in that one contract. An explicitly set
     * key here still wins (alias).
     */
    commentPluginStrings?: Partial<CommentStrings>;
}
export declare const commentSettings: CommentSettings;
