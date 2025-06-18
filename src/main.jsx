import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@styles/tailwind.css';
import '@styles/fonts.css';
import Root from './Root.jsx';
import { Movies, SeatSelector } from '@pages';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route index element={<Movies/>}/>
          <Route path='seats/:guid' element={<SeatSelector/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
