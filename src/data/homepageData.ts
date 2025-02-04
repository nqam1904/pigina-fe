import { TCollectionCard } from "@/types/collections";
import { TBlogCard } from "@/types/common";

export const CollectionsData: TCollectionCard[] = [
  {
    name: "Tablet",
    collections: [
      {
        label: "iPad",
        url: "/list/tablets/apple",
      },
      {
        label: "Microsoft Surface",
        url: "/list/pc-laptops/laptops/microsot",
      },
      {
        label: "Samsung Galaxy",
        url: "/list/tablets/samsung",
      },
      {
        label: "Amazon Fire",
        url: "/list/tablets",
      },
      {
        label: "E-Readers",
        url: "/list/tablets",
      },
    ],
    imgUrl: "/images/images/collectionTablet.jpg",
    url: "/list/tablets",
  },
  {
    name: "Smartphones",
    collections: [
      {
        label: "iPhone",
        url: "/list/smartphones/apple-iphone",
      },
      {
        label: "Samsung Galaxy",
        url: "/list/smartphones/samsung-galaxy",
      },
      {
        label: "Google",
        url: "/list/smartphones/google-pixel",
      },
    ],
    imgUrl: "/images/images/collectionSmartphone.jpg",
    url: "/list/smartphones",
  },
  {
    name: "Smartwatches",
    collections: [
      {
        label: "Apple Watch",
        url: "/list/watches/apple",
      },
      {
        label: "Samsung Galaxy",
        url: "/list/watches/Samsung",
      },
      {
        label: "Android Smartwatches",
        url: "/list/watches",
      },
      {
        label: "Fitness Smartwatches",
        url: "/list/watches",
      },
      {
        label: "Smartwatches Accessories",
        url: "/list/watches",
      },
    ],
    imgUrl: "/images/images/collectionWatch.jpg",
    url: "/list/watches",
  },
  {
    name: "Accessories",
    collections: [
      {
        label: "Chargers",
        url: "/",
      },
      {
        label: "Power Banks",
        url: "/",
      },
      {
        label: "Cables",
        url: "/",
      },
      {
        label: "PC Fans",
        url: "/",
      },
      {
        label: "Mobile Covers",
        url: "/",
      },
    ],
    imgUrl: "/images/images/collectionAccessories.jpg",
    url: "/",
  },
];

// export const TodayDeals: TDealCard[] = [
//   {
//     name: "Apple Airpods MAX",
//     images: [
//       "/images/products/airpodsMax1.jpg",
//       "/images/products/airpodsMax2.jpg",
//     ],
//     price: 579.0,
//     salePrice: 519.0,
//     specialFeatures: ["Wireless", "Noise Cancelling", "Built-In Microphone"],
//     url: "/product/65e6ef559d4ab819d1158194",
//     dealDate: new Date("1970-01-01T18:00:00"),
//   },
//   {
//     name: "Apple Magic Mouse",
//     images: [
//       "/images/products/appleMouse1.jpg",
//       "/images/products/appleMouse2.jpg",
//     ],
//     price: 79.99,
//     salePrice: 55.49,
//     specialFeatures: ["Bluetooth", "White"],
//     url: "/product/65e6f3fd9d4ab819d1158197",
//     dealDate: new Date("1970-01-01T09:30:00"),
//   },
//   {
//     name: "Apple iMac",
//     images: ["/images/products/imac2_1.jpg", "/images/products/imac2_2.jpg"],
//     price: 1299.0,
//     salePrice: 1119.0,
//     specialFeatures: ["8GB Memory", "256GB", "M3 chip"],
//     url: "/product/65e22d7f580cd983d5aa5a2f",
//     dealDate: new Date("1970-01-01T23:10:00"),
//   },
//   {
//     name: "Apple 12.9 Inch iPad Pro",
//     images: ["/images/products/ipadPro1.jpg", "/images/products/ipadPro2.jpg"],
//     price: 1149.0,
//     salePrice: 1099.0,
//     specialFeatures: ["Wi-Fi", "256GB", "12.9-Inch"],
//     url: "/product/65e6244fcb99bb936d4cb7c0",
//     dealDate: new Date("1970-01-01T06:30:00"),
//   },
//   {
//     name: "Apple iPhone 15 Pro Max",
//     images: ["/images/products/iphone1.jpg", "/images/products/iphone2.jpg"],
//     price: 1199.99,
//     specialFeatures: ["256GB", "Blue Titanium"],
//     salePrice: 1059.99,
//     url: "/product/65e6530ecb99bb936d4cb7db",
//     dealDate: new Date("1970-01-01T10:50:00"),
//   },
// ];

