"use client";

import type React from "react";

// import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";
import { Button } from "../ui/button";
import { loginAction } from "@/actions/auth/loginAction";
// import { useFormState } from "react-dom";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useAppStore } from "@/hooks/useAppStore";
import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
// import { useFormState } from "react-dom";

export const LoginForm = ({
  className,
}: {
  className?: HTMLAttributes<HTMLElement>["className"];
}) => {
  const [state, formAction] = useFormState(loginAction, {});
  const router = useRouter();
  const pathname = usePathname();

  const authStore = useAuthStore((state) => state);
  const appStore = useAppStore((state) => state);

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setError(null);

  //     /* try {
  //       const response = await fetch("/api/auth/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("DATA", data);

  //         router.push("/main");
  //       } else {
  //         const data = await response.json();
  //         setError(
  //           data.error || "Login fallido. Por favor, verifica tus credenciales."
  //         );
  //       }
  //     } catch (err) {
  //       setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
  //       console.error("Error de login:", err);
  //     } */
  //   };
  useEffect(() => {
    console.log("USER EFFECT", !!state.user, !!authStore, !!appStore);
    if (state.user && authStore && appStore) {
      authStore.login(state.user);
      if (pathname === "/signin" || !appStore.showLoginForm) {
        router.push("/main");
      } else {
        appStore.toggleShowLoginForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);
  /* 
  rounded-lg border border-colors-primary-light/40 bg-colors-primary-dark p-6 shadow-lg
  */
  return (
    <div className={`mx-auto w-full max-w-sm  ${className}`}>
      <div className="space-y-1 text-center">
        {/* <h1 className="text-2xl font-bold ">Login</h1>
        <p className="text-sm ">
          Ingresa tu email a continuación para iniciar sesión en tu cuenta
        </p> */}
      </div>
      <div className="">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2  shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="password" className="block text-sm font-medium ">
                Contraseña
              </label>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              required
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          {state.error && (
            <p className="text-sm text-red-500" aria-live="polite">
              {state.error}
            </p>
          )}
          <Button type="submit" className="self-center w-full ">
            Login
          </Button>
        </form>
        {/*  <div className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="#" className="underline text-colors-primary-light">
            Regístrate
          </Link>
        </div> */}
      </div>
    </div>
  );
};
