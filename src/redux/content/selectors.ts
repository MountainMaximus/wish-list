import { RootState } from "../store";
export const getList = (state: RootState) => state.content.list;
export const getFilter = (state: RootState) => state.content.filter;
