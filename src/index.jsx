import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './Router';
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider breakpoint={["xs", "sm", "md", "lg", "xl"]}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);

