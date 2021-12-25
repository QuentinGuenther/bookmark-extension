import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  BookmarkBuilder,
  BookmarkElement,
  BookmarkGroup,
} from "../models/bookmark";
import { getBookmarks, storeBookmarks } from "../storage/chrome-storage";
import filterDeep from "deepdash/es/filterDeep";

interface BookmarkState {
  bookmarkList: Array<BookmarkElement | BookmarkGroup>;
  addBookMark: (
    bookmarkElement: BookmarkElement,
    group?: string,
    subgroup?: string
  ) => void;
  deleteBookmark: (id: string, group?: string, subgroup?: string) => void;
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
      if (!bookmarkElement.id) {
        bookmarkElement.id = uuidv4();
      }
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
  deleteBookmark: (id: string) => {
    set((state) => {
      const filtrate = filterDeep(
        state.bookmarkList,
        (value, key, parent) => {
          if (parent.id === id) return false;
          else return true;
        },
        {
          leavesOnly: true,
        }
      );
      return {
        bookmarkList: filtrate,
      };
    });
  },
}));
