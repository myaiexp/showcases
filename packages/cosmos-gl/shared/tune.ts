// One slider in full views, the same setting cycled through values in cards
import type { Graph } from '@cosmos.gl/graph';
import type { Stage } from './stage.ts';

export interface Tune {
  label: string;
  min: number;
  max: number;
  step: number;
  /** Starting value (also the first value the caption describes). */
  value: number;
  /** Values a card steps through, in order, looping. */
  cardValues: readonly number[];
  /** Applies a value: written by the example, so its config call stays in main.ts. */
  apply: (v: number) => void;
  /** Caption for a value. */
  say: (v: number) => string;
  /** Milliseconds a card holds each value. */
  hold?: number;
}

/**
 * Adds the slider (full view) or the card cycle. In a full view the graph is re-framed
 * a moment after each change, since the layout has grown or shrunk by then.
 */
export function tune(stage: Stage, graph: Pick<Graph, 'fitView'>, t: Tune): void {
  stage.say(t.say(t.value));
  let timer: ReturnType<typeof setTimeout> | undefined;
  stage.onDispose(() => clearTimeout(timer));
  stage.slider(t.label, t.min, t.max, t.step, t.value, (v) => {
    t.apply(v);
    stage.say(t.say(v));
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!stage.disposed) graph.fitView(600, 0.12);
    }, 2500);
  });
  if (stage.preview) {
    stage.cycle(
      t.cardValues.map((v) => ({ say: t.say(v), run: () => t.apply(v) })),
      t.hold ?? 3000,
    );
  }
}
