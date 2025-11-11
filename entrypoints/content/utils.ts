import { options } from "./components/Sort";
import { Bookmark } from "./config";
export function truncate(queryContent: string) {
  const truncated = queryContent.slice(0, 200);
  return truncated;
}

export function sortFilter(
  allQueries: HTMLElement[],
  keywordsState: string,
  filterSaved: boolean,
  sortFromNew: boolean,
) {
  if (keywordsState) {
    allQueries = allQueries.filter((query) =>
      query.innerText.toLowerCase().includes(keywordsState.trim()),
    );
  }

  // if (filterSaved) {
  //     allQueries.filter(query => bookmarked.key?.includes(query.))
  // }

  if (sortFromNew) {
    allQueries = [...allQueries].reverse();
  }

  return allQueries;
}
