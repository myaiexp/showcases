// A double helix written into a Uint32Array with utils.setPackedSplat*
import * as THREE from 'three';
import { PackedSplats, SplatMesh, utils } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';

const STRANDS = 2;

/** Fills a packed array: pass 1 centre + colour, pass 2 orientation, pass 3 taper the scales. */
function buildHelix(count: number): Uint32Array {
  // Four uint32 per splat, and the capacity must be a whole number of 2048-splat texture rows.
  const array = new Uint32Array(utils.computeMaxSplats(count) * 4);
  const color = new THREE.Color();
  const tangent = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const along = new THREE.Vector3(0, 1, 0);
  const point = (u: number, strand: number, out: THREE.Vector3): THREE.Vector3 => {
    const a = u * Math.PI * 6 + strand * Math.PI;
    return out.set(Math.cos(a) * 0.45, (u - 0.5) * 2.2, Math.sin(a) * 0.45);
  };
  const p = new THREE.Vector3();
  const q = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    const strand = i % STRANDS;
    const u = Math.floor(i / STRANDS) / (count / STRANDS);
    point(u, strand, p);
    color.setHSL(0.55 + 0.45 * strand + u * 0.15, 0.8, 0.55);
    // Everything but the rotation: centre, scales (placeholder), identity quaternion, opacity, colour.
    utils.setPackedSplat(array, i, p.x, p.y, p.z, 0.02, 0.02, 0.02, 0, 0, 0, 1, 0.95, color.r, color.g, color.b);

    // Rotation alone, with setPackedSplatQuat: turn each splat's long axis (local y) along the strand.
    point(u + 0.001, strand, q);
    tangent.subVectors(q, p).normalize();
    quat.setFromUnitVectors(along, tangent);
    utils.setPackedSplatQuat(array, i, quat.x, quat.y, quat.z, quat.w);

    // Scales alone, with setPackedSplatScales: a thin rod that swells at the middle of the helix.
    const swell = 0.6 + 0.4 * Math.sin(u * Math.PI);
    utils.setPackedSplatScales(array, i, 0.012 * swell, 0.05 * swell, 0.012 * swell);
  }
  return array;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 3], orbit: 0.3 });
  const label = overlay(el);
  wrapInCard(label, ctx.preview);
  const total = ctx.preview ? 1600 : 5000;

  const packedArray = buildHelix(total);
  // numSplats uses only the first part of the array, here 60% of it to start.
  const packed = new PackedSplats({ packedArray, numSplats: Math.floor(total * 0.6) });
  const mesh = new SplatMesh({ packedSplats: packed });
  stage.scene.add(mesh);

  const report = (): void => {
    label.textContent = `packedArray: Uint32Array(${packedArray.length}), ${(packedArray.byteLength / 1024).toFixed(0)} KB\nnumSplats: ${packed.numSplats} of ${total} written`;
  };
  report();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'numSplats', 0, total, 50, packed.numSplats, (v) => {
      packed.numSplats = v;
      report();
    });
  }

  stage.run((t) => {
    // Cards sweep numSplats up and down to show that only the first N entries are drawn.
    if (ctx.preview) {
      packed.numSplats = Math.floor(total * (0.55 + 0.45 * Math.sin(t * 0.8)));
      report();
    }
  });
  return () => stage.dispose();
};

export default mount;
