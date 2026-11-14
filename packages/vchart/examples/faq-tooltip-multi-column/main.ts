// FAQ: a multi-column tooltip built with setTooltipHandler
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const YEARS = ['2012', '2013', '2014', '2015', '2016'];
const TYPES = ['Forest', 'Steppe', 'Desert', 'Wetland'];
const BASE: Record<string, number[]> = {
  Forest: [320, 332, 301, 334, 390],
  Steppe: [220, 182, 191, 234, 290],
  Desert: [150, 232, 201, 154, 190],
  Wetland: [98, 77, 101, 99, 40],
};
const values = YEARS.flatMap((year, i) => TYPES.map((type) => ({ year, type, value: BASE[type]?.[i] ?? 0 })));

const spec: ISpec = {
  type: 'bar',
  data: [{ id: 'land', values }],
  xField: 'year',
  yField: 'value',
  seriesField: 'type',
  stack: true,
  legends: { visible: true, orient: 'top' },
  tooltip: { activeType: ['dimension'] },
};

interface Line {
  datum: Record<string, string | number>[];
  series: { getSeriesStyle: (d: unknown) => (k: string) => string };
}

const mount: Mount = (el, ctx) => {
  const { vchart, release, container } = createChart(el, ctx, spec);
  container.style.position = 'relative';

  const card = document.createElement('div');
  card.style.cssText =
    'position:absolute;left:0;top:0;pointer-events:none;visibility:hidden;padding:8px 10px;border-radius:8px;font-size:12px;' +
    'background:rgba(15,23,42,0.94);border:1px solid #475569;color:#e2e8f0;transition:left .12s,top .12s';
  container.append(card);

  // The three columns are one CSS grid: swatch + name, value, share of the year's total.
  vchart.setTooltipHandler({
    showTooltip: (activeType, data, params) => {
      const event = params.event as { viewX?: number; viewY?: number } | undefined;
      card.style.left = `${(event?.viewX ?? container.clientWidth / 2) + 14}px`;
      card.style.top = `${(event?.viewY ?? 60) + 14}px`;
      if (params.changePositionOnly || activeType !== 'dimension') return;
      const info = (data as { value: string; data: Line[] }[])[0];
      if (!info) return;
      // Every tooltip entry holds the datums of one series at this dimension; flatten them into rows.
      const rows = info.data.flatMap((d) => d.datum.map((datum) => ({ datum, color: d.series.getSeriesStyle(datum)('fill') })));
      const total = rows.reduce((sum, r) => sum + Number(r.datum.value), 0) || 1;
      const cell = 'padding:2px 10px 2px 0';
      card.innerHTML =
        `<div style="font-weight:bold;margin-bottom:4px">${info.value}</div>` +
        '<div style="display:grid;grid-template-columns:auto auto auto;color:#94a3b8"><span>Type</span><span>Value</span><span>Share</span></div>' +
        '<div style="display:grid;grid-template-columns:auto auto auto">' +
        rows
          .map(
            (r) =>
              `<span style="${cell}"><i style="display:inline-block;width:8px;height:8px;margin-right:6px;background:${r.color}"></i>${r.datum.type}</span>` +
              `<span style="${cell}">${r.datum.value}</span><span style="${cell};color:#94a3b8">${((Number(r.datum.value) / total) * 100).toFixed(1)}%</span>`,
          )
          .join('') +
        '</div>';
      card.style.visibility = 'visible';
    },
    hideTooltip: () => {
      card.style.visibility = 'hidden';
    },
    release: () => card.remove(),
  });

  let i = 0;
  // Programmatic tooltips: the preview and the full view both tour the years until the pointer takes over.
  const stop = every(1400, () => {
    i += 1;
    vchart.setDimensionIndex(pick(YEARS, i));
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
