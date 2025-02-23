import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getFaq() {
  return http.get<any>(`${endpoints.faq}`);
}
