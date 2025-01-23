import { Movie } from "../types/api-types";

export const movies: Movie[] = [
  {
    _id: "1",
    name: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    duration: 142,
    release: 1994,
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    directors: ["Frank Darabont"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    genres: [],
  },
  {
    _id: "2",
    name: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    duration: 175,
    release: 1972,
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    directors: ["Francis Ford Coppola"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    genres: [],
  },
  {
    _id: "3",
    name: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: 152,
    release: 2008,
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    directors: ["Christopher Nolan"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    genres: [],
  },
  {
    _id: "4",
    name: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    duration: 154,
    release: 1994,
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    directors: ["Quentin Tarantino"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    genres: [],
  },
  {
    _id: "5",
    name: "Forrest Gump",
    description:
      "The life of Forrest Gump, a man with a low IQ but a good heart, who witnesses some of the major events of the 20th century.",
    duration: 142,
    release: 1994,
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    directors: ["Robert Zemeckis"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    genres: [],
  },
];
