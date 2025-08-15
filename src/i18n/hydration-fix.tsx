"use client";

import { useEffect, useState } from 'react';

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

export function ClientOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const isHydrated = useHydration();
  
  if (!isHydrated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}