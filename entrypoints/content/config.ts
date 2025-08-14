export interface Config {
    name: string
    url: string //for extension matches
    hostname: string //for finding current site
    selectors: {
        userQueries: string
        userQuery: (id: string) => Element | null
        eleKey: string
    }
}

//What is Record? https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export const siteConfig: Record<string, Config>  = {
    "chatgpt": {
        name: "ChatGPT",
        url: '*://chatgpt.com/*',
        hostname: "chatgpt.com",
        selectors: {
            userQueries: "[data-message-author-role='user']",
            userQuery: (queryId) => document.querySelector(`div [data-message-id="${queryId}"]`),
            eleKey: 'dataset.messageId'
        }
    },

    "gemini": {
        name: "Gemini",
        url: '*://gemini.google.com/app/*',
        hostname: 'gemini.google.com',
        selectors: {
            userQueries: "span.user-query-bubble-with-background" ,
            userQuery: (queryId) => document.getElementById(`${queryId}`),
            eleKey: 'id'
        }
    }
}