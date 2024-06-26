import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Header = lazy(() => import('./UI/Header'));
const Footer = lazy(() => import('./UI/Footer'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const Quiz = lazy(() => import('./Pages/Quiz'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;


