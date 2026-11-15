// formatLocale swaps the default number locale just long enough to build each view
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { numberDefs } from '../../shared/locale-defs.ts';
import { createStage } from '../../shared/stage.ts';

const names = ['en-US', 'de-DE', 'fr-FR', 'de-CH'];
const sample = 1234567.891;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 170,
    padding: 8,
    data: [
      { name: 'sales', values: [{ k: 'North', v: 1840250.5 }, { k: 'South', v: 962410.25 }, { k: 'East', v: 1234567.89 }, { k: 'West', v: 418000 }] },
      {
        name: 'samples',
        values: [
          { spec: ',.2f', v: sample }, { spec: '$,.2f', v: sample }, { spec: '.3s', v: sample }, { spec: ',d', v: 9876543 }, { spec: '.1%', v: 0.4567 }, { spec: '+,.1f', v: 2500.25 },
        ],
      },
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'sales', field: 'k' }, range: 'height', padding: 0.2 },
      { name: 'x', type: 'linear', domain: { data: 'sales', field: 'v' }, nice: true, range: 'width' },
      { name: 'rows', type: 'point', domain: { data: 'samples', field: 'spec' }, range: [10, 150] },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', format: ',.0f', tickCount: 3, labelOverlap: true }],
    marks: [
      { type: 'rect', from: { data: 'sales' }, encode: { update: { y: { scale: 'y', field: 'k' }, height: { scale: 'y', band: 1 }, x: { value: 0 }, x2: { scale: 'x', field: 'v' }, fill: { value: 'steelblue' } } } },
      { type: 'text', from: { data: 'sales' }, encode: { update: { y: { scale: 'y', field: 'k', band: 0.5 }, x: { scale: 'x', field: 'v', offset: -4 }, align: { value: 'right' }, baseline: { value: 'middle' }, text: { signal: "format(datum.v, '$,.2f')" }, fill: { value: '#fff' }, fontSize: { value: 11 } } } },
      // The right-hand list formats the numbers with different specifiers.
      { type: 'text', from: { data: 'samples' }, encode: { update: { x: { signal: 'width + 30' }, text: { signal: "pad(datum.spec, 8) + format(datum.v, datum.spec)" }, y: { signal: 'scale("rows", datum.spec)' }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
    ],
  };
  let view: View | null = null;
  const build = async (name: string): Promise<void> => {
    // New views copy the default locale when they are instantiated, so it only has to be set for that moment.
    api.formatLocale(numberDefs[name] ?? numberDefs['en-US']!);
    try {
      view?.finalize();
      view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
    } finally {
      api.resetDefaultLocale();
    }
    await view.runAsync();
  };
  await build(names[0] ?? 'en-US');
  if (stage.bar) select(stage.bar, 'formatLocale', names, names[0] ?? '', (v) => void build(v));
  if (stage.preview) stage.every(1800, (i) => build(names[i % names.length] ?? 'en-US'));
  return () => stage.dispose();
};

export default mount;
