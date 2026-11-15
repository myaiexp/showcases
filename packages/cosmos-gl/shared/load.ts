// Group lookups (points, links of a group) and keeping a layout in frame
import type { Graph } from '@cosmos.gl/graph';
import type { GraphData } from './data.ts';
import type { Stage } from './stage.ts';

/** Indices of the points whose group is `g`. */
export function pointsOf(data: GraphData, g: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < data.count; i++) if (data.group[i] === g) out.push(i);
  return out;
}

/** Indices of the links whose two ends are both in group `g`. */
export function linksWithin(data: GraphData, g: number): number[] {
  const out: number[] = [];
  for (let l = 0; l < data.links.length / 2; l++) {
    if (data.group[data.links[l * 2] ?? 0] === g && data.group[data.links[l * 2 + 1] ?? 0] === g) out.push(l);
  }
  return out;
}

/**
 * Keeps a spreading layout in frame: cards refit on a timer (stage.refit); a full view
 * fits once, after the layout has settled, since the init fit only sees the start scatter.
 */
export function keepFramed(stage: Stage, graph: Graph, ms = 2500): void {
  stage.refit(graph, ms);
  if (!stage.preview) stage.after(ms, () => graph.fitView(600, 0.12));
}
