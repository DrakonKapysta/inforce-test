"use client";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteProductAsync } from "@/redux/features/product/productSlice";
import { Product } from "@/types/product";
import Image from "next/image";
import React, { FC } from "react";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteProductAsync(product.id));
  };
  return (
    <div className="border rounded-md border-gray-600 shadow-md p-4 relative">
      <Image
        onClick={() => {
          console.log(product.id);

          router.push(`/product/${product.id}`);
        }}
        className="rounded-xl mx-auto mb-if-not-last hover:opacity-80 cursor-pointer"
        src={
          product.imageUrl.includes("images.unsplash.com")
            ? product.imageUrl
            : "https://images.unsplash.com/22/brick-wall.JPG?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={product.size.width}
        height={product.size.height}
        onError={(e) => {
          console.error("Image failed to load:", e);
        }}
        alt="product image"
        priority={true}
      />
      <div className="flex flex-col gap-2">
        <p className="text-center">{product.name}</p>
        <span>Count: {product.count}</span>
        <span>Weight: {product.weight}g</span>
      </div>
      <button
        onClick={onOpen}
        className="absolute bottom-2 right-2 max-h-4 max-w-4 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded flex items-center justify-center"
      >
        X
      </button>
      <Modal responsive={true} isOpen={isOpen} onClose={onClose}>
        <p className="mb-if-not-last">
          Are you sure you want to delete this product?
        </p>
        <div className="flex gap-6 justify-center w-full">
          <button
            onClick={onClose}
            className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded flex items-center justify-center max-w-20 w-full"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded flex items-center justify-center max-w-20 w-full"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};
