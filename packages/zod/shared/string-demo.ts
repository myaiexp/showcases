// Strings kit: a typed-text demo and a schema-variants-over-inputs demo
import type * as z from 'zod';
import type { MountContext } from '@/types.ts';
import { select } from './controls.ts';
import { textField, typeLoop } from './field.ts';
import { sampleRows } from './rows.ts';
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

export interface Variant {
  /** Name in the full view's select. */
  label: string;
  /** The schema in code. */
  code: string;
  schema: z.ZodType;
  /** Inputs for this variant; falls back to the config's. */
  inputs?: readonly unknown[];
  /** Replaces the "n of m pass" caption. */
  say?: (passed: number, total: number) => string;
}

export interface CompareConfig {
  variants: readonly Variant[];
  inputs?: readonly unknown[];
  types?: boolean;
  /** Column title for the outputs. */
  outTitle?: string;
  /** Show passing outputs (default) or only ✓. */
  showOutput?: boolean;
  /** Card: ms per variant. */
  ms?: number;
  hint?: string;
}

/** Variants of a schema (select in the full view, cycled in a card) over rows of inputs. */
export function compareDemo(el: HTMLElement, ctx: MountContext, cfg: CompareConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint });
  const code = codeLine(stage.root, '');
  const rows = sampleRows(stage.root, stage, { types: cfg.types, outTitle: cfg.outTitle ?? 'Output', showOutput: cfg.showOutput });
  const show = (v: Variant): void => {
    code.textContent = v.code;
    const results = (v.inputs ?? cfg.inputs ?? []).map((input) => ({ input, result: v.schema.safeParse(input) }));
    rows.show(results);
    const passed = results.filter((r) => r.result.success).length;
    stage.say(v.say ? v.say(passed, results.length) : `${passed} of ${results.length} pass`, passed === results.length ? 'ok' : 'info');
  };
  if (stage.preview) stage.cycle(cfg.variants, cfg.ms ?? 4400, show);
  else if (stage.bar) {
    select(stage.bar, 'Schema', cfg.variants.map((v) => [v, v.label] as const), show);
    show(cfg.variants[0]!);
  }
  return stage.dispose;
}
