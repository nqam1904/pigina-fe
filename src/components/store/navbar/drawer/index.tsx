import { CloseIcon } from "@/components/icons/svgIcons";
import Icon from "@/components/UI/icon";
import { listHeader } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";
interface IProps {
  isVisible: boolean;
  quantity?: number;
  handleOnClose: () => void;
}
const Drawer: React.FC<IProps> = ({ isVisible, handleOnClose }) => {
  const [show, setShow] = useState(false);

  const renderLink = () => {
    return listHeader.map((item, index) => {
      return (
        <>
          <li key={index}>
            <Link href={item.link} onClick={handleOnClose}>
              {item.title}
            </Link>
            {item.subMenu ? (
              <div
                className={styles.arrow}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setShow(!show);
                }}
              >
                <Icon
                  src="/images/icons/ic_arr_down.png"
                  width={16}
                  height={16}
                  className={styles.arrow}
                />
              </div>
            ) : null}
          </li>
          {item.subMenu && show ? (
            <ul className={styles.subMenu}>
              {item.subMenu.map((sub) => (
                <li key={sub.id}>
                  <Link href={sub.link} onClick={handleOnClose}>
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );
    });
  };
  return (
    <div
      className={`${styles.container} ${!isVisible && styles.containerHide}`}
    >
      <div className={styles.background} onClick={handleOnClose} />
      <div
        className={`${styles.screenWindow} ${isVisible && styles.showWindow}`}
      >
        <div className={styles.header}>
          <Image
            alt="logo"
            src={"/images/logo.png"}
            width={165}
            height={63}
            quality={100}
            priority
          />
          <div onClick={handleOnClose}>
            <CloseIcon width={18} />
          </div>
        </div>
        <div className={styles.itemsContainer}>
          <ul>{renderLink()}</ul>
        </div>
      </div>
    </div>
  );
};
export default Drawer;
