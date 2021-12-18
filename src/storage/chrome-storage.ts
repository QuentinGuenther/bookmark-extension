import { BookmarkElement, BookmarkGroup } from "../models/bookmark";

export const storeBookmarks = (
  bookmarks: Array<BookmarkElement | BookmarkGroup>
) => {
  console.log(bookmarks);
  chrome.storage.local.set({ BOOKMARKS: bookmarks });
};

export const getBookmarks = () => {
  return chrome.storage.local
    .get(["BOOKMARKS"])
    .then((data) => data["BOOKMARKS"]);
};
