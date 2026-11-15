// timeFormatLocale: month and day names follow the locale on the axis and in text
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { timeDefs } from '../../shared/locale-defs.ts';
import { createStage } from '../../shared/stage.ts';

const names = ['en-US', 'fr-FR', 'de-DE', 'es-ES'];
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const months = Array.from({ length: 12 }, (_, m) => ({ t: new Date(2024, m, 15).getTime(), v: 40 + 18 * Math.sin(m / 1.9) + m }));
  const spec: Spec = {
    width: 300,
    height: 150,
    padding: 8,
    data: [
      { name: 'series', values: months },
      {
        name: 'dates',
        values: [{ spec: '%A %e %B %Y' }, { spec: '%a %b %d' }, { spec: '%B' }, { spec: '%x' }, { spec: '%c' }],
      },
    ],
    scales: [
      { name: 'x', type: 'time', domain: { data: 'series', field: 't' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 80], range: 'height' },
      { name: 'rows', type: 'point', domain: { data: 'dates', field: 'spec' }, range: [12, 140] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 6, labelOverlap: true }, { orient: 'left', scale: 'y', tickCount: 4 }],
    marks: [
      { type: 'line', from: { data: 'series' }, encode: { update: { x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'v' }, stroke: { value: '#f59e0b' }, strokeWidth: { value: 2 } } } },
      { type: 'text', from: { data: 'dates' }, encode: { update: { x: { signal: 'width + 24' }, y: { scale: 'rows', field: 'spec' }, baseline: { value: 'middle' }, text: { signal: "pad(datum.spec, 13) + timeFormat(datetime(2024, 2, 14, 15, 45), datum.spec)" }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    ],
  };

  let view: View | null = null;
  const build = async (name: string): Promise<void> => {
    // The default locale only needs to be the wanted one while the view is instantiated.
    api.timeFormatLocale(timeDefs[name] ?? timeDefs['en-US']!);
    try {
      view?.finalize();
      view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
    } finally {
      api.resetDefaultLocale();
    }
    await view.runAsync();
  };
  await build(names[0] ?? 'en-US');
  if (stage.bar) select(stage.bar, 'timeFormatLocale', names, names[0] ?? '', (v) => void build(v));
  if (stage.preview) stage.every(1800, (i) => build(names[i % names.length] ?? 'en-US'));
  return () => stage.dispose();
};

export default mount;
