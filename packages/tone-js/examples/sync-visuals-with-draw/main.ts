// Sync visuals with Draw: each light is scheduled with Tone.Draw at its note
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const NOTES = ['C4', 'D4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D4'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const lights = pads(stage.visual, NOTES);

  // Live, Tone.Draw runs the callback on the animation frame closest to `time`. A silent
  // card has no live clock to wait for, so it replays the same calls against its playhead.
  const draw = (fn: () => void, time: number): void => {
    if (stage.preview) stage.show(time, fn);
    else Tone.getDraw().schedule(fn, time);
  };

  return stage.run({
    build: () => {
      const synth = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination();
      const seq = new Tone.Sequence(
        (time, i) => {
          synth.triggerAttackRelease(NOTES[i]!, '16n', time);
          // No DOM work here: this runs ahead of the sound, on a timer, not a frame.
          draw(() => lights.hit(i, 0.3), time);
        },
        NOTES.map((_, i) => i),
        '8n',
      ).start(0);
      return { synth, seq };
    },

    play: (_, time) => {
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
  });
};

export default mount;
