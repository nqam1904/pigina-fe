"use client";
import styles from "./button.module.scss";

interface IProps {
  text?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({
  text = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
