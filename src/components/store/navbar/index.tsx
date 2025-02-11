"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBarCategory from "./navCategory";

const StoreNavBar = () => {
  const route = useRouter();
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

  return (
    <nav className={`${styles.navbar} ${hideNavbar && styles.hideNavbar}`}>
      <section>
        <div className={`${styles.top} storeContainer`}>
          <Link href={"/"}>
            <Image
              alt="Logo"
              src={"/images/logo.png"}
              width={173}
              height={64}
              quality={100}
              priority
              className={styles.logo}
            />
          </Link>
        </div>
      </section>
      <section>
        <div className={`storeContainer ${styles.ribbon}`}>
          <div className={styles.left}>
            <NavBarCategory isNavbarVisible={!hideNavbar} />
            <hr />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default StoreNavBar;
