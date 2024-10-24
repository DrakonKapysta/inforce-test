import Filters from "@/components/shared/Filters";
import { ModalProductAdd } from "@/components/shared/ModalProductAdd";
import { ProductList } from "@/components/shared/ProductList";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const { products } = await response.json();

  return (
    <section>
      <h1 className="text-3xl text-center font-bold">Products</h1>
      <div className="container mx-auto p-4">
        <div className="mb-if-not-last flex gap-4">
          <ModalProductAdd />
          <Filters />
        </div>
        <ProductList products={products} />
      </div>
    </section>
  );
}
