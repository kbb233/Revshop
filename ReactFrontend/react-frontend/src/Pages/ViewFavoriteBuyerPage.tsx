import React, { useEffect, useState } from "react";
import BuyerNavBarComponent from "../Components/BuyerNavBarComponent";
import BuyerFavoriteComponent from "../Components/BuyerFavoriteComponent";
import { getFavoriteProducts, removeFavorite } from "../Service/productService";

const ViewFavoriteBuyerPage : React.FC=()=>{
    const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
    const buyerId =Number(localStorage.getItem("buyer_id"));

    useEffect(() => {
        const getProducts = async () => {
                  const fetchedProducts = await getFavoriteProducts(buyerId);
                  setFavoriteProducts(fetchedProducts);
                };
                getProducts();
    }, []);

    const handleRemoveFavorite = (productId: number) => {  
        if (buyerId) {
        removeFavorite(buyerId, productId)
            .then(() => setFavoriteProducts(favoriteProducts.filter(product => product.id !== productId)))
            .catch(error => console.error("Error removing favorite:", error));
        }
    };
    return (<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <BuyerNavBarComponent />
                <h1>Favorite Products</h1>
                <div>
                    {favoriteProducts.length > 0 ? (
                    favoriteProducts.map(product => (
                        <BuyerFavoriteComponent
                        key={product.id}
                        product={product}
                        onRemoveFavorite={handleRemoveFavorite}
                        />
                    ))
                    ) : (
                    <p>No favorite products added.</p>
                    )}
                </div>
            </div>
  );
};

export default ViewFavoriteBuyerPage;