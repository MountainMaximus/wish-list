import React from "react";
import { AddItem, UpdateItem } from "../../redux/content/slice";
import { useAppDispatch } from "../../redux/store";
import { Item, listPriority } from "../../types";
import { Button } from "../Button";

import styles from "./EditForm.module.scss";

export const EditForm: React.FC<{ closeModal?: () => void; item?: Item }> = ({
  closeModal,
  item,
}) => {
  const textRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = React.useState(item?.title || "");
  const [text, setText] = React.useState(item?.text || "");
  const [priority, setPriority] = React.useState(item?.priority || 1);
  const [showListPriority, setShowListPriority] = React.useState(false);

  const dispatch = useAppDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item) dispatch(UpdateItem({ ...item, title, text, priority }));
    else dispatch(AddItem({ title, text, priority }));
    if (closeModal) closeModal();
  };

  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = textRef.current;

    setText(event.target.value);
    if (textArea) {
      console.log(textArea.scrollHeight);

      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.item}>
        <div>{item ? "Форма редактирования" : "Добавление записи"}</div>
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          type="text"
          placeholder="Название"
          required={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.item}>
        <textarea
          ref={textRef}
          required={true}
          onChange={onChangeTextArea}
          className={styles.textarea}
          value={text}
          placeholder="Напишите что-нибудь"
        />
        <span className={styles.line}></span>
      </div>

      <div className={styles.item}>
        <div>Выберите приоритет</div>
        <div
          onClick={() => setShowListPriority((prev) => !prev)}
          className={styles.priority}
          style={{ backgroundColor: listPriority[priority][1] }}
        >
          {listPriority[priority][0]}
          {showListPriority && (
            <ul className={styles.list}>
              {listPriority.map((val, i) => (
                <li
                  onClick={() => setPriority(i)}
                  key={val[1]}
                  style={{ backgroundColor: val[1] }}
                >
                  {val[0]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Button type="submit">Отправить</Button>
    </form>
  );
};
