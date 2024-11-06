import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const API_URL = "/api"
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
