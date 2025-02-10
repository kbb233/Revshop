import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../Service/productService";
import BuyerProductComponent from "../Components/BuyerProductComponent";
import BuyerNavBarComponent from "../Components/BuyerNavBarComponent";

const ViewProductPageBuyer: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    useEffect(() => {
        const getProducts = async () => {
          const fetchedProducts = await fetchAllProducts();
          setProducts(fetchedProducts);
        };
        getProducts();
      }, []);
    
      const filteredProducts = products.filter(
        (product) =>
          (category === "" || product.category.toLowerCase().includes(category.toLowerCase())) &&
          (searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    
      return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <BuyerNavBarComponent />
          <h2>Browse Products</h2>
    
          {/* Search Inputs */}
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "5px" }}
            />
          </div>
    
          {/* Render products */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {filteredProducts.map((product) => (
              <BuyerProductComponent key={product.id} product={product} />
            ))}
          </div>
        </div>
      );
    };

export default ViewProductPageBuyer;