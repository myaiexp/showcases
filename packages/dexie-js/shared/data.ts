// Sample records for the Dexie examples: friends (names from the docs), people

export interface Friend {
  id?: number;
  name: string;
  age: number;
  [prop: string]: unknown;
}

/** The Hello World page's four friends, then more of the same shape. */
export const FRIENDS: readonly Friend[] = [
  { name: 'Josephine', age: 21 },
  { name: 'Per', age: 75 },
  { name: 'Simon', age: 5 },
  { name: 'Sara', age: 50 },
  { name: 'Ulla Bella', age: 87 },
  { name: 'Elna', age: 99 },
  { name: 'Magdalena', age: 54 },
  { name: 'Arnold', age: 33 },
  { name: 'Bertil', age: 18 },
  { name: 'Camilla', age: 27 },
  { name: 'David', age: 42 },
  { name: 'Kate', age: 89 },
];

/** Friends with the extra fields the docs' query examples use. */
export const FRIENDS_RICH: readonly Friend[] = [
  { name: 'Josephine', age: 21, shoeSize: 7, tags: ['sports', 'close-friend'] },
  { name: 'Per', age: 75, shoeSize: 10, tags: ['cars'] },
  { name: 'Simon', age: 5, shoeSize: 4, tags: ['pets'] },
  { name: 'Sara', age: 50, shoeSize: 8, tags: ['close-friend'] },
  { name: 'Arnold', age: 33, shoeSize: 11, tags: ['sports', 'cars'] },
  { name: 'Camilla', age: 27, shoeSize: 6, tags: [] },
  { name: 'Elna', age: 99, shoeSize: 5, tags: ['pets', 'close-friend'] },
];

/** First and last names, for compound-index examples. */
export const PEOPLE: readonly { firstName: string; lastName: string; age: number }[] = [
  { firstName: 'Angela', lastName: 'Merkel', age: 70 },
  { firstName: 'Angela', lastName: 'Davis', age: 80 },
  { firstName: 'Angela', lastName: 'Bassett', age: 66 },
  { firstName: 'David', lastName: 'Fahlander', age: 48 },
  { firstName: 'Per', lastName: 'Persson', age: 75 },
  { firstName: 'Sara', lastName: 'Merkel', age: 50 },
];

/** Picks the next item of `list` each call, looping. */
export function cycler<T>(list: readonly T[]): () => T {
  let i = 0;
  return () => list[i++ % list.length]!;
}
