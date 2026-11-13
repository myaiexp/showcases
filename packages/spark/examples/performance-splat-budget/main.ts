// The performance knobs from the docs: splat count, maxStdDev, pixel ratio, with a live FPS
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, overlay, select, slider } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

/** A dense nebula: `count` soft splats in a lumpy ball about 3 units across. */
function pushNebula(splats: PackedSplats, count: number): void {
  const rand = rng(5);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const r = Math.pow(rand(), 0.5) * 1.5;
    const z = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - z * z) * r;
    center.set(Math.cos(a) * s, z * r * 0.7, Math.sin(a) * s);
    scales.setScalar(0.006 + rand() * 0.012);
    color.setHSL(0.55 + 0.35 * (r / 1.5) + rand() * 0.05, 0.8, 0.5);
    splats.pushSplat(center, scales, quaternion, 0.5, color);
  }
}

const STD_DEVS = { 'sqrt(8) default': Math.sqrt(8), 'sqrt(5) VR': Math.sqrt(5), 'sqrt(4)': 2 } as const;
type StdDev = keyof typeof STD_DEVS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.5, 3.5], orbit: 0.2 });
  const fpsLabel = overlay(el);
  let count = ctx.preview ? 30000 : 500000;
  let nebula: SplatMesh | null = null;
  const rebuild = (): void => {
    if (nebula) {
      stage.scene.remove(nebula);
      nebula.dispose();
    }
    nebula = new SplatMesh({ constructSplats: (splats) => pushNebula(splats, count) });
    stage.scene.add(nebula);
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'splats (k)', 100, 3000, 100, count / 1000, (v) => ((count = v * 1000), rebuild()));
    // Narrower Gaussian footprint: fewer pixels to blend per splat.
    select(bar, 'maxStdDev', Object.keys(STD_DEVS) as StdDev[], (v) => (stage.spark.maxStdDev = STD_DEVS[v]));
    checkbox(bar, 'devicePixelRatio', true, (on) =>
      stage.renderer.setPixelRatio(on ? Math.min(window.devicePixelRatio, 2) : 1),
    );
    // Many splats on few pixels is its own bottleneck: shrink the nebula to see it.
    slider(bar, 'object scale', 0.1, 1.5, 0.05, 1, (v) => nebula?.scale.setScalar(v));
  }

  let frames = 0;
  let since = 0;
  stage.run((time) => {
    frames++;
    if (time - since >= 1) {
      const n = nebula?.packedSplats?.numSplats ?? 0;
      fpsLabel.textContent = `${Math.round(frames / (time - since))} fps · ${(n / 1000).toFixed(0)}k splats`;
      frames = 0;
      since = time;
    }
  });
  return () => stage.dispose();
};

export default mount;
