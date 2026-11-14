// SyncedSignal: values on the Transport grid stretch with the tempo
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sampleFn, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;
const TEMPOS = [80, 120, 180];
const TUNE: [string, string][] = [
  ['0:0', 'C4'], ['0:1', 'E4'], ['0:2', 'G4'], ['0:3', 'C5'],
  ['1:0', 'G4'], ['1:1', 'E4'], ['1:2', 'D4'], ['1:3', 'C4'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 200, yMax: 600, unit: 'Hz', guides: [261.63, 392, 523.25], caption: '8 values placed on beats of the Transport' });
  let bpm = 120;

  return stage.run({
    build: () => {
      const sig = new Tone.SyncedSignal(262, 'frequency');
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).toDestination();
      sig.connect(osc.frequency);
      return { sig, osc };
    },
    play: (g, time) => {
      const transport = Tone.getTransport();
      transport.bpm.value = bpm;
      g.sig.cancelScheduledValues(0);
      for (const [pos, note] of TUNE) g.sig.setValueAtTime(note, pos);
      // Transport time is in seconds at this tempo: read the signal at those seconds.
      view.show(time, [sampleFn((t) => Number(g.sig.getValueAtTime(t)), SECONDS)], `${bpm} BPM: one beat lasts ${(60 / bpm).toFixed(2)} s`);
      g.osc.start(time);
      transport.start(time);
      return (end) => {
        g.osc.stop(end);
        transport.stop(end);
      };
    },
    variants: TEMPOS.map((t) => ({
      label: `${t} BPM`,
      apply: () => {
        bpm = t;
      },
    })),
    controls: (_, bar) => slider(bar, 'tempo', 60, 200, 5, bpm, (v) => (bpm = v), (v) => `${v} BPM (applies on the next Play)`),
    frame: (t) => view.frame(t % SECONDS),
  });
};

export default mount;
