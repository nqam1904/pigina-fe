import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getListProduct() {
  return http.get<any>(`${endpoints.products}`);
}
export async function getProductBySlug(slug: string) {
  return http.get<any>(`${endpoints.products}&filters[slug]=${slug}`);
}
export async function  getProductByCategory(name: string) {
  return http.get<any>(
    `${endpoints.products}&filters[category][title]=${name}`
  );
}
