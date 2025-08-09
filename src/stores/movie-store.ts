import { Movie } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export type MovieState = {
  movies: Movie[];
};

export type MovieAction = {
  setMovies: (movies: Movie[]) => void;
};

export type MovieStore = MovieState & MovieAction;

export const defaultInitState: MovieState = {
  movies: [],
};

export const createMovieStore = create<MovieState>()(
  persist(
    (set, ) => ({
      movies: [],
      setMovies: (movies: Movie[]) => set(() => ({ movies })),
    }),
    { name: "movie-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);

// export const useMovieStore = (initState: MovieState = defaultInitState) => {
//   return createStore<MovieStore>()((set) => ({
//     ...initState,
//     setMovies: (movies) => set(() => ({ movies })),
//   }));
// };
