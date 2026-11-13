// view.to_json, to_columns, to_csv, to_ndjson and to_arrow
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const FORMATS = ['to_json', 'to_columns', 'to_csv', 'to_ndjson', 'to_arrow'] as const;

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const table = s.own(await client.table(orders(), { name: uniqueName('orders') }));
  // serializing.md: one View, five ways out.
  const config = { group_by: ['State'], columns: ['Sales'] };
  const view = s.own(await table.view(config));

  const viewer = createViewer(el, ctx, { height: 200, previewHeight: 100 });
  await viewer.load(client);
  await viewer.restore({ table: await table.get_name(), plugin: 'Datagrid', ...config, settings: false });
  s.ownViewer(viewer);
  const out = output(el, ctx.preview ? 84 : 230);
  out.box.style.margin = ctx.preview ? '4px 0 0' : '8px 0 0';

  const run = async (format: (typeof FORMATS)[number]): Promise<void> => {
    if (format === 'to_arrow') {
      // The default is an uncompressed IPC stream; `compression` applies LZ4 or ZSTD to the
      // body, and client.table() reads either back without being told.
      const lines: string[] = [];
      for (const compression of [undefined, 'lz4', 'zstd'] as const) {
        const arrow = await view.to_arrow(compression ? { compression } : undefined);
        const copy = await client.table(arrow);
        lines.push(`to_arrow(${compression ? `{ compression: "${compression}" }` : ''}): ArrayBuffer of ${arrow.byteLength} bytes, read back as a table of ${await copy.size()} rows`);
        await copy.delete();
      }
      out.set(lines.join('\n'));
      return;
    }
    const result = await view[format]({ end_row: 6 });
    const type = typeof result === 'string' ? 'string' : Array.isArray(result) ? 'Array of row objects' : 'object of column arrays';
    out.set(`await view.${format}({ end_row: 6 })  ->  ${type}\n\n${typeof result === 'string' ? result : Array.isArray(result) ? result.map((r) => JSON.stringify(r)).join('\n') : show(result, 1500)}`);
  };

  if (ctx.preview) {
    let i = 0;
    await run('to_json');
    s.every(2200, () => run(FORMATS[++i % FORMATS.length]!));
    return s.dispose();
  }
  const bar = controlBar(el);
  select(bar, 'Serialize with', FORMATS, (f) => void run(f as (typeof FORMATS)[number]));
  el.prepend(bar);
  await run('to_json');
  return s.dispose();
};

export default mount;
