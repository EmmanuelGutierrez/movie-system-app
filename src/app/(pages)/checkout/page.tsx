import { HeaderCheckout } from "@/components/checkout/header";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <main>
      <HeaderCheckout />
      <section
        className="custom-container my-32 relative flex flex-col bg-colors-primary-dark w-100 mx-auto border border-colors-primary-clear/60
                         [&_h6]:text-2xl"
      >
        <div
          className=" px-10 py-7
        before:rounded-full before:absolute before:w-14 before:h-14 before:bg-colors-primary-hard before:top-64 before:-left-6
        after:rounded-full after:absolute after:w-14 after:h-14 after:bg-colors-primary-hard after:top-64 after:-right-6
        [&_h6]:justify-between [&_h6]:flex [&_h6]:w-full
        [&_div]:justify-between [&_div]:flex [&_div]:w-full [&_div]:font-light [&_div]:text-lg 
        [&_li]:flex [&_li]:flex-col [&_li]:justify-between [&_li]:items-end [&_li]:mb-5"
        >
          <h2 className="text-center text-3xl font-light border-b border-dashed border-colors-primary-clear/60 pb-7 mb-5">
            Funcion
          </h2>
          <ul className="gap-3">
            <li>
              <h6>Superman</h6>
              <div>
                <span>Subtitulado</span>
              </div>
            </li>
            <li className="border-b border-dashed border-colors-primary-clear/60 pb-8">
              <h6>
                <span>cine 5</span>
                <span>02</span>
              </h6>
              <div>
                <span>9 septiembre Lunes,9:00 PM</span>
                <span>tickets</span>
              </div>
            </li>
            <li>
              <h6>
                <span>Precio total de tickets</span>
                <span>140</span>
              </h6>
            </li>
            <li>
              <div>
                <span>Impuestos</span>
                <span>21</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="border-t border-dashed border-t-colors-primary-light px-10 py-7 flex justify-between ">
          <h6>Total:</h6>
          <h6>600</h6>
        </div>
        <Button className="mx-auto mb-7">Comprar</Button>
      </section>
    </main>
  );
}
