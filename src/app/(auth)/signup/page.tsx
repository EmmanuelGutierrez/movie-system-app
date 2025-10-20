"use client";
import { useEffect, useState } from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useDotsLoading } from "@/hooks/useDotsLoaging";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import Link from "next/link";

const formSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "El nombre es obligatorio" }),
  lastname: Joi.string()
    .required()
    .messages({ "string.empty": "El apellido es obligatorio" }),
  birthday: Joi.date()
    .less("now")
    .required()
    .custom((value, helpers) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 13) {
        return helpers.error("date.minAge");
      }
      return value;
    })
    .messages({
      "date.base": "La fecha debe ser valida.",
      "date.less": "La fecha no puede ser en el futuro.",
      "date.minAge": "Debe tener al menos 13 años para registrarte.",
      "any.required": "La fecha de nacimiento es obligatoria",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{8,15}$/)
    .required()
    .messages({
      "any.required": "El telefono es obligatorio",
      "string.empty": "El telefono es obligatorio",
      "string.pattern.base":
        "El telefono es debe ser un numero valido de 8 a 15 digitos",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email es obligatorio",
    "string.email": "Debe ser un email valido",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Za-z]/, "letters")
    .pattern(/[0-9]/, "nunmber")
    .required()
    .messages({
      "string.empty": "La contraseña es obligatoria.",
      "string.min": "La contraseña debe tener 8 caracteres como minimo.",
      "string.pattern.name": "Debe poseer letras y numero",
    }),
});
type formSchemaType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthday: Date;
  phone: string;
};

export default function SignUpPage() {
  //   const [serverError, setServerError] = useState<string>();
  const form = useForm<formSchemaType>({
    resolver: joiResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      birthday: new Date(),
      lastname: "",
      name: "",
      password: "",
      email: "",
      phone: "",
    },
  });
  const loadingText = useDotsLoading("Registrando");
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    const errors = form.formState.errors;
    console.log("ERRORS", errors);
    if (Object.keys(errors).length) {
      Object.values(errors).forEach((e) => {
        toast.error("Error en el formulario", {
          description: <p className="text-colors-white">{e.message}</p>,
          duration: 100000,
        });
      });
    }
  }, [form.formState.errors]);

  const onSubmit = (formData: formSchemaType) => {
    console.log("DATOS", formData);
    toast.success("Registro exitoso");
  };

  return (
    <div className="flex  min-h-screen items-center justify-center">
      <div className="flex gap-y-4 flex-col w-130 bg-colors-primary border border-colors-primary-accent/15 rounded-md p-6">
        <Logo />
        <h1 className="text-center text-2xl font-bold">Registro</h1>
        <div className={`mx-auto w-full max-w-sm `}>
          {/* <div className="space-y-1 text-center"></div>
          <div className="">
            <form className="space-y-4"></form>
          </div> */}
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("name")}
                        placeholder="Tu nombre"
                        className={
                          form.formState.errors.name
                            ? "border-colors-danger focus-visible:ring-colors-danger"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("lastname")}
                        className={
                          form.formState.errors.lastname
                            ? "border-colors-danger focus-visible:ring-colors-danger"
                            : ""
                        }
                        placeholder="Tu apellido"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("email")}
                        className={
                          form.formState.errors.email
                            ? "border-colors-danger focus-visible:ring-colors-danger"
                            : ""
                        }
                        placeholder="correo@correo.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("password")}
                        className={
                          form.formState.errors.password
                            ? "border-colors-danger focus-visible:ring-colors-danger"
                            : ""
                        }
                        type="password"
                        placeholder="Tu contraseña"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={` pl-3 text-left font-normal
                              ${!field.value && ""}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(value) => {
                            setCalendarOpen(false);
                            field.onChange(value);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, "");
                          field.onChange(onlyNums);
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        type="tel"
                        className={
                          form.formState.errors.phone
                            ? "border-colors-danger focus-visible:ring-colors-danger"
                            : ""
                        }
                        placeholder="Tu numero de telefono"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full mt-5">
                {form.formState.isSubmitting ? loadingText : "Registrarse"}
              </Button>
            </form>
          </Form>
          <p>
            Ya tienes cuenta? <Link href={"/login"}>Inicia sesion</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
