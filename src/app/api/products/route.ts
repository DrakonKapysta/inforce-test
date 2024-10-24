import { ProductService } from "@/services/ProductService";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: NextResponse) {
  const products = await ProductService.getAllProducts();

  return Response.json({ products });
}

export async function POST(request: Request, response: NextResponse) {
  const data = await request.json();

  const product = await ProductService.addProduct(data);

  return Response.json({ product });
}

export async function DELETE(request: Request, response: NextResponse) {
  const data = await request.json();

  const product = await ProductService.deleteProduct(data.id);

  return Response.json({ id: data.id });
}
