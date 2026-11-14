// A grey splat sphere carrying packed first-order spherical harmonics (extra.sh1)
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';
import { rng } from '../../shared/subjects.ts';

/**
 * Packs nine values (3 coefficients x RGB) into two uint32 words as signed 7-bit fields,
 * the layout documented for `extra.sh1`: field i sits at bit i * 7, value / sh1Max * 63.
 */
function packSh1(out: Uint32Array, index: number, values: number[], sh1Max: number): void {
  let lo = 0;
  let hi = 0;
  values.forEach((v, i) => {
    const field = Math.round(THREE.MathUtils.clamp((v / sh1Max) * 63, -63, 63)) & 127;
    const bit = i * 7;
    if (bit + 7 <= 32) lo |= field << bit;
    else if (bit >= 32) hi |= field << (bit - 32);
    else {
      lo |= field << bit; // a field that straddles the two words
      hi |= field >>> (32 - bit);
    }
  });
  out[index * 2] = lo >>> 0;
  out[index * 2 + 1] = hi >>> 0;
}

export function pushShSphere(splats: PackedSplats, count: number): void {
  const rand = rng(17);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3(0.05, 0.05, 0.05);
  const quat = new THREE.Quaternion();
  const grey = new THREE.Color(0.5, 0.5, 0.5);
  const ys: number[] = [];
  for (let i = 0; i < count; i++) {
    const dir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    center.copy(dir).multiplyScalar(0.8);
    splats.pushSplat(center, scales, quat, 0.95, grey);
    ys.push(dir.y);
  }
  // sh1 sits beside the base splats in `extra`; ensureSplatsSh(1, n) allocates it.
  const sh1 = splats.ensureSplatsSh(1, count);
  const { sh1Max } = splats.splatEncoding;
  for (let i = 0; i < count; i++) {
    // Each coefficient pulls one pair of colours along one view axis. Strength fades
    // towards the poles, so the equator shifts most as you orbit.
    const s = 0.7 * (1 - Math.abs(ys[i]!) * 0.6);
    packSh1(sh1, i, [0, s, -s, -s, 0, s, s, -s, 0], sh1Max);
  }
}
