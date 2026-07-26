import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT55HNIcm6xCyydC83vzGn0rgj3gsHySi8ZS65B_89NLpyJtXeV4bgkC5k_&s=10",
  },
  {
    name: "Footwear",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEM7N6c9d3GGYx9RyIL4xx7BXwC9eT_78xxAciltA75w&s=10",
  },
  {
    name: "Home",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVwceMxLVh1mjoD0BbaPcYmmRjoSL5AGoLx5fdeWYdA&s=10",
  },
  {
    name: "Clothing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fwT4dHJWxCxh7hg5qC9t0ZmyZZ66dW_gq9t_6Ux_Bw&s=10",
  },
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
