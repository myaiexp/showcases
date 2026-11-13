// A SplatMesh decoding a ReadableStream that trickles .spz bytes in slowly
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, overlay, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { butterflySpz, formatBytes, trickleStream } from '../../shared/bytes.ts';

const CHUNKS = 24;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.6] });
  const label = overlay(el, 'encoding…');
  wrapInCard(label, ctx.preview);
  let bytes: Uint8Array | null = null;
  let mesh: SplatMesh | null = null;
  let stopStream: (() => void) | null = null;
  let restart = 0;
  let disposed = false;
  let delayMs = ctx.preview ? 120 : 250;
  let run = 0;

  const start = (): void => {
    if (!bytes) return;
    const mine = ++run;
    window.clearTimeout(restart);
    stopStream?.();
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    const total = bytes.length;
    // A stream that yields the file in CHUNKS pieces with a pause before each, like a slow connection.
    const { stream, stop } = trickleStream(bytes, Math.ceil(total / CHUNKS), delayMs);
    stopStream = stop;
    const next = new SplatMesh({
      stream,
      streamLength: total,
      onProgress: (e) => {
        if (mine === run) label.textContent = `streaming ${formatBytes(e.loaded)} of ${formatBytes(e.total)}  (${Math.round((e.loaded / e.total) * 100)}%)`;
      },
      onLoad: (m) => {
        if (mine !== run) return;
        label.textContent = `decoded ${m.numSplats} splats from ${formatBytes(total)}`;
        // Cards loop the demo so they keep moving.
        if (ctx.preview) restart = window.setTimeout(start, 2500);
      },
    });
    mesh = next;
    stage.scene.add(next);
    next.initialized.catch((err: unknown) => {
      if (mine === run) label.textContent = `stream failed: ${String(err)}`;
    });
  };

  void butterflySpz(ctx.preview ? 9000 : 30000).then((b) => {
    if (disposed) return;
    bytes = b;
    start();
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'ms between chunks', 20, 600, 20, delayMs, (v) => (delayMs = v));
    button(bar, 'Stream again', start);
  }

  stage.run((t) => {
    if (mesh) mesh.rotation.y = Math.sin(t * 0.6) * 0.4;
  });
  return () => {
    disposed = true;
    run++;
    window.clearTimeout(restart);
    stopStream?.();
    stage.dispose();
  };
};

export default mount;
