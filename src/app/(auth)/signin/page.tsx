import { LoginForm } from "@/components/loginForm/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex  min-h-screen items-center justify-center">
      <div className="flex gap-y-4 flex-col w-130 bg-colors-primary-clear/20 rounded-md p-6">
        <h1 className="text-center text-2xl">Login</h1>
        <LoginForm />
        <div className="mx-auto">
          <p className="text-sm font-light">
            ¿No tienes una cuenta?{" "}
            <Link
              href="#"
              className=" text-colors-primary-light font-bold no-underline"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
