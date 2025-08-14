export function truncate(queryContent: string) {
    const truncated = queryContent.slice(0, 100)
    return truncated
}

