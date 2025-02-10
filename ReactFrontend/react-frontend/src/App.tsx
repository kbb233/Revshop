import './App.css'
import LoginPage from './Pages/loginPage'
import RegisterPage from "./Pages/registerPage";
import BuyerPage from "./Pages/buyerPage";
import SellerPage from "./Pages/sellerPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreateProductPage from './Pages/createProductPage';
import ViewProductsPage from './Pages/ViewProductsPage';
import ViewProductsPageBuyer from './Pages/ViewProductPageBuyer';
import ViewCartBuyerPage from './Pages/ViewCartBuyerPage';
import ViewOrderBuyerPage from './Pages/ViewOrderBuyerPage';
import ViewFavoriteBuyerPage from './Pages/ViewFavoriteBuyerPage';
function App() {
  

  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/buyerPage" element={<BuyerPage />} />
                <Route path="/sellerPage" element={<SellerPage />} />
                <Route path="/createProducts" element={<CreateProductPage />} />
                <Route path="/viewProducts" element={<ViewProductsPage />} />
                <Route path="/viewProductBuyer" element={<ViewProductsPageBuyer />} />
                <Route path="/viewCartBuyer" element={<ViewCartBuyerPage />} />
                <Route path="/viewOrderBuyer" element={<ViewOrderBuyerPage />} />
                <Route path="/viewFavoriteBuyer" element={<ViewFavoriteBuyerPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
