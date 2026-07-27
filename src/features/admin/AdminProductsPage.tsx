import { useState } from "react";
import { Plus, Pencil, Trash2, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { ProductForm } from "./ProductForm";
import { mockAdminProducts as initialProducts } from "./mockAdminData";
import type { AdminProduct } from "./types";
import type { ProductFormValues } from "./schemas/productSchema";

function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function openAddDialog() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  function openEditDialog(product: AdminProduct) {
    setEditingProduct(product);
    setDialogOpen(true);
  }

  function handleSubmit(values: ProductFormValues) {
    if (editingProduct) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...values, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
      toast.success("Product updated successfully!");
    } else {
      // Add new
      const newProduct: AdminProduct = {
        ...values,
        id: crypto.randomUUID(),
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product added successfully!");
    }
    setDialogOpen(false);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success("Product deleted.");
    setDeleteTarget(null);
  }

  function toggleActive(product: AdminProduct) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, isActive: !p.isActive } : p,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button size="sm" onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">SKU</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No products found.
                  </td>
                </tr>
              )}
              {filteredProducts.map((product) => {
                const isLowStock = product.stock <= product.lowStockThreshold;
                return (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-10 w-10 rounded-md object-cover bg-muted"
                        />
                        <span className="font-medium line-clamp-1">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{product.sku}</td>
                    <td className="p-4 text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {product.stock}
                        {isLowStock && (
                          <span title="Low stock">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button onClick={() => toggleActive(product)}>
                        <Badge
                          variant={product.isActive ? "secondary" : "outline"}
                        >
                          {product.isActive ? "Active" : "Hidden"}
                        </Badge>
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteTarget(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            defaultValues={editingProduct ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteTarget?.title}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AdminProductsPage;
