// Transport.bpm is a signal: step it with setValueAtTime, glide it with ramps
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, kickAt, lane, hatAt } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

type Shape = { label: string; apply: (bpm: ReturnType<typeof Tone.getTransport>['bpm'], t: number) => void };
const SHAPES: Shape[] = [
  {
    label: 'steps',
    apply: (bpm, t) => {
      bpm.setValueAtTime(90, t);
      bpm.setValueAtTime(130, t + 1.5);
      bpm.setValueAtTime(180, t + 3);
    },
  },
  {
    label: 'linear ramp',
    apply: (bpm, t) => {
      bpm.setValueAtTime(70, t);
      bpm.linearRampToValueAtTime(200, t + 4);
    },
  },
  { label: 'rampTo', apply: (bpm, t) => (bpm.value = 80, bpm.rampTo(190, 3.5, t)) },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  view.layout(4, 4);
  let shape = SHAPES[0]!;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      t.scheduleRepeat((time) => {
        kickAt(d, time);
        // The tempo at this very moment, read from the signal.
        const bpm = Math.round(t.bpm.getValueAtTime(time));
        const beat = t.getTicksAtTime(time) / t.PPQ;
        stage.show(time, () => {
          caption.textContent = `${bpm} BPM`;
          view.head(beat);
          view.ping(beat, 0);
        });
      }, '4n', 0);
      t.scheduleRepeat((time) => hatAt(d, time), '8n', '0:0:2');
      return d;
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.setLoopPoints(0, '1m');
      t.loop = true;
      shape.apply(t.bpm, time);
      t.start(time);
      return (end) => t.stop(end);
    },
    stop: () => {
      const bpm = Tone.getTransport().bpm;
      bpm.cancelScheduledValues(0);
      bpm.value = 120;
    },
    variants: SHAPES.map((s) => ({ label: s.label, apply: () => void (shape = s) })),
    controls: (_, bar) => {
      const sel = document.createElement('select');
      for (const s of SHAPES) sel.add(new Option(s.label, s.label));
      sel.addEventListener('change', () => (shape = SHAPES.find((s) => s.label === sel.value) ?? shape));
      bar.append('Tempo shape (applies on the next Play) ', sel);
    },
  });
};

export default mount;
