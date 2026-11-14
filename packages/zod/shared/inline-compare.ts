// Schema variants over lists and objects: each input written inline, ✓/✗ and why underneath
import './inline-compare.css';
import type { MountContext } from '@/types.ts';
import { select } from './controls.ts';
import { pathText } from './paths.ts';
import { createStage } from './stage.ts';
import { leafText } from './value-view.ts';
import type { Result } from './verdict.ts';
import { codeLine } from './widgets.ts';

/** Kept for its callers: the value view now writes lists and objects inline itself. */
export function inline(v: unknown): string {
  return leafText(v);
}

export interface InlineVariant {
  /** Name in the full view's select. */
  label: string;
  /** The schema in code. */
  code: string;
  schema: { safeParse(input: unknown): Result };
  /** Inputs for this variant; falls back to the config's. */
  inputs?: readonly unknown[];
  /** Replaces the "n of m pass" caption. */
  say?: (passed: number, total: number) => string;
}

export interface InlineConfig {
  variants: readonly InlineVariant[];
  inputs?: readonly unknown[];
  hint?: string;
  /** Card: ms per variant. */
  ms?: number;
  /** Card: how many inputs to show. Default 4. */
  cardRows?: number;
}

function why(r: Result & { success: false }): string {
  const i = r.error.issues[0]!;
  const text = i.message.replace(/^Invalid input: /, '');
  return i.path.length ? `${pathText(i.path)}: ${text}` : text;
}

/** Variants over rows of inputs: cycled in a card, picked in the full view. */
export function inlineCompare(el: HTMLElement, ctx: MountContext, cfg: InlineConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint });
  const code = codeLine(stage.root, '');
  const list = document.createElement('div');
  list.className = 'zd-ic';
  stage.root.append(list);
  const show = (v: InlineVariant): void => {
    code.textContent = v.code;
    const inputs = (v.inputs ?? cfg.inputs ?? []).slice(0, stage.preview ? (cfg.cardRows ?? 4) : undefined);
    list.replaceChildren();
    let passed = 0;
    for (const input of inputs) {
      const r = v.schema.safeParse(input);
      if (r.success) passed++;
      const row = document.createElement('div');
      row.className = 'zd-ic-row';
      row.dataset['ok'] = String(r.success);
      const icon = document.createElement('b');
      icon.textContent = r.success ? '✓' : '✗';
      const inp = document.createElement('div');
      inp.className = 'zd-ic-in';
      inp.textContent = inline(input);
      const out = document.createElement('div');
      out.className = 'zd-ic-out';
      out.textContent = r.success ? (inline(r.data) === inline(input) ? 'accepted as it is' : `→ ${inline(r.data)}`) : why(r as Result & { success: false });
      out.title = out.textContent;
      row.append(icon, inp, out);
      list.append(row);
      if (!stage.disposed) row.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 240 });
    }
    stage.say(v.say ? v.say(passed, inputs.length) : `${passed} of ${inputs.length} pass`, passed === inputs.length ? 'ok' : 'info');
  };
  if (stage.preview) stage.cycle(cfg.variants, cfg.ms ?? 4400, show);
  else if (stage.bar) {
    select(stage.bar, 'Schema', cfg.variants.map((v) => [v, v.label] as const), show);
    show(cfg.variants[0]!);
  }
  return stage.dispose;
}
