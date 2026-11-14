// Thirty throwaway blips: disconnect() frees each one after it ends (or forgets to)
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { releaseAll } from '../../shared/dispose.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, smallText } from '../../shared/widgets.ts';
import { dots } from './dots.ts';

const BLIPS = 30;
const GAP = 0.1;
const SCALE = [72, 74, 76, 79, 81, 84, 81, 79, 76, 74];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: BLIPS * GAP + 0.8 });
  const count = bigText(stage.visual, ctx.preview ? 15 : 20);
  const grid = dots(stage.visual, ctx.preview ? 10 : 18);
  const note = smallText(stage.visual);
  const say = (made: number, connected: number): void => {
    count.textContent = `made ${made} · connected ${connected}`;
  };

  return stage.run({
    build: () => ({ made: [] as Sound[], setup: { free: true } }),
    play: (g, at) => {
      releaseAll(g.made);
      g.made.length = 0;
      const free = g.setup.free;
      stage.show(() => {
        grid.reset();
        say(0, 0);
        note.textContent = free ? 'disconnect() after each blip' : 'never disconnect()';
      });
      let connected = 0;
      for (let i = 0; i < BLIPS; i++) {
        const when = i * GAP;
        at(when, () => {
          const blip = new Pizzicato.Sound({
            source: 'wave',
            options: { type: 'sine', frequency: hz(SCALE[i % SCALE.length]!), volume: 0.2, attack: 0.005, release: 0.05 },
          });
          g.made.push(blip);
          blip.play();
          connected++;
          const now = connected;
          stage.show(() => {
            grid.set(i, true);
            say(i + 1, now);
          });
        });
        at(when + 0.08, () => g.made[i]?.stop());
        if (free) {
          at(when + 0.25, () => {
            g.made[i]?.disconnect();
            connected--;
            const now = connected;
            stage.show(() => {
              grid.set(i, false);
              say(i + 1, now);
            });
          });
        }
      }
    },
    variants: [
      { label: 'with disconnect()', apply: () => undefined },
      { label: 'forgetting disconnect()', apply: ({ setup }) => (setup.free = false) },
    ],
    controls: ({ setup }, bar) => {
      say(0, 0);
      note.textContent = 'press Play: thirty blips';
      checkbox(bar, 'disconnect() each blip', true, (v) => (setup.free = v));
    },
  });
};

export default mount;
