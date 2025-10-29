export interface Config {
    name: string
    url: string //for extension matches
    hostname: string //for finding current site
    selectors: {
        userQueries: string
        userQuery: (id: string) => Element | null
        helper: (queryElement: HTMLElement) => string | null | undefined //helper selector for when userQuery is sufficient
        conversationTitle: () => string | null
        aiResponses?: string
    }
}

export interface Bookmark {
    key: string | null | undefined
    chatUrl: string
    title: string
    previewChat: string
    timeStamp: string
}

export type GroupedBookmarks = Record<string, Record<string, Bookmark[]>>

//What is Record? https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export const siteConfig: Record<string, Config>  = {
    "chatgpt": {
        name: "ChatGPT",
        url: '*://chatgpt.com/*',
        hostname: "chatgpt.com",
        selectors: {
            userQueries: "[data-message-author-role='user']",
            userQuery: (queryId) => document.querySelector(`div [data-message-id="${queryId}"]`),
            helper: (queryElement) => queryElement.dataset.messageId,
            conversationTitle: () => document.title,
            aiResponses: "[data-message-author-role='assistant']"
        }
    },

    "gemini": {
        name: "Gemini",
        url: '*://gemini.google.com/app/*',
        hostname: 'gemini.google.com',
        selectors: {
            userQueries: "span.user-query-bubble-with-background" ,
            userQuery: (queryId) => document.getElementById(`${queryId}`),
            helper: (queryElement) => queryElement.closest('.conversation-container')?.getAttribute('id'),
            conversationTitle: () => document.getElementsByClassName('conversation-title gds-label-l')[0]?.textContent,
            aiResponses: "model-response-text"
        }
    }
}

