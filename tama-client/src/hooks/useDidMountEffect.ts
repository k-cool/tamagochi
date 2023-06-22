import { DependencyList, useEffect, useRef } from "react";

export const useDidmountEffect = (func: () => void, deps: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
