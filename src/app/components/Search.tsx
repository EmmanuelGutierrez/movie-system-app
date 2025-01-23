import { Button } from "./common/Button";
import { Input } from "./common/Input";

export const Search = () => {
  return (
    <div className="custom-container bg-gradient-to-r from-colors-primary-hard to-colors-secondary-clear  -mt-10  relative px-8 flex flex-col justify-between">
      <div className="mt-8">
        <h3 className="text-xl font-bold text-colors-primary-clear ml-6">
          Bienvenido a 4KSTAR
        </h3>
        <h2 className="text-4xl font-bold mt-4">¿Que esta buscando?</h2>
      </div>
      <div>
        <div className="bg-colors-primary-dark/40 px-8 pt-8 pb-6 mt-9 ">
          <div className="flex flex-row content-center">
            <Input
              type="text"
              placeholder="Buscar..."
              classContainer="w-80"
              color="primary"
            />
            <Button
              color="primary"
              text="Buscar"
              fontWeight="light"
              classNameButton=" h-10 self-center ml-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
