// view.signal gets and sets; addSignalListener and removeSignalListener watch
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 70, width: 430, rows: 7, title: 'view API calls' });

  const spec: Spec = {
    width: 430,
    height: 180,
    padding: 8,
    signals: [
      { name: 'x', value: 40, bind: { input: 'range', min: 0, max: 100, step: 1 } },
      { name: 'double', update: '2 * x' },
    ],
    data: [con.data],
    scales: [{ name: 'p', type: 'linear', domain: [0, 100], range: [0, 430] }],
    marks: [
      { type: 'rule', encode: { enter: { x: { value: 0 }, x2: { value: 430 }, y: { value: 30 }, stroke: { value: '#3b4252' } } } },
      { type: 'symbol', encode: { update: { x: { scale: 'p', signal: 'x' }, y: { value: 30 }, size: { value: 260 }, fill: { value: '#f59e0b' } } } },
      { type: 'text', encode: { update: { x: { scale: 'p', signal: 'x' }, y: { value: 54 }, align: { value: 'center' }, text: { signal: "'x = ' + x + '   double = ' + double" }, fill: { value: '#ddd' }, fontSize: { value: 11 } } } },
      ...con.marks,
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 7);

  // The handler gets (name, value) when the signal changes during a run. Showing the log needs another
  // run, so it is scheduled for after this one (out.soon).
  const heard = (name: string, value: unknown): void => {
    out.push(`listener: ${name} changed to ${JSON.stringify(value)}`);
    out.soon();
  };
  let listening = false;
  const listen = (on: boolean): void => {
    if (on === listening) return;
    listening = on;
    if (on) view.addSignalListener('x', heard);
    else view.removeSignalListener('x', heard);
    out.push(on ? "addSignalListener('x', heard)" : "removeSignalListener('x', heard)");
    out.soon();
  };
  const set = async (v: number): Promise<void> => {
    // signal(name, value) only records the value; nothing changes on screen until runAsync.
    view.signal('x', v);
    out.push(`signal('x', ${v}), then runAsync;  signal('double') = ${view.signal('double')}`);
    await view.runAsync();
    out.push(`after the run: signal('double') = ${view.signal('double')}`);
    await out.show();
  };
  listen(true);
  if (stage.bar) {
    toggle(stage.bar, 'listener attached', true, listen);
    button(stage.bar, 'view.signal("x", random)', () => void set(Math.round(Math.random() * 100)));
  }
  if (stage.preview) {
    stage.every(1100, (i) => {
      if (i % 5 === 0) listen(!listening);
      return set([15, 80, 55, 30, 95][i % 5] ?? 40);
    });
  }
  return () => stage.dispose();
};

export default mount;
