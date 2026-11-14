// Gate: cuts the hiss between drum hits, it only opens for loud sounds
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SETTINGS = {
  'gate open': { threshold: -100, smoothing: 0.05, detail: 'threshold -100 dB: everything passes, hiss included' },
  'hiss cut': { threshold: -28, smoothing: 0.05, detail: 'threshold -28 dB: the hiss is below it, so the gate stays shut' },
  'slow smoothing': { threshold: -28, smoothing: 0.4, detail: 'smoothing 0.4 s: the gate is slow to shut after each hit' },
} as const;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  // Made in create() and thrown away in cleanup(), once per render.
  let hiss: Tone.Noise | undefined;

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Gate'],
    caption: 'Gate: only opens above the threshold',
    create: (src: Source) => {
      const gate = new Tone.Gate({ threshold: -100, smoothing: 0.05 }).toDestination();
      src.out.connect(gate);
      // A constant hiss under the beat: the "noisy" part to get rid of.
      hiss = new Tone.Noise('white').connect(gate).start();
      hiss.volume.value = -32;
      return gate;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: SETTINGS[name].detail,
      apply: (g: Tone.Gate) => {
        g.threshold = SETTINGS[name].threshold;
        g.smoothing = SETTINGS[name].smoothing;
      },
    })),
    cleanup: () => {
      hiss?.dispose();
      hiss = undefined;
    },
    controls: (g, bar) => {
      slider(bar, 'threshold', -100, 0, 1, -100, (v) => (g.threshold = v), (v) => `${v} dB`);
      slider(bar, 'smoothing', 0.01, 0.6, 0.01, 0.05, (v) => (g.smoothing = v), (v) => `${v} s`);
      slider(bar, 'hiss', -50, -20, 1, -32, (v) => {
        if (hiss) hiss.volume.value = v;
      }, (v) => `${v} dB`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
