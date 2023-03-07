import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContentSlice, Item, ItemKeys, NewItem } from "../../types";

const initialState: IContentSlice = {
  list: JSON.parse(window.localStorage.getItem("WishList") || "[]"),
  filter: {
    search: "",
    column: { type: ItemKeys.ID, title: "ID" },
    direction: 1,
    selectItemID: null,
  },
};

const generateID = (items: Item[]) => {
  return Math.max(...items.map((obj) => obj.ID)) + 1;
};
const saveLocalStorage = (items: Item[]) => {
  window.localStorage.setItem("WishList", JSON.stringify(items));
};
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    ToggleCheckBox(
      state,
      action: PayloadAction<{ ID: number; status: boolean }>
    ) {
      const item = state.list.find((obj) => obj.ID === action.payload.ID);
      if (item) item.completed = action.payload.status;
      saveLocalStorage(state.list);
    },
    RemoveItem(state, action: PayloadAction<{ ID: number }>) {
      state.list = state.list.filter((obj) => obj.ID !== action.payload.ID);
      saveLocalStorage(state.list);
    },
    AddItem(state, action: PayloadAction<NewItem>) {
      const ID = generateID(state.list);
      state.list.push({ ...action.payload, ID, completed: false, number: ID });
      saveLocalStorage(state.list);
    },
    UpdateItem(state, action: PayloadAction<Item>) {
      const itemIndex = state.list.findIndex(
        (obj) => obj.ID === action.payload.ID
      );

      if (itemIndex >= 0) state.list[itemIndex] = action.payload;
      saveLocalStorage(state.list);
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filter.search = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{
        type: ItemKeys;
        title: string;
        direction: 1 | -1;
      }>
    ) {
      state.filter.column.type = action.payload.type;
      state.filter.column.title = action.payload.title;
      state.filter.direction = action.payload.direction;
    },
    setSelectItem(state, action: PayloadAction<number>) {
      state.filter.selectItemID = action.payload;
    },
    ReplaceItem(state, action: PayloadAction<number>) {
      if (state.filter.selectItemID) {
        const firstItem = state.list.find((obj) => obj.ID === action.payload);
        const secondItem = state.list.find(
          (obj) => obj.ID === state.filter.selectItemID
        );
        if (firstItem && secondItem)
          [firstItem.number, secondItem.number] = [
            secondItem.number,
            firstItem.number,
          ];
        state.filter.selectItemID = null;
        state.filter.column = {
          type: ItemKeys.NUMBER,
          title: "Пользовательскому порядку",
        };
        state.filter.direction = 1;
      }
    },
  },
});
export const {
  ToggleCheckBox,
  RemoveItem,
  AddItem,
  UpdateItem,
  setSearch,
  setSort,
  setSelectItem,
  ReplaceItem,
} = contentSlice.actions;

export default contentSlice.reducer;
