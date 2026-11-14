// MidSideCompressor: the centre of a mix and its wide parts, compressed apart
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, source, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Band = [threshold: number, ratio: number];
const OFF: Band = [0, 1];
const SQUASH: Band = [-45, 20];
const SETTINGS = {
  off: { mid: OFF, side: OFF, detail: 'both ratio 1: untouched' },
  default: { mid: [-24, 3], side: [-30, 6], detail: 'the default: mid -24 dB at 3:1, side -30 dB at 6:1' },
  'squash the centre': { mid: SQUASH, side: OFF, detail: 'mid squashed: the drums in the middle shrink, the wide sounds stay' },
  'squash the sides': { mid: OFF, side: SQUASH, detail: 'side squashed: the wide left and right sounds shrink, the drums stay' },
} as const satisfies Record<string, { mid: Band; side: Band; detail: string }>;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];

const set = (m: Tone.MidSideCompressor, name: Name): void => {
  for (const part of ['mid', 'side'] as const) {
    m[part].threshold.value = SETTINGS[name][part][0];
    m[part].ratio.value = SETTINGS[name][part][1];
  }
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3, channels: 2 });
  // Extra voices made in create(): a chord hard left and a melody hard right, so the mix has width.
  let extras: Source[] = [];
  let panners: Tone.Panner[] = [];

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['MidSideCompressor'],
    caption: 'MidSideCompressor: drums in the middle, chord left, melody right',
    create: async (src: Source) => {
      const m = new Tone.MidSideCompressor().toDestination();
      const chord = await source('chord');
      const melody = await source('melody');
      extras = [chord, melody];
      src.out.gain.value = 0.8;
      chord.out.gain.value = 0.5;
      melody.out.gain.value = 0.7;
      panners = [new Tone.Panner(0), new Tone.Panner(-0.95), new Tone.Panner(0.95)];
      [src, chord, melody].forEach((s, i) => s.out.connect(panners[i]!));
      for (const p of panners) p.connect(m);
      return m;
    },
    variants: NAMES.map((name) => ({ label: name, detail: SETTINGS[name].detail, apply: (m: Tone.MidSideCompressor) => set(m, name) })),
    onPlay: (_, time) => extras.forEach((s) => s.start(time)),
    cleanup: () => {
      extras.forEach((s) => s.dispose());
      panners.forEach((p) => p.dispose());
      extras = [];
      panners = [];
    },
    controls: (m, bar) => {
      slider(bar, 'mid threshold', -60, 0, 1, m.mid.threshold.value, (v) => (m.mid.threshold.value = v), (v) => `${v} dB`);
      slider(bar, 'mid ratio', 1, 20, 0.5, m.mid.ratio.value, (v) => (m.mid.ratio.value = v), (v) => `${v}:1`);
      slider(bar, 'side threshold', -60, 0, 1, m.side.threshold.value, (v) => (m.side.threshold.value = v), (v) => `${v} dB`);
      slider(bar, 'side ratio', 1, 20, 0.5, m.side.ratio.value, (v) => (m.side.ratio.value = v), (v) => `${v}:1`);
    },
  });

  compactFlow(stage);

  return stage.run({ ...spec, stop: (g, time) => {
    spec.stop?.(g, time);
    extras.forEach((s) => s.stop(time));
  } });
};

export default mount;
