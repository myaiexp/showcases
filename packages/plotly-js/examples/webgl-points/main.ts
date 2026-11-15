// scattergl draws markers with WebGL: tens of thousands of points stay interactive
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, toggle, readout } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { cloud } from '../../shared/gl-data.ts';

const counts = { '10,000': 10_000, '100,000': 100_000, '1,000,000': 1_000_000 } as const;
type Count = keyof typeof counts;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const info = stage.preview ? null : readout(el);
  const first: Count = stage.preview ? '10,000' : '100,000';

  const draw = async (label: Count, red: boolean): Promise<void> => {
    const t0 = performance.now();
    const { x, y } = cloud(counts[label]);
    const trace: Data = {
      type: 'scattergl',
      mode: 'markers',
      marker: { line: { width: 1, color: red ? 'rgb(0,0,0)' : '#404040' }, ...(red ? { color: 'rgb(152, 0, 0)' } : {}) },
      x: x as unknown as number[],
      y: y as unknown as number[],
    };
    await Plotly.react(stage.div, [trace], { template: stage.template }, stage.config);
    if (info) info.textContent = `${label} points: generated and drawn in ${Math.round(performance.now() - t0)} ms`;
  };
  await draw(first, false);

  if (stage.bar) {
    let label: Count = first;
    let red = false;
    select(stage.bar, 'Points', Object.keys(counts) as Count[], first, (c) => void draw((label = c), red));
    toggle(stage.bar, 'Dark red markers (the 1M example)', false, (on) => void draw(label, (red = on)));
  }
  // The card breathes the marker size and opacity: GPU-only changes, no new data.
  if (stage.preview) stage.every(120, (i) => void restyle(stage.div, { 'marker.size': 4 + 3 * Math.sin(i / 8), 'marker.opacity': 0.6 + 0.35 * Math.cos(i / 11) }));

  return () => stage.dispose();
};

export default mount;
