import { db } from "@/lib/db"; // Adjust the import path according to your project structure
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.name}`,
  };
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default ProductLayout;
