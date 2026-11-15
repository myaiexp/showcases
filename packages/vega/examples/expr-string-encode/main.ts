// String functions: btoa, atob and encodeURIComponent, and the lengths they change
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

// btoa only takes Latin-1 text, so the choices stay inside it.
const texts = ['Hello, Vega!', 'a b&c=d/e?f', 'café au lait', '{"x": [1, 2]}'];

const rows: ExprRow[] = [
  { head: 'Base64: 3 bytes become 4 characters' },
  'text',
  'btoa(text)',
  'atob(btoa(text))',
  'atob(btoa(text)) === text',
  'length(btoa(text)) / length(text)',
  { head: 'URI components: reserved characters become %XX' },
  'encodeURIComponent(text)',
  'length(encodeURIComponent(text))',
];
const opts = { labelWidth: 250, resultWidth: 230 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [{ name: 'text', value: texts[0], bind: { input: 'select', options: texts } }],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'text', texts, 1400);
  return () => stage.dispose();
};

export default mount;
