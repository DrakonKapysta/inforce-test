import { ProductService } from "@/services/ProductService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const id = parseInt((await params).productId);

  const product = await ProductService.getProductById(id);

  return Response.json({ product });
}
