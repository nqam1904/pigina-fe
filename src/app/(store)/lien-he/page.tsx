"use client";

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
          <form action="#" method="POST">
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEamil(e.target.value)}
                required
              />
            </div>
            <textarea
              name="desciption"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nội dung"
              required
            ></textarea>

            <div className={styles.warperButton}>
              <Button type="submit" text="Gửi" />
            </div>
          </form>
        </div>
        <div className={styles.mapResponsive}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29793.265423749035!2d105.744049!3d21.026356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134548454d7698b%3A0x5109177b4ad9d65f!2zS2h1IMSRw7QgdGjhu4sgU2luaCBUaMOhaSBYdcOibiBQaMawxqFuZw!5e0!3m2!1sen!2sus!4v1739635649822!5m2!1sen!2sus"
            allowFullScreen={true}
            width="600"
            height="200"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
