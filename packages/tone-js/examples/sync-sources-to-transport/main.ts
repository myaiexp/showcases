// Synced sources: sync() ties oscillators and noise to the Transport timeline
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const grid = pads(stage.visual, ['low beep, beat 1', 'high beep, beat 3', 'hiss, beat 4'], 3);

  return stage.run({
    build: () => {
      const out = new Tone.Volume(-14).toDestination();
      const low = new Tone.Oscillator('C3', 'square').connect(out);
      const high = new Tone.Oscillator('G4', 'square').connect(out);
      const hiss = new Tone.Noise('pink').connect(out);
      // sync() hands each source to the Transport: start/stop now name Transport times.
      low.sync().start('0:0').stop('0:0:2');
      high.sync().start('0:2').stop('0:2:2');
      hiss.sync().start('0:3').stop('0:3:2');
      // One bar per loop. The pads light on each source's own start time.
      const transport = Tone.getTransport();
      transport.loop = true;
      transport.setLoopPoints(0, '1m');
      for (const [i, at] of ['0:0', '0:2', '0:3'].entries()) {
        transport.schedule((time) => stage.show(time, () => grid.hit(i, 0.4)), at);
      }
      return { out, low, high, hiss };
    },

    // Starting the Transport starts every synced source; stopping it stops them.
    play: (_, time) => {
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },

    controls: (_, bar) => {
      slider(bar, 'tempo', 60, 200, 1, 120, (bpm) => (Tone.getTransport().bpm.value = bpm), (v) => `${v} BPM`);
    },
  });
};

export default mount;
