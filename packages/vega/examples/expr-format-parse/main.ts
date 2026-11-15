// Formatting functions: timeParse and utcParse read text with a specifier, null when it doesn't fit
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

// Each choice pairs a string with the specifier that reads it; the last one does not fit.
const pairs: [string, string][] = [
  ['June 30, 2015', '%B %d, %Y'],
  ['2015-06-30', '%Y-%m-%d'],
  ['30/06/15 14:20', '%d/%m/%y %H:%M'],
  ['Tue Jun 30 2015', '%a %b %d %Y'],
  ['2015-W27', '%G-W%V'],
  ['June 30, 2015', '%Y-%m-%d'],
];

const rows: ExprRow[] = [
  { head: 'text and fmt come from the chosen pair' },
  'text',
  'fmt',
  'isValid(utcParse(text, fmt))',
  { expr: 'utcFormat(utcParse(text, fmt), "%Y-%m-%d %H:%M")', label: 'utcFormat(utcParse(text, fmt), "%Y-%m-%d %H:%M")' },
  { expr: 'time(utcParse(text, fmt))', label: 'time(utcParse(text, fmt))' },
  { expr: 'timeFormat(timeParse(text, fmt), "%Y-%m-%d %H:%M")', label: 'timeFormat(timeParse(text, fmt), ...)' },
  { expr: 'dayFormat(utcday(utcParse(text, fmt)))', label: 'dayFormat(utcday(utcParse(text, fmt)))' },
];
const opts = { labelWidth: 320, resultWidth: 190 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'pairs', value: pairs },
      { name: 'pick', value: 0, bind: { input: 'select', options: [0, 1, 2, 3, 4, 5], labels: pairs.map(([t, f]) => `${t}  (${f})`) } },
      { name: 'text', update: 'pairs[pick][0]' },
      { name: 'fmt', update: 'pairs[pick][1]' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'pick', [0, 1, 2, 3, 4, 5], 1200);
  return () => stage.dispose();
};

export default mount;
