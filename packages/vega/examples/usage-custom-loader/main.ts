// A loader passed to the View constructor answers every data request
import * as vega from 'vega';
import type { Loader, Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// The pretend server: three "files" made on demand.
const files: Record<string, () => string> = {
  'orders-2023.csv': () => `month,total\n${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => `${m},${30 + ((i * 29) % 55)}`).join('\n')}`,
  'orders-2024.csv': () => `month,total\n${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => `${m},${45 + ((i * 17) % 50)}`).join('\n')}`,
  'orders-live.csv': () => `month,total\n${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => `${m},${Math.round(20 + 70 * Math.abs(Math.sin(i + 2)))}`).join('\n')}`,
};
const names = Object.keys(files);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 178, width: 440, rows: 4, title: 'loader.load calls' });
  const requests: string[] = [];

  // A loader is any object with load, sanitize, http and file. Ours keeps the stage's offline one for the
  // image and link duties and answers load() itself, recording each request.
  const loader: Loader = {
    ...stage.loader,
    load: async (uri: string) => {
      const make = files[uri];
      requests.push(`load('${uri}') ${make ? 'answered from memory' : 'unknown: refused'}`);
      if (!make) throw new Error(`no such file: ${uri}`);
      return make();
    },
  };

  let view: View | null = null;
  const open = async (file: string): Promise<void> => {
    requests.length = 0;
    const spec: Spec = {
      width: 440,
      height: 150,
      padding: 8,
      data: [{ name: 'orders', url: file, format: { type: 'csv', parse: { total: 'number' } } }, con.data],
      // Data arrives after the first pass, so the scales get fixed domains instead of reading it.
      scales: [
        { name: 'x', type: 'band', domain: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], range: 'width', padding: 0.15 },
        { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      ],
      axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
      marks: [{ type: 'rect', from: { data: 'orders' }, encode: { update: { x: { scale: 'x', field: 'month' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'total' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } } } }, ...con.marks],
    };
    view?.finalize();
    // The loader goes in the constructor options: requests start at construction, before any later loader() call.
    view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, loader, logLevel: vega.Warn } as ViewOptions));
    await view.runAsync();
    const out = makeConsole(view, stage, 4);
    out.push(...requests, `data('orders') has ${view.data('orders').length} rows`);
    await out.show();
  };
  await open(names[0] ?? '');
  if (stage.bar) select(stage.bar, 'url in the spec', names, names[0] ?? '', (v) => void open(v));
  if (stage.preview) stage.every(1700, (i) => open(names[i % names.length] ?? ''));
  return () => stage.dispose();
};

export default mount;
