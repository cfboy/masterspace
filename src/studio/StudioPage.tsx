import { useEffect } from 'react';

import { Studio } from 'sanity';

import config from '../../sanity.config';

export default function StudioPage() {
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path === '/admin/') {
      window.history.replaceState(null, '', '/admin/structure/home');
    }
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Studio config={config} />
    </div>
  );
}
