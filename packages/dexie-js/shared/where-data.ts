// Small sample tables for the WhereClause examples (six rows each, so a card shows them all)

/** Six friends by age: 5, 18, 21, 33, 50, 75. Schema: '++id, name, age'. */
export const AGE_FRIENDS = [
  { name: 'Simon', age: 5 },
  { name: 'Bertil', age: 18 },
  { name: 'Josephine', age: 21 },
  { name: 'Arnold', age: 33 },
  { name: 'Sara', age: 50 },
  { name: 'Per', age: 75 },
];

/** The same name in three casings, plus near misses. Schema: '++id, name'. */
export const CASE_NAMES = ['David', 'david', 'DAVID', 'Davidson', 'Sara', 'Per'].map((name) => ({ name }));

/** Names that start alike in different casings. Schema: '++id, name'. */
export const PREFIX_NAMES = ['Sam', 'Sara', 'sara', 'Simon', 'Per', 'Ulla'].map((name) => ({ name }));

/** The docs' shoe-size records: a valid number, then values that cannot be indexed. Schema: 'id, shoeSize'. */
export const SHOE_SIZES = [
  { id: 1, shoeSize: 9 },
  { id: 2, shoeSize: 10 },
  { id: 3, shoeSize: 11 },
  { id: 4 },
  { id: 5, shoeSize: null },
  { id: 6, shoeSize: 'abc' },
];

/** Friends with tag lists. Schema: '++id, name, *tags'. */
export const TAGGED = [
  { name: 'Josephine', tags: ['sports', 'close-friend'] },
  { name: 'Per', tags: ['cars'] },
  { name: 'Simon', tags: ['pets'] },
  { name: 'Sara', tags: ['close-friend'] },
  { name: 'Arnold', tags: ['sports', 'cars'] },
  { name: 'Elna', tags: ['pets', 'close-friend'] },
];

/** Reads "10, 11, abc" as [10, 11, 'abc']: numbers where they look like numbers. */
export function keyList(text: string): (string | number)[] {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (Number.isNaN(Number(s)) ? s : Number(s)));
}

/** Reads "Sa, Pe" as ['Sa', 'Pe']. */
export function words(text: string): string[] {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
