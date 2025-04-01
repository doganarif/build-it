import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and optimizes them with tailwind-merge
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Combined and optimized class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
} 