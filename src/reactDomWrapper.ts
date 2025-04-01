import ReactDOM from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';

const ReactDOMWrapper = {
  ...ReactDOM,
  createRoot,
  hydrateRoot,
};

export default ReactDOMWrapper;
