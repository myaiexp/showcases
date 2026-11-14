// Tone.Loop: interval sets the repeat length and iterations says how many times to fire
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const INTERVALS = ['4n', '8n', '16n'] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  view.layout(4, 4);
  let interval: string = '8n';
  let iterations = 4;
  let n = 0;

  return stage.run({
    build: () => {
      const synth = blip();
      const t = Tone.getTransport();
      const ppq = t.PPQ;
      const loop = new Tone.Loop((time) => {
        n++;
        const count = n;
        synth.triggerAttackRelease('A5', '32n', time);
        const beat = t.getTicksAtTime(time) / ppq;
        stage.show(time, () => {
          view.mark(beat, String(count), 0);
          caption.textContent = `fired ${count} of ${iterations}`;
        });
      }, '8n');
      follow(stage, t, (beat) => view.head(beat));
      return { synth, loop };
    },
    play: ({ loop }, time) => {
      const t = Tone.getTransport();
      n = 0;
      loop.set({ interval, iterations });
      loop.start(0);
      const label = `interval '${interval}', iterations ${iterations}`;
      stage.show(time, () => {
        view.clearMarks();
        caption.textContent = label;
      });
      t.start(time);
      return (end) => t.stop(end);
    },
    variants: INTERVALS.map((i) => ({
      label: `interval ${i}`,
      apply: () => void (interval = i),
    })),
    controls: (_, bar) => {
      select(bar, 'interval', INTERVALS, (v) => (interval = v), '8n');
      slider(bar, 'iterations', 1, 16, 1, 4, (v) => (iterations = v), String);
      const hint = document.createElement('span');
      hint.textContent = 'Both apply on the next Play.';
      hint.style.cssText = 'font-size:12px;color:var(--fg-3)';
      bar.append(hint);
    },
    dispose: ({ synth, loop }) => {
      loop.dispose();
      synth.dispose();
    },
  });
};

export default mount;
