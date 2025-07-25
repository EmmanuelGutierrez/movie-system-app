import { Api } from "@/common/types/api-types";

console.log(process.env)
export const client = new Api({ baseURL:process.env.BACKEND_URL, });
