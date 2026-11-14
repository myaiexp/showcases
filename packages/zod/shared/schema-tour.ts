// Several schema variants run over the same inputs: cycled in cards, picked in the full view
import type { Stage } from './stage.ts';
import { select } from './controls.ts';
import { sampleRows, type Row } from './rows.ts';
import { codeLine } from './widgets.ts';
import type { Result } from './verdict.ts';

export interface Variant {
  /** Menu text in the full view. */
  label: string;
  /** The schema in code, shown above the rows. */
  code: string;
  schema: { safeParse(input: unknown): Result };
  /** Inputs for this variant only; falls back to the tour's. */
  inputs?: readonly unknown[];
  /** What to say once the rows are drawn; defaults to a pass count. */
  say?: string | ((passed: number, total: number) => string);
}

export interface TourOptions {
  inputs?: readonly unknown[];
  /** A card has room for about six rows: the inputs to use there instead. */
  cardInputs?: readonly unknown[];
  inTitle?: string;
  outTitle?: string;
  types?: boolean;
  /** Show output values for passing rows (default) or just the tick. */
  showOutput?: boolean;
  /** Card: ms per variant. */
  ms?: number;
  /** Words for the pass count, e.g. "prices". Default "inputs". */
  noun?: string;
  /** Per-input note shown after the verdict. */
  note?: (input: unknown, result: Result, variant: Variant) => string | undefined;
}

/** Draws a code line and one row per input; shows variant `i` through the returned function. */
export function schemaTour(stage: Stage, variants: readonly Variant[], opts: TourOptions): (i: number) => void {
  const code = codeLine(stage.root, '');
  const rows = sampleRows(stage.root, stage, { types: opts.types, inTitle: opts.inTitle, outTitle: opts.outTitle ?? 'Output', showOutput: opts.showOutput });
  const show = (v: Variant): void => {
    code.textContent = v.code;
    const inputs = v.inputs ?? (stage.preview && opts.cardInputs ? opts.cardInputs : opts.inputs) ?? [];
    const results: Row[] = inputs.map((input) => {
      const result = v.schema.safeParse(input);
      return { input, result, note: opts.note?.(input, result, v) };
    });
    rows.show(results);
    const passed = results.filter((r) => r.result.success).length;
    const said = typeof v.say === 'function' ? v.say(passed, results.length) : v.say;
    stage.say(said ?? `${passed} of ${results.length} ${opts.noun ?? 'inputs'} pass`, passed === results.length ? 'ok' : passed === 0 ? 'bad' : 'warn');
  };
  const at = stage.cycle(variants, opts.ms ?? 4000, (v) => show(v));
  if (stage.bar && variants.length > 1) {
    select(stage.bar, 'Schema', variants.map((v, i) => [i, v.label] as const), (i) => at(i));
  }
  return at;
}
