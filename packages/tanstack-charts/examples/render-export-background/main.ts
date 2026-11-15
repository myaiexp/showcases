// The background option: the exported PNG's corner pixel is transparent or filled
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { renderChartImage } from '@tanstack/charts/export';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { checkerImage } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const options: readonly (readonly [string | undefined, string])[] = [
  [undefined, 'none (transparent)'],
  ['#ffffff', 'white'],
  ['#14141a', 'dark'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The checkerboard shows through wherever the PNG is transparent.' });
  if (stage.preview) stage.height -= 34;
  const outBox = stage.addBox();
  const readout = stage.preview ? null : stage.readout();
  let url: string | null = null;
  stage.onDispose(() => url && URL.revokeObjectURL(url));

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#2563eb' })],
    theme: { foreground: '#111827', muted: '#4b5563', grid: '#9ca3af', background: 'transparent', palette: ['#2563eb'] },
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 360, ariaLabel: 'Revenue' }));

  const exportWith = async ([background, label]: (typeof options)[number]): Promise<void> => {
    const blob = await renderChartImage(stage.box, { background, scale: 1 });
    if (stage.disposed) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    outBox.replaceChildren(checkerImage(url, stage.preview ? 150 : 260, true));
    const bitmap = await createImageBitmap(blob);
    const probe = document.createElement('canvas');
    probe.width = probe.height = 1;
    const g = probe.getContext('2d', { willReadFrequently: true })!;
    g.drawImage(bitmap, 0, 0);
    const [r, gr, b, a] = g.getImageData(0, 0, 1, 1).data;
    const text = `background ${label}: top-left pixel rgba(${r}, ${gr}, ${b}, ${((a ?? 0) / 255).toFixed(2)})`;
    if (readout) readout.textContent = text;
    else stage.say(text);
  };
  stage.after(80, () => {
    if (stage.bar) {
      select(stage.bar, 'background', options, (v) => void exportWith(options.find((o) => o[0] === v) ?? options[0]!));
      void exportWith(options[0]!);
    } else stage.cycle(options, 2200, (o) => void exportWith(o));
  });
  return () => stage.dispose();
};

export default mount;
