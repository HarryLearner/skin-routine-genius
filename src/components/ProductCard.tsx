import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCard({ product, className, style }: ProductCardProps) {
  return (
  <div
    className={cn(
      "group bg-card rounded-2xl p-4 border border-border shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in",
      className
    )}
    style={style}
  >
      <div className="flex justify-between items-start gap-2 mb-2">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-light text-primary capitalize">
          {product.product_type}
        </span>
        {product.price && (
          <span className="text-sm font-semibold text-primary">
            {product.price}
          </span>
        )}
      </div>
      
      <h4 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
        {product.name}
      </h4>

      {product.matched_keywords && product.matched_keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {product.matched_keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {product.product_url && product.product_url !== product.name && (
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View product
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
