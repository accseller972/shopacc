import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: [`/api/products/${params?.id}`],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-96" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
      
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold mt-2">${product.price.toString()}</p>
        <p className="mt-4 text-muted-foreground">{product.description}</p>
        
        <Button
          className="mt-8 w-full md:w-auto"
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
