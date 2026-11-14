// A drum kit from MembraneSynth, NoiseSynth and MetalSynth on pads
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const NAMES = ['kick', 'snare', 'hat', 'tom'];
// 16 sixteenths per pattern; each row is a drum, "x" is a hit.
const PATTERNS: [string, string[]][] = [
  ['rock beat', ['x...x...x...x...', '....x.......x...', 'x.x.x.x.x.x.x.x.', '..............x.']],
  ['four on the floor', ['x...x...x...x...', '................', '..x...x...x...x.', '...............x']],
  ['breakbeat', ['x.....x...x.....', '....x..x.x..x...', 'x.x.x.x.x.x.x.xx', '...........x.x..']],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const kit = pads(stage.visual, NAMES, 4);
  let pattern = PATTERNS[0]![1];

  return stage.run({
    build: () => ({
      kick: new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 6 }).toDestination(),
      snare: new Tone.NoiseSynth({ envelope: { attack: 0.001, decay: 0.15, sustain: 0 }, volume: -6 }).toDestination(),
      hat: new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.05, release: 0.01 }, volume: -20 }).toDestination(),
      tom: new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 2 }).toDestination(),
    }),

    play: (d, time) => {
      for (let step = 0; step < 16; step++) {
        const at = time + step * 0.125;
        pattern.forEach((row, drum) => {
          if (row[step] !== 'x') return;
          if (drum === 0) d.kick.triggerAttackRelease('C1', '8n', at);
          else if (drum === 1) d.snare.triggerAttackRelease('16n', at);
          else if (drum === 2) d.hat.triggerAttackRelease('C6', '32n', at);
          else d.tom.triggerAttackRelease('A2', '16n', at);
          stage.show(at, () => kit.hit(drum, 0.2));
        });
      }
    },

    variants: PATTERNS.map(([name, rows]) => ({ label: name, apply: () => (pattern = rows) })),

    controls: (d, bar) => {
      kit.onHit(async (i) => {
        await Tone.start();
        if (i === 0) d.kick.triggerAttackRelease('C1', '8n');
        else if (i === 1) d.snare.triggerAttackRelease('16n');
        else if (i === 2) d.hat.triggerAttackRelease('C6', '32n');
        else d.tom.triggerAttackRelease('A2', '16n');
      });
      slider(bar, 'hat level', -40, 0, 1, -20, (v) => (d.hat.volume.value = v), (v) => `${v} dB`);
    },
  });
};

export default mount;
