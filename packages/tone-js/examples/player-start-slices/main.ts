// Slices: Player.start(time, offset, duration) plays one piece at a time
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const SLICE = 0.25;
const COUNT = 8;
const REGIONS = Array.from({ length: COUNT }, (_, i) => [i * SLICE, (i + 1) * SLICE] as const);
const ORDERS: Record<string, number[]> = {
  'original order': [0, 1, 2, 3, 4, 5, 6, 7],
  backwards: [7, 6, 5, 4, 3, 2, 1, 0],
  shuffled: [0, 4, 1, 5, 2, 6, 3, 7],
  stuttered: [0, 0, 3, 3, 4, 4, 7, 7],
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const wave = strip(stage.visual, ctx.preview ? 50 : 90);
  const grid = pads(stage.visual, REGIONS.map((_, i) => String(i + 1)));
  let order = ORDERS['original order']!;
  let active = -1;

  return stage.run({
    build: async () => new Tone.Player({ url: await sample('melody'), fadeOut: 0.02 }).toDestination(),

    play: (player, time) => {
      stage.show(time, wave.prepare(player.buffer.getChannelData(0), player.buffer.duration));
      const played = order;
      played.forEach((slice, i) => {
        const at = time + i * SLICE;
        player.start(at, slice * SLICE, SLICE);
        stage.show(at, () => {
          active = slice;
          grid.hit(slice, SLICE);
        });
      });
    },

    variants: Object.entries(ORDERS).map(([label, list]) => ({
      label,
      apply: () => (order = list),
    })),

    controls: (player, bar) => {
      bar.append(Object.assign(document.createElement('span'), { textContent: 'Tap a pad to play that slice.' }));
      grid.onHit(async (i) => {
        await Tone.start();
        player.start(Tone.now(), i * SLICE, SLICE);
        active = i;
      });
      wave.setData(player.buffer.getChannelData(0), player.buffer.duration);
    },

    frame: () => wave.draw({ regions: REGIONS, active }),
  });
};

export default mount;
