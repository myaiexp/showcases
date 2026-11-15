// serializeChartSvg: a mounted chart becomes a standalone SVG string at a chosen size
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { serializeChartSvg } from '@tanstack/charts/export';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { blobUrl, checkerImage, clip, codeBox, pane, svgBlob } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const sizes = [[640, 320], [1200, 600], [1200, 675]] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The chart is mounted; the image beside the text is its serialized clone.' });
  if (stage.preview) stage.height -= 34;
  stage.box.style.minWidth = '0';
  const outBox = stage.addBox();
  const code = stage.preview ? null : codeBox(pane(stage, 'serializeChartSvg result'), '', 120);

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 400, ariaLabel: 'Revenue' }));

  const exportAt = ([w, h]: readonly [number, number]): void => {
    const source = serializeChartSvg(stage.box, { width: w, height: h });
    outBox.replaceChildren(checkerImage(blobUrl(stage, svgBlob(source)), stage.preview ? 150 : 300));
    if (code) code.textContent = clip(source, 500);
    stage.say(`export ${w} x ${h}: ${source.length} characters, xmlns ${source.includes('xmlns="http://www.w3.org/2000/svg"') ? 'present' : 'missing'}`);
  };
  stage.after(60, () => {
    if (stage.bar) {
      select(stage.bar, 'export size', sizes.map((s) => [s, `${s[0]} x ${s[1]}`] as const), exportAt);
      exportAt(sizes[0]);
    } else stage.cycle(sizes, 2200, exportAt);
  });
  return () => stage.dispose();
};

export default mount;
