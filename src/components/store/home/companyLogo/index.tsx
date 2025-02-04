import Link from "next/link";

import Image from "next/image";
import styles from "./companyLogo.module.scss";

interface IProps {
  url: string;
  image: string;
  name: string;
  isSearchPage?: boolean;
  onClick?: () => void;
}

const HCompanyLogo = ({
  url,
  image,
  name,
  isSearchPage = false,
  onClick,
}: IProps) => {
  return (
    <>
      {isSearchPage ? (
        <div className={styles.companyLogo} onClick={onClick}>
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            priority
            objectFit="cover"
          />
        </div>
      ) : (
        <Link className={styles.companyLogo} href={url}>
          <Image src={image} alt={name} width={150} height={180} priority />
        </Link>
      )}
    </>
  );
};

export default HCompanyLogo;
