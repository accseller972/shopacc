import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import SearchFilters from "@/components/SearchFilters";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { scrollY } = useScroll();

  // Parallax effects
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products", { search, category: category === "all" ? "" : category }],
  });

  return (
    <div className="space-y-12">
      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden"
      >
        <div className="text-center z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Welcome to ShopHub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Discover amazing products at great prices. Start exploring our collection today!
          </motion.p>
        </div>
      </motion.section>

      {/* Ad Space Placeholder */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="h-40 bg-card rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
          <p className="text-muted-foreground">Advertisement Space</p>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Browse Products</h2>
          <SearchFilters
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 pb-12"
      >
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
              </motion.div>
            ))}
          </div>
        ) : !products?.length ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found. Try adjusting your search.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </motion.section>

      {/* Bottom Ad Space Placeholder */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 pb-12"
      >
        <div className="h-60 bg-card rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
          <p className="text-muted-foreground">Advertisement Space</p>
        </div>
      </motion.section>
    </div>
  );
}