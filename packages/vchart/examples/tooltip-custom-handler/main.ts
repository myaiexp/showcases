// setTooltipHandler: replace the built-in tooltip with a DOM card of our own
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const REGIONS = ['North', 'South', 'East'];

const spec: ISpec = {
  type: 'line',
  data: [{ id: 'trend', values: groupedRows(QUARTERS, REGIONS, 33) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  tooltip: { activeType: ['dimension'] },
};

interface Row {
  name: string;
  value: number;
  color: string;
}

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, spec);
  container.style.position = 'relative';

  // The card is ours: VChart no longer renders or hosts it (api/vchart.md § setTooltipHandler).
  const card = document.createElement('div');
  card.style.cssText =
    'position:absolute;left:0;top:0;pointer-events:none;visibility:hidden;min-width:150px;padding:8px 10px;border-radius:8px;' +
    'background:rgba(15,23,42,0.92);border:1px solid #475569;font-size:12px;color:#e2e8f0;transition:left .12s,top .12s';
  container.append(card);

  const draw = (title: string, rows: Row[]): void => {
    const max = Math.max(...rows.map((r) => r.value), 1);
    card.innerHTML =
      `<div style="font-weight:bold;margin-bottom:6px">${title}</div>` +
      rows
        .map(
          (r) =>
            `<div style="display:flex;align-items:center;gap:6px;margin-top:3px"><span style="width:50px">${r.name}</span>` +
            `<span style="height:6px;border-radius:3px;background:${r.color};width:${(r.value / max) * 70}px"></span><span>${r.value}</span></div>`,
        )
        .join('');
  };

  vchart.setTooltipHandler({
    showTooltip: (activeType, data, params) => {
      const event = params.event as { viewX?: number; viewY?: number } | undefined;
      // Programmatic shows carry no pointer, so park the card in the plot area instead.
      card.style.left = `${(event?.viewX ?? container.clientWidth / 2) + 14}px`;
      card.style.top = `${(event?.viewY ?? 70) + 14}px`;
      if (params.changePositionOnly) return;
      if (activeType === 'dimension') {
        const info = (data as { value: string; data: { datum: Record<string, number | string>[]; series: { getSeriesStyle: (d: unknown) => (k: string) => string } }[] }[])[0];
        if (!info) return;
        draw(
          info.value,
          info.data.map((d) => {
            const datum = d.datum[0] ?? {};
            return { name: String(datum.c), value: Number(datum.y), color: d.series.getSeriesStyle(datum)('stroke') };
          }),
        );
      }
      card.style.visibility = 'visible';
    },
    hideTooltip: () => {
      card.style.visibility = 'hidden';
    },
    release: () => {
      card.remove();
    },
  });

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1200, () => {
      i += 1;
      vchart.setDimensionIndex(pick(QUARTERS, i));
    });
  }

  return () => {
    stop();
    release();
  };
};

export default mount;
