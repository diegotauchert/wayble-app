import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import debounce from 'lodash/debounce';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debouncePromise = <T>(fn: () => Promise<T>, wait: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    debounce(() => {
      fn().then(resolve).catch(reject);
    }, wait)();
  });
};