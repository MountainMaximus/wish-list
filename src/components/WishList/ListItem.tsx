import React from "react";
import {
  RemoveItem,
  ReplaceItem,
  setSelectItem,
  ToggleCheckBox,
} from "../../redux/content/slice";
import { useAppDispatch } from "../../redux/store";
import { Item, listPriority } from "../../types";
import { Modal, EditForm } from "../";
import classNames from "classnames";
import styles from "./WishList.module.scss";

export const ListItem: React.FC<{ item: Item }> = React.memo(({ item }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить запись?"))
      dispatch(RemoveItem({ ID: item.ID }));
  };
  const onClickEdit = () => {
    setShowModal(true);
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setSelectItem(item.ID));
  };
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(ReplaceItem(item.ID));
  };
  return (
    <>
      <div
        draggable={true}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDrop={drop}
        className={classNames(styles.ListItem, {
          [styles.disable]: item.completed,
        })}
      >
        <div
          className={styles.content}
          style={{ backgroundColor: listPriority[item.priority][1] }}
        >
          <div className={styles.title}>{item.title}</div>
          <div className={styles.text}>{item.text}</div>
        </div>
        <div className={styles.edit}>
          <img
            className={styles.ico}
            onClick={onClickEdit}
            src="/edit.svg"
            alt="Edit"
          />
          <img
            className={styles.ico}
            onClick={onClickRemove}
            src="/remove.svg"
            alt="Remove"
          />
          <input
            className={styles.checkBox}
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              dispatch(ToggleCheckBox({ ID: item.ID, status: !item.completed }))
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal onClickClose={() => setShowModal(false)} width={700}>
          <EditForm item={item} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
});
