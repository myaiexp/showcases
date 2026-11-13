// table.describe() and validate_expressions(): check before view()
import type { Mount } from '@/types.ts';
import { worker, uniqueName } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, button, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const PRESETS: Record<string, object> = {
  'valid config': {
    columns: ['Sales', 'margin'],
    group_by: ['Region'],
    expressions: { margin: '"Profit" / "Sales"' },
    aggregates: { margin: 'avg' },
  },
  'broken expression': {
    columns: ['Sales', 'margin'],
    group_by: ['Region'],
    expressions: { margin: '"Profit" / ' },
    aggregates: { margin: 'avg' },
  },
  'unknown column': { columns: ['Sales', 'Revenue'], group_by: ['Region'] },
};

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const table = s.own(await client.table(orders(100), { name: uniqueName('orders') }));

  const out = output(el, ctx.preview ? 200 : 330);
  out.box.style.margin = ctx.preview ? '0' : '8px 0 0';

  // advanced.md: describe() reports a view_schema if and only if table.view() with the same
  // config would succeed; an expression problem or a config problem come back as data.
  const check = async (text: string): Promise<void> => {
    let config: object;
    try {
      config = JSON.parse(text) as object;
    } catch (e) {
      out.set(`Not JSON: ${String(e)}`);
      return;
    }
    const verdict = (await table.describe(config)) as Record<string, unknown>;
    const kind = 'view_schema' in verdict ? 'view_schema' : 'expression_errors' in verdict ? 'expression_errors' : 'config_error';
    let note = '';
    if (kind === 'view_schema') {
      const view = await table.view(config);
      const real = await view.schema();
      await view.delete();
      note = `\ntable.view() agrees: ${JSON.stringify(real) === JSON.stringify(verdict.view_schema)}`;
    }
    const validated = await table.validate_expressions({ expr1: '"Sales" + "Profit"', expr2: 'invalid_column + 1' });
    out.set(
      `describe(config) -> ${kind}\n${show(verdict, 900)}${note}\n\n` +
        `validate_expressions({ expr1: '"Sales" + "Profit"', expr2: 'invalid_column + 1' })\n${show(validated, 700)}`,
    );
  };

  const names = Object.keys(PRESETS);
  if (ctx.preview) {
    let i = 0;
    s.every(2600, () => check(JSON.stringify(PRESETS[names[++i % names.length]!])));
    await check(JSON.stringify(PRESETS[names[0]!]));
    return s.dispose();
  }

  const area = document.createElement('textarea');
  Object.assign(area.style, { width: '100%', height: '130px', fontFamily: 'monospace', fontSize: '12px', background: 'var(--bg-surface)', color: 'var(--fg-1)' });
  const load = (name: string): void => {
    area.value = JSON.stringify(PRESETS[name], null, 2);
    void check(area.value);
  };
  const bar = controlBar(el);
  select(bar, 'Example config', names, load);
  button(bar, 'Describe the edited config', () => void check(area.value));
  el.prepend(area);
  el.prepend(bar);
  load(names[0]!);
  return s.dispose();
};

export default mount;
