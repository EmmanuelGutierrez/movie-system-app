"use server";

import { User } from "@/common/types/api-types";
import { client } from "@/service/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface loginStateI {
  error?: string | undefined;
  user?: User;
}

export async function loginAction(
  previiusState: loginStateI,
  formData: FormData
): Promise<loginStateI> {
  console.log("auth act");
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      return {
        error: "Ingrese email y contraseña",
      };
    }
    console.log("A");
    const response = await client.auth.authControllerLogin({
      email,
      password,
    });
    console.log("B");
    if (response.data) {
      const token = response.data.token;
      // console.log(cookies().getAll())
      cookies().set({ name: "auth_token", value: token, httpOnly: true,sameSite:"lax",domain:"http://localhost:3000" });
     
    } else {
      return {
        error: "Login fallido. Por favor, verifica tus credenciales.",
      };
    }
  } catch (err) {
    console.error("Error de login:", err);
    return {
      error: "Ocurriós un error inesperado. Por favor, inténtalo de nuevo.",
    };
  }

  redirect("/main");
}
