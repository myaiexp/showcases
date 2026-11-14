// Event probability: a Loop that only fires some of the time it is scheduled to
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, hatAt, lane, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 2, 8);
  view.layout(8, 4);
  let p = 1;
  let slots = 0;
  let fired = 0;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      const ppq = t.PPQ;
      // The slots: a quiet hat that always plays, so the misses are audible as gaps.
      const grid = new Tone.Loop((time) => {
        hatAt(d, time);
        slots++;
        const beat = t.getTicksAtTime(time) / ppq;
        stage.show(time, () => view.mark(beat, '', 0, '#4a5678'));
      }, '8n');
      const hits = new Tone.Loop((time) => {
        pingAt(d, 'E5', time);
        fired++;
        const [f, s] = [fired, slots];
        const beat = t.getTicksAtTime(time) / ppq;
        stage.show(time, () => {
          view.mark(beat, '', 1, '#ff8fb1');
          caption.textContent = `${f} of ${s} slots fired`;
        });
      }, '8n');
      return { d, grid, hits };
    },
    play: ({ grid, hits }, time) => {
      slots = 0;
      fired = 0;
      hits.probability = p;
      grid.start(0);
      hits.start(0);
      const label = `probability ${p}`;
      stage.show(time, () => {
        view.clearMarks();
        caption.textContent = label;
      });
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: [1, 0.6, 0.25].map((v) => ({ label: `probability ${v}`, apply: () => void (p = v) })),
    controls: ({ hits }, bar) =>
      slider(bar, 'probability', 0, 1, 0.05, 1, (v) => ((p = v), (hits.probability = v)), (v) => v.toFixed(2)),
    dispose: ({ d, grid, hits }) => {
      grid.dispose();
      hits.dispose();
      for (const n of Object.values(d)) n.dispose();
    },
  });
};

export default mount;
