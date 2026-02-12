import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Customers from './pages/Customers';
import Technicians from './pages/Technicians';
import Users from './pages/Users';
import Shops from './pages/Shops';
import Payments from './pages/Payments';
import Expenses from './pages/Expenses';
import Login from './pages/Login.tsx';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // Since we have static user data, we're always logged in for testing
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register-org" element={<Navigate to="/" />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/users" element={<Users />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/expenses" element={<Expenses />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
