import { useEffect, useState } from 'react';

const readHash = () => window.location.hash.replace(/^#\/?/, '');

// Pages live at #/about, #/experience, etc. so links and the back button work
export function useHashRoute(routes, fallback) {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setRoute(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return routes.includes(route) ? route : fallback;
}
