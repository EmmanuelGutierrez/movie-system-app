
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { client } from "@/service/client";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const backendResponse = await client.auth.authControllerLogin({
      email,
      password,
    });

    if (!backendResponse.data) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: backendResponse.status }
      );
    }

    const { token } = backendResponse.data;

    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30,
      path: "/",
    });
    client.setSecurityData(token);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error en la ruta API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
