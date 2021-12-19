import { BookmarkElement, BookmarkGroup } from "../models/bookmark";

export const storeBookmarks = (
  bookmarks: Array<BookmarkElement | BookmarkGroup>
) => {
  if (window.chrome !== undefined && chrome?.storage?.local) {
    chrome.storage.local.set({ BOOKMARKS: bookmarks });
  }
};

export const getBookmarks = () => {
  if (window.chrome !== undefined && chrome?.storage?.local) {
    return chrome.storage.local
      .get(["BOOKMARKS"])
      .then((data) => data["BOOKMARKS"]);
  } else {
    return [
      {
        label: "Entertainment",
        bookmarkList: [
          {
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
    ];
  }
};
