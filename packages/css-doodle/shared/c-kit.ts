// Batch C scaffolding: an example is a spec of one doodle, code variants, or labelled doodles
import type { Mount } from '@/types.ts';
import { button } from './controls.ts';
import { createStage, type Stage } from './stage.ts';
import type { CSSDoodle } from './types.ts';

export interface CSpec {
  /** One doodle (redrawn with a new seed when `reroll`). */
  code?: string;
  /** Code variants of one doodle: cards cycle them, the full view gets a button each. */
  variants?: { label: string; code: string }[];
  /** Doodles side by side (two at most, so a card fits them). */
  doodles?: { label: string; code: string; attrs?: Record<string, string> }[];
  attrs?: Record<string, string>;
  frame?: 'square' | 'wide' | 'free';
  /** Backdrop behind the doodle: a color, or false for none. Default: paper white, unless the code sets its own. */
  bg?: string | false;
  /** Redraw with a new seed: cards every 2.4s, the full view on a button. */
  reroll?: boolean;
  say?: string;
  /** A small block under the scene in the full view, for code the editor does not hold. */
  source?: { title: string; text: string };
  /** Extra steps once the doodles exist. */
  setup?: (stage: Stage, doodles: CSSDoodle[]) => void;
}

function sourceBox(stage: Stage, title: string, text: string): void {
  if (stage.preview) return;
  const box = document.createElement('pre');
  Object.assign(box.style, { margin: '0', padding: '8px 10px', font: '12px/1.4 monospace', overflow: 'auto', border: '1px solid currentColor', borderRadius: '6px', opacity: '.85' });
  box.textContent = `${title}\n${text}`;
  stage.root.after(box);
}

export function show(spec: CSpec): Mount {
  return (el, ctx) => {
    const stage = createStage(el, ctx);
    const list = spec.doodles ?? [{ label: '', code: spec.code ?? spec.variants?.[0]?.code ?? '' }];
    const made = list.map((d, i) =>
      stage.doodle(d.code, {
        attrs: { ...spec.attrs, ...d.attrs },
        frame: spec.frame,
        label: spec.doodles ? d.label : undefined,
        editor: i === 0 && !(spec.attrs && 'use' in spec.attrs),
      }),
    );
    // The docs' snippets assume a white page; the gallery is dark, so give the doodle paper.
    made.forEach((d, i) => {
      const own = /@grid:[^;]*\/[^;]*\/[^;]+;|:doodle\s*\{[^}]*background/.test(list[i]!.code);
      if (spec.bg !== false && !own) d.style.backgroundColor = spec.bg ?? '#f4f1ea';
    });
    if (spec.source) sourceBox(stage, spec.source.title, spec.source.text);
    if (spec.variants) stage.variants(made[0]!, spec.variants);
    if (spec.reroll) {
      if (stage.preview) stage.every(2400, () => made.forEach((d) => d.update()));
      else if (stage.bar) button(stage.bar, 'New seed', () => made.forEach((d) => d.update()));
    }
    if (spec.say) stage.say(spec.say);
    spec.setup?.(stage, made);
    return () => stage.dispose();
  };
}
