import { Api } from "@/common/types/api-types";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
export const client = new Api({
  baseURL: process.env["BACKEND_URL"] ?? process.env["NEXT_PUBLIC_BACKEND_URL"],
  withCredentials: true,
  secure:true,
  // headers: {
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImVtYWlsIjoibWFudTJAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NDE1NDU4NiwiZXhwIjoxNzU0MTU4MTg2fQ.cc5ijAANH1FudFPOlTK_hj4XylRhxeboOdf15FP6wyo",
  // },
  securityWorker: (token: string | null) => {
    return {
      headers: { Authorization: token ? `Bearer ${token}` : token },
    };
  },
});
