import { type Product } from "@db/schema";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}