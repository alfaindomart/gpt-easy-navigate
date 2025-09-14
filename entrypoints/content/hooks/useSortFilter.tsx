import { useMemo } from "react";
import { Bookmark, Config } from "../config";

export function useSortFilter(allQueries: HTMLElement[], keywordsState: string, filterSaved: boolean, sortFromNew: boolean, bookmarked: Map<any, Bookmark>, elementKey: Config) {
    const displayedQueries = useMemo(() => {
        let queries = allQueries
        
        if (keywordsState) {
        queries = queries.filter(query => query.innerText.toLowerCase().includes(keywordsState.trim()))
         }

        if (sortFromNew) {
            queries = [...allQueries].reverse()
        }

        if (filterSaved) {
            const helper = (query: HTMLElement) => elementKey.selectors.helper(query) 
            if (!helper) {
                console.log('cant find helper key')
                return
            }
            queries = queries.filter(query => bookmarked.has(helper(query)))
        }
        return queries
    }, [allQueries, keywordsState, filterSaved
, sortFromNew, bookmarked, elementKey])

return displayedQueries
}