export interface Matches {
    name: string
    url: string
    selectors: {
        userQueries: string
        userQuery: (id: string) => Element | null
    }
}

//What is Record? https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export const matches: Record<string, Matches>  = {
    "chatgpt": {
        name: "ChatGPT",
        url: '*://chatgpt.com/*',
        selectors: {
            userQueries: "[data-message-author-role='user']",
            userQuery: (queryId) => document.querySelector(`div [data-message-id="${queryId}"]`)
        }
    }
}