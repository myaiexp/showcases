// EQ3: three gain knobs, low, mid and high, reshape the balance of a drum loop
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SETTINGS = {
  flat: [0, 0, 0],
  'bass up': [10, 0, 0],
  'mid scoop': [0, -18, 0],
  'treble up': [0, 0, 10],
} as const;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];
const BANDS = ['low', 'mid', 'high'] as const;

/** Three bars growing right (boost) or left (cut) from a centre line, in dB. */
function bars(parent: HTMLElement): (db: readonly number[]) => void {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:5px;width:min(420px,92%);margin:0 auto 6px;flex:0 0 auto';
  const fills = BANDS.map((band) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;font:600 11px/1 ui-monospace,monospace;color:var(--fg-2)';
    const name = document.createElement('span');
    name.style.cssText = 'width:84px';
    const track = document.createElement('div');
    track.style.cssText = 'position:relative;flex:1;height:10px;border-radius:5px;background:var(--bg-surface);border:1px solid var(--border)';
    const mid = document.createElement('div');
    mid.style.cssText = 'position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:var(--fg-3)';
    const fill = document.createElement('div');
    fill.style.cssText = 'position:absolute;top:1px;bottom:1px;background:#7aa2ff;border-radius:4px';
    track.append(fill, mid);
    row.append(name, track);
    wrap.append(row);
    return { name, fill, band };
  });
  parent.append(wrap);
  return (db) =>
    fills.forEach(({ name, fill, band }, i) => {
      const v = db[i] ?? 0;
      const half = Math.min(50, (Math.abs(v) / 20) * 50);
      name.textContent = `${band} ${v > 0 ? '+' : ''}${v} dB`;
      fill.style.left = `${v >= 0 ? 50 : 50 - half}%`;
      fill.style.width = `${half}%`;
    });
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const setBars = bars(stage.visual);
  setBars([0, 0, 0]);
  const read = (eq: Tone.EQ3): number[] => [eq.low.value, eq.mid.value, eq.high.value];

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['EQ3'],
    caption: 'EQ3: low below 400 Hz, high above 2500 Hz',
    create: (src: Source) => {
      const eq = new Tone.EQ3({ low: 0, mid: 0, high: 0 }).toDestination();
      src.out.gain.value = 0.3;
      src.out.connect(eq);
      return eq;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: `${name}: low ${SETTINGS[name][0]}, mid ${SETTINGS[name][1]}, high ${SETTINGS[name][2]} dB`,
      apply: (eq: Tone.EQ3) => {
        [eq.low.value, eq.mid.value, eq.high.value] = SETTINGS[name];
      },
    })),
    onPlay: (eq, time) => {
      const now = read(eq);
      stage.show(time, () => setBars(now));
    },
    controls: (eq, bar) => {
      for (const band of BANDS) {
        slider(bar, band, -20, 20, 1, 0, (v) => {
          eq[band].value = v;
          setBars(read(eq));
        }, (v) => `${v} dB`);
      }
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
