import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';

function App() {

  const { setUserData, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {

    setUserData(null);
    signOut(auth);
    navigate("/")
  }

  return (
    <div className="App">
      <Header handleLogoutClick={handleLogout} />
      <Routes>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
