import React, { useState, useEffect } from 'react'
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Payment from './components/Checkoutform/Payment'
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkoutform/Checkout';
import Cover from './components/Cover/Cover';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }
    const handleAddtoCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart);
    }
    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart);
    }
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);


    // console.log(products)
    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Cover />
                        <Products products={products} onAddtoCart={handleAddtoCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart} />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                    <Route exact path="/payment">
                        <Payment />
                    </Route>
                </Switch>
            </div>
        </Router>

    )
}

export default App
