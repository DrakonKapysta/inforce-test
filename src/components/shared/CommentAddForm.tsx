"use client";
import {
  ProductFormSchema,
  ProductFormSchemaValues,
} from "@/schemas/ProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import {
  addCommentAsync,
  addProductAsync,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  CommentFormSchema,
  CommentFormSchemaValues,
} from "@/schemas/CommentFormSchema";

interface CommentAddFormProps {
  productId?: number;
}

export const CommentAddForm: FC<CommentAddFormProps> = ({ productId = 0 }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset } =
    useForm<CommentFormSchemaValues>({
      defaultValues: {
        description: "",
        productId,
        date: new Date(),
      },
      resolver: zodResolver(CommentFormSchema),
    });
  const { errors } = formState;
  const onSubmit = async (data: CommentFormSchemaValues) => {
    dispatch(addCommentAsync(data));
    reset();
  };

  return (
    <form
      className="flex flex-col gap-2 shadow-2xl p-4 rounded max-w-80 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        label="Description"
        errorMessage={errors.description?.message}
        {...register("description")}
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register("date")}
        type="hidden"
      />
      <Input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register("productId")}
        type="hidden"
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
