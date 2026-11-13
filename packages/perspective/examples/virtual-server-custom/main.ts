// A custom virtual server: the viewer queries a JavaScript array through a handler
import type { Mount } from '@/types.ts';
import { boot, perspective, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { output } from '../../shared/controls.ts';
import { arrayHandler } from './handler.ts';

const mount: Mount = async (el, ctx) => {
  await boot();
  const viewer = createViewer(el, ctx, { height: 380, previewHeight: 130 });
  const out = output(el, ctx.preview ? 64 : 200);

  // The data never enters Perspective's engine: the handler answers each call itself.
  const rows = orders(500).map(({ 'Order Date': _, ...rest }) => rest);
  const handler = arrayHandler(
    'orders',
    rows,
    { 'Order ID': 'integer', 'Ship Mode': 'string', Segment: 'string', Region: 'string', State: 'string', Category: 'string', 'Sub-Category': 'string', Quantity: 'integer', Discount: 'float', Sales: 'float', Profit: 'float' },
    (line) => out.log(line),
  );

  // custom.md: createMessageHandler() wraps the handler in a MessagePort, and worker()
  // talks to that port in place of starting an engine.
  const client = await perspective.worker(perspective.createMessageHandler(handler));
  await viewer.load(client);
  await viewer.restore({
    table: 'orders',
    plugin: 'Datagrid',
    columns: ['Order ID', 'Region', 'Category', 'Sales', 'Profit'],
    sort: [['Sales', 'desc']],
    settings: !ctx.preview,
  });

  // Group by is not declared in getFeatures(), so the settings panel leaves it out;
  // sort and the declared filter operators work.
  const stop = ctx.preview
    ? cycle(viewer, [
        { sort: [['Profit', 'asc']], filter: [] },
        { filter: [['Region', '==', 'West']] },
        { sort: [['Sales', 'desc']], filter: [['Sales', '>', 2000]] },
      ])
    : () => {};

  // terminate() closes the port the client was given.
  const dispose = teardown([viewer], [], async () => {
    await client.terminate();
  });
  return () => {
    stop();
    dispose();
  };
};

export default mount;
