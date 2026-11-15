// A made-up source tree as flat path rows and parent-id rows
import { rng } from './random.ts';

export interface FileRow {
  name: string;
  size: number;
}

export interface NodeRow {
  id: string;
  parentId: string | null;
  size: number | null;
}

const layout: Record<string, Record<string, number>> = {
  core: { scene: 8, scales: 6, marks: 14, layout: 5, runtime: 7 },
  marks: { line: 6, bar: 5, dot: 4, area: 5, text: 3, rule: 2 },
  spatial: { hexbin: 4, contour: 5, voronoi: 3, delaunay: 3 },
  render: { svg: 9, canvas: 7, export: 3 },
  tooltip: { model: 3, portal: 4 },
};

/** Leaf rows named `app.<group>.<file>`, with sizes jittered by a seed. */
export function sourceFiles(seed = 3): FileRow[] {
  const random = rng(seed);
  return Object.entries(layout).flatMap(([group, files]) =>
    Object.entries(files).map(([file, size]) => ({ name: `app.${group}.${file}`, size: Math.round(size * (0.7 + random() * 0.6) * 10) })),
  );
}

/** The same files as explicit parent references; the root and groups carry no size. */
export function sourceNodes(seed = 3): NodeRow[] {
  const rows: NodeRow[] = [{ id: 'app', parentId: null, size: null }];
  for (const group of Object.keys(layout)) rows.push({ id: `app/${group}`, parentId: 'app', size: null });
  for (const f of sourceFiles(seed)) {
    const [, group, file] = f.name.split('.');
    rows.push({ id: `app/${group}/${file}`, parentId: `app/${group}`, size: f.size });
  }
  return rows;
}

/** Two levels deeper: every file gets two or three functions. */
export function deepFiles(seed = 9): FileRow[] {
  const random = rng(seed);
  return sourceFiles(seed).flatMap((f) => {
    const parts = 2 + Math.floor(random() * 2);
    const cuts = Array.from({ length: parts }, () => 0.3 + random());
    const total = cuts.reduce((s, c) => s + c, 0);
    return cuts.map((c, i) => ({ name: `${f.name}.fn${i + 1}`, size: Math.max(1, Math.round((f.size * c) / total)) }));
  });
}
