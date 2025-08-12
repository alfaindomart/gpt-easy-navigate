export function truncate(queryContent: string) {
    const truncated = queryContent.slice(0, 100)
    return truncated
}

export function scrollQueryToView(queryId: string | undefined /*the dataset is typed as DOMStringMap, which has the value: string | undefined*/ ) {
    const getElement = document.querySelector(`div [data-message-id="${queryId}"]`) //need to change based on url matches
    console.log(getElement)
    if (!getElement) console.log('cant find element')
         else
    getElement.scrollIntoView({behavior: "smooth", block: 'center'})
}

