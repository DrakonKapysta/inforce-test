import { ProductService } from "@/services/ProductService";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextResponse) {
  const data = await request.json();

  const product = await ProductService.addComment(data.comment);

  return Response.json({ product });
}

export async function DELETE(request: Request) {
  const data = await request.json();

  const product = await ProductService.deleteComment(parseInt(data.id));
  console.log("Deleted comment", product);

  return Response.json({ product });
}
