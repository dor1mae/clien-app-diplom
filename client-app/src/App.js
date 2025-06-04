import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TitlePage from './components/TitlePage/TitlePage.js';
import ChapterPage from './components/ChapterPage/ChapterPage.js';
import CatalogPage from './components/CatalogPage/CatalogPage.js'
import {ThemeProvider} from './providers/ThemeProvider/ThemeProvider.js'
import AuthorizatingPage from './components/AuthorizatingWindow/AuthorizatingPage.js';
import { AuthProvider } from './providers/AuthProvider.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import { Profile } from './components/Profile/Profile.js';





function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path='auth' element={<AuthorizatingPage/>}/>
              <Route path="/home" element={<ProtectedRoute element={Home}/>} />
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/novella/:id" element={<ProtectedRoute element={TitlePage}/>} />
              <Route path="/novella/chapter/:chapterId" element={<ProtectedRoute element={ChapterPage}/>} />
              <Route path='/catalog' element={<ProtectedRoute element={CatalogPage}/>}/>
              <Route path='/profile' element={<ProtectedRoute element={Profile}/>}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
