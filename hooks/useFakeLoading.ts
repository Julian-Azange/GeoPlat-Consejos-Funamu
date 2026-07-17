import { useState, useEffect } from "react";

export function useFakeLoading(delayMs: number = 1000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);
    
    return () => clearTimeout(timer);
  }, [delayMs]);

  return isLoading;
}
