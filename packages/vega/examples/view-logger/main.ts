// A custom logger given to the View prints its messages inside the chart
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const levels = { None: vega.None, Error: vega.Error, Warn: vega.Warn, Info: vega.Info, Debug: vega.Debug } as const;
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 0, width: 300, rows: 9, title: 'logger output' });

  const spec: Spec = {
    width: 420,
    height: 130,
    padding: { left: 8, right: 8, top: 8, bottom: 8 },
    signals: [
      { name: 'n', value: 3 },
      // The expression logging calls hand their last argument back, so they wrap the real value.
      { name: 'n2', update: 'n % 4 == 0 ? warn("n is a multiple of four:", n) : n % 2 == 0 ? info("n is even:", n) : debug("n is odd:", n)' },
    ],
    data: [con.data],
    scales: [{ name: 'x', type: 'linear', domain: [0, 12], range: [0, 90] }],
    marks: [
      ...con.marks,
      { type: 'rect', encode: { update: { x: { value: 320 }, width: { signal: 'scale("x", n2)' }, y: { value: 0 }, height: { value: 16 }, fill: { value: 'steelblue' } } } },
      { type: 'text', encode: { update: { x: { value: 320 }, y: { value: 28 }, text: { signal: "'n = ' + n2" }, fill: { value: '#ddd' }, fontSize: { value: 12 } } } },
    ],
  };

  // The logger API the docs require: level, error, warn, info, debug. Arrow functions keep our own
  // state; Vega calls the methods with the view as `this`, which we ignore.
  const sink: string[] = [];
  let level: number = vega.Warn;
  const record = (tag: string, min: number) => (...args: unknown[]) => {
    if (level >= min) sink.push(`${tag} ${args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}`.slice(0, 64));
    return logger;
  };
  const logger = {
    level: (v?: number): unknown => {
      if (v === undefined) return level;
      level = v;
      return logger;
    },
    error: record('ERROR', vega.Error),
    warn: record('WARN ', vega.Warn),
    info: record('INFO ', vega.Info),
    debug: record('DEBUG', vega.Debug),
  };

  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logger } as unknown as ViewOptions));
  view.logLevel(vega.Warn);
  const out = makeConsole(view, stage, 9);
  const step = async (n: number): Promise<void> => {
    sink.length = 0;
    view.signal('n', n);
    await view.runAsync();
    out.push(...sink);
    await out.show();
  };
  await step(4);

  let n = 4;
  if (stage.bar) {
    select(stage.bar, 'view.logLevel', Object.keys(levels) as (keyof typeof levels)[], 'Warn', (v) => void view.logLevel(levels[v]));
    slider(stage.bar, 'n', [0, 12, 1], n, (v) => void step((n = v)));
  }
  if (stage.preview) {
    const seq: [number, number][] = [[4, vega.Warn], [6, vega.Info], [7, vega.Debug], [8, vega.Debug], [9, vega.Info], [12, vega.None]];
    stage.every(1200, (i) => {
      const [value, lv] = seq[i % seq.length] ?? seq[0]!;
      out.push(`-- logLevel ${lv}, n = ${value}`);
      view.logLevel(lv);
      return step(value);
    });
  }
  return () => stage.dispose();
};

export default mount;
