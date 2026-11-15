// The View locale option gives each view its own locale; vega.locale() formats
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { numberDefs, timeDefs, type NumberDef, type TimeDef } from '../../shared/locale-defs.ts';
import { createStage } from '../../shared/stage.ts';

// A null definition keeps the current default for that half of the locale.
const choices: Record<string, [string | null, string | null]> = {
  'de-DE (both)': ['de-DE', 'de-DE'],
  'fr-FR (both)': ['fr-FR', 'fr-FR'],
  'de-CH numbers, default time': ['de-CH', null],
  'default numbers, es-ES time': [null, 'es-ES'],
};
const names = Object.keys(choices);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const row = stage.options.container;
  row.style.display = 'flex';
  row.style.gap = '18px';

  const spec: Spec = {
    width: 210,
    height: 120,
    padding: 6,
    data: [{ name: 'series', values: Array.from({ length: 8 }, (_, m) => ({ t: new Date(2024, m, 1).getTime(), v: 1200 + 90000 * (1 + Math.sin(m / 1.4)) })) }],
    scales: [
      { name: 'x', type: 'time', domain: { data: 'series', field: 't' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 200000], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 4, labelOverlap: true }, { orient: 'left', scale: 'y', format: '$,.0f', tickCount: 4 }],
    marks: [{ type: 'area', from: { data: 'series' }, encode: { update: { x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.5 }, stroke: { value: 'steelblue' } } } }],
  };

  // Each pane holds a view and a caption made by calling the combined locale's own methods.
  const panes = [0, 1].map(() => {
    const pane = document.createElement('div');
    const host = document.createElement('div');
    const cap = document.createElement('pre');
    cap.style.cssText = 'margin:4px 0 0;font-size:11px;color:var(--fg-2);white-space:pre';
    pane.append(host, cap);
    row.append(pane);
    return { host, cap, view: null as View | null };
  });

  type Defs = { number: NumberDef | null; time: TimeDef | null };
  const build = async (i: number, defs: Defs): Promise<void> => {
    const pane = panes[i];
    if (!pane) return;
    pane.view?.finalize();
    // The View option takes the two definitions as {number, time} (either may be left out); the
    // combined object api.locale() makes is for calling format methods directly, as the caption does.
    const locale = { ...(defs.number ? { number: defs.number } : {}), ...(defs.time ? { time: defs.time } : {}) };
    const combined = api.locale(defs.number, defs.time);
    const options = { logLevel: vega.Warn, loader: stage.loader, locale, container: pane.host, bind: stage.options.bind } as unknown as ViewOptions;
    pane.view = stage.adopt(new vega.View(vega.parse(spec, stage.config), options));
    pane.cap.textContent = `format(',.2f')(1234567.891)\n  ${combined.format(',.2f')(1234567.891)}\ntimeFormat('%A %B')(date)\n  ${combined.timeFormat('%A %B')(new Date(2024, 2, 14))}`;
    await pane.view.runAsync();
  };
  const make = (key: string): Defs => {
    const [n, t] = choices[key] ?? choices[names[0] ?? '']!;
    return { number: n ? (numberDefs[n] ?? null) : null, time: t ? (timeDefs[t] ?? null) : null };
  };
  await build(0, { number: numberDefs['en-US'] ?? null, time: timeDefs['en-US'] ?? null });
  await build(1, make(names[0] ?? ''));
  if (stage.bar) select(stage.bar, 'right view', names, names[0] ?? '', (v) => void build(1, make(v)));
  if (stage.preview) stage.every(1800, (i) => build(1, make(names[i % names.length] ?? '')));
  return () => stage.dispose();
};

export default mount;
