// renderChartImage: SVG chart to PNG blob, shown as an image, with scale and background
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { renderChartImage } from '@tanstack/charts/export';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { checkerImage } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The image is decoded from the PNG blob. Its pixel size is the chart size times the scale.' });
  if (stage.preview) stage.height -= 34;
  const outBox = stage.addBox();
  const readout = stage.preview ? null : stage.readout();
  let url: string | null = null;
  stage.onDispose(() => url && URL.revokeObjectURL(url));

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 360, ariaLabel: 'Revenue' }));

  const exportAt = async (scale: number): Promise<void> => {
    const blob = await renderChartImage(stage.box, { scale, background: '#14141a', type: 'image/png' });
    if (stage.disposed) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    const img = checkerImage(url, stage.preview ? 150 : 300);
    outBox.replaceChildren(img);
    await img.decode().catch(() => undefined);
    const text = `scale ${scale}: ${blob.type}, ${blob.size.toLocaleString('en-US')} bytes, decoded ${img.naturalWidth} x ${img.naturalHeight} px`;
    if (readout) readout.textContent = text;
    else stage.say(text);
  };
  stage.after(80, () => {
    if (stage.bar) {
      slider(stage.bar, 'scale', 1, 4, 1, 2, (v) => void exportAt(v), (v) => `${v}x`);
      void exportAt(2);
    } else stage.cycle([1, 2, 3], 2400, (v) => void exportAt(v));
  });
  return () => stage.dispose();
};

export default mount;