// export const TopProducts: TProductCard[] = [
//   {
//     name: "Razer",
//     images: ["/images/products/razer1.jpg", "/images/products/razer2.jpg"],
//     price: 129.99,
//     specialFeatures: [
//       "Built-In Microphone",
//       "3rd generation",
//       "Water Resistant",
//     ],
//     url: "/product/65e6eed69d4ab819d1158193",
//   },
//   {
//     name: "Apple Watch Ultra 2",
//     images: [
//       "/images/products/appleWatch1.jpg",
//       "/images/products/appleWatch2.jpg",
//     ],
//     price: 799.0,
//     specialFeatures: ["GPS + Cellular", "Titanium", "49mm"],
//     url: "/product/65e6f5339d4ab819d115819c",
//   },
//   {
//     name: "ASUS ROG Laptop",
//     images: ["/images/products/asusRog1.jpg", "/images/products/asusRog2.jpg"],
//     price: 2499.99,
//     salePrice: 2149.99,
//     specialFeatures: ["32GB RAM", "17inch display", "OLED Display"],
//     url: "/product/65e6008bcb99bb936d4cb7ac",
//   },
//   {
//     name: "PS5 Controller",
//     images: [
//       "/images/products/ps5Controller1.jpg",
//       "/images/products/ps5Controller2.jpg",
//     ],
//     price: 69,
//     specialFeatures: ["Bluetooth", "Version 2"],
//     url: "/product/65e6f5f89d4ab819d115819f",
//   },
//   {
//     name: "Sony Alpha 7RV",
//     images: [
//       "/images/products/sonyAlpha7_1.jpg",
//       "/images/products/sonyAlpha7_2.jpg",
//     ],
//     price: 4499,
//     specialFeatures: ["Full Frame", "Body", "40MP"],
//     salePrice: 3699,
//     url: "/product/65e656decb99bb936d4cb7e4",
//   },
// ];

export const BlogCardData: TBlogCard[] = [
  {
    title: "Praesent vestibulum nisi at mollis mollis",
    imgUrl: "/images/blog/blogPost1.avif",
    url: "#",
    shortText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus,
     gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit lectus,
      ac porttitor sem purus ac nisl. Nunc aliquet nisi tristique magna suscipit finibus. 
      Praesent vestibulum nisi at mollis mollis. Phasellus sollicitudin felis sit amet eros 
      accumsan rutrum. Phasellus est nisi, eleifend vel bibendum vitae, interdum ac tellus.`,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    imgUrl: "/images/blog/blogPost2.avif",
    url: "#",
    shortText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus,
    gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit lectus,
     ac porttitor sem purus ac nisl. Nunc aliquet nisi tristique magna suscipit finibus. 
     Praesent vestibulum nisi at mollis mollis. Phasellus sollicitudin felis sit amet eros 
     accumsan rutrum. Phasellus est nisi, eleifend vel bibendum vitae, interdum ac tellus.`,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur",
    imgUrl: "/images/blog/blogPost3.avif",
    url: "#",
    shortText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus,
    gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit lectus,
     ac porttitor sem purus ac nisl. Nunc aliquet nisi tristique magna suscipit finibus. 
     Praesent vestibulum nisi at mollis mollis. Phasellus sollicitudin felis sit amet eros 
     accumsan rutrum. Phasellus est nisi, eleifend vel bibendum vitae, interdum ac tellus.`,
  },
];
