import { useEffect, useState } from 'react';

export function useAsyncData(loader, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let active = true;

    const run = async () => {
      setState(current => ({ ...current, loading: true, error: null }));
      try {
        const data = await loader();
        if (active) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (active) {
          setState({ data: null, loading: false, error });
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, deps);

  return state;
}

