// Mosaic helpers for the Mosaic-view examples: SQL rows, Selection counts
import type { Coordinator, Selection } from '@uwdata/mosaic-core';

/** Runs a SELECT through the coordinator and returns its rows as plain objects. */
export async function rows<T>(coordinator: Coordinator, sql: string): Promise<T[]> {
  const table = await coordinator.query(sql);
  return table.toArray() as unknown as T[];
}

/** Rows of `table` that pass `selection` (all rows when it has no clause), via one SQL count. */
export async function countRows(coordinator: Coordinator, table: string, selection?: Selection | null): Promise<number> {
  const predicate = selection?.predicate(null);
  const list = Array.isArray(predicate) ? predicate : predicate ? [predicate] : [];
  const where = list.length ? ` WHERE ${list.map((p) => `(${String(p)})`).join(' AND ')}` : '';
  const [first] = await rows<{ n: number }>(coordinator, `SELECT count(*)::INTEGER AS n FROM "${table}"${where}`);
  return first?.n ?? 0;
}
