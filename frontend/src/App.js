import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import LoginDoctor from './pages/LoginDoctor';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route
          path='/appointments'
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/login-doctor' element={<LoginDoctor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
