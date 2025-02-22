import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const Header = lazy(() => import('./UI/Header'));
const Footer = lazy(() => import('./UI/Footer'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const Quiz = lazy(() => import('./Pages/Quiz'));
const Server = lazy(() => import('./Pages/Server'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
       <Container fluid>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/message" element={<Server />} />
          </Routes>
          <Footer />
       </Container>      
       </Suspense>
    </Router>
  );
}

export default App;


