"use client";

import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const loginUser = useAuthStore((state) => state.login); // Obtiene la acción login del store

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); 

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("DATA",data)
        
        router.push("/main"); 
      } else {
        const data = await response.json();
        setError(
          data.error || "Login fallido. Por favor, verifica tus credenciales."
        );
      }
    } catch (err) {
      setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      console.error("Error de login:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingresa tu email a continuación para iniciar sesión en tu cuenta
          </p>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Contraseña
                </label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500" aria-live="polite">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            >
              Login con Google
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link
              href="#"
              className="underline text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
