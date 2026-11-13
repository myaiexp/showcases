// perspective-config-update and perspective-view-update, logged live
import type { Mount } from '@/types.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';

const STEPS: ViewerConfigUpdate[] = [
  { plugin: 'Datagrid', group_by: ['symbol'] },
  { plugin: 'Y Bar', group_by: ['symbol'], columns: ['qty'] },
  { plugin: 'Datagrid', group_by: ['client'], columns: ['qty', 'price'] },
];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const feed = quoteStream(9);
  const name = uniqueName('quotes');
  const table = await client.table(feed.next(60), { name, index: 'id' });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 320, previewHeight: 120 });
  const out = output(el, ctx.preview ? 72 : 200);
  await viewer.load(client);
  await viewer.restore({ table: name, ...STEPS[0] });

  // events.md § Update events. The config event fires for restore() calls and for
  // anything the user changes in the settings panel.
  let configs = 0;
  let updates = 0;
  const onConfig = (event: Event): void => {
    configs += 1;
    const detail = (event as CustomEvent).detail ?? {};
    out.log(`#${configs} perspective-config-update → plugin ${detail.plugin}, group_by ${JSON.stringify(detail.group_by)}`);
  };
  // The view-update event fires each time the underlying table changes.
  const onView = (): void => {
    updates += 1;
    if (updates % 5 === 0) out.log(`perspective-view-update ×${updates}`);
  };
  viewer.addEventListener('perspective-config-update', onConfig);
  viewer.addEventListener('perspective-view-update', onView);

  const stopFeed = every(400, () => void table.update(feed.next(3)));
  let stopSteps = (): void => {};
  if (ctx.preview) {
    stopSteps = cycle(viewer, STEPS, 2400);
  } else {
    STEPS.forEach((step, i) => button(bar!, `restore step ${i + 1}`, () => void viewer.restore(step)));
    button(bar!, 'settings', () => void viewer.toggleConfig());
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stopFeed();
    stopSteps();
    viewer.removeEventListener('perspective-config-update', onConfig);
    viewer.removeEventListener('perspective-view-update', onView);
    dispose();
  };
};

export default mount;
