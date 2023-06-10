import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import Logout from './components/Logout';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function App() {

  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated
            ? <Main />
            : <Navigate to="/login" replace />
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
