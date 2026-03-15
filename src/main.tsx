import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root')!;

if (window.location.pathname.startsWith('/admin')) {
  // Lazy-load Studio — keeps it out of the main site bundle
  import('./studio/StudioPage').then(({ default: StudioPage }) => {
    createRoot(root).render(
      <StrictMode>
        <StudioPage />
      </StrictMode>
    );
  });
} else {
  // Main website — load Tailwind CSS and i18n only for the public site
  import('./index.css');
  import('./i18n');
  import('./App').then(({ default: App }) => {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}
