// SQL helpers for the Atlas prop examples: counts and rows by predicate
import type { Coordinator } from '@uwdata/mosaic-core';
import { rows } from './mosaic-kit.ts';

/** Rows of `table` for which the SQL expression `predicate` holds (all rows when it is null). */
export async function countRowsWhere(coordinator: Coordinator, table: string, predicate: string | null): Promise<number> {
  const where = predicate ? ` WHERE ${predicate}` : '';
  const [first] = await rows<{ n: number }>(coordinator, `SELECT count(*)::INTEGER AS n FROM "${table}"${where}`);
  return first?.n ?? 0;
}

/** The first `limit` rows of `table` under `predicate`, as plain objects. */
export function rowsWhere<T>(coordinator: Coordinator, table: string, predicate: string | null, columns = '*', limit = 5): Promise<T[]> {
  const where = predicate ? ` WHERE ${predicate}` : '';
  return rows<T>(coordinator, `SELECT ${columns} FROM "${table}"${where} LIMIT ${limit}`);
}
