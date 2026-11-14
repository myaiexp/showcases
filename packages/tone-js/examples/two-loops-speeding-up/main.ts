// Two loops speeding up: on-beat and off-beat Loops while the bpm ramps to 800
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const RAMP = 10;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 6 });
  const tempo = bigLabel(stage.visual, '120 BPM');
  const beats = pads(stage.visual, ['FMSynth C2\non the beat', 'AMSynth C4\nbetween beats']);
  beats.pads.forEach((p) => (p.style.whiteSpace = 'pre'));

  return stage.run({
    build: () => {
      const synthA = new Tone.FMSynth().toDestination();
      const synthB = new Tone.AMSynth().toDestination();
      // A note every quarter note, and another every quarter note started an eighth later.
      const loopA = new Tone.Loop((time) => {
        synthA.triggerAttackRelease('C2', '8n', time);
        stage.show(time, () => beats.hit(0, 0.15));
      }, '4n').start(0);
      const loopB = new Tone.Loop((time) => {
        synthB.triggerAttackRelease('C4', '8n', time);
        stage.show(time, () => beats.hit(1, 0.15));
      }, '4n').start('8n');
      return { synthA, synthB, loopA, loopB };
    },

    play: (_, time) => {
      const transport = Tone.getTransport();
      transport.bpm.value = 120;
      // Ramp up to 800 BPM over 10 seconds; every loop follows the tempo.
      transport.bpm.rampTo(800, RAMP, time);
      transport.start(time);
      return (end) => transport.stop(end);
    },

    // bpm ramps exponentially, so the readout follows the same curve.
    frame: (t) => {
      const bpm = 120 * Math.pow(800 / 120, Math.min(t, RAMP) / RAMP);
      tempo.textContent = `${Math.round(bpm)} BPM`;
    },
  });
};

export default mount;
