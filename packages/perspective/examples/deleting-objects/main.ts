// delete() on views, tables and viewers: order matters; lazy delete waits
import type { Mount } from '@/types.ts';
import type { Table, View } from '@perspective-dev/client';
import { perspective, boot, createViewer, uniqueName } from '../../shared/setup.ts';
import type { HTMLPerspectiveViewerElement } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  await boot();
  // v5.9.1 behaviour: once table.delete() has been refused because a view still reads the
  // table, a later delete() of that table never settles and the table stays hosted. This
  // example refuses on purpose, so it runs in a worker of its own and terminate()s it at
  // the end, which frees everything the engine still holds.
  const client = await perspective.worker();
  s.later(() => void client.terminate());
  const stream = quoteStream(2, 12);
  const out = output(el, ctx.preview ? 200 : 170);
  out.box.style.margin = '0';

  let table!: Table;
  let view!: View;
  let table2: Table | null = null;
  let viewer: HTMLPerspectiveViewerElement | null = null;
  let refused2 = false;
  const status = async (what: string): Promise<void> => {
    out.set(`${what}\n\nhosted tables: ${JSON.stringify(await client.get_hosted_table_names())}`);
  };
  const fresh = async (): Promise<void> => {
    table = await client.table(stream.next(12), { name: uniqueName('doomed'), index: 'id' });
    view = await table.view({ columns: ['id', 'symbol', 'price'] });
  };
  const freshViewer = async (): Promise<void> => {
    refused2 = false;
    table2 = await client.table(stream.next(12), { name: uniqueName('shown'), index: 'id' });
    viewer = createViewer(el, ctx, { height: 180 });
    await viewer.load(client);
    await viewer.restore({ table: await table2.get_name(), plugin: 'Datagrid', settings: false });
    el.insertBefore(viewer, out.box);
  };
  s.later(async () => {
    await viewer?.delete();
    viewer?.remove();
  });

  // deleting.md: delete() frees WebAssembly memory, and table.delete() throws while a view
  // (or a viewer, which holds one) still depends on the table.
  const refused = async (): Promise<void> => {
    try {
      await table.delete();
      await status('table.delete() succeeded?');
    } catch (e) {
      // The refused table is abandoned (see above); carry on with a new one.
      await view.delete();
      await fresh();
      out.set(`await table.delete()  ->  threw\n${String(e)}\n\nA view still depends on the table. (A fresh table and view were made for the next button.)`);
    }
  };
  const viewThenTable = async (): Promise<void> => {
    await view.delete();
    await table.delete();
    await status('await view.delete(); await table.delete();  -> both reclaimed');
    await fresh();
  };
  const lazy = async (): Promise<void> => {
    // The lazy delete only settles once the last view is gone, so it is not awaited first.
    const pending = table.delete({ lazy: true });
    await status('table.delete({ lazy: true }) with a view alive: marked, still hosted.');
    await view.delete();
    await pending;
    await status('view.delete() was its last dependency: the lazy delete has now happened.');
    await fresh();
  };

  await fresh();
  if (ctx.preview) {
    const steps = [refused, viewThenTable, lazy];
    let i = 0;
    out.set('A table cannot be deleted while a view reads it.');
    s.every(2400, () => steps[i++ % steps.length]!());
    return s.dispose();
  }

  await freshViewer();
  const bar = controlBar(el);
  const act = (label: string, op: () => Promise<void>) => button(bar, label, () => void op().catch((e: unknown) => out.set(`${label}\n${String(e)}`)));
  act('table.delete() with a view alive', refused);
  act('view.delete(), then table.delete()', viewThenTable);
  act('table.delete({ lazy: true })', lazy);
  act('table.delete() while a viewer shows it', async () => {
    try {
      await table2!.delete();
      await status('deleted?');
    } catch (e) {
      refused2 = true;
      out.set(`await table.delete()  ->  threw\n${String(e)}\n\nThe viewer's own view still reads the table. Use "viewer.delete(), then table.delete()" on a fresh viewer.`);
    }
  });
  act('viewer.delete(), then table.delete()', async () => {
    if (!viewer) return void (await status('Make a fresh viewer first.'));
    await viewer.delete();
    viewer.remove();
    viewer = null;
    if (refused2) return void (await status('viewer.delete() freed the viewer. This table was already refused once, so it cannot be deleted now; use a fresh viewer.'));
    await table2!.delete();
    table2 = null;
    await status('viewer.delete() freed the UI memory and its view; now the table could go.');
  });
  act('Fresh viewer and table', async () => {
    if (viewer) {
      await viewer.delete();
      viewer.remove();
      viewer = null;
    }
    await freshViewer();
    await status('Fresh viewer and table (a refused table stays behind, as noted above).');
  });
  el.prepend(bar);
  await status('Top: a table with one view. Grid: a table shown by a viewer.');
  return s.dispose();
};

export default mount;
