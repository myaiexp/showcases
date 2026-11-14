// Loop points: setLoopPoints chops a short repeating phrase out of a longer recording
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';

const CHOPS: [number, number][] = [[0, 2], [0, 0.5], [0.5, 1], [1.25, 1.75]];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const wave = strip(stage.visual, ctx.preview ? 90 : 120);
  let loop: [number, number] = [0, 2];

  return stage.run({
    build: async () => new Tone.Player({ url: await sample('melody'), loop: true }).toDestination(),

    play: (player, time) => {
      loop = [Number(player.loopStart), Number(player.loopEnd) || player.buffer.duration];
      const shown = wave.prepare(player.buffer.getChannelData(0), player.buffer.duration);
      stage.show(time, shown);
      player.start(time);
      return (end) => player.stop(end);
    },

    variants: CHOPS.map(([a, b]) => ({
      label: `loop ${a} to ${b} s`,
      apply: (player: Tone.Player) => player.setLoopPoints(a, b),
    })),

    controls: (player, bar) => {
      wave.setData(player.buffer.getChannelData(0), player.buffer.duration);
      loop = [0, player.buffer.duration];
      const set = (a: number, b: number): void => {
        loop = [a, b];
        player.setLoopPoints(a, b);
      };
      let a = 0;
      let b = player.buffer.duration;
      slider(bar, 'loop end', 0.1, b, 0.05, b, (v) => {
        b = Math.max(v, a + 0.05);
        set(a, b);
      }, (v) => `${v.toFixed(2)} s`);
      slider(bar, 'loop start', 0, b - 0.05, 0.05, 0, (v) => {
        a = Math.min(v, b - 0.05);
        set(a, b);
      }, (v) => `${v.toFixed(2)} s`);
    },

    frame: (time) => {
      const len = Math.max(0.05, loop[1] - loop[0]);
      wave.draw({ regions: [loop], active: 0, cursor: loop[0] + (time % len) });
    },
  });
};

export default mount;
