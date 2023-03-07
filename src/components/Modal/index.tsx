import React from "react";
import styles from "./modal.module.scss";
type ModalProps = {
  children: React.ReactNode;
  /* Контент */
  onClickClose: () => void;
  /* Функция отвечающая за деактивацию State */
  width?: number | string;
  /* Ширина модального окна */
  height?: number | string;
  /* Высота модального окна */
};
export const Modal: React.FC<ModalProps> = ({
  children,
  onClickClose,
  width,
  height,
}) => {
  const [clientY, setClientY] = React.useState<number | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const TouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const modalRect = modalRef.current;
    if (
      modalRect &&
      (modalRect.scrollTop === 0 ||
        modalRect.scrollTop + modalRect.clientHeight === modalRect.scrollHeight)
    )
      setClientY(event.touches[0].clientY);
  };
  const TouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const modalRect = modalRef.current;
    if (
      clientY &&
      modalRect &&
      (modalRect.scrollTop === 0 ||
        modalRect.scrollTop + modalRect.clientHeight ===
          modalRect.scrollHeight) &&
      modalRef.current?.style
    ) {
      if (clientY && modalRef.current?.style) {
        const style = modalRef.current.style;
        const deltaY = event.touches[0].clientY - clientY;
        style.transform = "translateY(" + deltaY + "px)";
        style.opacity = String(1 - Math.abs(deltaY / 200));
      }
    } else setClientY(null);
  };
  const TouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const modalRect = modalRef.current;
    if (
      modalRect &&
      (modalRect.scrollTop === 0 ||
        modalRect.scrollTop + modalRect.clientHeight === modalRect.scrollHeight)
    ) {
      if (
        clientY &&
        Math.abs(event.changedTouches[0].clientY - clientY) > 180
      ) {
        onClickClose();
      } else if (modalRef.current?.style) {
        const style = modalRef.current.style;
        style.transform = "translateY(" + 0 + "px)";
        style.opacity = String(1);
      }
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.mask} onClick={onClickClose}>
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        className={styles.wrapper}
        onTouchStart={TouchStart}
        onTouchMove={TouchMove}
        onTouchEnd={TouchEnd}
        style={{ width, height }}
      >
        {children}
        <button className={styles.close} type="button" onClick={onClickClose} />
      </div>
    </div>
  );
};
