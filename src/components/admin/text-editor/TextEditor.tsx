import { useEffect, useMemo, useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./textEditor.module.scss";

type TTextEditor = {
  onChange?: (value: any) => void;
  value?: string;
  readOnly?: boolean;
};

const TextEditor: React.FC<TTextEditor> = ({ onChange, value }) => {
  const [content, setContent] = useState(value || "");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels
      [{ font: [] }], // Font families
      [{ size: ["small", false, "large", "huge"] }], // Font sizes
      [{ color: [] }, { background: [] }], // Text color and background color
      ["bold", "italic", "underline", "strike"], // Text styling
      [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ direction: "rtl" }], // Text direction
      [{ align: [] }], // Alignment
      ["link", "image", "video"], // Media links
      ["code-block"], // Code block
      ["clean"], // Clear formatting
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "direction",
    "code-block",
    "script",
  ];
  const handleChange = (value: any) => {
    setContent(value);
    onChange?.(value);
  };

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  return (
    <div className={styles.container}>
      <ReactQuill
        value={content}
        formats={formats}
        onChange={handleChange}
        placeholder="Nội dung..."
        modules={modules}
        theme="snow"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default TextEditor;
