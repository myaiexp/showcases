// restore({ theme }) across the bundled themes, listed by getThemes()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, select, output } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  // shared/setup.ts imports themes.css, which bundles every default theme.
  const viewer = createViewer(el, ctx);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Y Bar',
    group_by: ['Region'],
    split_by: ['Category'],
    columns: ['Sales'],
  });

  // The viewer detects themes from the loaded stylesheets.
  const themes = await viewer.getThemes();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = cycle(viewer, ['Pro Dark', 'Vaporwave', 'Solarized', 'Dracula', 'Botanical', 'Pro Light'].map((theme) => ({ theme })), 2000);
  } else {
    const out = output(el, 60);
    const show = async (): Promise<void> => out.set(`getThemes() → ${(await viewer.getThemes()).join(', ')}`);
    const pick = select(bar!, 'theme', themes, (theme) => void viewer.restore({ theme }));
    pick.value = 'Pro Dark';
    select(bar!, 'plugin', ['Y Bar', 'Datagrid', 'Treemap', 'Y Line'], (plugin) => void viewer.restore({ plugin }));
    // resetThemes() with a list limits the viewer's own theme menu to those names;
    // without one it re-detects them from the stylesheets.
    button(bar!, 'resetThemes(["Pro Light", "Pro Dark"])', () => void viewer.resetThemes(['Pro Light', 'Pro Dark']).then(show));
    button(bar!, 'resetThemes()', () => void viewer.resetThemes().then(show));
    button(bar!, 'settings', () => void viewer.toggleConfig());
    await show();
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
