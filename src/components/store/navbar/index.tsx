"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

import { MenuIcon } from "@/components/icons/svgIcons";
import Icon from "@/components/UI/icon";
import { listHeader } from "@/mocks";
import { useEffect, useState } from "react";
import Drawer from "./drawer";

const StoreNavBar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let prevPositionY = 0;
    if (typeof window !== "undefined") prevPositionY = window.scrollY;
    const handleScroll = () => {
      //---handle auto hiding navbar
      if (typeof window !== "undefined") {
        prevPositionY < window.scrollY && window.scrollY > 100
          ? setHideNavbar(true)
          : setHideNavbar(false);
        prevPositionY = window.scrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleVisibility = () => {
    isActive
      ? document.documentElement.classList.add("noScroll")
      : document.documentElement.classList.remove("noScroll");
    setIsActive(false);
  };
  const renderLink = () => {
    return listHeader.map((item, index) => {
      ``;
      return (
        <li key={index}>
          <Link href={item.link}>{item.title}</Link>
          {item.subMenu ? (
            <div
              className={styles.iconArrow}
              onClick={(e) => e.preventDefault()}
            >
              <Icon
                src="/images/icons/ic_arr_down.png"
                width={16}
                height={16}
              />
            </div>
          ) : null}
          {item.subMenu ? (
            <ul className={styles.subMenu}>
              {item.subMenu.map((sub) => (
                <li key={sub.id}>
                  <Link href={sub.link}>{sub.title}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      );
    });
  };

  return (
    <nav className={`${styles.navbar} ${hideNavbar && styles.hideNavbar}`}>
      <section>
        <div className={styles.top}>
          <Link href={"/"}>
            <Image
              alt="logo"
              src={"/images/logo.png"}
              width={165}
              height={63}
              quality={100}
              priority
              className={styles.logo}
            />
          </Link>
          <ul>{renderLink()}</ul>
          <div className={styles.iconMenu} onClick={() => setIsActive(true)}>
            <MenuIcon width={24} />
          </div>
        </div>
      </section>
      <Drawer isVisible={isActive} handleOnClose={() => handleVisibility()} />
    </nav>
  );
};

export default StoreNavBar;
