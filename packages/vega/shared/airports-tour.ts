// Card tour for the Airports tutorial: a fake pointer visits the busiest airports in turn
import type { View } from 'vega';
import type { Stage } from './stage.ts';

interface Airport {
  x: number;
  y: number;
  traffic?: { flights: number };
}

/**
 * Hovers the `top` busiest airports one after another, every `ms`. Positions come from the
 * airports data set's projected x/y (the geopoint transform's output), which are already in
 * data-rectangle pixels. `onStep` runs after each move (the last step double-clicks there).
 */
export function tourAirports(
  stage: Stage,
  view: View,
  opts: { top?: number; ms?: number; onStep?: (i: number, at: Airport) => void } = {},
): void {
  const ghost = stage.ghost(view);
  const airports = (view.data('airports') as Airport[])
    .filter((a) => a.x != null && a.y != null)
    .sort((a, b) => (b.traffic?.flights ?? 0) - (a.traffic?.flights ?? 0))
    .slice(0, opts.top ?? 14);
  if (!airports.length) return;
  stage.every(opts.ms ?? 1300, (i) => {
    const at = airports[i % airports.length];
    ghost.move(at.x, at.y);
    opts.onStep?.(i, at);
  });
}
