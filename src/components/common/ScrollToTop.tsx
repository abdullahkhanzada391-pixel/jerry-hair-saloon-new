import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Check if Lenis smooth scroll instance is available globally
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: unknown, opts?: unknown) => void } }).__lenis;

    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id) || document.querySelector(hash);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -88 });
          } else {
            const y = element.getBoundingClientRect().top + window.scrollY - 88;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

