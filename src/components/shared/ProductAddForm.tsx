"use client";
import {
  ProductFormSchema,
  ProductFormSchemaValues,
} from "@/schemas/ProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { addProductAsync } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export const ProductAddForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset } =
    useForm<ProductFormSchemaValues>({
      defaultValues: {
        name: "",
        imageUrl: "",
        count: 0,
        size: {
          width: 0,
          height: 0,
        },
        weight: 0,
      },
      resolver: zodResolver(ProductFormSchema),
    });
  const { errors } = formState;
  const onSubmit = async (data: ProductFormSchemaValues) => {
    dispatch(addProductAsync(data));
    reset();
  };

  return (
    <form
      className="flex flex-col gap-2 shadow-2xl p-4 rounded max-w-80 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Product name"
        errorMessage={errors.name?.message}
        {...register("name")}
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Product count"
        errorMessage={errors.count?.message}
        {...register("count", { valueAsNumber: true })}
        type="number"
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Image url"
        errorMessage={errors.imageUrl?.message}
        {...register("imageUrl")}
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Product width"
        errorMessage={errors.size?.width?.message}
        {...register("size.width", { valueAsNumber: true })}
        type="number"
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Product height"
        errorMessage={errors.size?.height?.message}
        {...register("size.height", { valueAsNumber: true })}
        type="number"
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Product weight"
        errorMessage={errors.weight?.message}
        {...register("weight", { valueAsNumber: true })}
        type="number"
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Confirm
      </button>
    </form>
  );
};
