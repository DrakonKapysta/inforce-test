"use client";
import { Comment } from "@/types/product";
import React, { FC, use, useEffect } from "react";
import { CommentItem } from "./CommentItem";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  fetchAllProducts,
  setProducts,
} from "@/redux/features/product/productSlice";

interface CommentListProps {
  productId: number;
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments, productId }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const currentProduct = products.find((product) => product.id === productId);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <div className="container mx-auto flex flex-col gap-4 py-2 max-h-[400px] overflow-y-auto">
      {(currentProduct?.comments || []).map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
