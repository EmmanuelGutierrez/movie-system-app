import React from "react";
import {
  Search,
  User,
  ShoppingCart,
  Play,
  Plus,
  Heart,
  Eye,
} from "lucide-react";

const Header = () => (
  <header className="flex justify-between items-center py-4 px-6 bg-black">
    <div className="text-2xl font-bold text-yellow-400">4KSTAR</div>
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="text-white hover:text-yellow-400">
        HOME
      </a>
      <a href="#" className="text-white hover:text-yellow-400">
        MOVIE
      </a>
      <a href="#" className="text-white hover:text-yellow-400">
        TV SHOWS
      </a>
      <a href="#" className="text-white hover:text-yellow-400">
        WEB SERIES
      </a>
      <a href="#" className="text-white hover:text-yellow-400">
        PAGES
      </a>
    </nav>
    <div className="flex items-center space-x-4">
      <Search className="w-5 h-5 text-white" />
      <User className="w-5 h-5 text-white" />
      <ShoppingCart className="w-5 h-5 text-white" />
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative">
    <div
      className="h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h1 className="text-6xl font-bold mb-2">PANS LABYRINTH</h1>
        <p className="mb-2">1950 • 1 HR 56 MIN</p>
        <div className="flex space-x-2 mb-4">
          <span className="px-2 py-1 bg-yellow-600 rounded text-xs">R</span>
          <span className="px-2 py-1 bg-gray-600 rounded text-xs">4K</span>
          <span className="px-2 py-1 bg-gray-600 rounded text-xs">HD</span>
          <span className="px-2 py-1 bg-gray-600 rounded text-xs">16+</span>
        </div>
        <p className="mb-4 max-w-lg">
          In the Falangist Spain of 1944, the bookish young stepdaughter of a
          sadistic army officer escapes into an eerie but captivating fantasy
          world.
        </p>
        <div className="mb-4">
          <p>
            <strong>Directed By:</strong> Guillermo del Toro
          </p>
          <p>
            <strong>Written By:</strong> Jenna Littlest
          </p>
          <p>
            <strong>Studio:</strong> Universal Pictures
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-yellow-400 text-black rounded-full flex items-center">
            <Play className="w-4 h-4 mr-2" /> Play Now
          </button>
          <button className="px-6 py-2 bg-white text-black rounded-full flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add to List
          </button>
        </div>
      </div>
    </div>
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 rounded-full p-4">
      <Play className="w-8 h-8 text-black" />
    </div>
    <div className="flex mt-4 space-x-2">
      <img
        src="/placeholder.svg?height=100&width=200"
        alt="Movie scene 1"
        className="w-1/3 h-24 object-cover"
      />
      <img
        src="/placeholder.svg?height=100&width=200"
        alt="Movie scene 2"
        className="w-1/3 h-24 object-cover"
      />
      <img
        src="/placeholder.svg?height=100&width=200"
        alt="Movie scene 3"
        className="w-1/3 h-24 object-cover"
      />
    </div>
  </section>
);

const MovieCard = ({
  title,
  duration,
  views,
}: {
  title: string;
  duration: string;
  views: string;
}) => (
  <div className="relative">
    <img
      src="/placeholder.svg?height=200&width=300"
      alt={title}
      className="w-full h-40 object-cover rounded"
    />
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          <span className="text-xs">{views}</span>
        </div>
        <div className="flex space-x-2">
          <Heart className="w-4 h-4" />
          <Plus className="w-4 h-4" />
        </div>
      </div>
      <p className="text-sm font-semibold mt-1">{title}</p>
      <p className="text-xs">{duration}</p>
    </div>
  </div>
);

const TrendingMovies = () => (
  <section className="py-8 px-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-yellow-400">
        Top 10 Trending Movies
      </h2>
      <a href="#" className="text-yellow-400 text-sm">
        More Movies
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MovieCard
        title="The Lord of the Rings"
        duration="2hr : 35mins"
        views="11K"
      />
      <MovieCard
        title="The Return of the King"
        duration="2hr : 25mins"
        views="24M"
      />
      <MovieCard
        title="Beauty and the Beast"
        duration="3hr : 05mins"
        views="84K"
      />
      <MovieCard title="The Deer Hunter" duration="2hr : 50mins" views="99K" />
      <MovieCard
        title="The Lord of the Rings"
        duration="2hr : 35mins"
        views="11K"
      />
    </div>
  </section>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <TrendingMovies />
    </div>
  );
}
