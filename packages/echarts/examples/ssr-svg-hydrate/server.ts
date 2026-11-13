// Stands in for the server: renders an option to an SVG string with SSR mode on
import type { EChartsOption } from 'echarts';
import { echarts } from '../../shared/chart.ts';

/**
 * What the server code in the SSR guide does: init with no container, the SVG renderer,
 * `ssr: true` and an explicit size, then setOption and renderToSVGString(). Nothing here
 * touches the page, so this function could run unchanged in Node.js.
 */
export function renderOnServer(option: EChartsOption, width: number, height: number): string {
  const chart = echarts.init(null, 'dark', { renderer: 'svg', ssr: true, width, height });
  chart.setOption(option);
  const svg = chart.renderToSVGString();
  chart.dispose();
  return svg;
}
