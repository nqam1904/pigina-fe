import { TCategory } from "@/types/categories";
import { format, isThisYear, isToday, isYesterday } from "date-fns";
// const bcrypt = require("bcryptjs");

function generateRandomString(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function isEmptyObject(obj: any) {
  const errors = [];

  // Check for empty object
  if (Object.keys(obj).length === 0) {
    errors.push("Object is empty");
  }

  // Validate properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check for empty strings
      if (typeof value === "string" && value.trim() === "") {
        errors.push(`Property "${key}" is empty`);
      }

      // Check for empty arrays
      if (Array.isArray(value) && value.length === 0) {
        errors.push(`Property "${key}" is an empty array`);
      }

      // Recursively validate nested objects and arrays
      if (typeof value === "object" && value !== null) {
        const nestedErrors: any = isEmptyObject(value);
        errors.push(...nestedErrors);
      }
    }
  }
  return errors;
}

const convertListToDropdownList = (list: any[]): any[] => {
  const dropDownData: any[] = [];
  list.forEach((data) => {
    dropDownData.push({
      label: data.name,
      value: data.id,
    });
  });

  return dropDownData;
};

const calculateDiscount = (price: number, salePrice: number = 0) => {
  if (price > 0 && salePrice > 0 && salePrice < price) {
    const discountAmount = price - salePrice;
    const discountPercentage = (discountAmount / price) * 100;
    return parseFloat(discountPercentage.toFixed(2));
  } else {
    return 0;
  }
};

function formatDateTime(date: string | Date = new Date()) {
  if (isToday(new Date(date))) {
    return format(new Date(date), "HH:mm");
  }

  if (isYesterday(new Date(date))) {
    return "Yesterday";
  }

  if (isThisYear(new Date(date))) {
    return format(new Date(date), "dd MMM");
  }

  return format(new Date(date), "HH:mm dd/MM/yyyy");
}

const formatDate = (date: string | Date = new Date()) =>
  format(new Date(date), "HH:mm dd/MM/yyyy");

const transformDataSpecifications = (data: any[] = []) => {
  return data.reduce((acc: any, group: any) => {
    group.specs.forEach((spec: any) => {
      acc[`${spec.name}`] = spec.value;
    });
    return acc;
  }, {});
};

const findCategoryUrl = (category: TCategory[], categoryId: string) => {
  const findCategory = category?.find((cate) => cate.id === categoryId);

  if (!findCategory) return null;

  const findCateParent = category?.find(
    (parent) => parent.id === findCategory.parentID,
  );

  return findCateParent
    ? `${findCateParent.url}/${findCategory.url}`
    : findCategory.url;
};

export {
  calculateDiscount,
  convertListToDropdownList,
  findCategoryUrl,
  formatDateTime,
  generateRandomString,
  isEmptyObject,
  transformDataSpecifications,
  formatDate,
  capitalizeFirstLetter,
};
