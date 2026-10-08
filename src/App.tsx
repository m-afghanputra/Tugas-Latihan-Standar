import { lazy, Suspense, type ReactNode } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuthStore } from './store/authStore';

// Lazy loading: tiap halaman jadi chunk terpisah (standar LSKK §3)
const LoginPage = lazy(() => import('./pages/LoginPage'));
const BukuListPage = lazy(() => import('./pages/BukuListPage'));
const BukuFormPage = lazy(() => import('./pages/BukuFormPage'));

// Komponen pelindung rute (Guard)
function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const PageLoader = (
  <div className="flex min-h-screen items-center justify-center">
    <Spin size="large" />
  </div>
);

// Definisi rute menggunakan createHashRouter
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
  {
    path: '/buku/edit/:id',
    element: (
      <ProtectedRoute>
        <BukuFormPage />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <Suspense fallback={PageLoader}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
