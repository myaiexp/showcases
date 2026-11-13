// save() the viewer state as JSON, edit it, restore() it, or reset()
import type { Mount } from '@/types.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';
import { tokenEditor } from './editor.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 340, previewHeight: 120 });
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', group_by: ['Region'], columns: ['Sales', 'Profit'] });

  if (ctx.preview) {
    // A card shows part of the token of each state it restores.
    const out = output(el, 72);
    const states: ViewerConfigUpdate[] = [
      { plugin: 'Y Bar', group_by: ['Category'], columns: ['Sales'] },
      { plugin: 'Datagrid', group_by: ['Region'], columns: ['Sales', 'Profit'] },
    ];
    let i = 0;
    const show = async (): Promise<void> => {
      const { plugin, group_by, columns } = await viewer.save();
      out.set(JSON.stringify({ plugin, group_by, columns }));
    };
    await show();
    const stop = every(2600, () => void viewer.restore(states[i++ % 2]!).then(show));
    const dispose = teardown([viewer], [table]);
    return () => {
      stop();
      dispose();
    };
  }

  const editor = tokenEditor(el);
  const out = output(el, 60);
  // save() returns the entire state as a JSON-ready object: plugin, query, column and
  // plugin settings, theme, title, settings-panel visibility.
  const save = async (): Promise<void> => editor.set(await viewer.save());
  button(bar!, 'save()', () => void save());
  button(bar!, 'restore(token)', () => {
    viewer
      .restore(editor.get())
      .then(() => out.set('restored'))
      .catch((err: unknown) => out.set(String(err)));
  });
  // restore() validates its argument, and a stringified token is rejected.
  button(bar!, 'restore(JSON string)', () => {
    viewer
      .restore(JSON.stringify(editor.get()) as unknown as ViewerConfigUpdate)
      .then(() => out.set('accepted?'))
      .catch((err: unknown) => out.set(`rejected: ${String(err)}`));
  });
  // reset() returns the query to its data-relative default; reset(true) also drops expressions.
  button(bar!, 'reset()', () => void viewer.reset().then(save));
  button(bar!, 'reset(true)', () => void viewer.reset(true).then(save));
  button(bar!, 'settings', () => void viewer.toggleConfig());
  await save();
  out.set('Change the viewer in its settings panel, press save(), edit the JSON, then restore(token).');

  return teardown([viewer], [table]);
};

export default mount;
