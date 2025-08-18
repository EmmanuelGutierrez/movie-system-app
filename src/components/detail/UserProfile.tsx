import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";

export const UserProfile = () => {
  return (
    <section className="flex flex-col">
      <div>Hola, Manu</div>
      <div>
        <User2Icon className="w-10 h-10" />
      </div>
      <div>
        <Button>Cuenta</Button>
      </div>
    </section>
  );
};
