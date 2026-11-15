// Requested against delivered image type, and the byte size each encoder produces
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { renderChartImage } from '@tanstack/charts/export';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { checkerImage } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

type Kind = 'image/png' | 'image/jpeg' | 'image/webp';
const kinds: readonly Kind[] = ['image/png', 'image/jpeg', 'image/webp'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the requested type with the delivered one; filenames should follow the delivered type.' });
  if (stage.preview) stage.height -= 34;
  const outBox = stage.addBox();
  const readout = stage.preview ? null : stage.readout();
  let url: string | null = null;
  stage.onDispose(() => url && URL.revokeObjectURL(url));
  const state = { type: 'image/png' as Kind, quality: 0.8 };

  const definition = defineChart({
    marks: [areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.3 }), lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 360, ariaLabel: 'Revenue' }));

  const exportNow = async (): Promise<void> => {
    // JPEG has no alpha channel, so give every export an opaque background.
    const blob = await renderChartImage(stage.box, { type: state.type, quality: state.quality, background: '#14141a', scale: 2 });
    if (stage.disposed) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    outBox.replaceChildren(checkerImage(url, stage.preview ? 150 : 280));
    const text = `requested ${state.type}${state.type === 'image/png' ? '' : ` at quality ${state.quality}`}\ndelivered ${blob.type}, ${blob.size.toLocaleString('en-US')} bytes${blob.type === state.type ? '' : '  (the browser used another encoder)'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replace('\n', ', '));
  };
  stage.after(80, () => {
    if (stage.bar) {
      select(stage.bar, 'type', kinds.map((k) => [k, k] as const), (k) => { state.type = k; void exportNow(); });
      slider(stage.bar, 'quality', 0.1, 1, 0.1, state.quality, (v) => { state.quality = v; void exportNow(); }, (v) => v.toFixed(1));
      void exportNow();
    } else stage.cycle(kinds, 2400, (k) => { state.type = k; void exportNow(); });
  });
  return () => stage.dispose();
};

export default mount;
