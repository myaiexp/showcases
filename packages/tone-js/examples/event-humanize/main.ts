// Event humanize: the time handed to a callback drifts a little, like a human player
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, lane, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

type Amount = boolean | string;
const CASES: { label: string; value: Amount }[] = [
  { label: 'off', value: false },
  { label: "'32n'", value: '32n' },
  { label: "'16n'", value: '16n' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 2, 4);
  view.layout(4, 1);
  let value: Amount = false;
  let lastBar = -1;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      const ppq = t.PPQ;
      const loop = new Tone.Loop((time) => {
        pingAt(d, 'E5', time);
        const beat = t.getTicksAtTime(time) / ppq;
        stage.show(time, () => {
          const bar = Math.floor(beat / 4);
          if (bar !== lastBar) {
            view.clearMarks();
            // Row 0 is the perfect grid; row 1 is where the notes really landed.
            for (let i = 0; i < 8; i++) view.mark(i / 2, '', 0, '#4a5678');
          }
          lastBar = bar;
          view.mark(beat % 4, '', 1, '#ff8fb1');
        });
      }, '8n');
      return { d, loop };
    },
    play: ({ loop }, time) => {
      loop.humanize = value;
      // Start a beat in: a humanized note can land a little early, never before time 0.
      loop.start('0:1');
      const label = `humanize: ${typeof value === 'string' ? `'${value}'` : value}`;
      stage.show(time, () => {
        lastBar = -1;
        caption.textContent = label;
      });
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: CASES.map((c) => ({ label: `humanize ${c.label}`, apply: () => void (value = c.value) })),
    controls: ({ loop }, bar) =>
      select(bar, 'humanize', ['off', 'true', '32n', '16n'], (v) => {
        value = v === 'off' ? false : v === 'true' ? true : v;
        loop.humanize = value;
      }),
    dispose: ({ d, loop }) => {
      loop.dispose();
      for (const n of Object.values(d)) n.dispose();
    },
  });
};

export default mount;
