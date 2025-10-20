import React, { useState, useEffect, createContext } from "react";
import axios from "../axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState("");
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const refreshData = async () => {
        try {
            const response = await axios.get("/products");
            setData(response.data);
            setIsError("");
        } catch (error) {
            setIsError(error.message);
        }
    };

    // ADD THIS NEW FUNCTION to fetch data by category from the backend
    const fetchProductsByCategory = async (category) => {
        // If "All" or no category is selected, fetch all products
        if (!category || category === "All") {
            refreshData();
            return;
        }
        try {
            // Call the specific backend endpoint for categories
            const response = await axios.get(`/products/category/${category}`);
            setData(response.data);
            setIsError("");
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error);
            setIsError(error.message);
        }
    };

    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            setCart(updatedCart);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <AppContext.Provider 
            value={{ 
                data, 
                isError, 
                cart, 
                addToCart, 
                removeFromCart, 
                refreshData, 
                clearCart, 
                fetchProductsByCategory // Expose the new function
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;