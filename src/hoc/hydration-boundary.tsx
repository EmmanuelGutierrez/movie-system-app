import React, { ReactNode, useEffect, useState } from "react";

interface HydrationBoundaryPropsI {
  children: ReactNode;
  fallback?: ReactNode;
}

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export function HydrationBoundary({
  children,
  fallback = <div>...Loader</div>,
}: HydrationBoundaryPropsI) {
  const isClient = useIsClient();
  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function withHydration<P extends object>(Component:React.ComponentType<P>,fallback?:ReactNode) {

    return function HydratedComponent(props:P) {
        return(<HydrationBoundary fallback={fallback}>
            <Component {...props}/>
        </HydrationBoundary>)
    }
    
}