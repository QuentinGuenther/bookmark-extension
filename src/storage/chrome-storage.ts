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
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
                label: "Youtube",
                faviconUrl: "youtube.com/favicon.ico",
                url: "youtube.com",
              },
            ],
          },
        ],
      } as BookmarkGroup,
      {
        label: "Entertainment",
        bookmarkList: [
          {
            id: "78428ee9-4933-45ff-9a86-538597d0ebd1",
            label: "Reddit",
            faviconUrl: "reddit.com/favicon.ico",
            url: "reddit.com",
          } as BookmarkElement,
          {
            label: "Funner Stuff",
            bookmarkList: [
              {
                id: "95d137d8-ff96-4b1b-bdb1-28f6daa4b4d4",
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
