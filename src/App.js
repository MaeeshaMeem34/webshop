import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { CssBaseline } from '@material-ui/core';
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    <Router>
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar totalItems={cart.total_items}  />
      <Switch>
        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart}  />
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart}   />
        </Route>
       
      </Switch>
    </div>
  </Router>
  );
}

export default App;
