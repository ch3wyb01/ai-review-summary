import { FiveStarRating } from "@/components/five-star-rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/sample-data";
import Link from "next/link";

export default function Home() {
  const products = getProducts();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Product Reviews</h1>

        <div className="grid gap-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/${product.slug}`}
              className="block group"
            >
              <Card className="transition-all ring-1 ring-foreground/10 hover:ring-1 hover:ring-primary cursor-pointer!">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <FiveStarRating
                      rating={Math.round(averageRating(product.reviews))}
                    />
                    <span className="text-sm text-muted-foreground">
                      {product.reviews.length} reviews
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const averageRating = (reviews: { stars: number }[]) => {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;
};
