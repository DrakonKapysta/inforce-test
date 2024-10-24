import { CommentList } from "@/components/shared/CommentList";
import { ModalAddComment } from "@/components/shared/ModalAddComment";
import { ModalUpdateProducts } from "@/components/shared/ModalUpdateProducts";
import { Product as ProductType } from "@/types/product";
import Image from "next/image";
import React from "react";

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const response = await fetch(
    "http://localhost:3000/api/product/" + productId,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const { product }: { product: ProductType } = await response.json();

  return (
    <div className="px-2 overflow-hidden ">
      <Image
        className="rounded-xl mx-auto mb-if-not-last"
        src={
          product.imageUrl.includes("images.unsplash.com")
            ? product.imageUrl
            : "https://images.unsplash.com/22/brick-wall.JPG?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={300}
        height={300}
        alt="product image"
        priority={true}
      />
      <h1 className="text-3xl text-center">{product.name}</h1>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="border shadow-md rounded-md p-4">
          <p className="text-center">
            <span className="font-bold">Count:</span> {product.count}
          </p>
          <p className="text-center">
            <span className="font-bold">Weight:</span> {product.weight}
          </p>
        </div>
      </div>

      <h3 className="text-xl text-center">Comments</h3>
      <CommentList productId={product.id} comments={product.comments || []} />
      <div className="container mx-auto flex justify-between">
        <ModalUpdateProducts />
        <ModalAddComment
          productId={
            product.comments && product.comments.length > 0
              ? product.comments[0].productId
              : 0
          }
        />
      </div>
    </div>
  );
}
