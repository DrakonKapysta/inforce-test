"use client";
import React, { FC, useEffect } from "react";
import { ProductItem } from "./ProductItem";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setProducts } from "@/redux/features/product/productSlice";
import { selectSortedProducts } from "@/redux/features/selectors";

interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products = [] }) => {
  const dispatch = useAppDispatch();
  const sortedProducts = useAppSelector(selectSortedProducts);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {sortedProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
