"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  deleteCommentAsync,
  fetchAllProducts,
} from "@/redux/features/product/productSlice";
import { ProductService } from "@/services/ProductService";
import { Comment } from "@/types/product";
import React, { FC, useEffect } from "react";

interface CommentProps {
  comment: Comment;
}

export const CommentItem: FC<CommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async (comment: Comment) => {
    console.log("Deleting comment", comment);

    dispatch(deleteCommentAsync(comment));
  };
  return (
    <div className="border rounded-md border-gray-600 shadow-md p-4 relative">
      <p className="p-2 font-bold">Unknown person</p>
      <p>{comment.description}</p>
      <p className="text-gray-500 text-end text-xs">
        {comment.date.toString()}
      </p>
      <button
        onClick={() => handleDelete(comment)}
        className="absolute top-2 right-2 max-h-5 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded flex items-center justify-center"
      >
        Remove
      </button>
    </div>
  );
};
