// Sample hierarchy and network data for the treeLayout and forceLayout examples

/** Dotted paths of a small code base; the ancestor 'app.core' is not listed, so it is imputed. */
export const modules = [
  { name: 'app', size: 1 },
  { name: 'app.core.router', size: 4 },
  { name: 'app.core.store', size: 6 },
  { name: 'app.ui', size: 2 },
  { name: 'app.ui.button', size: 3 },
  { name: 'app.ui.menu', size: 5 },
  { name: 'app.ui.menu.item', size: 2 },
  { name: 'app.data', size: 3 },
  { name: 'app.data.cache', size: 2 },
  { name: 'app.data.client', size: 4 },
];

/** The same shape as explicit id/parentId rows. */
export const org = [
  { id: 'ceo', parentId: null, label: 'CEO' },
  { id: 'eng', parentId: 'ceo', label: 'Eng' },
  { id: 'ops', parentId: 'ceo', label: 'Ops' },
  { id: 'web', parentId: 'eng', label: 'Web' },
  { id: 'api', parentId: 'eng', label: 'API' },
  { id: 'ml', parentId: 'eng', label: 'ML' },
  { id: 'it', parentId: 'ops', label: 'IT' },
  { id: 'hr', parentId: 'ops', label: 'HR' },
];

export interface Person {
  id: string;
  group: string;
}

export const people: readonly Person[] = Array.from({ length: 18 }, (_, i) => ({ id: `p${i}`, group: ['red', 'blue', 'green'][i % 3]! }));

export interface Tie {
  from: string;
  to: string;
  weight: number;
}

/** Ties mostly inside a group, a few across. */
export const ties: readonly Tie[] = people.flatMap((p, i) => {
  const out: Tie[] = [];
  const same = people[(i + 3) % 18]!;
  out.push({ from: p.id, to: same.id, weight: 1 });
  if (i % 4 === 0) out.push({ from: p.id, to: people[(i + 7) % 18]!.id, weight: 0.4 });
  return out;
});
