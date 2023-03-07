export enum ItemKeys {
  ID = "ID",
  TITLE = "title",
  TEXT = "text",
  COMPLETED = "completed",
  PRIORITY = "priority",
  NUMBER = "number",
}
export interface Item {
  [ItemKeys.ID]: number;
  [ItemKeys.TITLE]: string;
  [ItemKeys.TEXT]: string;
  [ItemKeys.COMPLETED]: boolean;
  [ItemKeys.PRIORITY]: number;
  [ItemKeys.NUMBER]: number;
}

export interface NewItem {
  [ItemKeys.TITLE]: string;
  [ItemKeys.TEXT]: string;
  [ItemKeys.PRIORITY]: number;
}

export interface IContentSlice {
  list: Item[];
  filter: {
    search: string;
    column: { type: ItemKeys; title: string };
    direction: 1 | -1;
    selectItemID: number | null;
  };
}

export const listPriority = [
  ["unnecessary", "#d2f5f3"],
  ["noMatter", "#65f865"],
  ["necessary", "#e4c934"],
  ["important", "#f3a43c"],
  ["critical", "#f33c3c"],
];
