// Small data builders and a rebuild helper for the Graph, Data and Element examples
import type { Graph, GraphData, IElementEvent, LayoutOptions } from '@antv/g6';
import { button, readout } from './controls.ts';
import { releaseShortcuts, type Stage } from './graph.ts';

/** n nodes placed on a circle, joined in a ring: fixed positions, so no layout is needed. */
export function ring(n: number, prefix = 'n', radius = 100): Required<Pick<GraphData, 'nodes' | 'edges'>> {
  const nodes = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { id: `${prefix}${i}`, style: { x: Math.cos(a) * radius, y: Math.sin(a) * radius } };
  });
  const edges = nodes.map((node, i) => ({ source: node.id, target: nodes[(i + 1) % n]!.id }));
  return { nodes, edges };
}

/**
 * Options such as zoom, x, y, rotation and devicePixelRatio are read once, when the graph is
 * created. To show them changing, destroy the graph and build another on the same container.
 * `make` returns an unrendered graph; calls are queued so a slider drag cannot overlap them.
 */
export function rebuildable(stage: Stage, make: () => Graph) {
  let current: Graph | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  stage.onCleanup(() => {
    if (current && !current.destroyed) { releaseShortcuts(current); current.destroy(); }
  });
  const rebuild = (): Promise<Graph> => {
    const next = queue.then(async () => {
      if (!stage.alive) return current!;
      if (current && !current.destroyed) { releaseShortcuts(current); current.destroy(); }
      current = make();
      await current.render();
      return current;
    });
    queue = next.catch(() => undefined);
    return next;
  };
  return { rebuild, get graph() { return current; } };
}

/** Five people on a ring, with business fields under `data` and ids on the edges. */
export function people(): GraphData {
  const rows = [
    ['alice', 'Admin'],
    ['bob', 'User'],
    ['carol', 'User'],
    ['dave', 'Guest'],
    ['erin', 'User'],
  ] as const;
  const nodes = rows.map(([name, role], i) => {
    const a = (i / rows.length) * Math.PI * 2 - Math.PI / 2;
    return { id: name, data: { name, role }, style: { x: Math.cos(a) * 110, y: Math.sin(a) * 90 } };
  });
  const pairs = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]] as const;
  const edges = pairs.map(([s, t], i) => ({
    id: `e${i + 1}`,
    source: nodes[s]!.id,
    target: nodes[t]!.id,
    data: { relationship: i % 2 ? 'colleague' : 'friend' },
  }));
  return { nodes, edges };
}

export type Hierarchy = 'tree' | 'combo';

/** A three-level tree (children ids on nodes) or nested combos (combo ids on nodes). */
export function hierarchy(kind: Hierarchy): { data: GraphData; ids: string[] } {
  if (kind === 'tree') {
    const kids: Record<string, string[]> = { root: ['a', 'b'], a: ['a1', 'a2'], b: ['b1'], a1: ['a1x', 'a1y'] };
    const nodes = ['root', 'a', 'b', 'a1', 'a2', 'b1', 'a1x', 'a1y'].map((id) => ({ id, children: kids[id] ?? [] }));
    const edges = nodes.flatMap((n) => n.children.map((c) => ({ source: n.id, target: c })));
    return { data: { nodes, edges }, ids: nodes.map((n) => n.id) };
  }
  const at = (id: string, combo: string, x: number, y: number) => ({ id, combo, style: { x, y } });
  const nodes = [at('n1', 'sub', 40, 60), at('n2', 'sub', 100, 100), at('n3', 'alpha', 40, 190), at('n4', 'beta', 300, 70), at('n5', 'beta', 370, 130), at('n6', 'org', 200, 290)];
  const combos = [{ id: 'org' }, { id: 'alpha', combo: 'org' }, { id: 'sub', combo: 'alpha' }, { id: 'beta', combo: 'org' }];
  return { data: { nodes, edges: [{ source: 'n2', target: 'n4' }], combos }, ids: [...nodes.map((n) => n.id), ...combos.map((c) => c.id)] };
}

