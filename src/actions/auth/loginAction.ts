"use server";

import { COOKIE_AGE } from "@/common/constants/timeConstants";
import { User } from "@/common/types/api-types";
import { client } from "@/service/client";
import { cookies } from "next/headers";

export interface loginStateI {
  error?: string | undefined;
  user?: User;
}

export async function loginAction(
  previiusState: loginStateI,
  formData: FormData
): Promise<loginStateI> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("EMAL:", formData, email, previiusState);
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

      console.log("T", token);
      const cookiesStore = await cookies();
      cookiesStore.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        maxAge: COOKIE_AGE,
      });
      const dataUser = await client.user.userControllerMe({
        headers: { Cookie: `auth_token=${token}` },
      });
      console.log("USER", dataUser.data);
      return {
        user: dataUser.data,
      };
    } else {
      return {
        error: "Login fallido. Por favor, verifica tus credenciales.",
      };
    }
  } catch (err) {
    console.error("Error de login:", err);
    return {
      error: "Login fallido. Por favor, verifica tus credenciales.",
    };
  }
}
