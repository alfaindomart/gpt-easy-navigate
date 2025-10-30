import { useMemo } from "react";
import { Bookmark, Config } from "../config";

export function useSortFilter(allQueries: HTMLElement[], keywordsState: string, filterSaved: boolean, sortFromNew: boolean, bookmarked: Map<any, Bookmark>, elementKey: Config) {
    const displayedQueries = useMemo(() => {
        let queries = allQueries
        // let aiQueries = aiResponses
        
        if (keywordsState) {
        queries = queries.filter(query => query.innerText.toLowerCase().includes(keywordsState.trim()))
        // aiQueries = aiQueries.filter(query => query.innerText.toLowerCase().includes(keywordsState.trim()))
         }

        if (sortFromNew) {
            queries = [...allQueries].reverse()
            // aiQueries = [...aiResponses].reverse()
        }

        if (filterSaved) {
            const helper = (query: HTMLElement) => elementKey.selectors.helper(query) 
            if (!helper) {
                console.log('cant find helper key')
                return
            }
            queries = queries.filter(query => bookmarked.has(helper(query)))
            // aiQueries = aiQueries.filter(query => bookmarked.has(helper(query)))
        }
        return queries
    }, [allQueries, keywordsState, filterSaved
, sortFromNew, bookmarked, elementKey])

return displayedQueries
}