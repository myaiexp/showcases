// MetalSynth: clashing FM oscillators and a high-pass make hats and cymbals
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

interface Kind {
  note: string;
  harmonicity: number;
  modulationIndex: number;
  resonance: number;
  octaves: number;
  decay: number;
  hits: number[];
}
const KINDS = {
  'hi-hat': { note: 'C6', harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5, decay: 0.06, hits: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75] },
  cymbal: { note: 'C5', harmonicity: 5.1, modulationIndex: 32, resonance: 3000, octaves: 1.5, decay: 1.6, hits: [0, 1.5] },
  bell: { note: 'G5', harmonicity: 3.5, modulationIndex: 12, resonance: 800, octaves: 0.5, decay: 1.2, hits: [0, 0.75, 1.5] },
} satisfies Record<string, Kind>;
type Name = keyof typeof KINDS;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const row = pads(stage.visual, ['hi-hat', 'cymbal', 'bell']);
  const label = bigLabel(stage.visual);
  let name: Name = 'hi-hat';

  const shape = (metal: Tone.MetalSynth, n: Name): void => {
    const { note: _n, hits: _h, decay, ...rest } = KINDS[n];
    name = n;
    Object.assign(metal, rest);
    metal.envelope.decay = decay;
  };

  return stage.run({
    build: () => {
      const metal = new Tone.MetalSynth({ volume: -14, envelope: { attack: 0.001, release: 0.1 } }).toDestination();
      shape(metal, 'hi-hat');
      return metal;
    },

    play: (metal, time) => {
      const k = KINDS[name];
      const index = Object.keys(KINDS).indexOf(name);
      const text = `harmonicity ${metal.harmonicity}   modulationIndex ${metal.modulationIndex}\nresonance ${metal.resonance} Hz   decay ${metal.envelope.decay}s`;
      stage.show(time, () => (label.textContent = text));
      for (const offset of k.hits) {
        metal.triggerAttackRelease(k.note, 0.05, time + offset);
        stage.show(time + offset, () => row.hit(index, 0.3));
      }
    },

    variants: (Object.keys(KINDS) as Name[]).map((n) => ({ label: n, apply: (metal: Tone.MetalSynth) => shape(metal, n) })),

    controls: (metal, bar) => {
      row.onHit(async (i) => {
        await Tone.start();
        const n = Object.keys(KINDS)[i] as Name;
        shape(metal, n);
        metal.triggerAttackRelease(KINDS[n].note, 0.05);
      });
      slider(bar, 'harmonicity', 0.5, 10, 0.1, 5.1, (v) => (metal.harmonicity = v));
      slider(bar, 'modulationIndex', 1, 60, 1, 32, (v) => (metal.modulationIndex = v));
      slider(bar, 'resonance', 200, 7000, 100, 4000, (v) => (metal.resonance = v), (v) => `${v} Hz`);
      slider(bar, 'octaves', 0, 4, 0.1, 1.5, (v) => (metal.octaves = v));
    },
  });
};

export default mount;
