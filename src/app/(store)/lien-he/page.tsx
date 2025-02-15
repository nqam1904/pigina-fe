"use client";

import Input from "@/components/UI/input";
import Button from "@/components/UI/button";
import { useState } from "react";
import styles from "./page.module.scss";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>Liên hệ</h1>
      <div className={styles.form}>
        <div className={styles.warperForm}>
          <Input
            label="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEamil(e.target.value)}
            placeholder=""
          />
          <Input
            label="Nội dung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
            textarea
          />
          <Button text="Liên hệ" onClick={() => {}} />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7448.316355937259!2d105.744049!3d21.026356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134548454d7698b%3A0x5109177b4ad9d65f!2zS2h1IMSRw7QgdGjhu4sgU2luaCBUaMOhaSBYdcOibiBQaMawxqFuZw!5e0!3m2!1sen!2sus!4v1739594751414!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
export default SupportPage;
