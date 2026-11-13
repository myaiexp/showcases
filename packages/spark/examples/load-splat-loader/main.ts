// SplatLoader.loadAsync gives a PackedSplats that a SplatMesh then displays
import { PackedSplats, SplatLoader, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, slider } from '../../shared/controls.ts';
import { BUTTERFLY_URL } from '../../shared/subjects.ts';
import { blobUrl, butterflySpz, formatBytes } from '../../shared/bytes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 0.5], target: [0, 0, -1], orbit: ctx.preview ? 0.4 : true });
  const label = overlay(el, 'loading…');
  let log: HTMLElement | null = null;
  let mesh: SplatMesh | null = null;
  let packed: PackedSplats | null = null;
  let objectUrl = '';
  let disposed = false;

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'scale', 0.2, 1.2, 0.05, 0.5, (v) => mesh?.scale.setScalar(v));
    log = readout(el);
  }

  const run = async (): Promise<void> => {
    let url = BUTTERFLY_URL;
    if (ctx.preview) {
      // Cards never fetch: the loader reads a blob: URL of in-memory .spz bytes.
      objectUrl = blobUrl(await butterflySpz(12000));
      if (disposed) return;
      url = objectUrl;
    }
    const loader = new SplatLoader();
    let events = 0;
    try {
      const decoded = await loader.loadAsync(url, (event) => {
        events++;
        label.textContent = event.lengthComputable
          ? `download ${((event.loaded / event.total) * 100).toFixed(2)}%`
          : `download ${formatBytes(event.loaded)}`;
      });
      if (disposed) return decoded.dispose();
      if (!(decoded instanceof PackedSplats)) throw new Error('loader returned ExtSplats');
      packed = decoded;
      // The same steps as the docs' snippet: wrap in a SplatMesh, re-orient from OpenCV to OpenGL, place, scale.
      mesh = new SplatMesh({ packedSplats: decoded });
      if (!ctx.preview) mesh.quaternion.set(1, 0, 0, 0);
      mesh.position.set(0, 0, -1);
      mesh.scale.setScalar(ctx.preview ? 0.9 : 0.5);
      stage.scene.add(mesh);
      label.textContent = `${decoded.numSplats} splats from SplatLoader`;
      if (log) log.textContent = `loadAsync resolved a PackedSplats (${decoded.numSplats} splats) after ${events} progress event(s).`;
    } catch (err) {
      label.textContent = `load failed: ${String(err)}`;
    }
  };
  void run();

  stage.run((t) => {
    if (mesh && ctx.preview) mesh.rotation.y = Math.sin(t) * 0.3;
  });
  return () => {
    disposed = true;
    stage.dispose();
    packed?.dispose();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
};

export default mount;
