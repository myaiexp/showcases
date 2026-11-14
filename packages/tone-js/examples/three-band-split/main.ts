// MultibandSplit: low, mid and high outputs divided at two crossovers
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { rateOf } from '../../shared/routing-kit.ts';
import { barsCanvas, dft, toBars } from '../../shared/spectrum-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Band = 'low' | 'mid' | 'high';
const BANDS: Band[] = ['low', 'mid', 'high'];
const COLORS: Record<Band, string> = { low: '#ff8fb1', mid: '#7aa2ff', high: '#ffd479' };
const MIN_HZ = 60;
const MAX_HZ = 5500;
const BARS = 56;

interface Graph {
  src: Source;
  split: Tone.MultibandSplit;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, hideScopeInCard: true });
  const view = barsCanvas(stage.visual, stage.preview ? 0 : 150);
  const hint = document.createElement('div');
  hint.style.cssText = 'font:600 11px/1.2 ui-monospace,monospace;color:var(--fg-2);text-align:center;padding:2px';
  // A card's variant label already says which band plays.
  if (!stage.preview) stage.visual.append(hint);
  let cross = { low: 400, high: 2500 };
  let active: Record<Band, boolean> = { low: true, mid: true, high: true };
  // What the pass on screen was scheduled with (a card shows one variant after another).
  let shown = { cross, active };

  const wire = (g: Graph): void => {
    for (const b of BANDS) {
      g.split[b].disconnect();
      if (active[b]) g.split[b].toDestination();
    }
  };
  const colorsFor = (c: typeof cross): string[] =>
    Array.from({ length: BARS }, (_, i) => {
      const f = MIN_HZ * (MAX_HZ / MIN_HZ) ** ((i + 0.5) / BARS);
      return COLORS[f < c.low ? 'low' : f < c.high ? 'mid' : 'high'];
    });
  const pos = (f: number): number => Math.log(f / MIN_HZ) / Math.log(MAX_HZ / MIN_HZ);

  return stage.run({
    build: async (): Promise<Graph> => {
      const src = await source('drums');
      const split = new Tone.MultibandSplit(cross.low, cross.high);
      src.out.connect(split);
      const g = { src, split };
      wire(g);
      return g;
    },
    play: (g, time) => {
      g.split.lowFrequency.value = cross.low;
      g.split.highFrequency.value = cross.high;
      g.src.start(time);
      const snap = { cross: { ...cross }, active: { ...active } };
      stage.show(time, () => {
        shown = snap;
        hint.textContent = BANDS.filter((b) => snap.active[b]).join(' + ') + `  (split at ${snap.cross.low} Hz and ${snap.cross.high} Hz)`;
      });
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'all three bands', on: { low: true, mid: true, high: true } },
      { label: 'low band only', on: { low: true, mid: false, high: false } },
      { label: 'mid band only', on: { low: false, mid: true, high: false } },
      { label: 'high band only', on: { low: false, mid: false, high: true } },
    ].map(({ label, on }) => ({
      label,
      apply: (g: Graph) => {
        active = on;
        wire(g);
      },
    })),
    controls: (g, bar) => {
      slider(bar, 'low / mid at', 100, 1000, 10, 400, (v) => { cross = { ...cross, low: v }; g.split.lowFrequency.value = v; shown = { cross, active }; }, (v) => `${v} Hz`);
      slider(bar, 'mid / high at', 1200, 5000, 50, 2500, (v) => { cross = { ...cross, high: v }; g.split.highFrequency.value = v; shown = { cross, active }; }, (v) => `${v} Hz`);
      for (const b of BANDS) checkbox(bar, b, true, (on) => { active = { ...active, [b]: on }; wire(g); shown = { cross, active }; });
    },
    frame: () => {
      const bars = toBars(dft(stage.samples(), rateOf(stage)), BARS, MAX_HZ, -70, MIN_HZ);
      view.draw(bars, colorsFor(shown.cross), [pos(shown.cross.low), pos(shown.cross.high)]);
    },
  });
};

export default mount;
