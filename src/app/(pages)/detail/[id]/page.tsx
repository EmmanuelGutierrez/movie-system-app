import { client } from "@/service/client";
import { MovieDetailContainer } from "@/app/containers/detail/MovieDetailContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = useParams();
  const { id } = await params;
  const movieRes = await client.movie.movieControllerFindOne(Number(id));
  const screeningsRes =
    await client.screening.screeningControllerScreeningsAvailableByMovie(
      Number(id)
    );
  if (!movieRes.data) {
    return <>Not found</>;
  }
  return (
    <MovieDetailContainer
      movie={movieRes.data}
      screenings={screeningsRes.data}
    />
  );
}
