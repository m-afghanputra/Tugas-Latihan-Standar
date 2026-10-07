import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import BukuListPage from './pages/BukuListPage';
import BukuFormPage from './pages/BukuFormPage';

// Komponen pelindung rute (Guard)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Definisi rute menggunakan CreateHashRouter
const router = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <BukuListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/buku/tambah',
    element: (
      <ProtectedRoute>
        <BukuFormPage />
      </ProtectedRoute>
    ),
  },
  // Tambahkan rute edit di sini nanti: path: '/buku/edit/:id'
]);

export default function App() {
  return <RouterProvider router={router} />;
}