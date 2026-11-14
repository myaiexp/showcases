// Card stand-in for a pointer: hovers data points in turn so tooltips show
import type { ActiveElement, Chart } from 'chart.js';

/**
 * Cards get no pointer events, so a hover example would sit still. This walks through
 * the chart's points and activates each one the way api.md § setActiveElements describes,
 * for both the hover styling and the tooltip. `points` defaults to every data index of
 * the first visible dataset; pass a list to hover several datasets at once (index mode).
 */
export function autoHover(
  chart: Chart,
  ms = 1400,
  points?: (step: number) => { datasetIndex: number; index: number }[],
): () => void {
  let step = 0;
  const pick =
    points ??
    ((s: number) => {
      const meta = chart.getSortedVisibleDatasetMetas()[0];
      const n = meta?.data.length ?? 0;
      return meta && n ? [{ datasetIndex: meta.index, index: s % n }] : [];
    });
  const tick = (): void => {
    const active = pick(step++);
    chart.setActiveElements(active);
    // The tooltip needs an event position; the first active element's centre stands in.
    const first = active[0];
    const el = first ? (chart.getDatasetMeta(first.datasetIndex).data[first.index] as ActiveElement['element'] | undefined) : undefined;
    chart.tooltip?.setActiveElements(active, { x: el?.x ?? 0, y: el?.y ?? 0 });
    chart.update();
  };
  tick();
  const id = window.setInterval(tick, ms);
  return () => window.clearInterval(id);
}
