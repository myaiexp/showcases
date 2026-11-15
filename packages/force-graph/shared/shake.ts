// Card and demo helper: throw the nodes to random places with no momentum, ready for a reheat
import type { ForceGraphGeneric } from 'force-graph';

type AnyGraph = ForceGraphGeneric<any, any, any>;

/** Moves every node to a random spot within ±`spread` of the origin and zeroes its velocity. */
export function scramble(graph: AnyGraph, spread = 150): void {
  for (const n of graph.graphData().nodes) {
    n.x = (Math.random() * 2 - 1) * spread;
    n.y = (Math.random() * 2 - 1) * spread;
    n.vx = 0;
    n.vy = 0;
  }
}
