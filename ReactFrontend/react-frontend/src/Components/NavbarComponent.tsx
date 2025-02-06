import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-lg font-bold">Seller Dashboard</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/createProducts" className="text-white hover:underline">
              Create Product
            </Link>
          </li>
          <li>
            <Link to="/viewProducts" className="text-white hover:underline">
              View Products
            </Link>
          </li>
          <li>
            <Link to="/viewOrders" className="text-white hover:underline">
              View Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
