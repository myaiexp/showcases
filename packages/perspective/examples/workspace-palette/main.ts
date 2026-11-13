// restoreWorkspace({ palette }): named colour scales that panels reference
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';
import { PALETTES } from './palettes.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 460 });
  const out = ctx.preview ? null : output(el, 180);
  await viewer.load(client);

  // save_restore.md § Colors: a colour value may be a var() reference to a
  // --psp-user--<kind>-<name> custom property. restoreWorkspace() applies `palette` to
  // the element first, so the references below resolve against it.
  await viewer.restoreWorkspace({
    palette: PALETTES.warm,
    panels: {
      heat: {
        table: name,
        title: 'Heatmap: gradient-heat',
        plugin: 'Heatmap',
        group_by: ['State'],
        split_by: ['Sub-Category'],
        columns: ['Sales'],
        columns_config: { Sales: { gradient: 'var(--psp-user--gradient-heat)' } },
      },
      grid: {
        table: name,
        title: 'Grid: palette-brand',
        plugin: 'Datagrid',
        columns: ['Category', 'Region', 'Sales'],
        columns_config: { Category: { fg_mode: 'series', fg_color: 'var(--psp-user--palette-brand)' } },
      },
    },
    layout: {
      type: 'split-layout',
      orientation: 'horizontal',
      sizes: [0.6, 0.4],
      children: [
        { type: 'tab-layout', tabs: ['heat'] },
        { type: 'tab-layout', tabs: ['grid'] },
      ],
    },
  });

  // References resolve when the config is written; panels then hold literal colours,
  // and saveWorkspace() writes them back out as var() references plus a palette map.
  const show = async (full: boolean): Promise<void> => {
    const { palette, panels } = await viewer.saveWorkspace({ full_palette: full });
    out?.set(`saveWorkspace(${full ? '{ full_palette: true }' : ''}) →\npalette ${JSON.stringify(palette, null, 2)}\nheat.columns_config ${JSON.stringify(panels.heat?.columns_config)}`);
  };

  // Restoring a new palette alone does not touch the panels' stored literals, so each
  // switch re-applies the panels' references along with it.
  const apply = async (label: string): Promise<void> => {
    await viewer.restoreWorkspace({ palette: PALETTES[label]! });
    await viewer.restore({ columns_config: { Sales: { gradient: 'var(--psp-user--gradient-heat)' } } }, { panel: 'heat' });
    await viewer.restore({ columns_config: { Category: { fg_mode: 'series', fg_color: 'var(--psp-user--palette-brand)' } } }, { panel: 'grid' });
    await show(false);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const labels = Object.keys(PALETTES);
    let i = 0;
    stop = every(2600, () => void apply(labels[++i % labels.length]!));
  } else {
    for (const label of Object.keys(PALETTES)) button(bar!, `palette: ${label}`, () => void apply(label));
    button(bar!, 'saveWorkspace()', () => void show(false));
    button(bar!, 'saveWorkspace({ full_palette: true })', () => void show(true));
    await show(false);
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
