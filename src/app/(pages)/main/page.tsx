import { MainBanner } from "@/app/components/MainBanner";
import { Search } from "@/app/components/Search";
import React from "react";
// import { MovieDetail } from "@/app/components/MovieDetail";
// import { Carousel } from "@/app/components/Carousel";
// import { Api } from "@/common/types/api-types";
// import { MainBanner } from "@/app/components/MainBanner";
// import ReactPlayer from "react-player";

// const MovieCard = ({
//   title,
//   duration,
//   views,
// }: {
//   title: string;
//   duration: string;
//   views: string;
// }) => (
//   <div className="relative">
//     <img
//       src="/placeholder.svg?height=200&width=300"
//       alt={title}
//       className="w-full h-40 object-cover rounded"
//     />
//     <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 text-white">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <Eye className="w-4 h-4 mr-1" />
//           <span className="text-xs">{views}</span>
//         </div>
//         <div className="flex space-x-2">
//           <Heart className="w-4 h-4" />
//           <Plus className="w-4 h-4" />
//         </div>
//       </div>
//       <p className="text-sm font-semibold mt-1">{title}</p>
//       <p className="text-xs">{duration}</p>
//     </div>
//   </div>
// );

// const TrendingMovies = () => (
//   <section className="py-8 px-6">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-2xl font-bold text-yellow-400">
//         Top 10 Trending Movies
//       </h2>
//       <a href="#" className="text-yellow-400 text-sm">
//         More Movies
//       </a>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//       <MovieCard
//         title="The Lord of the Rings"
//         duration="2hr : 35mins"
//         views="11K"
//       />
//       <MovieCard
//         title="The Return of the King"
//         duration="2hr : 25mins"
//         views="24M"
//       />
//       <MovieCard
//         title="Beauty and the Beast"
//         duration="3hr : 05mins"
//         views="84K"
//       />
//       <MovieCard title="The Deer Hunter" duration="2hr : 50mins" views="99K" />
//       <MovieCard
//         title="The Lord of the Rings"
//         duration="2hr : 35mins"
//         views="11K"
//       />
//     </div>
//   </section>
// );

export default async function Page() {
  // const client = new Api({ baseURL: "http://localhost:3000" });

  // const { data } = await client.movie.movieList();
  return (
    <div className=" text-white ">
      {/* <MovieDetail /> */}
      <MainBanner/>
      <Search/>
      {/* <Carousel movies={data.data} title="movies" /> */}
    </div>
  );
}
