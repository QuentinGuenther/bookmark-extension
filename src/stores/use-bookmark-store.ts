import create from "zustand";
import {
  BookmarkBuilder,
  BookmarkElement,
  BookmarkGroup,
} from "../models/bookmark";

interface BookmarkState {
  bookmarkList: Array<BookmarkElement | BookmarkGroup>;
  addBookMark: (
    bookmarkElement: BookmarkElement,
    group?: string,
    subgroup?: string
  ) => void;
}

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarkList: [],
  addBookMark: (
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

      return {
        bookmarkList: [...state.bookmarkList],
      };
    });
  },
}));
