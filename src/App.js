import { Routes, Route, Outlet } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import TrainerPage from './pages/TrainerPage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import Header from './components/Header';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>        {/* layout pai */}
        <Route index element={<HomePage />} />      {/* / */}
        <Route path="favorites" element={<FavoritesPage />} /> {/* /favorites */}
        <Route path="pokemon/:id" element={<PokemonDetailPage />} /> {/* /pokemon/1 */}
        <Route path="/trainer"
          element={
            <ProtectedRoute>
              <TrainerPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
