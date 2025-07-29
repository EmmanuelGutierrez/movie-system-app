import { client } from "@/service/client";
import { MovieDetailContainer } from "@/app/containers/MovieDetailContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = useParams();
  const { id } = await params;
  const { data } = await client.movie.movieControllerFindOne(Number(id));
  if (!data) {
    return <>Not found</>;
  }
  return <MovieDetailContainer data={data} />;
}
