// A SplatMesh loaded by url, with onProgress, onLoad and a progress bar
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, overlay, readout } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { BUTTERFLY_URL } from '../../shared/subjects.ts';
import { blobUrl, butterflySpz, formatBytes } from '../../shared/bytes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, ctx.preview ? 2.6 : 3] });
  const label = overlay(el, 'loading…');
  wrapInCard(label, ctx.preview);
  let bar: HTMLProgressElement | null = null;
  let log: HTMLElement | null = null;
  let mesh: SplatMesh | null = null;
  let disposed = false;
  let objectUrl = '';
  let run = 0;

  if (!ctx.preview) {
    const controls = controlBar(el);
    bar = document.createElement('progress');
    bar.max = 1;
    bar.style.cssText = 'flex:1 1 200px;min-width:160px';
    controls.append(bar);
    button(controls, 'Load again', () => void start());
    log = readout(el);
  }

  const start = async (): Promise<void> => {
    const mine = ++run;
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
      mesh = null;
    }
    let events = 0;
    if (bar) bar.removeAttribute('value');
    if (log) log.textContent = '';

    // Full view: the file the docs link. Cards never fetch, so they load a blob: URL of in-memory bytes.
    let url = BUTTERFLY_URL;
    if (ctx.preview) {
      if (!objectUrl) objectUrl = blobUrl(await butterflySpz(12000));
      if (disposed) return;
      url = objectUrl;
    }

    const next = new SplatMesh({
      url,
      onProgress: (e) => {
        events++;
        if (mine !== run) return;
        const text = e.lengthComputable
          ? `${formatBytes(e.loaded)} of ${formatBytes(e.total)}  (${Math.round((e.loaded / e.total) * 100)}%)`
          : `${formatBytes(e.loaded)} (total unknown)`;
        label.textContent = `downloading ${text}`;
        if (bar && e.lengthComputable) bar.value = e.loaded / e.total;
      },
      onLoad: (m) => {
        if (mine !== run) return;
        label.textContent = `loaded ${m.numSplats} splats`;
        if (bar) bar.value = 1;
        if (log) log.textContent = `onProgress fired ${events} time(s); onLoad ran with ${m.numSplats} splats.`;
      },
    });
    // The docs' butterfly.spz is stored in OpenCV axes (y down, z forward): flip it about X.
    if (!ctx.preview) next.quaternion.set(1, 0, 0, 0);
    mesh = next;
    stage.scene.add(next);
    next.initialized.catch((err: unknown) => {
      if (mine === run) label.textContent = `load failed: ${String(err)}`;
    });
  };
  void start();

  stage.run((t) => {
    if (mesh) mesh.rotation.y = Math.sin(t * 0.5) * 0.4;
  });
  return () => {
    disposed = true;
    run++;
    stage.dispose();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
};

export default mount;
