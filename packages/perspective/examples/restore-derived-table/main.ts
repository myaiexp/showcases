// Derived tables in tokens: inline in restore(), named in restoreWorkspace()
import type { Mount } from '@/types.ts';
import { boot, perspective, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import type { HTMLPerspectiveViewerElement, ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';

/**
 * The generated DerivedTableConfig type lists every view field as required, while the
 * docs (and restore()) take a partial definition; this one cast bridges the two.
 */
const derived = <T>(definition: Record<string, unknown>): T => definition as T;
type InlineTable = ViewerConfigUpdate['table'];
type DerivedTables = Parameters<HTMLPerspectiveViewerElement['restoreWorkspace']>[0]['derived_tables'];

const mount: Mount = async (el, ctx) => {
  // Its own worker, unlike most examples: in 5.9.1 neither viewer.delete() nor eject()
  // deletes the derived tables a viewer built, and the source table cannot be deleted
  // while they read from it. Terminating the worker frees all of it at once.
  await boot();
  const client = await perspective.worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });
  const totals = 'Region Totals';
  const big = 'Big Regions';

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 220);
  await viewer.load(client);

  // save_restore.md § Derived tables. The single-panel form inlines the definition: the
  // `table` field is a view config over the source, and the viewer builds a derived
  // Table from it (or rebinds to one built from an identical definition).
  const inline = async (groupBy: string): Promise<void> => {
    await viewer.restore({ plugin: 'Datagrid', table: derived<InlineTable>({ table: name, group_by: [groupBy] }) });
    const token = await viewer.save();
    out?.set(`restore({ table: { table, group_by } }) → save().table =\n${JSON.stringify(token.table, null, 2)}\n\nhosted tables: ${JSON.stringify(await client.get_hosted_table_names())}`);
  };

  // The workspace form names derived tables once in `derived_tables`; panels bind them by
  // name, and an entry may itself derive from another derived table.
  const workspace = async (): Promise<void> => {
    await viewer.restoreWorkspace({
      panels: {
        totals: { table: totals, title: 'Region Totals', plugin: 'Y Bar', columns: ['Sales', 'Profit'] },
        top: { table: big, title: 'Big Regions (from Region Totals)', plugin: 'Datagrid' },
      },
      // Listed child first: entries are built parent-first whatever their order.
      derived_tables: derived<DerivedTables>({
        [big]: { table: totals, filter: [['Sales', '>', 120000]] },
        [totals]: { table: name, group_by: ['Region'], columns: ['Sales', 'Profit'] },
      }),
    });
    const { derived_tables } = await viewer.saveWorkspace();
    out?.set(`saveWorkspace().derived_tables =\n${JSON.stringify(derived_tables, null, 2)}`);
  };

  await inline('Region');
  let stop = (): void => {};
  if (ctx.preview) {
    const groups = ['Region', 'Category', 'Segment', 'Ship Mode'];
    let i = 0;
    stop = every(2400, () => void inline(groups[++i % groups.length]!));
  } else {
    for (const g of ['Region', 'Category', 'Segment']) button(bar!, `inline group_by ${g}`, () => void inline(g));
    button(bar!, 'workspace derived_tables', () => void workspace());
  }

  const dispose = teardown([viewer], [], async () => {
    await client.terminate();
  });
  return () => {
    stop();
    dispose();
  };
};

export default mount;
