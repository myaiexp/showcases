// Specification/Config/Data/Triggers helpers: re-render one spec under several modes
import type { Spec, View } from 'vega';
import { select } from './controls.ts';
import type { Stage } from './stage.ts';

export interface ModesOptions<M extends string> {
  /** Label of the select in the full view. */
  label: string;
  /** Milliseconds between modes in cards; default 2600. */
  ms?: number;
  /** Runs after each render (cards and full view), e.g. to start a ghost walk on the new view. */
  each?: (view: View, mode: M) => void;
}

export interface Modes {
  /** The view of the mode now showing. */
  view(): View;
}

/**
 * For config-like examples whose settings are fixed at parse time: renders `make(mode)`, and swaps
 * to the next mode by finalizing the view and rendering a fresh one. Cards step through the modes on
 * a timer; the full view gets a select in the control bar. The previous view is finalized first, so
 * its listeners go with it.
 */
export async function modes<M extends string>(
  stage: Stage,
  names: readonly M[],
  make: (mode: M) => Spec,
  opts: ModesOptions<M>,
): Promise<Modes> {
  let current: View | null = null;
  let token = 0;
  const show = async (mode: M): Promise<void> => {
    const mine = ++token;
    current?.finalize();
    stage.options.container.replaceChildren();
    stage.options.bind.replaceChildren();
    const view = await stage.render(make(mode));
    if (mine !== token || stage.disposed) return;
    current = view;
    opts.each?.(view, mode);
  };
  await show(names[0] as M);
  if (stage.preview) {
    stage.every(opts.ms ?? 2600, (i) => show(names[i % names.length] as M));
  } else if (stage.bar) {
    select(stage.bar, opts.label, names, names[0] as M, (m) => void show(m));
  }
  return {
    view: () => {
      if (!current) throw new Error('modes: no view yet');
      return current;
    },
  };
}
