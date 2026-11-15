// Strings kit: a typed-text demo, and schema variants over inputs on their own stage
import type * as z from 'zod';
import type { MountContext } from '@/types.ts';
import { textField, typeLoop } from './field.ts';
import { sampleRows } from './rows.ts';
import { schemaTour, type TourOptions, type Variant } from './schema-tour.ts';
import { createStage } from './stage.ts';
import { codeLine } from './widgets.ts';

export interface TypedConfig {
  /** The schema in code, shown above the field. */
  code: string;
  schema: z.ZodType;
  /** Texts shown in the list under the field (and as one-click tries in the full view). */
  samples: readonly string[];
  hint?: string;
  label?: string;
  placeholder?: string;
  /** Words after ✓, e.g. "a valid IPv4 address". */
  okText?: string;
  /** Texts the card types out. Default: the first three samples. */
  typed?: readonly string[];
  /** Show the parsed output in the list (for schemas that change the text). */
  showOutput?: boolean;
  /** How many list rows a card shows. Default 4. */
  cardRows?: number;
}

/** A text field checked on every keystroke, plus the samples sorted in a list. */
export function typedDemo(el: HTMLElement, ctx: MountContext, cfg: TypedConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint ?? 'Type anything: it is checked on every keystroke.' });
  codeLine(stage.root, cfg.code);
  const field = textField(stage.root, stage, { label: cfg.label, placeholder: cfg.placeholder, tries: cfg.samples });
  field.onInput((text) => {
    if (!text) return field.state(null, 'Type something');
    const r = cfg.schema.safeParse(text);
    if (r.success) field.state(true, `✓ ${cfg.okText ?? 'valid'}`);
    else field.state(false, `✗ ${r.error.issues[0]!.message}`);
  });
  field.state(null, 'Type something');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Sample', showOutput: cfg.showOutput ?? false });
  const shown = stage.preview ? cfg.samples.slice(0, cfg.cardRows ?? 4) : cfg.samples;
  rows.show(shown.map((input) => ({ input, result: cfg.schema.safeParse(input) })));
  typeLoop(stage, field, cfg.typed ?? cfg.samples.slice(0, 3));
  return stage.dispose;
}

export interface CompareConfig extends TourOptions {
  variants: readonly Variant[];
  hint?: string;
}

/** Variants of a schema (select in the full view, cycled in a card) over rows of inputs. */
export function compareDemo(el: HTMLElement, ctx: MountContext, cfg: CompareConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint });
  schemaTour(stage, cfg.variants, cfg);
  return stage.dispose;
}
