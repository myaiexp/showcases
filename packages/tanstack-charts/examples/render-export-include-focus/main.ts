// includeFocus: the same mounted chart exported without and with its current focus painting
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { serializeChartSvg } from '@tanstack/charts/export';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { blobUrl, checkerImage, svgBlob } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Focus a point with the button, then compare the two exports.' });
  if (stage.preview) stage.height -= 34;
  const imgA = stage.addBox();
  const imgB = stage.addBox();
  let focused = 2;

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true }), crosshair({ x: { label: true } })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const host = stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 360, ariaLabel: 'Revenue' }));
  const showIn = (box: HTMLElement, label: string, includeFocus: boolean): string => {
    const source = serializeChartSvg(stage.box, { includeFocus });
    const wrap = document.createElement('div');
    const cap = document.createElement('div');
    cap.textContent = `${label}: ${source.length} characters`;
    cap.style.fontSize = '11px';
    wrap.append(cap, checkerImage(blobUrl(stage, svgBlob(source)), stage.preview ? 120 : 260));
    box.replaceChildren(wrap);
    return `${label}: ${source.length}`;
  };
  const focusAndExport = (): void => {
    const point = host.getScene().points[focused % revenue.length];
    if (!point) return;
    host.interaction.setControlledFocus(point);
    focused++;
    // The focus ring is painted before the next frame; wait one so it is in the DOM.
    stage.after(80, () => {
      const a = showIn(imgA, 'default', false);
      const b = showIn(imgB, 'includeFocus', true);
      stage.say(`${a} characters, ${b} characters`);
    });
  };
  stage.after(60, focusAndExport);
  if (stage.bar) button(stage.bar, 'focus the next point and export', focusAndExport);
  else stage.every(2400, focusAndExport);
  return () => stage.dispose();
};

export default mount;
