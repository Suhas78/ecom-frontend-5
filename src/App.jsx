import "./App.css";
import React, { useContext } from "react"; // Import useContext
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import AppContext from "./Context/Context"; // Import AppContext
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
    // We will get the function from the context in a helper component
    const AppController = () => {
        const { fetchProductsByCategory } = useContext(AppContext);

        const handleCategorySelect = (category) => {
            fetchProductsByCategory(category);
            console.log("Fetching products for category:", category);
        };
        
        return (
            <BrowserRouter>
                <Navbar onSelectCategory={handleCategorySelect} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add_product" element={<AddProduct />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/update/:id" element={<UpdateProduct />} />
                </Routes>
            </BrowserRouter>
        );
    };

    return (
        <AppProvider>
            <AppController />
        </AppProvider>
    );
}

export default App;
