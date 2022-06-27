import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/404";
import Signup from "./views/SignUp";
import Login from "./views/Login";
import WishList from "./views/WishList";
import PR from "./components/PrivateRoutes";
import CreateWishList from "./views/CreateWishList";

function App() {
  return (
    <BrowserRouter baseUrl="/">
      <Routes>
          <Route path="/" element={<PR> <Home /> </PR>} />
          <Route path="/wishlist/create" element={<PR> <CreateWishList /> </PR>} />
          <Route path="/wishlist/:id" element={<WishList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />  
          <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
