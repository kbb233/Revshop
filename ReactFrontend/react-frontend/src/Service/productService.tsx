import axios from "axios";

const baseURL = "http://localhost:8080/api/products"; 
const FAVORITE_API_URL = "http://localhost:8080/api/favorites";

// Fetch all products by seller ID
export const fetchProductsBySeller = async (sellerId: number) => {
  try {
    const response = await axios.get(`${baseURL}/seller/${sellerId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Update a product
export const updateProduct = async (productId: number, updatedProduct: any) => {
  try {
    const response = await axios.put(`${baseURL}/update/${productId}`, updatedProduct, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId: number) => {
  try {
    await axios.delete(`${baseURL}/delete/${productId}`, { withCredentials: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fetch all products (for buyer)
export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/all`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

// Add product to cart
export const addToCart = async (productId: number, quantity: number) => {
  try {
    await axios.post(`${baseURL}/cart/add`, { productId, quantity }, { withCredentials: true });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Add product to favorites
export const addToFavorites = async (buyerId:number,productId: number) => {
  try {
    await axios.post(`${FAVORITE_API_URL}/add`, {buyerId, productId }, { withCredentials: true });
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};

export const getFavoriteProducts = async (buyerId:number) => {
  try {
    const response =await axios.get(`${FAVORITE_API_URL}/${buyerId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error getting buyer favorites", error);
    return [];
  }
};

export const removeFavorite = async (buyerId:number,productId: number) => {
  try {
    await axios.delete(`${FAVORITE_API_URL}/delete/${buyerId}/${productId}`, { withCredentials: true });
  } catch (error) {
    console.error("Error delete the favorite:", error);
  }
};