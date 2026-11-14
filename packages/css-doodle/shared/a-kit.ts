// Shared scaffolding for the attribute, property and selector examples (batch A)
import type { Mount } from '@/types.ts';
import { button, select } from './controls.ts';
import { createStage, type Stage } from './stage.ts';
import type { CSSDoodle } from './types.ts';

export interface DoodleSpec {
  label?: string;
  code: string;
  attrs?: Record<string, string>;
}

export interface Spec {
  /** One doodle with this code (static, or redrawn when `reroll`). */
  code?: string;
  /** Several doodles side by side, each with an optional label. */
  doodles?: DoodleSpec[];
  /** Code variants of the first doodle: cards cycle them, the full view gets buttons. */
  variants?: { label: string; code: string }[];
  /** Attributes for every doodle. */
  attrs?: Record<string, string>;
  frame?: 'square' | 'wide';
  /** Redraw every doodle with a new seed (cards every 2.4s, full view on a button). */
  reroll?: boolean;
  say?: string;
  hint?: string;
  /** Size doodles in a dashed box (400px, 168px in a card), so percent sizes in the code show. */
  boxed?: boolean;
  /** Hide the full-view editor (the code lives elsewhere, such as in an attribute). */
  noEditor?: boolean;
  /** Text shown under the scene in the full view, for code that is not the element's content. */
  source?: { title: string; text: string };
  /** Extra steps, after the doodles exist. */
  setup?: (stage: Stage, doodles: CSSDoodle[]) => void;
}

/** One redraw for every doodle: a timer in cards, a "New seed" button in the full view. */
export function rerollAll(stage: Stage, doodles: CSSDoodle[], ms = 2400): void {
  if (stage.preview) stage.every(ms, () => doodles.forEach((d) => d.update()));
  else if (stage.bar) button(stage.bar, 'New seed', () => doodles.forEach((d) => d.update()));
}

/**
 * Steps an attribute through `values`: cards every `ms`, the full view through a select.
 * `note` turns the current value into the line under the scene.
 */
export function cycleAttr(
  stage: Stage,
  doodle: CSSDoodle,
  name: string,
  values: readonly string[],
  note: (v: string) => string = (v) => `${name}="${v}"`,
  ms = 2200,
): void {
  let i = 0;
  const show = (n: number): void => {
    i = ((n % values.length) + values.length) % values.length;
    doodle.setAttribute(name, values[i]!);
    stage.say(note(values[i]!));
  };
  show(0);
  if (stage.preview) stage.every(ms, () => show(i + 1));
  else if (stage.bar) {
    const sel = select(stage.bar, name, values.map((v, j) => [j, v] as const), show, 0);
    sel.title = `Values for the ${name} attribute`;
  }
}

/** A small monospace block under the scene in the full view, for code the editor does not hold. */
export function sourceBox(stage: Stage, title: string, text: string): void {
  if (stage.preview) return;
  const box = document.createElement('pre');
  const s = box.style;
  Object.assign(s, { margin: '0', padding: '8px 10px', font: '12px/1.4 monospace', overflow: 'auto', border: '1px solid currentColor', borderRadius: '6px', opacity: '.85' });
  box.textContent = `${title}\n${text}`;
  stage.root.after(box);
}

/** A light panel for page elements that a doodle styles with `cells`. */
export function paper(stage: Stage, id: string, html: string, tag = 'div'): HTMLElement {
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    background: '#f4f1ea',
    color: '#111',
    padding: stage.preview ? '8px' : '16px',
    borderRadius: '8px',
    width: stage.preview ? '176px' : 'min(400px, 86vw)',
    boxSizing: 'border-box',
    lineHeight: '1.5',
    overflow: 'hidden',
  });
  const body = document.createElement(tag);
  body.id = id;
  body.style.margin = '0';
  body.innerHTML = html;
  panel.append(body);
  stage.root.append(panel);
  return body;
}

/** A dashed square the size of a doodle frame; doodles inside it size themselves in percent. */
export function sizeBox(stage: Stage): HTMLElement {
  const box = document.createElement('div');
  const side = stage.preview ? '168px' : 'min(400px, 86vw)';
  Object.assign(box.style, { width: side, height: side, outline: '1px dashed #888', display: 'flex', flexShrink: '0' });
  stage.root.append(box);
  return box;
}

/** An example of plain doodles: see `Spec`. */
export function simple(spec: Spec): Mount {
  return (el, ctx) => {
    const stage = createStage(el, ctx, { hint: spec.hint });
    const list: DoodleSpec[] = spec.doodles ?? [{ code: spec.code ?? spec.variants![0]!.code }];
    const parent = spec.boxed ? sizeBox(stage) : undefined;
    const made = list.map((d, i) => {
      const doodle = stage.doodle(d.code, {
        attrs: { ...spec.attrs, ...d.attrs },
        frame: parent ? 'free' : spec.frame,
        label: d.label,
        parent,
        editor: spec.noEditor ? false : i === 0,
      });
      if (parent) Object.assign(doodle.parentElement!.style, { width: '100%', height: '100%', justifyContent: 'center' });
      return doodle;
    });
    if (spec.source) sourceBox(stage, spec.source.title, spec.source.text);
    if (spec.variants) stage.variants(made[0]!, spec.variants);
    if (spec.reroll) rerollAll(stage, made);
    if (spec.say) stage.say(spec.say);
    spec.setup?.(stage, made);
    return () => stage.dispose();
  };
}
