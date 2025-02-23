import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getBlog(type: string = "news") {
  return http.get<any>(`${endpoints.blog}&filters[type]=${type}`);
}

export async function getBlogDetail(slug: string) {
  return http.get<any>(`${endpoints.blog}&filters[slug]=${slug}`);
}
