import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Laptop - Products List",
};

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default ListLayout;
