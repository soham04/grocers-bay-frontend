import './App.scss';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Product_listing from './pages/Product_listing';
import Cart from './components/Cart';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verifyemail from './pages/Verifyemail';
import UserProfile from './components/UserProfile';
import Orders from './components/Orders';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProductDetails from './pages/Product_details';
import { useState } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearchInputChange} />
      <Routes>
        <Route path="/home" element={<Body />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<Product_listing searchQuery={searchQuery} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verifyemail/*" element={<Verifyemail />} />
        <Route path="/userprofile/" element={<UserProfile />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
