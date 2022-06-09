import "./login.css";
import "./allRest.css";
import MyNavbar from "./components/MyNavbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantsListPage from "./pages/RestaurantsListPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import EditRestaurantPage from "./pages/EditRestaurantPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import IsPublic from "./components/IsPublic";
import IsPrivate from "./components/isPrivate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsPublic>
              <SignupPage />
            </IsPublic>
          }
        />
        <Route
          path="/login"
          element={
            <IsPublic>
              <LoginPage />
            </IsPublic>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/restaurants"
          element={
            <IsPrivate>
              <RestaurantsListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/restaurants/:restaurantId"
          element={
            <IsPrivate>
              <RestaurantDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/restaurants/add"
          element={
            <IsPrivate>
              <CreateRestaurantPage />
            </IsPrivate>
          }
        />
        <Route
          path="/restaurants/edit/:restaurantId"
          element={
            <IsPrivate>
              <EditRestaurantPage />
            </IsPrivate>
          }
        />
        <Route
          path="/restaurants/comments"
          element={
            <IsPrivate>
              <EditRestaurantPage />
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
  );
}

//context and index import wrapper
//rotas
//

export default App;
