// One chart stepped through named states: a select in full view, a loop in cards
import { mountChart } from '@tanstack/charts';
import type { ChartHost, ChartHostOptions } from '@tanstack/charts';
import { select } from './controls.ts';
import type { Stage } from './stage.ts';

type AnyOptions = ChartHostOptions<any, any, any>;

export interface LabOptions<S> {
  /** Container for the chart; the stage's first box by default. */
  box?: HTMLElement;
  /** Label of the select in the full view. */
  label: string;
  ariaLabel: string;
  states: readonly (readonly [S, string])[];
  /** Builds the whole definition for one state (the transform runs inside). */
  build: (state: S) => AnyOptions['definition'];
  /** Milliseconds each state stays in a card. */
  ms?: number;
  /** Runs after each state is shown (readouts, captions). */
  after?: (state: S, name: string) => void;
}

export interface Lab {
  host: ChartHost<any, any, any>;
  show: (i: number) => void;
}

/** One chart whose definition is rebuilt per state: a select in the full view, a loop in a card. */
export function lab<S>(stage: Stage, o: LabOptions<S>): Lab {
  const options = (state: S): AnyOptions => ({ definition: o.build(state), height: stage.height, ariaLabel: o.ariaLabel });
  const host = stage.own(mountChart(o.box ?? stage.box, options(o.states[0]![0])));
  const show = stage.cycle(o.states, o.ms ?? 2200, ([state, name], i) => {
    if (i > 0 || stage.preview) host.update(options(state));
    o.after?.(state, name);
  });
  if (stage.bar) {
    // State names often start with the label already ("anchor: 'top-right'"): don't print it twice.
    const label = o.states.every(([, name]) => name.startsWith(o.label)) ? '' : o.label;
    select(stage.bar, label, o.states.map(([, name], i) => [i, name] as const), show);
  }
  return { host, show };
}
