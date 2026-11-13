// A SplatMesh built from in-memory .spz bytes through the fileBytes option
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { butterflySpz, formatBytes } from '../../shared/bytes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.6] });
  const label = overlay(el, 'encoding .spz…');
  let mesh: SplatMesh | null = null;
  let disposed = false;
  let generation = 0;

  // writeSpz turns splats into real .spz file bytes; fileBytes decodes them again, no fetch involved.
  const load = async (count: number): Promise<void> => {
    const mine = ++generation;
    const fileBytes = await butterflySpz(count);
    if (disposed || mine !== generation) return;
    const next = new SplatMesh({ fileBytes });
    await next.initialized;
    if (disposed || mine !== generation) return next.dispose();
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    mesh = next;
    stage.scene.add(mesh);
    label.textContent = `${formatBytes(fileBytes.length)} of .spz  ->  ${mesh.numSplats} splats`;
  };
  void load(ctx.preview ? 9000 : 16000);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'splats written', 2000, 40000, 2000, 16000, (v) => void load(v));
  }

  stage.run((t) => {
    if (mesh) mesh.rotation.y = Math.sin(t * 0.5) * 0.35;
  });
  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
