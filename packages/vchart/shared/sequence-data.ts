// Seeded request-trace data for the sequence chart examples: services as rows, events as dots on time
import VChart from '@visactor/vchart';
import { registerSequenceChart } from '@visactor/vchart-extension';
import type { ISpec } from './chart.ts';
import { rng } from './components-data.ts';

// Since VChart 2.2 the sequence chart (and its dot and link series) live in the extension package.
registerSequenceChart({ VChart });

export const SERVICES = ['gateway', 'auth', 'orders', 'payments', 'inventory'];
export const T0 = Date.UTC(2026, 10, 14, 9, 0, 0);
export const MINUTE = 60_000;

export interface Dot {
  event_time: number;
  node_name: string;
  event_type: string;
}
export interface Row {
  service: string;
  type: string;
  dots: Dot[];
}
export interface Link {
  from: string;
  to: string;
  link_type: string;
}

/** One row per service; each has 3 to 5 events between 09:00 and 10:00. Links join events of neighbouring services. */
export function trace(seed = 6): { rows: Row[]; links: Link[] } {
  const r = rng(seed);
  const types = ['request', 'response', 'retry', 'error'];
  const rows: Row[] = SERVICES.map((service, si) => {
    const n = 3 + Math.floor(r() * 3);
    const dots = Array.from({ length: n }, (_, i): Dot => {
      const event_type = i === 0 ? 'request' : (types[Math.floor(r() * 4)] as string);
      return {
        event_time: T0 + Math.round(((si * 2 + i * 9 + r() * 6) % 58) * MINUTE),
        node_name: `${service}_${i}_${event_type}`,
        event_type,
      };
    });
    return { service, type: service, dots: dots.sort((a, b) => a.event_time - b.event_time) };
  });
  const links: Link[] = [];
  rows.forEach((row, si) => {
    const next = rows[si + 1];
    if (!next) return;
    row.dots.slice(0, 3).forEach((d, i) => {
      const to = next.dots[i];
      if (to) links.push({ from: d.node_name, to: to.node_name, link_type: i % 2 === 0 ? 'call' : 'callback' });
    });
  });
  return { rows, links };
}

/** The time axis the guide uses: a time-typed top axis with two label layers. */
export function timeAxis(): object {
  return {
    orient: 'top',
    type: 'time',
    range: { min: T0 - 2 * MINUTE, max: T0 + 62 * MINUTE },
    layers: [
      { tickStep: 15 * MINUTE, timeFormat: '%H:%M' },
      { tickStep: 60 * MINUTE, timeFormat: '%Y-%m-%d' },
    ],
  };
}

/** The dot + link series pair; `link` is bound to the dot series at index 1 by dotSeriesIndex. */
export function dotLinkSeries(extra: { link?: object; dot?: object } = {}, preview = false): object[] {
  return [
    {
      type: 'link',
      dataId: 'links',
      dotSeriesIndex: 1,
      fromField: 'from',
      toField: 'to',
      dotTypeField: 'link_type',
      ...extra.link,
    },
    {
      type: 'dot',
      dataId: 'dots',
      xField: 'event_time',
      yField: 'service',
      titleField: 'service',
      dotTypeField: 'event_type',
      highLightSeriesGroup: '',
      height: preview ? 70 : 200,
      clipHeight: 400,
      title: { style: { fill: '#ddd', fontSize: preview ? 9 : 12 } },
      subTitle: { visible: false, style: {} },
      // The symbol is the row marker drawn beside the title.
      symbol: { style: { dx: -20 } },
      grid: { style: { stroke: '#555' } },
      ...extra.dot,
    },
  ];
}

/** A card has room for about three rows: keep the first `n` services and the links between them. */
export function fit(data: { rows: Row[]; links: Link[] }, preview: boolean, n = 3): { rows: Row[]; links: Link[] } {
  if (!preview) return data;
  const rows = data.rows.slice(0, n);
  const names = new Set(rows.flatMap((r) => r.dots.map((d) => d.node_name)));
  return { rows, links: data.links.filter((l) => names.has(l.from) && names.has(l.to)) };
}

/** Chart-level frame: padding for the row titles, and no scroll bar in a 200px card. */
export function frame(preview: boolean): object {
  return { appendPadding: { left: preview ? 70 : 100, right: 20 }, ...(preview ? { scrollBar: [{ visible: false }] } : {}) };
}

/** Counts per five-minute bucket for the bar series: { start_time, end_time, value }. */
export function buckets(seed = 1, scale = 10): { start_time: number; end_time: number; value: number }[] {
  const r = rng(seed);
  return Array.from({ length: 12 }, (_, i) => ({
    start_time: T0 + i * 5 * MINUTE,
    end_time: T0 + (i + 1) * 5 * MINUTE,
    value: Math.round(r() * scale),
  }));
}

export const asSpec = (spec: object): ISpec => spec as ISpec;
