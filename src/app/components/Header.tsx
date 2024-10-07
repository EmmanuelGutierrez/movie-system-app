import { Search, ShoppingCart, User } from "lucide-react";

export const Header = () => (
  <header className="flex justify-between items-center py-4 px-6">
    <div className="text-2xl font-bold text-colors-primary">4KSTAR</div>
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="text-white hover:text-text-colors-primary">
        HOME
      </a>
      <a href="#" className="text-white hover:text-text-colors-primary">
        MOVIE
      </a>
      <a href="#" className="text-white hover:text-text-colors-primary">
        TV SHOWS
      </a>
      <a href="#" className="text-white hover:text-text-colors-primary">
        WEB SERIES
      </a>
      <a href="#" className="text-white hover:text-text-colors-primary">
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
