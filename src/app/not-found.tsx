import Link from "next/link"
import Image from "next/image"
import NotFoundImg from '../media/img/404-image.svg'
import { Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4">
      <section className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 flex size-14 items-center justify-center rounded-full bg-muted">
          <AlertTriangle
            className="size-7 text-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">{"Icono de advertencia"}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {"Página no encontrada"}
        </h1>
        <p className="mt-2 text-muted-foreground sm:text-lg">
          {
            "La página que buscas no existe o fue movida. Verifica la URL o vuelve al inicio."
          }
        </p>

        <div className="relative mx-auto mt-8 mask-radial-at-center mask-radial-from-0% w-full max-w-2xl overflow-hidden rounded-full">
          <Image
            src={NotFoundImg}
            alt="Ilustración decorativa de un estado vacío para 404"
            width={1000}
            height={1000}
            className="h-full w-full "
            priority
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/main" aria-label="Ir a la página de inicio">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 size-4" aria-hidden="true" />
              {"Volver al inicio"}
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {
            "Si crees que esto es un error, contacta a soporte con el enlace que intentaste abrir."
          }
        </p>
      </section>
    </main>
  );
}
