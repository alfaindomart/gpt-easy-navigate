import { Star } from "lucide-react";

//add bookmark button to every queries
//when user click bookmark,
//get the element's key, id, or inner text
//use service worker to access the storage
//save the element's key, id, or innner text to the storage
//next time the user open the site, get the saved element from storage, and look for any matching element
//if found, add a bookmark icon to the queries

const Bookmark = () => {
  return (
    <div className="starWrapper">
      <Star />
    </div>
  );
};

export default Bookmark;
