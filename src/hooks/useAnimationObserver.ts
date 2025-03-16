
import { useEffect, RefObject } from 'react';

/**
 * Custom hook for triggering animations when elements enter the viewport
 * @param refs Array of refs to observe
 */
const useAnimationObserver = (refs: RefObject<HTMLElement>[]) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs]);
};

export default useAnimationObserver;
