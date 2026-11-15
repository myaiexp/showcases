// String functions: split, replace, parseFloat, parseInt and join turn a text into numbers
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const texts = ['12, 7.5, abc, 40px, -3', 'a-b-c-d-e', '1e3; 0x1F; 010; 2.50kg', 'one two  three'];

const rows: ExprRow[] = [
  { head: 'parts = split(text, sep)' },
  'text',
  'split(text, sep)',
  'length(split(text, sep))',
  'split(text, sep, 2)',
  'parseFloat(parts[1])',
  'parseInt(parts[3])',
  'isNaN(parseFloat(parts[2]))',
  { head: 'replace: a string pattern changes only the first match' },
  'replace(text, "-", "+")',
  'replace(text, regexp("[0-9]", "g"), "#")',
  'replace(text, regexp("\\\\s+", "g"), "_")',
  'join(split(text, sep), " | ")',
];
const opts = { labelWidth: 270, resultWidth: 220 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'text', value: texts[0], bind: { input: 'select', options: texts } },
      { name: 'sep', value: ',', bind: { input: 'select', options: [',', '-', ';', ' '] } },
      { name: 'parts', update: 'split(text, sep)' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const seps = [',', '-', ';', ' '];
    stage.every(1300, (i) => {
      view.signal('text', texts[i % 4]);
      view.signal('sep', seps[i % 4]);
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
