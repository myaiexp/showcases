// Tone.Part add, remove and at: change which notes a running part plays
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { flash, pads } from '../../shared/widgets.ts';

interface Hit {
  note: string;
  slot: number;
}
// Eight eighth-note slots in one bar; slot i is at beat i / 2.
const timeOf = (slot: number): string => `0:${Math.floor(slot / 2)}:${(slot % 2) * 2}`;
const BASE = ['C4', '', 'E4', '', 'G4', '', 'E4', ''];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const grid = pads(stage.visual, BASE.map(() => ''), 8);
  let model = BASE.slice();
  const render = (m: readonly string[]): void => m.forEach((n, i) => (grid.pads[i]!.textContent = n || '·'));
  render(model);
  type G = { synth: Tone.Synth; part: Tone.Part };
  const edits: { label: string; run: (g: G) => void }[] = [
    { label: 'original', run: () => undefined },
    {
      label: "add('0:0:2', 'B4')",
      run: ({ part }) => (part.add(timeOf(1), { note: 'B4', slot: 1 }), (model[1] = 'B4')),
    },
    {
      label: "remove('0:2')",
      run: ({ part }) => (part.remove(timeOf(4)), (model[4] = '')),
    },
    {
      label: "at('0', 'A4')",
      run: ({ part }) => (part.at(timeOf(0), { note: 'A4', slot: 0 }), (model[0] = 'A4')),
    },
  ];

  return stage.run({
    build: (): G => {
      model = BASE.slice();
      const synth = blip();
      const part = new Tone.Part(
        (time, hit: Hit) => {
          synth.triggerAttackRelease(hit.note, '8n', time);
          stage.show(time, () => flash(grid.pads[hit.slot]!, 0.3));
        },
        BASE.flatMap((note, slot): [string, Hit][] => (note ? [[timeOf(slot), { note, slot }]] : [])),
      );
      part.set({ loop: true, loopEnd: '1m' });
      part.start(0);
      return { synth, part };
    },
    play: (_, time) => {
      // Capture what the grid should show: variants are all rendered before any plays.
      const snap = model.slice();
      stage.show(time, () => render(snap));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: edits.map((e) => ({
      label: e.label,
      apply: (g: G) => {
        e.run(g);
      },
    })),
    controls: (g, bar) => {
      const edit = (i: number): void => {
        edits[i]!.run(g);
        render(model);
      };
      button(bar, "add('0:0:2', 'B4')", () => edit(1));
      button(bar, "remove('0:2')", () => edit(2));
      button(bar, "at('0', 'A4')", () => edit(3));
      button(bar, 'put it back', () => {
        g.part.clear();
        model = BASE.slice();
        BASE.forEach((note, slot) => note && g.part.add(timeOf(slot), { note, slot }));
        render(model);
      });
    },
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
