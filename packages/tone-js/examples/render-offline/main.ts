// Render offline: Tone.Offline records an arpeggio into a buffer, then a Player plays it
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { overview, type Overview } from './overview.ts';

const NOTES = ['C4', 'E4', 'G4', 'B4', 'C5', 'B4', 'G4', 'E4'];
const LENGTH = 2;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });
  let picture: Overview | null = null;

  return stage.run({
    build: async () => {
      // Everything created inside the callback is recorded into the returned buffer.
      const buffer = await Tone.Offline(() => {
        const synth = new Tone.FMSynth({ modulationIndex: 3 }).toDestination();
        NOTES.forEach((note, i) => synth.triggerAttackRelease(note, '16n', i * 0.25));
      }, LENGTH);
      picture = overview(stage.visual, buffer.toArray(0) as Float32Array);
      return new Tone.Player(buffer).toDestination();
    },

    play: (player, time) => {
      player.start(time);
    },
    stop: (player, time) => player.stop(time),

    frame: (t) => picture?.at(Math.min(1, t / LENGTH)),
  });
};

export default mount;
