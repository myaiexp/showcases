// schedule vs scheduleOnce: one event on a looping Transport fires every lap or just once
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, follow, kickAt, lane, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel, flash } from '../../shared/widgets.ts';

const KINDS = ['schedule', 'scheduleOnce'] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 6 });
  const count = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  view.layout(4, 4);
  const spot = view.mark(2, 'alarm', 0, '#ffb454');
  let kind: (typeof KINDS)[number] = 'schedule';
  const ids: number[] = [];

  return stage.run({
    build: () => {
      const d = drums();
      // A quiet kick on each beat so the laps are easy to count.
      Tone.getTransport().scheduleRepeat((time) => kickAt(d, time), '4n', 0);
      follow(stage, Tone.getTransport(), (beat) => view.head(beat));
      return d;
    },
    play: (d, time) => {
      const t = Tone.getTransport();
      const k = kind;
      let fired = 0;
      const alarm = (at: number): void => {
        pingAt(d, 'A5', at);
        fired++;
        const n = fired;
        stage.show(at, () => {
          flash(spot, 0.5, '#ffb454');
          count.textContent = `${k}: fired ${n}x`;
        });
      };
      const id = k === 'schedule' ? t.schedule(alarm, '0:2') : t.scheduleOnce(alarm, '0:2');
      stage.show(time, () => (count.textContent = `${k}: waiting`));
      t.setLoopPoints(0, '1m');
      t.loop = true;
      t.start(time);
      ids.push(id);
      return (end) => t.stop(end);
    },
    stop: () => {
      for (const id of ids.splice(0)) Tone.getTransport().clear(id);
    },
    variants: KINDS.map((k) => ({ label: k, apply: () => void (kind = k) })),
    controls: (_, bar) => {
      const sel = document.createElement('select');
      for (const k of KINDS) sel.add(new Option(k, k));
      sel.addEventListener('change', () => (kind = sel.value as (typeof KINDS)[number]));
      bar.append('Event kind (applies on the next Play) ', sel);
    },
  });
};

export default mount;
