import { createMovieStore, MovieStore } from "@/stores/movie-store";
import { useStore } from "./useStore";

export const useMovieStore = <T>(selector: (store: MovieStore) => T): T => {
  const result = useStore(createMovieStore, selector);
  if (result === undefined) {
    throw new Error(
      "useMovieStore returned undefined. Make sure the provider is set up correctly."
    );
  }
  return result;
};
