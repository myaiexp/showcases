// defaultChartTheme against a platform default theme given to the runtime
import { barY, createChartRuntime, defaultChartTheme, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: the library default theme. Right: the same builder under a platform theme.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const right = stage.addBox();
  let seen = '';

  // The builder gets the runtime's default theme in its context.
  const definition = defineChart(({ defaultTheme }) => {
    seen = `builder saw foreground ${defaultTheme.foreground}, background ${defaultTheme.background}`;
    return {
      marks: [barY(revenue, { x: 'month', y: 'revenue' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    };
  });
  const platform = { foreground: '#0f172a', muted: '#475569', grid: '#cbd5e1', background: '#f1f5f9', palette: ['#0284c7'] };

  const plain = createChartRuntime<Revenue, string, number>();
  const themed = createChartRuntime<Revenue, string, number>({ defaultTheme: platform });
  stage.onDispose(() => {
    plain.destroy();
    themed.destroy();
  });
  const a = plain.render(definition, { width: 320, height: stage.height });
  const seenPlain = seen;
  const b = themed.render(definition, { width: 320, height: stage.height });
  stage.box.innerHTML = renderChartSvg(a, { ariaLabel: 'Default theme', idPrefix: stage.id('dt-a') });
  right.innerHTML = renderChartSvg(b, { ariaLabel: 'Platform theme', idPrefix: stage.id('dt-b') });
  const text = `defaultChartTheme: foreground ${defaultChartTheme.foreground}, background ${defaultChartTheme.background}, ${defaultChartTheme.palette.length} palette entries\nplain runtime: ${seenPlain}\nthemed runtime: ${seen}\nscene.theme.background: ${a.theme.background} against ${b.theme.background}`;
  if (readout) readout.textContent = text;
  else stage.say('plain: currentColor on transparent; themed: slate on light');
  return () => stage.dispose();
};

export default mount;
