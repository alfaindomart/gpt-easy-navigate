import { Dispatch, SetStateAction } from "react";
import { SortAsc, SortDesc, Star } from "lucide-react";

export type options = {
  filterSaved: boolean;
  sortFromNew: boolean;
};

interface Prop {
  options: options;
  setOptions: Dispatch<SetStateAction<options>>;
}

export default function Sort({ options, setOptions }: Prop) {
  function toggleFilter() {
    setOptions((prev) => ({ ...prev, filterSaved: !prev.filterSaved }));
  }

  function toggleSort() {
    setOptions((prev) => ({ ...prev, sortFromNew: !prev.sortFromNew }));
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleSort}
        className={`rounded-full border border-white/20 p-1.5 text-white transition hover:border-white/40 hover:bg-white/10 ${options.sortFromNew ? "bg-white/20" : "bg-white/5"}`}
        aria-label={options.sortFromNew ? "Sort oldest first" : "Sort newest first"}
        title={options.sortFromNew ? "Show oldest first" : "Show newest first"}
      >
        {options.sortFromNew ? <SortAsc size={18} /> : <SortDesc size={18} />}
      </button>
      <button
        type="button"
        onClick={toggleFilter}
        className={`rounded-full border border-white/20 p-1.5 transition hover:border-white/40 hover:bg-white/10 ${options.filterSaved ? "bg-white/20 text-yellow-300" : "bg-white/5 text-white"}`}
        aria-label={options.filterSaved ? "Show all queries" : "Show only bookmarks"}
        title={options.filterSaved ? "Show all queries" : "Show only bookmarks"}
      >
        {options.filterSaved ? <Star size={18} fill="currentColor" /> : <Star size={18} />}
      </button>
    </div>
  );
}
