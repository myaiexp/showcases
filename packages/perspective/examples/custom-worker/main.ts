// perspective.worker(new Worker(url)): your own Worker
import type { Mount } from '@/types.ts';
import type { Client, Table } from '@perspective-dev/client';
import { perspective, boot, createViewer, uniqueName } from '../../shared/setup.ts';
import type { HTMLPerspectiveViewerElement } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';
// custom_worker.md: the engine's worker script ships at this path. Vite turns it into a URL.
import workerUrl from '@perspective-dev/client/dist/cdn/perspective-server.worker.js?url';

const KINDS = ['Worker', 'SharedWorker'] as const;
type Kind = (typeof KINDS)[number];

const mount: Mount = async (el, ctx) => {
  const s = scope();
  await boot();
  const stream = quoteStream(10, 16);
  let viewer: HTMLPerspectiveViewerElement | null = null;
  const out = ctx.preview ? null : output(el, 120);
  let client: Client | null = null;
  let table: Table | null = null;
  let generation = 0;

  // Tears down what the previous choice built: the viewer first, then the table, then the
  // Client (and with it the Worker).
  const release = async (): Promise<void> => {
    const [v, t, c] = [viewer, table, client];
    viewer = table = client = null;
    await v?.delete();
    v?.remove();
    await t?.delete();
    await c?.terminate();
  };
  s.later(release);

  const start = async (kind: Kind): Promise<void> => {
    const mine = ++generation;
    await release();
    // A SharedWorker would outlive this page's Client; a dedicated Worker is the default.
    const instance = kind === 'Worker' ? new Worker(workerUrl) : new SharedWorker(workerUrl);
    // The argument is documented as the Worker itself; the type wants a Promise of one.
    client = await perspective.worker(Promise.resolve(instance));
    if (mine !== generation) return;
    const name = uniqueName('custom');
    table = await client.table(stream.next(16), { name, index: 'id' });
    viewer = createViewer(el, ctx, { height: 280 });
    if (out) el.insertBefore(viewer, out.box);
    await viewer.load(client);
    await viewer.restore({ table: name, plugin: 'Datagrid', columns: ['id', 'symbol', 'price', 'qty'], settings: false });
    out?.set(`perspective.worker(new ${kind}(url)) -> Client\nurl: ${workerUrl}\nhosted tables: ${JSON.stringify(await client.get_hosted_table_names())}`);
  };

  await start('Worker');
  s.every(600, async () => {
    await table?.update(stream.next(3));
  });
  if (ctx.preview) return s.dispose();

  const bar = controlBar(el);
  select(bar, 'Engine runs in a', KINDS, (k) => void start(k as Kind));
  el.prepend(bar);
  return s.dispose();
};

export default mount;
