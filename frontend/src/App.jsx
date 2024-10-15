import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import Login from './page/Login';
import Register from './page/Register';
function App() {
	return (
		<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
		</Router>
  );
}

export default App;
