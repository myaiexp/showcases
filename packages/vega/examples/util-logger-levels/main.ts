// logger(level): which of error, warn, info and debug write at each level
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const levels: [string, number][] = [['None', vega.None], ['Error', vega.Error], ['Warn', vega.Warn], ['Info', vega.Info], ['Debug', vega.Debug]];
  const methods = ['error', 'warn', 'info', 'debug'] as const;

  // logger(level, 'log') routes every message through console.log, which we hold for one call at
  // a time so we can see whether anything was written.
  const spoken = (level: number, method: (typeof methods)[number]): boolean => {
    const write = console.log;
    let wrote = false;
    console.log = () => {
      wrote = true;
    };
    try {
      vega.logger(level, 'log')[method]('probe');
    } finally {
      console.log = write;
    }
    return wrote;
  };

  const rows = levels.map(([name, level]) => [`${name} = ${level}`, ...methods.map((m) => (spoken(level, m) ? 'writes' : '·'))]);
  // level(value) sets and returns the logger itself, level() reads it back.
  const lg = vega.logger(vega.Warn);
  rows.push(['logger(Warn).level()', String(lg.level()), '', '', '']);
  lg.level(vega.Debug);
  rows.push(['after level(Debug)', String(lg.level()), '', '', '']);

  const view = await stage.render(
    tableSpec([{ title: 'logger(level)', width: 190 }, ...methods.map((m) => ({ title: `${m}()`, width: 90 }))], rows, { accent: false }),
  );
  revealRows(stage, view, rows.length);
  return () => stage.dispose();
};

export default mount;
