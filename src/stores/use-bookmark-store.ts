import create from "zustand";
import {
  BookmarkBuilder,
  BookmarkElement,
  BookmarkGroup,
} from "../models/bookmark";
import { getBookmarks, storeBookmarks } from "../storage/chrome-storage";

interface BookmarkState {
  bookmarkList: Array<BookmarkElement | BookmarkGroup>;
  addBookMark: (
    bookmarkElement: BookmarkElement,
    group?: string,
    subgroup?: string
  ) => void;
  fetch: () => void;
}

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarkList: [],
  fetch: async () => {
    const bookmarkList = await getBookmarks();
    set({ bookmarkList: await bookmarkList });
  },
  addBookMark: async (
    bookmarkElement: BookmarkElement,
    group?: string,
    subgroup?: string
  ) => {
    set((state) => {
      let groupElement;
      let subGroupElement;
      if (group) {
        groupElement = BookmarkBuilder.buildBookmarkGroup(
          state.bookmarkList,
          group
        );
        if (groupElement.bookmarkList.length === 0) {
          state.bookmarkList.push(groupElement);
        }

        if (subgroup) {
          subGroupElement = BookmarkBuilder.buildBookmarkGroup(
            groupElement.bookmarkList,
            subgroup
          );

          if (subGroupElement.bookmarkList.length === 0) {
            groupElement.bookmarkList.push(subGroupElement);
          }

          subGroupElement.bookmarkList.push(bookmarkElement);
        } else {
          groupElement.bookmarkList.push(bookmarkElement);
        }
      } else {
        state.bookmarkList.push(bookmarkElement);
      }

      storeBookmarks(state.bookmarkList);

      return {
        bookmarkList: [...state.bookmarkList],
      };
    });
  },
}));