/** Compact JSON for a read-out line; `style` is dropped because layout writes positions into it. */
export const json = (value: unknown): string => JSON.stringify(value, (k, v) => (k === 'style' ? undefined : v));

/** The ids of every node, edge and combo currently in the graph. */
export function allIds(graph: Graph): string[] {
  return [...graph.getNodeData(), ...graph.getEdgeData(), ...graph.getComboData()].map((d) => String(d.id));
}

/** Gives each listed id one state and strips every state from all other elements. */
export function mark(graph: Graph, marks: Record<string, string>): Promise<void> {
  const next: Record<string, string[]> = {};
  for (const id of allIds(graph)) next[id] = marks[id] ? [marks[id]!] : [];
  return graph.setElementState(next, false);
}

/**
 * Click an element (full view) or step through `ids` on a timer (card). `query` is the API call
 * under demonstration: it returns the ids it found, which are highlighted, and a text line.
 */
export async function probe(
  stage: Stage,
  graph: Graph,
  el: HTMLElement,
  ids: string[] | (() => string[]),
  query: (id: string) => { found: string[]; text: string },
): Promise<void> {
  const out = stage.bar ? readout(el) : null;
  const apply = async (id: string): Promise<void> => {
    const { found, text } = query(id);
    if (out) out.textContent = text;
    await mark(graph, { ...Object.fromEntries(found.map((f) => [f, 'highlight'])), [id]: 'selected' });
  };
  if (stage.bar) {
    if (out) out.textContent = 'Click a node, edge or combo.';
    for (const type of ['node', 'edge', 'combo']) {
      graph.on(`${type}:click`, (e: IElementEvent) => void apply(String(e.target.id)));
    }
  } else {
    const list = (): string[] => (typeof ids === 'function' ? ids() : ids);
    await apply(list()[0]!);
    stage.every(1300, (i) => apply(list()[i % list().length]!));
  }
}

export interface CallResult {
  /** Ids to highlight afterwards, usually what a query returned. */
  found?: string[];
  text?: string;
}
export interface Call {
  label: string;
  run: () => CallResult | void | Promise<CallResult | void>;
}

/**
 * One button per call in the full view; the card runs them in turn. Each call is the API
 * under demonstration, written in the example. After it runs the graph is drawn and the ids
 * it found are highlighted, so the effect shows with or without a read-out.
 */
export function callList(stage: Stage, graph: Graph, el: HTMLElement, calls: Call[], opts: { mark?: boolean } = {}): void {
  const out = stage.bar ? readout(el) : null;
  const go = async (call: Call): Promise<void> => {
    const res = (await call.run()) ?? {};
    await graph.draw();
    // Examples about states turn the highlighting off, since it would overwrite what they show.
    if (opts.mark !== false) await mark(graph, Object.fromEntries((res.found ?? []).map((id) => [id, 'highlight'])));
    if (out) out.textContent = `${call.label}${res.text ? `\n-> ${res.text}` : ''}`;
  };
  if (stage.bar) for (const call of calls) button(stage.bar, call.label, () => void go(call));
  else stage.every(1500, (i) => go(calls[i % calls.length]!));
}

/** Layout for each hierarchy: a top-down tree, or none (combos wrap their members where they sit). */
export const hierarchyLayout = (kind: Hierarchy): LayoutOptions | undefined =>
  kind === 'tree'
    ? { type: 'compact-box', direction: 'TB', getHeight: () => 30, getWidth: () => 30, getVGap: () => 36, getHGap: () => 24 }
    : undefined; // combo nodes carry their own positions, so no layout moves them

/** Swaps the graph over to the tree or the combo dataset and returns its ids. */
export async function loadHierarchy(graph: Graph, kind: Hierarchy): Promise<string[]> {
  const { data, ids } = hierarchy(kind);
  graph.setOptions({ layout: hierarchyLayout(kind) });
  graph.setData(data);
  await graph.render();
  return ids;
}
