
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantsListPage from './pages/RestaurantsListPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import ErrorPage from './pages/ErrorPage';
import EditRestaurantPage from './pages/EditRestaurantPage';
import CreateRestaurantPage from './pages/CreateRestaurantPage'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />      
        <Route path="/restaurants" element={<RestaurantsListPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage/>} />
        <Route path="/restaurants/add" element={<CreateRestaurantPage />} />
        <Route path="/restaurants/edit/:restaurantId" element={<EditRestaurantPage />} />
        <Route path="/restaurants/comments" element={<EditRestaurantPage />} />
        <Route path="*" element={<ErrorPage/>} />
    </Routes>


    </div>
  );
}

//context and index import wrapper
//rotas
//

export default App;
