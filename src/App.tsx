import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/Toast';
import { Loader } from './components/Loader';
import { Home } from './pages/Home';

// Lazy-load 404 page to minimize initial bundle size
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ToastProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#050506]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
