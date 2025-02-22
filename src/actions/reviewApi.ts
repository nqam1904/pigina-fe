import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getReview() {
  return http.get<any>(`${endpoints.review}`);
}
