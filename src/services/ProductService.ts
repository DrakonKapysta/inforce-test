import { prisma } from "@/lib/prisma";
import { Comment, Product } from "@/types/product";

export class ProductService {
  static async getAllProducts() {
    const products = await prisma.product.findMany({
      include: {
        size: true,
        comments: true,
      },
    });

    return products;
  }
  static async deleteComment(commentId: number) {
    try {
      const deletedComment = await prisma.comment.delete({
        where: { id: commentId },
      });

      return { id: deletedComment.id, productId: deletedComment.productId };
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw new Error("Unable to delete comment");
    }
  }
  static async addProduct(product: Omit<Product, "id">) {
    const { size, ...productData } = product;

    const newSize = await prisma.size.create({
      data: {
        width: size.width,
        height: size.height,
      },
    });
    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        sizeId: newSize.id,
        comments: {
          create: [],
        },
      },
      include: {
        size: true,
        comments: true,
      },
    });
    return newProduct;
  }

  static async getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        size: true,
        comments: true,
      },
    });
    return product;
  }
  static async deleteProduct(id: number) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
    return id;
  }
  static async addComment(comment: Omit<Comment, "id">) {
    try {
      const newComment = await prisma.comment.create({
        data: {
          product: {
            connect: { id: comment.productId },
          },
          description: comment.description,
          date: comment.date,
        },
      });

      const updatedProduct = await prisma.product.update({
        where: { id: comment.productId },
        data: {
          comments: {
            connect: { id: newComment.id },
          },
        },
        include: {
          comments: true,
        },
      });

      return updatedProduct.comments;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }
}
