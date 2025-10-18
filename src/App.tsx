import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BookDetail from './components/BookDetail/BookDetail';
import Toast from './components/Toast/Toast';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import CollectionPage from './pages/CollectionPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout/Layout';
import { useAppSelector } from './store/hooks';

function App() {
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';
  const backgroundClass = isLight
    ? 'bg-neutral-100 text-neutral-900'
    : 'bg-neutral-950 text-white';
  const mainWrapperClass = isLight ? 'bg-white/80' : '';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundClass}`}>
      <Navbar />
      <main className="w-full transition-colors duration-300">
        <Layout className={mainWrapperClass}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
          </Routes>
        </Layout>
      </main>
      <Toast />
    </div>
  );
}

export default App;
