"use client";

export const allLangs = [
  {
    value: "en",
    label: "English",
    countryCode: "GB",
    adapterLocale: "en",
    numberFormat: { code: "en-US", currency: "USD" },
  },
  {
    value: "vi",
    label: "Vietnamese",
    countryCode: "VN",
    adapterLocale: "vi",
    numberFormat: { code: "vi-VN", currency: "VND" },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
