import { useEffect, useRef } from 'react';

const useDebouncedEffect = (effect, triggers, timeout = 1000, setInDebounce = null) => {
  const debounce = useRef();

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (setInDebounce) setInDebounce(true);

    debounce.current = setTimeout(() => {
      effect();
      if (setInDebounce) setInDebounce(false);
    }, timeout);

    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, triggers); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDebouncedEffect;
