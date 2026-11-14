// Tone.Sequence: nested arrays split a step into faster steps, and null is a rest
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, flash } from '../../shared/widgets.ts';

type Tmpl = (string | null | Tmpl)[];
interface Step {
  note: string;
  id: number;
}
const SHAPES: { label: string; tmpl: Tmpl }[] = [
  { label: 'flat', tmpl: ['C4', 'E4', 'G4', 'E4'] },
  { label: 'nested', tmpl: ['C4', ['E4', 'G4'], 'E4', ['G4', 'B4', 'C5']] },
  { label: 'rests', tmpl: ['C4', [null, 'E4'], ['G4', null, 'E4'], null] },
];

/** The events array Sequence wants: every note becomes an object with a cell id. */
function toEvents(t: Tmpl, next = { n: 0 }): Step[] {
  return t.map((e) => (Array.isArray(e) ? toEvents(e, next) : e === null ? null : { note: e, id: next.n++ })) as Step[];
}
const textOf = (t: Tmpl): string => `[${t.map((e) => (Array.isArray(e) ? textOf(e) : e === null ? 'null' : e)).join(', ')}]`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const holder = document.createElement('div');
  holder.style.cssText = 'display:flex;flex:1 1 auto;min-height:44px;width:100%;gap:4px';
  stage.visual.append(holder);
  let cells: HTMLElement[] = [];
  let cur = SHAPES[0]!;

  const draw = (t: Tmpl): void => {
    cells = [];
    const build = (items: Tmpl, parent: HTMLElement): void => {
      for (const e of items) {
        const box = document.createElement('div');
        box.style.cssText = 'flex:1 1 0;display:flex;gap:4px;min-width:0';
        if (Array.isArray(e)) build(e, box);
        else {
          box.style.cssText += `;align-items:center;justify-content:center;border-radius:6px;font:600 12px ui-monospace,monospace;color:var(--fg-1);border:1px ${e === null ? 'dashed' : 'solid'} var(--border);background:var(--bg-surface)`;
          box.textContent = e ?? 'rest';
          if (e !== null) cells.push(box);
        }
        parent.append(box);
      }
    };
    holder.replaceChildren();
    build(t, holder);
  };

  return stage.run({
    build: () => {
      const synth = blip();
      const seq = new Tone.Sequence((time, step: Step) => {
        synth.triggerAttackRelease(step.note, '16n', time);
        stage.show(time, () => cells[step.id] && flash(cells[step.id]!, 0.3));
      }, toEvents(SHAPES[0]!.tmpl), '4n');
      return { synth, seq };
    },
    play: ({ seq }, time) => {
      const shape = cur;
      seq.events = toEvents(shape.tmpl);
      seq.start(0);
      stage.show(time, () => {
        draw(shape.tmpl);
        caption.textContent = textOf(shape.tmpl);
      });
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: SHAPES.map((s) => ({ label: s.label, apply: () => void (cur = s) })),
    controls: (_, bar) => {
      const sel = document.createElement('select');
      for (const s of SHAPES) sel.add(new Option(s.label, s.label));
      sel.addEventListener('change', () => (cur = SHAPES.find((s) => s.label === sel.value) ?? cur));
      bar.append('Shape (applies on the next Play) ', sel);
    },
    dispose: ({ synth, seq }) => {
      seq.dispose();
      synth.dispose();
    },
  });
};

export default mount;
