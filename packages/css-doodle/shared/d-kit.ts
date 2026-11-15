// Batch D scaffolding: shape, plot and tile examples as a spec of doodle code
import type { Mount } from '@/types.ts';
import { button } from './controls.ts';
import { createStage } from './stage.ts';

export interface DSpec {
  /** One doodle (redrawn with a new seed when `reroll`). */
  code?: string;
  /** Code variants of one doodle: cards cycle them, the full view gets a button each. */
  variants?: { label: string; code: string }[];
  /** Doodles side by side (two at most, so a card fits them). */
  doodles?: { label: string; code: string }[];
  frame?: 'square' | 'wide' | 'free';
  /** Doodle code for cards only, for code that would fetch or draw too slowly in a card. */
  cardCode?: string;
  /** Redraw with a new seed: cards every 2.4s, the full view on a button. */
  reroll?: boolean;
  say?: string;
}

export function show(spec: DSpec): Mount {
  return (el, ctx) => {
    const stage = createStage(el, ctx);
    const first = spec.variants?.[0]?.code ?? spec.code!;
    const list = spec.doodles ?? [{ label: '', code: first }];
    const made = list.map((d, i) => {
      const code = i === 0 && stage.preview && spec.cardCode ? spec.cardCode : d.code;
      return stage.doodle(code, { frame: spec.frame, label: spec.doodles ? d.label : undefined });
    });
    // The docs' snippets assume a white page and the gallery is dark, so give the doodle paper
    // unless the @grid line already sets a color.
    made.forEach((d, i) => {
      const own = /@grid:[^;]*\/[^;]*\/[^;]+;|:doodle\s*\{[^}]*background/.test(list[i]!.code);
      if (!own) d.style.backgroundColor = '#f4f1ea';
    });
    if (spec.variants) stage.variants(made[0]!, spec.variants);
    if (spec.reroll) {
      if (stage.preview) stage.every(2400, () => made.forEach((d) => d.update()));
      else if (stage.bar) button(stage.bar, 'New seed', () => made.forEach((d) => d.update()));
    }
    if (spec.say) stage.say(spec.say);
    return () => stage.dispose();
  };
}
