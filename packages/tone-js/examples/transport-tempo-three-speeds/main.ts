// Transport.bpm: one bar of drums at three tempos, same notation, different seconds
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, follow, hatAt, kickAt, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  view.layout(4, 4);
  let bpm = 120;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      t.scheduleRepeat((time) => kickAt(d, time), '4n', 0);
      t.scheduleRepeat((time) => hatAt(d, time), '8n', '0:0:2');
      follow(stage, t, (beat) => view.head(beat));
      return d;
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.bpm.value = bpm;
      t.setLoopPoints(0, '1m');
      t.loop = true;
      const text = `${bpm} BPM, ${(240 / bpm).toFixed(1)} s a bar`;
      stage.show(time, () => (caption.textContent = text));
      t.start(time);
      return (end) => t.stop(end);
    },
    variants: [80, 120, 180].map((v) => ({ label: `${v} BPM`, apply: () => void (bpm = v) })),
    controls: (_, bar) =>
      slider(bar, 'bpm', 40, 220, 1, 120, (v) => (Tone.getTransport().bpm.value = v), (v) => String(v)),
  });
};

export default mount;
