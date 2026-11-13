// renderReadTarget reads a second viewpoint back into a snapshot strip
import * as THREE from 'three';
import { SparkRenderer, SplatMesh, flipPixels, pixelsToPngUrl } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, button, select } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const KEEP = 6;

const mount: Mount = (el, ctx) => {
  const { preview } = ctx;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;align-items:flex-start';
  const stageBox = document.createElement('div');
  stageBox.style.cssText = 'flex:1;min-width:0';
  const strip = document.createElement('div');
  strip.style.cssText = preview
    ? 'display:flex;flex-direction:column;gap:4px;width:64px'
    : 'display:flex;flex-wrap:wrap;gap:6px;padding-top:8px;width:100%';
  row.append(stageBox);
  el.append(row);
  if (preview) row.append(strip);

  const stage = createStage(stageBox, ctx, { position: [0, 0.4, 3.4], orbit: 0.3 });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, preview ? 10000 : 24000) }));

  const size = preview ? 64 : 256;
  // The snapshot viewpoint: a SparkRenderer with a target, updated by hand (autoUpdate: false).
  let snap: SparkRenderer | null = null;
  let superXY = 1;
  const build = (): void => {
    snap?.dispose();
    snap = new SparkRenderer({
      renderer: stage.renderer,
      autoUpdate: false,
      // superXY renders at superXY times the size and averages back down in readTarget().
      target: { width: size * superXY, height: size * superXY, superXY },
    });
  };
  build();
  const snapCamera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);

  let busy = false;
  let disposed = false;
  const takeSnapshot = async (): Promise<void> => {
    if (busy || !snap) return;
    busy = true;
    try {
      snapCamera.position.copy(stage.camera.position);
      snapCamera.quaternion.copy(stage.camera.quaternion);
      // Awaiting update() lets the sort for this viewpoint finish before the render.
      await snap.update({ scene: stage.scene, camera: snapCamera });
      const pixels = await snap.renderReadTarget({ scene: stage.scene, camera: snapCamera });
      if (disposed) return;
      // GL rows run bottom to top, so flip before making a PNG.
      const url = pixelsToPngUrl(flipPixels(pixels, size, size), size, size);
      const img = new Image(size, size);
      img.src = url;
      img.style.cssText = 'display:block;width:' + (preview ? '64px' : `${size}px`) + ';height:auto;border-radius:4px';
      strip.prepend(img);
      while (strip.children.length > KEEP) strip.lastElementChild?.remove();
    } finally {
      busy = false;
    }
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => void takeSnapshot(), 1500);
  } else {
    const bar = controlBar(el);
    button(bar, 'Snapshot', () => void takeSnapshot());
    select(bar, 'superXY', ['1', '2', '4'] as const, (v) => {
      superXY = Number(v);
      build();
    });
    el.append(strip);
  }

  stage.run();
  return () => {
    disposed = true;
    window.clearInterval(timer);
    snap?.dispose();
    stage.dispose();
  };
};

export default mount;
