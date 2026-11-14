// Renames the keys of nested data between snake_case and camelCase
type Json = unknown;

const rename = (obj: Json, change: (key: string) => string): Json => {
  if (Array.isArray(obj)) return obj.map((item) => rename(item, change));
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [change(key), rename(value, change)]));
  }
  return obj;
};

export const snakeToCamel = (obj: Json): Json => rename(obj, (key) => key.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase()));

export const camelToSnake = (obj: Json): Json => rename(obj, (key) => key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`));

/** An object as one line per key, nested keys indented. */
export function keyLines(value: Json, depth = 0): string[] {
  if (value === null || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, v]) =>
    v !== null && typeof v === 'object' ? [`${'  '.repeat(depth)}${key}`, ...keyLines(v, depth + 1)] : [`${'  '.repeat(depth)}${key}: ${String(v)}`],
  );
}
