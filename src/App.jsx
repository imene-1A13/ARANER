import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import IntroAnimation from './assets/Animation/IntroAnimation';
import Dashboard from './pages/Dashboard';
import Section from './pages/Section';
import Usine from './pages/Usine';
import Historique from './pages/Historique';
import Management from './pages/Management';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const location = useLocation();

  const handleAnimationComplete = () => {
    setShowIntro(false);
    setShowLoginForm(true);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowIntro(false);
      setShowLoginForm(false);
    }
  }, [location]);

  return (
    <div>
    
      {/* Conditional rendering for intro animation and login */}
      {location.pathname === "/" && (
        <>
          {showIntro && <IntroAnimation onAnimationComplete={handleAnimationComplete} />}
          {showLoginForm && <Login />}
        </>
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to={showIntro || showLoginForm ? "/" : "/dashboard"} replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path ="/historique" element={<Historique/>}/>
        <Route path="/section/:id?" element={<Section />}/>
        <Route path="/usine" element={<Usine />}/>
        <Route path="/management" element={<Management />}/>

        

        </Routes>
      </div>
    </div>
  );
}

export default App;
