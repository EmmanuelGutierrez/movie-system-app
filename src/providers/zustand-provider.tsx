import { type ReactNode } from "react";
import { MovieStoreProvider } from "./movie-store-provider";

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  return <MovieStoreProvider>{children}</MovieStoreProvider>;
};
