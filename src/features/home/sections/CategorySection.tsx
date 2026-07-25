import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    image: "https://placehold.co/300x300?text=Electronics",
  },
  { name: "Footwear", image: "https://placehold.co/300x300?text=Footwear" },
  { name: "Home", image: "https://placehold.co/300x300?text=Home" },
  { name: "Clothing", image: "https://placehold.co/300x300?text=Clothing" },
];

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="group relative rounded-xl overflow-hidden aspect-square"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <span className="text-white font-semibold">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
