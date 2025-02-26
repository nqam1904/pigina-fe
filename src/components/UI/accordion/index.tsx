import { useRef, useState } from "react";

import { ArrowIconAccordion } from "@/components/icons/svgIcons";
import styles from "./styles.module.scss";
type AccordionProps = {
  title: string;
  content: string;
};

function Accordion(props: AccordionProps) {
  const [active, setActive] = useState(false);
  const content = useRef<any | null>(null);
  const [height, setHeight] = useState("0px"); 
  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className={styles.accordionSection}>
      <div
        className={`${styles.accordion} ${active ? styles.active : ""}`}
        onClick={toggleAccordion}
      >
        <div
          className={`${styles.accordionBorder} ${active ? styles.active : ""}`}
        >
          <p className={styles.accordionTitle}>{props?.title || ""}</p>
          <ArrowIconAccordion width={24} />
        </div>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className={styles.accordionContent}
      >
        <div
          className={`${styles.accordionText} ck-content`}
          dangerouslySetInnerHTML={{ __html: props?.content || "" }}
        />
      </div>
    </div>
  );
}

export default Accordion;
