// Fade in and out: Player fadeIn and fadeOut soften a recording's start and cut-off
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';

const PLAYED = 1.6;
const SETTINGS: [number, number][] = [[0, 0], [1, 0], [0, 1.2], [0.8, 1.2]];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const wave = strip(stage.visual, ctx.preview ? 90 : 120);
  let fades: [number, number] = [0, 0];

  return stage.run({
    build: async () => new Tone.Player(await sample('chord')).toDestination(),

    // Play only the first 1.6 s of the recording: start(time, offset, duration).
    play: (player, time) => {
      fades = [Number(player.fadeIn), Number(player.fadeOut)];
      stage.show(time, wave.prepare(player.buffer.getChannelData(0), player.buffer.duration));
      player.start(time, 0, PLAYED);
    },

    variants: SETTINGS.map(([fadeIn, fadeOut]) => ({
      label: `fadeIn ${fadeIn}, fadeOut ${fadeOut}`,
      apply: (player: Tone.Player) => {
        player.fadeIn = fadeIn;
        player.fadeOut = fadeOut;
      },
    })),

    controls: (player, bar) => {
      wave.setData(player.buffer.getChannelData(0), player.buffer.duration);
      slider(bar, 'fadeIn', 0, 1.5, 0.05, 0, (v) => ((player.fadeIn = v), (fades[0] = v)), (v) => `${v} s`);
      slider(bar, 'fadeOut', 0, 1.5, 0.05, 0, (v) => ((player.fadeOut = v), (fades[1] = v)), (v) => `${v} s`);
    },

    frame: (time) =>
      // Shaded: the stretch that fades in, and the stretch after the cut that fades out.
      wave.draw({
        regions: [[0, fades[0]], [PLAYED, PLAYED + fades[1]]].filter((r) => r[1]! > r[0]!) as [number, number][],
        active: -1,
        cursor: Math.min(time, PLAYED + fades[1]),
      }),
  });
};

export default mount;
