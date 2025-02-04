import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Laptop - Search",
};

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default SearchLayout;
