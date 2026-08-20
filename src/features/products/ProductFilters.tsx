import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "../categories/categoriesApi";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const { data: response } = useGetCategoriesQuery();

  const categories = response?.data ?? [];

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All";

  return (
    <div className="space-y-4 mb-8 ">
      <div className="flex flex-col md:justify-center sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange("");
              onCategoryChange("All");
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                selectedCategory === category.name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:bg-accent text-muted-foreground",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
