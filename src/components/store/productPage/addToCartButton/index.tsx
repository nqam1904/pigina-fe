"use client";
import styles from "./addToCartButton.module.scss";

import { useDispatch } from "react-redux";

import { ShoppingIconFill } from "@/components/icons/svgIcons";
import { add } from "@/store/shoppingCart";
import { TCartItem } from "@/types/shoppingCart";
import React from "react";

interface IProps {
  disabled: boolean;
  cartItemData: TCartItem;
}

const AddToCartButton = ({ cartItemData, disabled }: IProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add({ ...cartItemData }));
    document.documentElement.classList.add("noScroll");
  };

  return (
    <button
      disabled={disabled}
      className={styles.addToCart}
      onClick={() => handleAddToCart()}
    >
      {disabled ? (
        "Không còn hàng"
      ) : (
        <React.Fragment>
          <ShoppingIconFill width={16} />
          Thêm vào giỏ hàng
        </React.Fragment>
      )}
    </button>
  );
};

export default AddToCartButton;
