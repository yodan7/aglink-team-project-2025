import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// オブジェクトのキーをスネークケースからキャメルケースに変換するユーティリティ関数
export function supabaseToCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(supabaseToCamelCase) as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      (acc as Record<string, unknown>)[camelKey] = supabaseToCamelCase(value);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
}
