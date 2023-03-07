import React from "react";
import { useSelector } from "react-redux";
import { getFilter, getList } from "../../redux/content/selectors";
import { Modal, EditForm } from "../";
import { ListItem } from "./ListItem";

import styles from "./WishList.module.scss";
import { Item, ItemKeys } from "../../types";
import { useAppDispatch } from "../../redux/store";
import { setSearch, setSort } from "../../redux/content/slice";

const sortList: {
  type: ItemKeys;
  title: string;
  direction: 1 | -1;
}[] = [
  { type: ItemKeys.ID, title: "ID(убывание)", direction: -1 },
  { type: ItemKeys.ID, title: "ID(возрастание)", direction: 1 },
  { type: ItemKeys.TITLE, title: "Заголовку(убывание)", direction: -1 },
  { type: ItemKeys.TITLE, title: "Заголовку(возрастание)", direction: 1 },
  { type: ItemKeys.PRIORITY, title: "Приоритету(убывание)", direction: -1 },
  { type: ItemKeys.PRIORITY, title: "Приоритету(возрастание)", direction: 1 },
  {
    type: ItemKeys.NUMBER,
    title: "Пользовательскому порядку",
    direction: 1,
  },
];
export const WishList: React.FC = () => {
  const list = useSelector(getList);
  const { direction, column } = useSelector(getFilter);

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [showSortList, setShowSortList] = React.useState(false);

  /**Функция сортировки */
  const comparisonCondition = (a: Item, b: Item) => {
    const sortItems = [a[column.type], b[column.type]];
    if (typeof sortItems[0] === "number" && typeof sortItems[1] === "number")
      return direction * (sortItems[0] - sortItems[1]);
    const result = Number(String(sortItems[0]) > String(sortItems[1])) ? 1 : -1;
    return direction * result;
  };
  /**Функция поиска */
  const searchCondition = (item: Item) => {
    let result = false;
    Object.values(item).forEach((val) => {
      if (String(val).toUpperCase().indexOf(searchValue.toUpperCase()) >= 0)
        result = true;
    });
    return result;
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    dispatch(setSearch(event.target.value));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <input
          value={searchValue}
          onChange={onChangeInput}
          className={styles.search}
          placeholder="Поиск"
        />
        <div
          className={styles.sort}
          onClick={() => setShowSortList((prev) => !prev)}
        >
          Сортировка по: {column.title}
          {showSortList && (
            <ul className={styles.list}>
              {sortList.map((val) => (
                <li
                  onClick={() => dispatch(setSort(val))}
                  key={val.type + val.direction}
                >
                  {val.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {list
        .filter(searchCondition)
        .sort(comparisonCondition)
        .map((val) => (
          <ListItem key={val.ID} item={val} />
        ))}

      <div onClick={() => setShowModal(true)} className={styles.footer}>
        <span>Добавить пожелание</span>
        <img className={styles.ico} src="/create.svg" alt="Create" />
      </div>
      {showModal && (
        <Modal onClickClose={() => setShowModal(false)} width={700}>
          <EditForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};
