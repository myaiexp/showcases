// Transport swing and swingSubdivision: hats pushed late, drawn against the straight grid
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, hatAt, kickAt, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

type Sub = '8n' | '16n';
const CASES: { label: string; swing: number; sub: Sub }[] = [
  { label: 'straight', swing: 0, sub: '8n' },
  { label: 'swing 0.5', swing: 0.5, sub: '8n' },
  { label: 'swing 1', swing: 1, sub: '8n' },
  { label: '16n swing 0.5', swing: 0.5, sub: '16n' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 2, 4);
  view.layout(4, 1);
  let cur = CASES[0]!;
  let lastBar = -1;
  let hatId = -1;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      t.scheduleRepeat((time) => kickAt(d, time), '4n', 0);
      return d;
    },
    play: (d, time) => {
      const t = Tone.getTransport();
      const c = cur;
      t.swing = c.swing;
      t.swingSubdivision = c.sub;
      const ppq = t.PPQ;
      // The dots are read from the callback's time, so a swung hat sits visibly off the grid.
      hatId = t.scheduleRepeat((at) => {
        hatAt(d, at);
        const beat = t.getTicksAtTime(at) / ppq;
        stage.show(at, () => {
          const bar = Math.floor(beat / 4);
          if (bar !== lastBar) view.clearMarks();
          lastBar = bar;
          view.mark(beat % 4, '', 1, '#ff8fb1');
        });
      }, c.sub, 0);
      stage.show(time, () => {
        lastBar = -1;
        caption.textContent = `swing ${c.swing} on ${c.sub}`;
      });
      t.start(time);
      return (end) => t.stop(end);
    },
    stop: () => Tone.getTransport().clear(hatId),
    variants: CASES.map((c) => ({ label: c.label, apply: () => void (cur = c) })),
    controls: (_, bar) =>
      slider(bar, 'swing', 0, 1, 0.05, 0, (v) => (Tone.getTransport().swing = v), (v) => v.toFixed(2)),
  });
};

export default mount;
