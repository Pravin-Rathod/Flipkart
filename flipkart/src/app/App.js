import './App.css';
import { Header } from '../components/header/header';
import { Route, Routes } from "react-router-dom";
import { Login } from '../components/login/login';
import { Signup } from '../components/signup/signup';
import { Error } from "../components/error/error"
import { Homepage } from '../components/homepage/homepage';
import { Dashboard } from "../components/dashboard/dashboard"
import { UserVerify } from '../components/dashboard/userVerify';
import { Admin } from '../components/admin/admin';
import { Product } from '../components/products/product';
import { Cart } from "../components/cart/cart"
import { DeleteCartProduct } from "../components/cart/deleteCartProduct"

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
        <Route path="/products/:productId" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/deleteCartProduct/:productId" element={<DeleteCartProduct />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
