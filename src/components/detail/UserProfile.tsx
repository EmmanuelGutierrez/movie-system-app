import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";

export const UserProfile = () => {
  return (
    <section className="flex flex-col items-center my-5 gap-6">
      <div>Hola, Manu</div>
      <div className="bg-colors-primary-dark w-14 h-14 flex justify-center items-center rounded-full border border-colors-primary-clear/35">
        <User2Icon className="w-10 h-10 m-auto" />
      </div>
      <div>
        <Button className="h-16 w-30">Cuenta</Button>
      </div>
    </section>
  );
};
