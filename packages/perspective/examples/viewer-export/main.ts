// viewer.export() in every documented method, plus copy() and download()
import type { Mount } from '@/types.ts';
import type { ExportMethod } from '@perspective-dev/viewer';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, select, output, every } from '../../shared/controls.ts';
import { describe } from './describe.ts';

// viewer.md § Output: each data method also has -all and -selected variants.
const METHODS: ExportMethod[] = ['csv', 'json', 'ndjson', 'html', 'json-config', 'arrow', 'arrow-zstd', 'csv-all', 'plugin'];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(200), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 300, previewHeight: 110 });
  const out = output(el, ctx.preview ? 82 : 220);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', group_by: ['Region'], columns: ['Sales', 'Profit'] });

  let method: ExportMethod = 'csv';
  const run = async (): Promise<void> => {
    // export() returns a string, an ArrayBuffer, a Blob (the "plugin" PNG of a chart)
    // or a config object, depending on the method.
    const data = await viewer.export({ method });
    await describe(method, data, out.box);
  };
  await run();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2200, () => {
      method = METHODS[++i % 3]!;
      void run();
    });
  } else {
    select(bar!, 'method', METHODS, (v) => {
      method = v as ExportMethod;
      void run();
    });
    button(bar!, 'Y Bar plugin', () => void viewer.restore({ plugin: 'Y Bar' }).then(run));
    button(bar!, 'Datagrid plugin', () => void viewer.restore({ plugin: 'Datagrid' }).then(run));
    // copy() writes the same export to the clipboard; download() saves it as a file.
    button(bar!, 'copy()', () => void viewer.copy({ method }).then(() => out.log(`copied ${method} to the clipboard`)));
    button(bar!, 'download()', () => void viewer.download({ method }));
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
