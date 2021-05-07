import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { commerce } from "./lib/commerce";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async()=>{
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  }

  const handleAddToCart = async (productId,quantity)=>{
    const item =  await commerce.cart.add(productId,quantity)
    setCart(item.cart)
  }
  console.log(cart)

  useEffect(() => {
    fetchProducts();
    fetchCart()
  }, []);
  console.log(products)
  return (
    <div>
      <Navbar totalItems={cart.total_items}/>

      <Products products={products} onAddToCart={handleAddToCart}/>
    </div>
  );
}

export default App;
