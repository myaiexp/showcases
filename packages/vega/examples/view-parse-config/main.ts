// vega.parse(spec, config): the config styles a spec, its own config wins
import * as vega from 'vega';
import type { Config, Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const row = stage.options.container;
  row.style.display = 'flex';
  row.style.gap = '12px';
  const rand = rng(77);
  const fresh = (): { k: string; v: number }[] => ['a', 'b', 'c', 'd'].map((k) => ({ k, v: Math.round(25 + rand() * 70) }));

  // One spec, no colours of its own: everything below comes from the config it is parsed with.
  const base: Spec = {
    width: 130,
    height: 110,
    padding: 6,
    data: [{ name: 'table', values: fresh() }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.2 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'c', type: 'ordinal', domain: { data: 'table', field: 'k' }, range: 'category' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 3, grid: true }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'c', field: 'k' } } } }],
  };
  const themed: Config = vega.mergeConfig(stage.config, { range: { category: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'] }, axis: { gridColor: '#7c5a1d', gridDash: [3, 3] } });
  const own: Spec = { ...base, config: { range: { category: ['#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7'] } } };

  const panes: { title: string; code: string; spec: Spec; config: Config }[] = [
    { title: 'dark config only', code: 'parse(spec, config)', spec: base, config: stage.config },
    { title: 'merged config', code: 'parse(spec, mergeConfig(\n  config, {range, axis}))', spec: base, config: themed },
    { title: "spec's own config wins", code: 'parse(specWithConfig,\n  mergedConfig)', spec: own, config: themed },
  ];
  const views: View[] = [];
  for (const p of panes) {
    const wrap = document.createElement('div');
    const host = document.createElement('div');
    const cap = document.createElement('pre');
    cap.style.cssText = 'margin:4px 0 0;font-size:10.5px;color:var(--fg-2);white-space:pre';
    cap.textContent = `${p.title}\n${p.code}`;
    wrap.append(host, cap);
    row.append(wrap);
    const view = stage.adopt(new vega.View(vega.parse(p.spec, p.config), { loader: stage.loader, logLevel: vega.Warn, renderer: 'canvas', container: host, bind: stage.options.bind } as ViewOptions));
    views.push(view);
  }
  await Promise.all(views.map((v) => v.runAsync()));

  const redraw = async (): Promise<void> => {
    const rows = fresh();
    for (const v of views) v.data('table', rows);
    await Promise.all(views.map((v) => v.runAsync()));
  };
  stage.every(stage.preview ? 1300 : 2200, redraw);
  return () => stage.dispose();
};

export default mount;
