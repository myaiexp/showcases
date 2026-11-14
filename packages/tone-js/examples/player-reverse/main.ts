// Player reverse: a gong played backwards swells up and ends with a sudden cut
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5 });
  const wave = strip(stage.visual, ctx.preview ? 90 : 120);
  let duration = 3;

  return stage.run({
    // A private copy of the stand-in recording: reversing flips the audio in place.
    build: async () => new Tone.Player(await sample('gong')).toDestination(),

    play: (player, time) => {
      duration = player.buffer.duration;
      const shown = wave.prepare(player.buffer.getChannelData(0), duration);
      stage.show(time, shown);
      player.start(time);
    },

    variants: [false, true].map((reverse) => ({
      label: reverse ? 'reverse = true' : 'reverse = false',
      apply: (player: Tone.Player) => (player.reverse = reverse),
    })),

    controls: (player, bar) => {
      wave.setData(player.buffer.getChannelData(0), player.buffer.duration);
      checkbox(bar, 'reverse', false, (on) => {
        player.reverse = on;
        wave.setData(player.buffer.getChannelData(0), player.buffer.duration);
      });
    },

    frame: (time) => wave.draw({ cursor: Math.min(time, duration) }),
  });
};

export default mount;
