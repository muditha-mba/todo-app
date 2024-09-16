import { useState, useEffect, useRef } from 'react';

export function useComponentVisibility<T extends HTMLElement>(
  initialIsVisible = false
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<T | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  };
}
