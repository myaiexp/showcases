// Streaming: complete history stays outside the chart; the chart gets a bounded, keyed window
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

interface Row {
  id: string;
  t: number;
  v: number;
}
const WINDOW = 60;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rows leave on the left and enter on the right; points that stay keep their identity.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const noise = normal(rng(19));
  const history: Row[] = [];
  let level = 50;
  let running = true;
  const push = (): void => {
    level += noise() * 2;
    const t = history.length;
    history.push({ id: `t${t}`, t, v: level + 6 * Math.sin(t / 7) });
  };
  for (let i = 0; i < WINDOW; i++) push();

  const options = () => {
    const rows = history.slice(-WINDOW);
    return {
      definition: defineChart({
        svgAnimation: { duration: 260, easing: 'linear' },
        marks: [lineY(rows, { x: 't', y: 'v', key: 'id', stroke: '#60a5fa', strokeWidth: 2, points: true })],
        scales: { x: { scale: scaleLinear, axis: { label: 'tick' } }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'A rolling window of a stream',
    };
  };
  const host = stage.own(mountChart(stage.box, options()));
  stage.every(stage.preview ? 450 : 350, () => {
    if (!running) return;
    push();
    host.update(options());
    const text = `history ${history.length} rows kept by the app, window ${WINDOW} rows given to the chart`;
    if (readout) readout.textContent = text;
    else stage.say(text);
  });
  if (stage.bar) checkbox(stage.bar, 'running', true, (v) => { running = v; });
  return () => stage.dispose();
};

export default mount;
