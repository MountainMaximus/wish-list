import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
interface IButton {
  children: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  className?: string;
}
export const Button: React.FC<IButton> = ({
  children,
  onClick,
  type,
  className,
}) => {
  const onClickButton = () => {
    if (onClick !== undefined) {
      onClick();
      return;
    }
  };
  return (
    <button
      onClick={onClickButton}
      type={type}
      className={classNames(styles.root, className)}
    >
      {children}
    </button>
  );
};
