const CART_KEY = "shopping_cart";

// Fetch cart from local storage
const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Save cart to local storage
const saveCart = (cart: any[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Add product to cart
const addToCart = (product: any, quantity: number) => {
  let cart = getCart();
  
  // Check if product already in cart
  const existingProduct = cart.find((item: any) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
};

// Remove product from cart
const removeFromCart = (productId: number) => {
  let cart = getCart().filter((item: any) => item.id !== productId);
  saveCart(cart);
};

// Update product quantity in cart
const updateCartQuantity = (productId: number, quantity: number) => {
  let cart = getCart();
  cart = cart.map((item: any) => 
    item.id === productId ? { ...item, quantity } : item
  );
  saveCart(cart);
};

// Clear entire cart
const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export default { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart };
