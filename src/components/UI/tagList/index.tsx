"use client";
import styles from "./tagList.module.scss";

interface IProps {
  data: string[];
  selectedId: string;
  onChange: (newIndex: string) => void;
}

const TagList = ({ data, selectedId, onChange }: IProps) => {
  const handleChange = (newIndex: string) => {
    onChange(newIndex);
  };

  return (
    <div className={styles.taskList}>
      {data.map((item, index) => (
        <button
          key={index}
          className={selectedId === item ? styles.active : ""}
          onClick={() => handleChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TagList;
