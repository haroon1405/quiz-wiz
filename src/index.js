import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';
import { QuizContextProvider } from './context/QuizContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizContextProvider>
      <App />
  </QuizContextProvider>
);
