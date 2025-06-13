import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@styles/tailwind.css';
import '@styles/fonts.css';
import Root from './Root.jsx';
import { Movies } from '@pages';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route index element={<Movies/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
