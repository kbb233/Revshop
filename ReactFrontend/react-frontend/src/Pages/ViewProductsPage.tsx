import React, { useEffect, useState } from "react";
import ProductComponent from "../Components/ProductComponent";
import NavbarComponent from "../Components/NavbarComponent";
import { fetchProductsBySeller, updateProduct, deleteProduct } from "../Service/productService";

const ViewProductsPage: React.FC = () => {
    interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        category: string;
        discountedPrice: number;
        quantity: number;
        threshold: number;
        imageUrl: string;
      }

    const [products, setProducts] = useState<Product[]>([]);
    const sellerId = localStorage.getItem("seller_id"); 

  useEffect(() => {
    const loadProducts = async () => {
        if (sellerId) {
          try {
            const data = await fetchProductsBySeller(parseInt(sellerId));
            setProducts(data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        }
      };
      loadProducts();
    }, [sellerId]);
  
    const handleEdit = async (updatedProduct: any) => {
      try {
        const updatedData = await updateProduct(updatedProduct.id,updatedProduct);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedData.id ? updatedData : p))
        );
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    };
  
    const handleDelete = async (productId: number) => {
      try {
        await deleteProduct(productId);
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    };

  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Your Listed Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map(product => (
              <ProductComponent
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No products listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductsPage;
