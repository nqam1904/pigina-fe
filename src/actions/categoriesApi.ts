import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getCateogry(slug: string) {
  return http.get<any>(`${endpoints.categories}&filters[slug]=${slug}`);
}
