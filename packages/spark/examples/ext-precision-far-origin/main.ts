// The same object stored 16 bytes/splat (float16 centres) and 32 bytes/splat (float32), far out
import * as THREE from 'three';
import { ExtSplats, PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

const COUNT = 20000;

/** A sphere of splats whose centres sit `offset` units out along x in the stored data. */
function writeSphere(splats: PackedSplats | ExtSplats, offset: number): void {
  const rand = rng(21);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3().setScalar(0.012);
  const quaternion = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < COUNT; i++) {
    const z = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(1 - z * z);
    center.set(offset + Math.cos(a) * r * 0.7, z * 0.7, Math.sin(a) * r * 0.7);
    color.setHSL(0.55 + z * 0.15, 0.7, 0.55);
    splats.setSplat(i, center, scales, quaternion, 1, color);
  }
}

const OFFSETS = ['0', '100', '400', '1500'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.4], orbit: false });
  const label = overlay(el);
  let meshes: SplatMesh[] = [];

  const build = (offset: number): void => {
    for (const m of meshes) {
      stage.scene.remove(m);
      m.dispose();
    }
    // Same splats twice: 16 bytes each in PackedSplats, 32 bytes each in ExtSplats.
    const packed = new PackedSplats();
    // An ExtSplats grown from empty with pushSplat didn't render in Spark 2.4, so give it
    // its two arrays (4 words per splat each) up front and fill them with setSplat.
    const ext = new ExtSplats({
      extArrays: [new Uint32Array(COUNT * 4), new Uint32Array(COUNT * 4)],
      numSplats: COUNT,
    });
    writeSphere(packed, offset);
    writeSphere(ext, offset);
    meshes = [new SplatMesh({ packedSplats: packed }), new SplatMesh({ extSplats: ext })];
    // Move each mesh back by the offset, so both spheres sit in view side by side.
    meshes.forEach((m, i) => {
      m.position.set(-offset + (i === 0 ? -0.85 : 0.85), 0, 0);
      stage.scene.add(m);
    });
    label.textContent = `centres stored ${offset} units out     PackedSplats (float16) · ExtSplats (float32)`;
  };
  build(ctx.preview ? 400 : 100);

  if (!ctx.preview) {
    select(controlBar(el), 'offset', OFFSETS, (v) => build(Number(v)), '100');
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
