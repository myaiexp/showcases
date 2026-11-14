// NoiseSynth: noise type and envelope shape make a snare, a hat or a whoosh
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

type NoiseType = 'white' | 'pink' | 'brown';
interface Kind {
  type: NoiseType;
  envelope: { attack: number; decay: number; sustain: number };
  hold: number;
  hits: number[];
}
const KINDS: Record<string, Kind> = {
  snare: { type: 'white', envelope: { attack: 0.001, decay: 0.18, sustain: 0 }, hold: 0.2, hits: [0.5, 1.5] },
  hat: { type: 'white', envelope: { attack: 0.001, decay: 0.04, sustain: 0 }, hold: 0.05, hits: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75] },
  whoosh: { type: 'pink', envelope: { attack: 1.1, decay: 0.7, sustain: 0 }, hold: 1.8, hits: [0] },
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const grid = pads(stage.visual, ['1', '&', '2', '&', '3', '&', '4', '&']);
  const label = bigLabel(stage.visual);
  let kind = KINDS.snare!;

  return stage.run({
    build: () => new Tone.NoiseSynth({ volume: -6 }).toDestination(),

    play: (noise, time) => {
      const env = noise.envelope;
      const text = `${noise.noise.type} noise\nattack ${env.attack}s   decay ${env.decay}s`;
      stage.show(time, () => (label.textContent = text));
      kind.hits.forEach((offset) => {
        noise.triggerAttackRelease(kind.hold, time + offset);
        stage.show(time + offset, () => grid.hit(Math.round(offset * 4) % 8, 0.25));
      });
    },

    variants: Object.entries(KINDS).map(([name, k]) => ({
      label: name,
      apply: (noise: Tone.NoiseSynth) => {
        kind = k;
        noise.noise.type = k.type;
        noise.set({ envelope: k.envelope });
      },
    })),

    controls: (noise, bar) => {
      grid.onHit(async () => {
        await Tone.start();
        noise.triggerAttackRelease(kind.hold);
      });
      select(bar, 'noise type', ['white', 'pink', 'brown'] as const, (v) => (noise.noise.type = v), 'white');
      slider(bar, 'attack', 0.001, 1.5, 0.001, 0.001, (v) => (noise.envelope.attack = v), (v) => `${v}s`);
      slider(bar, 'decay', 0.02, 1.5, 0.01, 0.18, (v) => (noise.envelope.decay = v), (v) => `${v}s`);
    },
  });
};

export default mount;
