// getView() live against mode "clone", and getViewConfig()
import type { Mount } from '@/types.ts';
import type { View } from '@perspective-dev/client';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';

const GROUPS = [['Region'], ['Category'], ['Segment', 'Ship Mode']];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 300, previewHeight: 120 });
  const out = output(el, ctx.preview ? 72 : 200);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', group_by: GROUPS[0], columns: ['Sales'] });

  let g = 0;
  const regroup = async (): Promise<void> => {
    g = (g + 1) % GROUPS.length;
    await viewer.restore({ group_by: GROUPS[g] });
  };

  // A live View belongs to the viewer: the next config change replaces and deletes it.
  let borrowed: View | null = null;
  const borrow = async (): Promise<void> => {
    borrowed = await viewer.getView();
    out.log(`getView() → live View, ${await borrowed.num_rows()} rows. Now regroup and ask it again.`);
  };
  const askBorrowed = async (): Promise<void> => {
    if (!borrowed) return out.log('borrow a live View first');
    try {
      out.log(`live View still answers: ${await borrowed.num_rows()} rows`);
    } catch (err) {
      out.log(`live View failed: ${String(err)}`);
    }
  };

  // mode "clone" builds an independent View from the panel's config; the caller owns it.
  const clone = async (): Promise<void> => {
    const view = await viewer.getView({ mode: 'clone' });
    const cols = (await view.to_columns()) as Record<string, unknown[]>;
    await view.delete();
    const config = await viewer.getViewConfig();
    out.log(`clone → ${Object.keys(cols).join(', ')} (${cols.__ROW_PATH__?.length ?? 0} rows), deleted\ngetViewConfig().group_by = ${JSON.stringify(config.group_by)}`);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    await clone();
    stop = every(2600, () => void regroup().then(clone));
  } else {
    button(bar!, 'getView()', () => void borrow());
    button(bar!, 'ask the live View', () => void askBorrowed());
    button(bar!, 'regroup', () => void regroup());
    button(bar!, 'getView({ mode: "clone" })', () => void clone());
    out.log('Borrow the live View, regroup, then ask it again; a clone survives any config change.');
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
