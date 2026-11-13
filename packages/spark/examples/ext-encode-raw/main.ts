// Writing extArrays directly with utils.encodeExtSplat and reading them back with decodeExtSplat
import * as THREE from 'three';
import { ExtSplats, SplatMesh, utils } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 2.4, 1.6], orbit: 0.2 });
  const count = ctx.preview ? 6000 : 20000;
  // Two Uint32Arrays, 4 words per splat in each: 32 bytes per splat in total.
  const extArrays: [Uint32Array, Uint32Array] = [new Uint32Array(count * 4), new Uint32Array(count * 4)];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const q = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    // A sunflower spiral, each splat a flat disc rotated to face along its spiral arm.
    const r = Math.sqrt(i / count) * 1.4;
    const a = i * golden;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -a);
    color.setHSL((i / count) * 0.15 + 0.05, 0.9, 0.35 + 0.3 * (1 - r / 1.4));
    utils.encodeExtSplat(
      extArrays, i,
      Math.cos(a) * r, Math.sin(i * 0.05) * 0.03, Math.sin(a) * r, // centre x, y, z
      0.018, 0.002, 0.008, // scales x, y, z
      q.x, q.y, q.z, q.w, // quaternion
      0.95, color.r, color.g, color.b, // opacity, rgb
    );
  }
  const flower = new SplatMesh({ extSplats: new ExtSplats({ extArrays, numSplats: count }) });
  stage.scene.add(flower);

  if (!ctx.preview) {
    // Round-trip the first few splats to show what the 32-byte encoding keeps.
    const lines = ['index  center (x, y, z)                 scales                    opacity'];
    for (let i = 1; i <= 4; i++) {
      const { center, scales, opacity } = utils.decodeExtSplat(extArrays, i * 1000);
      const v = (p: THREE.Vector3, d: number): string => [p.x, p.y, p.z].map((n) => n.toFixed(d).padStart(9)).join(' ');
      lines.push(`${String(i * 1000).padEnd(6)} ${v(center, 6)}   ${v(scales, 4)}   ${opacity.toFixed(4)}`);
    }
    readout(el, lines.join('\n'));
  }

  stage.run((_, dt) => (flower.rotation.y += dt * 0.2));
  return () => stage.dispose();
};

export default mount;
