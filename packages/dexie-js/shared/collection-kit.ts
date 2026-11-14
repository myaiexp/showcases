// Collection example helpers: sample tables, highlight-and-list, row walking
import type { Collection } from 'dexie';
import { AGE_COL, ID_COL, type Demo } from './demo.ts';
import type { Column, Row } from './table-view.ts';

/** Friends with a shoe size, six rows. Schema: 'id, name, age, shoeSize'. */
export const SHOE_FRIENDS: Row[] = [
  { id: 1, name: 'Josephine', age: 21, shoeSize: 38 },
  { id: 2, name: 'Per', age: 75, shoeSize: 44 },
  { id: 3, name: 'Simon', age: 5, shoeSize: 28 },
  { id: 4, name: 'Sara', age: 50, shoeSize: 40 },
  { id: 5, name: 'Ulla Bella', age: 87, shoeSize: 36 },
  { id: 6, name: 'Elna', age: 99, shoeSize: 42 },
];

/** A name and age as one chip. */
export const nameAge = (r: Row): string => `${r.name} ${r.age}`;

/** Highlights the rows in the grid (by `id`) and lists them, in the order given, on the right. */
export function pick(d: Demo, rows: readonly Row[], text: (r: Row) => string = nameAge): void {
  d.view.mark(rows.map((r) => r.id));
  d.out.list(rows.map(text));
}

/** Lights up the given ids one after another, like a collection being walked row by row. */
export async function walk(d: Demo, ids: readonly unknown[], gap = 380): Promise<void> {
  for (let i = 1; i <= ids.length; i++) {
    d.view.mark(ids.slice(0, i), 'hit');
    await d.stage.wait(gap);
  }
}

/** Rows of a log table: one entry a day, ending on a fixed "today" (2026-11-14). */
export function logRows(days: number): Row[] {
  return Array.from({ length: days }, (_, i) => ({
    id: i + 1,
    date: new Date(2026, 10, 14 - (days - 1 - i)),
    text: ['login', 'saved', 'sync', 'error', 'logout', 'login', 'saved', 'sync'][i % 8],
  }));
}

/** Columns of the shoe-size friends: a card shows name, age and shoe size only. */
export const shoeCols = (preview: boolean): Column[] =>
  preview
    ? [{ field: 'name' }, { field: 'age', width: '2.6em' }, { field: 'shoeSize', label: 'shoe', width: '2.6em' }]
    : [ID_COL, { field: 'name' }, AGE_COL, { field: 'shoeSize', label: 'shoe', width: '3.4em' }];

/** Six people, three of them named Angela. Schema: 'id, firstName, lastName, age'. */
export const PEOPLE_ROWS: Row[] = [
  { id: 1, firstName: 'Angela', lastName: 'Merkel', age: 70 },
  { id: 2, firstName: 'Angela', lastName: 'Davis', age: 80 },
  { id: 3, firstName: 'Angela', lastName: 'Bassett', age: 66 },
  { id: 4, firstName: 'David', lastName: 'Fahlander', age: 48 },
  { id: 5, firstName: 'Per', lastName: 'Persson', age: 75 },
  { id: 6, firstName: 'Sara', lastName: 'Merkel', age: 50 },
];

export const peopleCols = (preview: boolean): Column[] =>
  preview
    ? [{ field: 'firstName', label: 'first' }, { field: 'lastName', label: 'last' }]
    : [ID_COL, { field: 'firstName', label: 'first' }, { field: 'lastName', label: 'last' }, AGE_COL];

/** The first row of each distinct value of `field`, in the order given. */
export function firstOfEach(rows: readonly Row[], field: string): Row[] {
  const seen = new Set<unknown>();
  return rows.filter((r) => !seen.has(r[field]) && seen.add(r[field]));
}

/** collection.desc(), which the published type definitions leave out (reverse() has the same effect). */
export const desc = <T extends Collection>(c: T): T => (c as unknown as { desc(): T }).desc();
