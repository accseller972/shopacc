import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { products } from "@db/schema";
import { eq, like } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  app.get("/api/products", async (req, res) => {
    const { category, search } = req.query;
    let query = db.select().from(products);
    
    if (category) {
      query = query.where(eq(products.category, category as string));
    }
    
    if (search) {
      query = query.where(like(products.name, `%${search as string}%`));
    }
    
    const result = await query;
    res.json(result);
  });

  app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);
    
    if (result.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    
    res.json(result[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
