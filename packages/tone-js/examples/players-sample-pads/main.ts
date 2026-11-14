// Players: a named kit of short recordings, each fired by name from a pad
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const NAMES = ['kick', 'snare', 'hat', 'voice', 'gong'];
// One bar of eighths: which pad sounds on each of 8 steps.
const PATTERNS: Record<string, (string | null)[][]> = {
  'beat A': [['kick', 'hat'], ['hat'], ['snare', 'hat'], ['hat'], ['kick', 'hat'], ['kick', 'hat'], ['snare', 'hat'], ['hat']],
  'beat B': [['kick', 'gong'], ['hat'], ['hat'], ['hat'], ['snare'], ['hat'], ['kick', 'hat'], ['voice']],
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const grid = pads(stage.visual, NAMES);
  let pattern = PATTERNS['beat A']!;

  return stage.run({
    build: async () => {
      // The drum stand-in holds a kick, a snare and a hat; cut them apart into named buffers.
      const drums = await sample('drums');
      const urls = {
        kick: drums.slice(0, 0.3),
        snare: drums.slice(0.5, 0.75),
        hat: drums.slice(0.375, 0.47),
        voice: await sample('voice'),
        gong: await sample('gong'),
      };
      drums.dispose();
      const players = new Tone.Players({ urls, volume: -6 }).toDestination();
      players.player('hat').volume.value = 4;
      return players;
    },

    play: (players, time) => {
      pattern.forEach((names, i) => {
        const at = time + i * 0.25;
        for (const name of names) {
          players.player(name!).start(at);
          stage.show(at, () => grid.hit(NAMES.indexOf(name!), 0.25));
        }
      });
    },
    stop: (players, time) => players.stopAll(time),

    variants: Object.entries(PATTERNS).map(([label, list]) => ({ label, apply: () => (pattern = list) })),

    controls: (players, bar) => {
      grid.onHit(async (i) => {
        await Tone.start();
        players.player(NAMES[i]!).start(Tone.now());
      });
      slider(bar, 'volume', -30, 6, 1, -6, (db) => (players.volume.value = db), (db) => `${db} dB`);
    },
  });
};

export default mount;
