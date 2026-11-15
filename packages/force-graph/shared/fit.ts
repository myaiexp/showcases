// Card helper: keep a graph fitted to its pane while the layout is still moving
import type { ForceGraphGeneric } from 'force-graph';

type AnyGraph = ForceGraphGeneric<any, any, any>;

/**
 * Fits the view now and then while the engine runs (every `every` ticks) and once more when it
 * stops. For cards whose data keeps changing, so the engine never rests long enough for a
 * single `onEngineStop` fit to land before the next change.
 */
export function keepFitted(graph: AnyGraph, padding = 14, every = 15): void {
  let ticks = 0;
  graph
    .onEngineTick(() => {
      if (++ticks % every === 0) graph.zoomToFit(250, padding);
    })
    .onEngineStop(() => graph.zoomToFit(400, padding));
}
