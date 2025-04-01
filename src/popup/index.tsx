import React from 'react';
import Popup from './Popup';
import ReactDOMWrapper from '../reactDomWrapper';

// Expose React and ReactDOM to the global window object
window.React = React;
window.ReactDOM = ReactDOMWrapper;

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOMWrapper.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
