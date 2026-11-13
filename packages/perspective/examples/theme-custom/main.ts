// A custom theme forked from a bundled one under a new theme name
import type { Mount } from '@/types.ts';
import './style.css';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  // The theme attribute picks the initial theme by its --psp-theme-name.
  const viewer = createViewer(el, ctx, { theme: 'Ember' });
  await viewer.load(client);
  // theming.md: when detection cannot see a theme, name the available ones yourself.
  // Icons and labels still come from themes.css, which every theme relies on.
  await viewer.resetThemes(['Ember', 'Nord', 'Pro Dark']);
  await viewer.restore({
    table: name,
    theme: 'Ember',
    plugin: 'Y Bar',
    group_by: ['Region'],
    split_by: ['Category'],
    columns: ['Sales'],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = cycle(viewer, [{ plugin: 'Y Bar' }, { plugin: 'Datagrid' }, { plugin: 'Treemap', group_by: ['Category', 'Sub-Category'], split_by: [] }]);
  } else {
    select(bar!, 'theme', ['Ember', 'Nord', 'Pro Dark'], (theme) => void viewer.restore({ theme }));
    select(bar!, 'plugin', ['Y Bar', 'Datagrid', 'Treemap', 'Heatmap'], (plugin) => void viewer.restore({ plugin }));
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
