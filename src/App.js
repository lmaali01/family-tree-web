import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPage from './AdminPage'; // Import AdminPage
import FamilyPage from './FamilyPage'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Route Configuration */}
        <Routes>
          <Route path="/" element={<FamilyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/family-tree" element={<FamilyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
