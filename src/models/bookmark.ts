export interface BookmarkElement {
  faviconUrl: string;
  label: string;
  url: string;
}

export interface BookmarkGroup {
  label: string;
  bookmarkList: Array<BookmarkGroup | BookmarkElement>;
}

type GenericType = BookmarkElement | BookmarkGroup;

export const isBookmarkElement = (props: GenericType) => {
  return "url" in props;
};

export const isBookmarkGroup = (props: GenericType) => {
  return "bookmarkList" in props;
};

export class BookmarkBuilder {
  static buildBookmarkGroup(
    bookmarkList: Array<BookmarkElement | BookmarkGroup>,
    label: string
  ): BookmarkGroup {
    const groupRef = bookmarkList.find(
      (element) => isBookmarkGroup(element) && element.label === label
    ) as BookmarkGroup | undefined;

    return groupRef || ({ label, bookmarkList: [] } as BookmarkGroup);
  }
}
