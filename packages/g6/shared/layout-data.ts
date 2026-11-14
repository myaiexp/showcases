// Small seeded datasets and a re-layout helper shared by the Layout section examples
import type { BaseLayoutOptions, EdgeData, Graph, GraphData, NodeData } from '@antv/g6';
import { select, slider, toggle } from './controls.ts';
import type { Stage } from './graph.ts';

/** Deterministic pseudo-random numbers, so a layout example looks the same on every visit. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** A ring of `n` nodes with `chords` extra seeded edges across it. */
export function ringGraph(n: number, chords = 0, seed = 7): GraphData {
  const rnd = seeded(seed);
  const nodes: NodeData[] = Array.from({ length: n }, (_, i) => ({ id: `n${i}` }));
  const edges: EdgeData[] = Array.from({ length: n }, (_, i) => ({ id: `r${i}`, source: `n${i}`, target: `n${(i + 1) % n}` }));
  for (let k = 0; k < chords; k++) {
    const a = Math.floor(rnd() * n);
    const b = (a + 2 + Math.floor(rnd() * (n - 3))) % n;
    edges.push({ id: `c${k}`, source: `n${a}`, target: `n${b}` });
  }
  return { nodes, edges };
}

/** A random-looking tree of `n` nodes (each node hangs off an earlier one), as a graph. */
export function treeGraph(n: number, seed = 3): GraphData {
  const rnd = seeded(seed);
  const nodes: NodeData[] = Array.from({ length: n }, (_, i) => ({ id: `t${i}`, data: { level: 0 } }));
  const edges: EdgeData[] = [];
  for (let i = 1; i < n; i++) {
    const parent = Math.floor(rnd() * i * 0.8);
    edges.push({ id: `te${i}`, source: `t${parent}`, target: `t${i}` });
  }
  return { nodes, edges };
}

/** `groups` dense clusters of `per` nodes, joined by one edge between neighbouring clusters. */
export function clusterGraph(groups: number, per: number): GraphData {
  const names = 'abcdefgh';
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];
  for (let g = 0; g < groups; g++) {
    for (let i = 0; i < per; i++) {
      nodes.push({ id: `${names[g]}${i}`, data: { cluster: names[g] } });
      if (i > 0) edges.push({ id: `${names[g]}e${i}`, source: `${names[g]}0`, target: `${names[g]}${i}` });
      if (i > 1) edges.push({ id: `${names[g]}f${i}`, source: `${names[g]}${i - 1}`, target: `${names[g]}${i}` });
    }
    if (g > 0) edges.push({ id: `bridge${g}`, source: `${names[g - 1]}0`, target: `${names[g]}0` });
  }
  return { nodes, edges };
}

/** A straight chain `0 - 1 - ... - n-1`. */
export function chainGraph(n: number): GraphData {
  return {
    nodes: Array.from({ length: n }, (_, i) => ({ id: `${i}` })),
    edges: Array.from({ length: n - 1 }, (_, i) => ({ id: `ch${i}`, source: `${i}`, target: `${i + 1}` })),
  };
}

/**
 * Merges `patch` into the example's own layout object, hands a copy to setLayout (which does
 * not run the layout) and runs it. Mutating `layout` keeps every option the example set.
 */
export async function relayout(
  graph: Graph,
  layout: BaseLayoutOptions,
  patch: Record<string, unknown>,
  fit = true,
): Promise<void> {
  Object.assign(layout, patch);
  graph.setLayout({ ...layout });
  await graph.layout();
  if (fit) await graph.fitView();
}

type Patch = Record<string, unknown>;

/** Full view: a select that patches one layout option. Card: steps through the same values. */
export function selectOption<T extends string>(
  stage: Stage,
  graph: Graph,
  layout: BaseLayoutOptions,
  key: string,
  values: readonly T[],
  init: T,
  ms = 2000,
): void {
  if (stage.bar) select(stage.bar, key, values, init, (v) => relayout(graph, layout, { [key]: v }));
  else stage.every(ms, (i) => relayout(graph, layout, { [key]: values[i % values.length] }));
}

/** Full view: a slider that patches one layout option. Card: steps through `cardValues`. */
export function sliderOption(
  stage: Stage,
  graph: Graph,
  layout: BaseLayoutOptions,
  key: string,
  range: readonly [number, number, number],
  init: number,
  cardValues: readonly number[],
  ms = 1800,
): void {
  if (stage.bar) slider(stage.bar, key, range, init, (v) => relayout(graph, layout, { [key]: v }));
  else stage.every(ms, (i) => relayout(graph, layout, { [key]: cardValues[i % cardValues.length] }));
}

/** Full view: a checkbox choosing between two option patches. Card: alternates them. */
export function toggleOption(
  stage: Stage,
  graph: Graph,
  layout: BaseLayoutOptions,
  label: string,
  on: Patch,
  off: Patch,
  init: boolean,
  ms = 2200,
): void {
  if (stage.bar) toggle(stage.bar, label, init, (v) => relayout(graph, layout, v ? on : off));
  else stage.every(ms, (i) => relayout(graph, layout, (i % 2 === 1) !== init ? on : off));
}

/** `n` nodes that carry a seeded `data.value` in 0-100, with `m` seeded edges (the docs' grid and mds data, minus Math.random). */
export function valueGraph(n: number, m: number, seed = 11): GraphData {
  const rnd = seeded(seed);
  return {
    nodes: Array.from({ length: n }, (_, i) => ({ id: `node-${i}`, data: { value: Math.round(rnd() * 100) } })),
    edges: Array.from({ length: m }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(rnd() * n)}`,
      target: `node-${(Math.floor(rnd() * (n - 1)) + 1 + i) % n}`,
    })),
  };
}

/** What d3-force callbacks receive for a node: the simulation datum, with G6's node data under `_original`. */
export interface D3Node {
  _original: NodeData;
}

/** What d3-force callbacks receive for an edge: both ends are simulation nodes. */
export interface D3Edge {
  source: D3Node;
  target: D3Node;
}
