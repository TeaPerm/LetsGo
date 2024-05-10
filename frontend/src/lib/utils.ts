import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { OrderData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = "http://localhost:3000";

export function convertDate(timestamp: string) : string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formats a numeric price value into a string representation using a dot as a thousands separator and a comma as a decimal separator.
 *
 * @param {number} price - The price value to be formatted.
 * @returns {string} - A formatted string representation of the price with dots as thousands separators and a comma as a decimal separator.
 */

export function formatPriceForints(price : Number) : string {
  if (!price && price !== 0) return "";
  const [integerPart, decimalPart] = price.toFixed(2).split(".");
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let formattedDecimalPart = decimalPart || "0";
  formattedDecimalPart = formattedDecimalPart.replace(/0+$/, ''); // Remove trailing zeros
  if (formattedDecimalPart === '') {
    return formattedIntegerPart + " Ft";
  } else {
    return formattedIntegerPart + "," + formattedDecimalPart + " Ft";
  }
}

export const productCategoryTypes : string[] = [
  "Star Wars",
  "Disney",
  "BIONICLE",
  "Harry Potter",
  "Batman",
  "Indiana Jones",
  "Ninjago",
  "Minecraft",
  "Technic",
  "Architecture",
  "Ideas",
];

export function calculateTotalOrders(orders: OrderData[]): number {
  if(!orders){
    return 0;
  }
  let total: number = 0;
  for (const orderData of orders) {
      total += orderData.order.total;
  }
  return total;
}