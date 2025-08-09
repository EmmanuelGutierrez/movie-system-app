import { Person } from "@/common/types/api-types";

export const PersonList = ({
  title,
  data,
}: {
  title: string;
  data: Person[]
}) => {
  return (
    <div  className="my-8">
      <p className="mb-4">{title}:</p>
      <div className="flex gap-x-6">
        {data?.map((p) => (
          <div
            key={p.id}
            className="border-2 border-colors-primary-clear rounded-2xl w-45 flex text-center justify-center items-center"
          >
            <p className="m-3">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
