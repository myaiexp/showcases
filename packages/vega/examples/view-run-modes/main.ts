// run() returns at once, runAsync() a promise, runAfter() waits for the run
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 0, width: 400, rows: 9, title: 'order of events' });

  const spec: Spec = {
    width: 400,
    height: 160,
    padding: 8,
    signals: [{ name: 'n', value: 20 }],
    data: [con.data],
    marks: [
      ...con.marks,
      { type: 'rect', encode: { update: { x: { value: 0 }, y: { value: 150 }, height: { value: 10 }, width: { signal: 'n * 4' }, fill: { value: 'steelblue' } } } },
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 9);

  const t0 = performance.now();
  const log = (what: string): void => out.push(`${String(Math.round(performance.now() - t0)).padStart(5)} ms  ${what}`);
  // The listener fires in the middle of evaluation; runAfter() defers its callback until that finishes.
  view.addSignalListener('n', (_name, value) => {
    log(`signal listener sees n = ${String(value)} (mid-evaluation)`);
    view.runAfter(() => log('runAfter callback (evaluation finished)'));
  });

  let busy = false;
  const demo = async (next: number): Promise<void> => {
    if (busy || stage.disposed) return;
    busy = true;
    out.clear();
    view.signal('n', next);
    log('signal set; calling view.run()');
    const returned = view.run();
    log(`run() returned the view synchronously: ${returned === view}`);
    log('calling view.runAsync(null, prerun, postrun)');
    // The typings declare runAsync() without arguments; the docs give it (encode, prerun, postrun).
    const runAsync = view.runAsync.bind(view) as (encode: null, pre: () => void, post: () => void) => Promise<unknown>;
    const pending = runAsync(
      null,
      () => log('prerun callback'),
      () => log('postrun callback'),
    );
    log('runAsync() returned a promise; not yet resolved');
    await pending;
    log('await runAsync() resolved');
    await out.show();
    busy = false;
  };
  let value = 20;
  if (stage.bar) button(stage.bar, 'Run the sequence', () => void demo((value = 10 + ((value * 7) % 90))));
  if (stage.preview) stage.every(2600, (i) => demo(20 + ((i * 29) % 90)));
  else await demo(60);
  return () => stage.dispose();
};

export default mount;
