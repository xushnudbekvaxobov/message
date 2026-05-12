import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMessagePage from './pages/CreateMessagePage';
import RevealMessagePage from './pages/RevealMessagePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateMessagePage />} />
          <Route path="/create" element={<Navigate to="/" replace />} />
          <Route path="/s/:token" element={<RevealMessagePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
