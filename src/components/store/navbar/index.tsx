"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

import Icon from "@/components/UI/icon";
import { listHeader } from "@/mocks";
import { useEffect, useState } from "react";

const StoreNavBar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);

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

  const renderLink = () => {
    return listHeader.map((item, index) => {
      return (
        <li key={index}>
          <Link href={item.link}>{item.title}</Link>
          {item.subMenu ? (
            <Icon
              src="/images/icons/ic_arr_down.png"
              width={16}
              height={16}
              className={styles.iconArrow}
            />
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
        </div>
      </section>
    </nav>
  );
};

export default StoreNavBar;
