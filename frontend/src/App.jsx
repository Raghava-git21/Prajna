import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/public/HomePage';
import TemplesPage from './pages/public/TemplesPage';
import TempleDetailPage from './pages/public/TempleDetailPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import { useAuth } from './context/AuthContext';

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-temple-cream text-temple-warmGray">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
      <Route path="/" element={<UserRoute><PublicLayout><HomePage /></PublicLayout></UserRoute>} />
      <Route path="/temples" element={<UserRoute><PublicLayout><TemplesPage /></PublicLayout></UserRoute>} />
      <Route path="/temples/:id" element={<UserRoute><PublicLayout><TempleDetailPage /></PublicLayout></UserRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
