import { Api } from "@/common/types/api-types";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
export const client = new Api({
  baseURL: process.env["BACKEND_URL"] ?? process.env["NEXT_PUBLIC_BACKEND_URL"],
  withCredentials: true,
  secure:true,
  securityWorker: (token: string | null) => {
    return {
      headers: { Authorization: token ? `Bearer ${token}` : token },
    };
  },
});
