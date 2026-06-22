import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './pages/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import TempleListPage from './pages/TempleListPage';
import TempleFormPage from './pages/TempleFormPage';

const AdminRoute = ({ children }) => {
  const { loading, isAdmin } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<AdminLoginPage />} />
    <Route path="/" element={<AdminRoute><AdminLayout /></AdminRoute>}>
      <Route index element={<DashboardPage />} />
      <Route path="temples" element={<TempleListPage />} />
      <Route path="temples/new" element={<TempleFormPage />} />
      <Route path="temples/:id/edit" element={<TempleFormPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
