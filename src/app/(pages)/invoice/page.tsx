"use client";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  XCircle,
  Clock,
  AlertTriangle,
  LucideProps,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState, use } from "react";
import { client } from "@/service/client";
import { SeatReservation } from "@/common/types/api-types";
import { getFullDay, getHour } from "@/lib/dateFormat";

interface PageProps {
  searchParams: Promise<{
    statusMP?: string;
    temporalTransactionId?: string;
    preference_id: string;
  }>;
}

type PaymentStatus = "success" | "failure" | "pending";

interface detailDataI {
  movieName: string;
  date: number;
  location: string;
  cinemaName: string;
  seats: SeatReservation[];
  total: number;
  invoiceId:number
invoiceMpId?:string
}

interface contentI {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  subtitle: string;
  color: string;
  showDetails: boolean;
  showNextSteps: boolean;
  showDownloadButton: boolean;
}

export default function PurchaseStatusPage(props: PageProps) {
  const searchParams = use(props.searchParams);
  const statusMP: PaymentStatus =
    (searchParams.statusMP as PaymentStatus) || "success";
  const temporalTransactionId: string | undefined =
    searchParams.temporalTransactionId;
  const preferenceId: string | undefined = searchParams.preference_id;
  const [detaileData, setDetailData] = useState<detailDataI | undefined>(
    undefined
  );

  const [content, setContent] = useState<contentI | undefined>();

  const getStatusContent = async () => {
    switch (statusMP) {
      case "success":
        if (temporalTransactionId) {
          const res = await client.screening.screeningControllerReserveSeat({
            temporalTransactionId,
            preferenceId,
          });
          const { data } = res;
          setDetailData({
            movieName: data.screening.movie.name,
            date: data.screening.startTime,
            location: data.screening.theater.cinema.location,
            cinemaName: data.screening.theater.cinema.name,
            seats: data.seatReservations,
            total: data.invoice.total,
            invoiceId:data.invoice.id,
            invoiceMpId:data.invoice.external_id
          });
        }
        return {
          icon: CheckCircle,
          title: "¡Compra Exitosa!",
          subtitle:
            "Tu compra se ha procesado correctamente. ¡Prepárate para disfrutar del evento!",
          color: "text-colors-success-light",
          showDetails: true,
          showNextSteps: true,
          showDownloadButton: true,
        };
      case "failure":
        return {
          icon: XCircle,
          title: "Error en el Pago",
          subtitle:
            "No pudimos procesar tu pago. Por favor, intenta nuevamente o contacta con soporte.",
          color: "text-red-400",
          showDetails: false,
          showNextSteps: false,
          showDownloadButton: false,
        };
      case "pending":
        return {
          icon: Clock,
          title: "Pago Pendiente",
          subtitle:
            "Tu pago está siendo procesado. Te notificaremos cuando se complete la transacción.",
          color: "text-yellow-400",
          showDetails: true,
          showNextSteps: false,
          showDownloadButton: false,
        };
      default:
        return {
          icon: AlertTriangle,
          title: "Estado Desconocido",
          subtitle:
            "Ha ocurrido un error inesperado. Por favor, contacta con soporte.",
          color: "text-orange-400",
          showDetails: false,
          showNextSteps: false,
          showDownloadButton: false,
        };
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getStatusContent();
      setContent(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const content = getStatusContent();
  console.log("content", content, statusMP);
  if (!content) {
    return <></>;
  }
  const StatusIcon = content.icon;

  return (
    <div className="min-h-screen text-white my-11">
      {/* Decorative background elements - only show for success */}
      {statusMP === "success" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-4 h-4 bg-colors-primary-accent rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-32 right-20 w-3 h-3 bg-colors-primary-clear rounded-full opacity-40 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-40 left-1/4 w-2 h-2 bg-colors-primary-accent rounded-full opacity-50 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-60 right-1/3 w-5 h-5 bg-colors-primary-clear rounded-full opacity-30 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-2xl bg-colors-primary-dark border border-colors-primary-accent/50 rounded-2xl">
        {/* Status Header */}
        <div className={`text-center mb-8 animate-fade-in ${content.color}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-colors-primary-light rounded-full mb-6">
            <StatusIcon className={`w-12 h-12 `} />
          </div>
          <h1 className="text-4xl font-bold  mb-2 text-balance">
            {content.title}
          </h1>
          <p className="text-lg text-white/80 text-pretty">
            {content.subtitle}
          </p>
        </div>

        {/* Purchase Details Card - only show if showDetails is true */}
        {content.showDetails && detaileData && (
          <Card className="mb-8 border-colors-primary-clear/30 shadow-lg  text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Detalles de tu compra
                </h2>
                <span className="text-sm text-white bg-colors-primary-dark px-3 py-1 rounded-full">
                  {detaileData.invoiceMpId || detaileData.invoiceId}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-colors-primary-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-white">
                      {detaileData.movieName}
                    </p>
                    <p className="text-sm text-white/70">
                      {`${getFullDay(
                        new Date(detaileData.date * 1000)
                      )} • ${getHour(new Date(detaileData.date * 1000))}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-colors-primary-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-white">
                      {detaileData.cinemaName}
                    </p>
                    <p className="text-sm text-white/70">
                      {detaileData.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-colors-primary-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-white">
                      {detaileData.seats.length} Asientos
                    </p>
                    <p className="text-sm text-white/70">
                      Sector:{" "}
                      {detaileData.seats.map(
                        (s) => `${s.seat.row}-${s.seat.number} `
                      ).join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-white/20" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">
                  Total {statusMP === "pending" ? "a pagar" : "pagado"}
                </span>
                <span className="text-2xl font-bold ">${detaileData.total}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps - only show for success */}
        {/* content.showNextSteps && (
          <Card className="mb-8 bg-colors-primary-dark text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Próximos pasos
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-colors-primary-accent rounded-full"></div>
                  <p className="text-sm text-white/90">
                    Recibirás un correo de confirmación en los próximos minutos
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-colors-primary-accent rounded-full"></div>
                  <p className="text-sm text-white/90">
                    Descarga tus entradas desde el enlace en el correo
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-colors-primary-accent rounded-full"></div>
                  <p className="text-sm text-white/90">
                    Llega 30 minutos antes del evento con tu entrada impresa o
                    digital
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-colors-primary-accent rounded-full"></div>
                  <p className="text-sm text-white/90">
                    ¡Disfruta del espectáculo!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) */}

        {/* Action Buttons - different based on statusMP */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* statusMP === "success" && content.showDownloadButton && (
            <>
              <Button className="flex-1 bg-colors-primary-accent hover:bg-colors-primary-accent/90 text-colors-primary">
                <Download className="w-4 h-4 mr-2" />
                Descargar Entradas
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-colors-primary-clear text-white hover:bg-colors-primary-clear hover:text-colors-primary bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </>
          ) */}

          {/* statusMP === "failure" && (
            <>
              <Button className="flex-1 bg-colors-primary-accent hover:bg-colors-primary-accent/90 text-colors-primary">
                Intentar Nuevamente
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-colors-primary-clear text-white hover:bg-colors-primary-clear hover:text-colors-primary bg-transparent"
              >
                Contactar Soporte
              </Button>
            </>
          ) */}

          {statusMP === "pending" && (
            <Button className="flex-1 bg-colors-primary-accent hover:bg-colors-primary-accent/90 text-colors-primary">
              Verificar Estado del Pago
            </Button>
          )}
        </div>

        {/* Additional Actions */}
        <div className="text-center">
          <Link href={"/main"}>
            <Button variant="ghost" className="text-white ">
              {statusMP === "success" ? "Ver mis compras" : "Volver al inicio"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
