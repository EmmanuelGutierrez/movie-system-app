"use client";
import { createMovieStore } from "@/stores/movie-store";
import { type ReactNode, createContext, useRef } from "react";

export type MovieStoreAPi = ReturnType<typeof createMovieStore>;

export const MovieStoreContext = createContext<MovieStoreAPi | undefined>(
  undefined
);

export interface MovieStoreProviderProps {
  children: ReactNode;
}

export const MovieStoreProvider = ({ children }: MovieStoreProviderProps) => {
  const storeRef = useRef<MovieStoreAPi | null>(createMovieStore());
  // if (!storeRef.current) {
  //   storeRef.current = createMovieStore();
  // }
  return (
    <MovieStoreContext.Provider value={storeRef.current}>
      {children}
    </MovieStoreContext.Provider>
  );
};



// export const useMovieStore = <T,>(selector: (store: MovieStore) => T): T => {
//   const movieStoreContext = useContext(MovieStoreContext);
//   if (!movieStoreContext) {
//     throw new Error("useCounterStore must be used within MovieStoreProvider");
//   }
//   return useStore(movieStoreContext, selector);
// };
