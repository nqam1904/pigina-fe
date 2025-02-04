"use client";
import { CloseIcon } from "@/components/icons/svgIcons";
import { Button as BtnAnt } from "antd";
import Button from "../button";
import styles from "./popup.module.scss";

interface IProps {
  title?: string;
  width?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onClose: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  content: React.ReactNode;
  isDelete?: boolean;
  isStore?: boolean;
  text?: string;
  hideCta?: boolean;
}
const Popup = ({
  title,
  width,
  confirmBtnText,
  cancelBtnText,
  onClose,
  onCancel,
  onSubmit,
  isLoading = false,
  content,
  isDelete = false,
  isStore = false,
  text = "",
  hideCta = false,
}: IProps) => {
  return (
    <div className={styles.popup}>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.window} style={width ? { width: width } : {}}>
        {title && (
          <div className={styles.header}>
            {title}
            <button onClick={onClose}>
              <CloseIcon width={12} />
            </button>
          </div>
        )}
        {content}
        {isStore ? (
          <div className={styles.windowControl}>
            <Button onClick={onClose} text={text} />
          </div>
        ) : hideCta ? null : (
          <div className={styles.windowControl}>
            <BtnAnt
              loading={isLoading}
              onClick={onSubmit}
              color={isDelete ? "danger" : "primary"}
              variant="solid"
            >
              {confirmBtnText || "OK"}
            </BtnAnt>

            <BtnAnt onClick={onCancel}>Hủy bỏ</BtnAnt>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
