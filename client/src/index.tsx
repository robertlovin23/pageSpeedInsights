import React from 'react'
import { Provider } from 'react-redux';
import { store } from './state';
import { createRoot } from 'react-dom/client';
import App from './App';

const el = document.getElementById("root") as Element;

const root = createRoot(el);

root.render(<Provider store={store}><App/></Provider>)