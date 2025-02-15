"use client";
import styles from "./button.module.scss";

interface IProps {
  text?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
}

const Button: React.FC<IProps> = ({
  text = "",
  onClick,
  type = "button",
  disabled = false,
  backgroundColor = "",
  borderColor = "",
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={styles.button}
      onClick={onClick}
      style={{ backgroundColor, borderColor }}
    >
      {text}
    </button>
  );
};

export default Button;
