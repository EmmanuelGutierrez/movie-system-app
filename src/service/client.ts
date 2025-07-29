import { Api } from "@/common/types/api-types";


export const client = new Api({ baseURL:process.env.BACKEND_URL, });
