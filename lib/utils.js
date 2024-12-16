// A utility for constructing className strings conditionally
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// twMerge('px-2 py-1 bg-red-500', 'px-3 bg-blue-500')
// returns 'py-1 px-3 bg-blue-500'
// Note: later classes override earlier ones

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
