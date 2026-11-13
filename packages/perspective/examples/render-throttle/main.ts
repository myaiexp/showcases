// setThrottle(), setAutoPause() and getRenderStats() on a viewer fed a fast stream
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { quoteStream } from '../../shared/data.ts';
import { controlBar, button, select, output, every } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const feed = quoteStream(11, 200);
  const name = uniqueName('quotes');
  const table = await client.table(feed.next(200), { name, index: 'id' });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 360, previewHeight: 140 });
  const out = output(el, ctx.preview ? 54 : 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Y Scatter', group_by: ['id'], columns: ['price'], split_by: ['symbol'] });

  // 20 updates a second, far more than a reader needs to see.
  const stopFeed = every(50, () => void table.update(feed.next(10)));

  // viewer.md § Rendering and chrome. getRenderStats() resets its relative fields on each
  // call, so polling once a second gives per-second numbers.
  const stopStats = every(1000, () => {
    const stats = viewer.getRenderStats() as Record<string, number>;
    out.set(Object.entries(stats).map(([k, v]) => `${k}: ${typeof v === 'number' ? v.toFixed(1) : JSON.stringify(v)}`).join('  '));
  });

  if (!ctx.preview) {
    // setThrottle(ms) caps how often the viewer redraws; null restores the default.
    select(bar!, 'setThrottle', ['default', '0', '250', '1000'], (v) => viewer.setThrottle(v === 'default' ? null : Number(v)));
    // Auto-pause (on by default) stops rendering while the element is scrolled out of
    // view, hidden or in a background tab; off keeps a live View the whole time.
    let paused = true;
    const ap = button(bar!, 'setAutoPause(true)', () => {
      paused = !paused;
      void viewer.setAutoPause(paused);
      ap.textContent = `setAutoPause(${paused})`;
    });
    button(bar!, 'hide 3 s', () => {
      viewer.style.display = 'none';
      window.setTimeout(() => (viewer.style.display = 'block'), 3000);
    });
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stopFeed();
    stopStats();
    dispose();
  };
};

export default mount;
