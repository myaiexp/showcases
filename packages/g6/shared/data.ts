// The G6 repo's sample datasets, bundled as lazy chunks so cards never fetch
import type { GraphData, TreeData } from '@antv/g6';

/**
 * The docs fetch their data from assets.antv.antgroup.com/g6/<name>.json. The same files
 * live in the G6 repo under packages/g6/__tests__/dataset/ and are vendored with the docs;
 * Vite bundles each as its own chunk, loaded on first use. The docs' graph.json and
 * collection.json are not in the repo: examples that load them use force.json or
 * cluster.json and say so.
 */
const files = import.meta.glob<unknown>('../docs/repo/packages/g6/__tests__/dataset/*.json', { import: 'default' });

export type GraphDataset =
  | 'circular'
  | 'cluster'
  | 'combo'
  | 'dagre'
  | 'dagre-combo'
  | 'element-edges'
  | 'element-nodes'
  | 'force'
  | 'gene'
  | 'language-tree'
  | 'organization-chart'
  | 'parallel-edges'
  | 'radial'
  | 'relations'
  | 'soccer';

export type TreeDataset = 'algorithm-category' | 'decision-tree' | 'file-system' | 'flare';

async function load(name: string): Promise<unknown> {
  const loader = files[`../docs/repo/packages/g6/__tests__/dataset/${name}.json`];
  if (!loader) throw new Error(`no dataset ${name}`);
  // G6 writes layout positions into the objects it gets: every caller gets its own copy.
  return structuredClone(await loader());
}

/** A nodes / edges / combos dataset, as the docs' fetch(...).then(res => res.json()) gives it. */
export const dataset = (name: GraphDataset): Promise<GraphData> => load(name) as Promise<GraphData>;

/** A nested { id, children } tree, for treeToGraphData and the tree layouts. */
export const treeDataset = (name: TreeDataset): Promise<TreeData> => load(name) as Promise<TreeData>;
