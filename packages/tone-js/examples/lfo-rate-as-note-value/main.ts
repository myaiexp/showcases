// A frequency can be a note length: lfo.frequency.value = "8t"
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { burst, sampleFn, trace, voice, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const NOTES = ['4n', '8n', '8t', '16n'] as const;
type Note = (typeof NOTES)[number];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 250, yMax: 650, unit: 'Hz', guides: [300, 600] });
  let note: Note = '8n';

  return stage.run({
    build: () => {
      const osc = voice();
      const lfo = new Tone.LFO('8n', 300, 600);
      lfo.connect(osc.frequency);
      return { osc, lfo };
    },
    play: (g, time) => {
      // The Param converts the note length into hertz at the current tempo.
      g.lfo.frequency.value = note;
      const hz = Number(g.lfo.frequency.value);
      g.lfo.start(time).stop(time + SECONDS);
      burst(g.osc, time, SECONDS);
      const bpm = Tone.getTransport().bpm.value;
      view.show(time, [sampleFn((t) => 450 + 150 * wave('sine', hz, t), SECONDS)], `speed "${note}" = ${hz.toFixed(2)} Hz at ${Math.round(bpm)} BPM`);
    },
    variants: NOTES.map((n) => ({
      label: `"${n}"`,
      apply: () => {
        note = n;
      },
    })),
    controls: (_, bar) => {
      select<Note>(bar, 'speed', NOTES, (v) => (note = v), note);
      slider(bar, 'tempo', 60, 200, 5, 120, (v) => (Tone.getTransport().bpm.value = v), (v) => `${v} BPM (applies on the next pass)`);
    },
    frame: (t) => view.frame(t),
  });
};

export default mount;
