"use client";
import { TDropDown } from "@/types/uiElements";
import styles from "./lineList.module.scss";

interface IProps {
  data: TDropDown[];
  selectedId: number;
  onChange: (newIndex: number) => void;
}

const LineList = ({ data, selectedId, onChange }: IProps) => {
  const handleChange = (newIndex: number) => {
    onChange(newIndex);
  };

  return (
    <div className={styles.lineList}>
      {data.map((item, index) => (
        <button
          key={index}
          className={selectedId === +item.value ? styles.active : ""}
          onClick={() => handleChange(+item.value)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default LineList;
