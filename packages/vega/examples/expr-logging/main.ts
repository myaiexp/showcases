// Logging functions: warn, info and debug return their last argument and write to the console behind a switch
import type { Spec, View } from 'vega';
import * as vega from 'vega';
import type { Mount } from '@/types.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

// Nothing here logs until the "log" box is ticked in the full view; open the browser console and tick it.
const rows: ExprRow[] = [
  { head: 'each call returns its last argument' },
  { expr: 'log ? warn("warn", n, n * 2) : "off"', label: 'warn("warn", n, n * 2)' },
  { expr: 'log ? info("info", n, n * 3) : "off"', label: 'info("info", n, n * 3)' },
  { expr: 'log ? debug("debug", n, n * 4) : "off"', label: 'debug("debug", n, n * 4)' },
  { head: 'a logging call inside a larger expression' },
  { expr: 'log ? info("n is", n) + 100 : n + 100', label: 'info("n is", n) + 100' },
];
const opts = { labelWidth: 230, resultWidth: 110 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 340,
    height: rows.length * 18,
    padding: 8,
    signals: [
      { name: 'log', value: false, bind: { input: 'checkbox' } },
      { name: 'n', value: 7, bind: { input: 'range', min: 1, max: 20, step: 1 } },
    ],
    marks: exprMarks(rows, opts),
  };

  const view: View = await stage.render(spec);
  // Messages only show at or above the view's log level, so raise it to debug for the full view,
  // after the first run: the switch is off then, and a mounted page stays quiet. Cards never log.
  if (!stage.preview) view.logLevel(vega.Debug);
  return () => stage.dispose();
};

export default mount;
